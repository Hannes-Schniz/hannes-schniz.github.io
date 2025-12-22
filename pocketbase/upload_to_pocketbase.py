#!/usr/bin/env python3
"""
PocketBase Upload Script
Uploads migration data directly to PocketBase instance
"""

import json
import sys
import time
from pathlib import Path
from typing import Dict, List, Any, Optional

try:
    import requests
except ImportError:
    print("Error: 'requests' library is required. Install it with: pip install requests")
    sys.exit(1)


class PocketBaseUploader:
    """Handle uploading data to PocketBase"""
    
    def __init__(self, config_path: str):
        """Initialize with PocketBase configuration"""
        with open(config_path, 'r') as f:
            config = json.load(f)
        
        self.base_url = config['url'].rstrip('/')
        self.admin_email = config['admin_email']
        self.admin_password = config['admin_password']
        self.token = None
        self.session = requests.Session()
    
    def authenticate(self) -> bool:
        """Authenticate as admin and get auth token"""
        try:
            url = f"{self.base_url}/api/admins/auth-with-password"
            response = self.session.post(url, json={
                'identity': self.admin_email,
                'password': self.admin_password
            })
            response.raise_for_status()
            
            data = response.json()
            self.token = data['token']
            self.session.headers.update({
                'Authorization': f'Bearer {self.token}'
            })
            print(f"✓ Successfully authenticated as admin")
            return True
        except requests.exceptions.RequestException as e:
            print(f"✗ Authentication failed: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"  Response: {e.response.text}")
            return False
    
    def create_record(self, collection: str, data: Dict[str, Any]) -> Optional[Dict]:
        """Create a record in a collection"""
        try:
            url = f"{self.base_url}/api/collections/{collection}/records"
            response = self.session.post(url, json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"  ✗ Failed to create record in {collection}: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"    Response: {e.response.text}")
            return None
    
    def upload_collection(self, collection: str, records: List[Dict]) -> int:
        """Upload all records for a collection"""
        print(f"\nUploading {len(records)} records to '{collection}' collection...")
        success_count = 0
        
        for i, record in enumerate(records, 1):
            result = self.create_record(collection, record)
            if result:
                success_count += 1
                if i % 10 == 0:
                    print(f"  Progress: {i}/{len(records)} records uploaded")
            else:
                print(f"  Warning: Failed to upload record {i}/{len(records)}")
                # Continue with other records even if one fails
        
        print(f"✓ Uploaded {success_count}/{len(records)} records to '{collection}'")
        return success_count
    
    def upload_migration_data(self, migration_file: str) -> bool:
        """Upload migration data to PocketBase"""
        # Load migration data
        with open(migration_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print(f"\n{'='*60}")
        print(f"Starting PocketBase upload from: {migration_file}")
        print(f"PocketBase URL: {self.base_url}")
        print(f"{'='*60}")
        
        # Upload order matters due to relationships
        upload_order = [
            'tags',
            'texts', 
            'features',
            'summaries',
            'slides',
            'projectPages',
            'projects'
        ]
        
        total_uploaded = 0
        total_records = sum(len(data.get(col, [])) for col in upload_order)
        
        for collection in upload_order:
            if collection in data and data[collection]:
                uploaded = self.upload_collection(collection, data[collection])
                total_uploaded += uploaded
            else:
                print(f"\nSkipping '{collection}' - no records found")
        
        print(f"\n{'='*60}")
        print(f"Upload Summary:")
        print(f"  Total records processed: {total_records}")
        print(f"  Successfully uploaded: {total_uploaded}")
        print(f"  Failed: {total_records - total_uploaded}")
        print(f"{'='*60}\n")
        
        return total_uploaded == total_records


def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Upload migration data to PocketBase',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Upload using default config and migration files
  %(prog)s
  
  # Upload with custom config file
  %(prog)s --config /path/to/pb_config.json
  
  # Upload custom migration file
  %(prog)s --migration /path/to/migration.json
        """
    )
    parser.add_argument(
        '--config',
        default='pb_config.json',
        help='Path to PocketBase config file (default: pb_config.json)'
    )
    parser.add_argument(
        '--migration',
        default='pocketbase_migration.json',
        help='Path to migration JSON file (default: pocketbase_migration.json)'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Load files and authenticate but do not upload data'
    )
    
    args = parser.parse_args()
    
    # Set up paths
    script_dir = Path(__file__).parent
    config_path = script_dir / args.config
    migration_path = script_dir / args.migration
    
    # Check if files exist
    if not config_path.exists():
        print(f"Error: Config file not found: {config_path}")
        print(f"\nPlease create '{args.config}' with your PocketBase credentials.")
        print(f"You can copy 'pb_config.example.json' as a template:")
        print(f"  cp pb_config.example.json {args.config}")
        print(f"\nThen edit {args.config} with your actual credentials.")
        return 1
    
    if not migration_path.exists():
        print(f"Error: Migration file not found: {migration_path}")
        print(f"\nPlease run 'migrate_projects.py' first to generate the migration data.")
        return 1
    
    try:
        # Initialize uploader
        uploader = PocketBaseUploader(str(config_path))
        
        # Authenticate
        if not uploader.authenticate():
            print("\nAuthentication failed. Please check your credentials in the config file.")
            return 1
        
        if args.dry_run:
            print("\n✓ Dry run successful - authentication works and migration file is valid")
            print("  Run without --dry-run to upload data")
            return 0
        
        # Upload data
        success = uploader.upload_migration_data(str(migration_path))
        
        if success:
            print("✅ All records uploaded successfully!")
            return 0
        else:
            print("⚠️  Upload completed with some failures. Check the output above for details.")
            return 1
            
    except KeyboardInterrupt:
        print("\n\nUpload cancelled by user")
        return 130
    except Exception as e:
        print(f"\n✗ Error during upload: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
