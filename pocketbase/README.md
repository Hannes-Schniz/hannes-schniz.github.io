# PocketBase Migration Script

This directory contains Python scripts to migrate project data from the Angular JSON format to PocketBase schema format and upload it directly to your PocketBase instance.

## Overview

1. **`migrate_projects.py`** - Transforms `projects-EN.json` into PocketBase-compatible records
2. **`upload_to_pocketbase.py`** - Uploads the migration data directly to your PocketBase instance

## Quick Start

### Prerequisites

- Python 3.7 or higher
- `requests` library: `pip install requests`
- A running PocketBase instance
- Admin credentials for your PocketBase instance

### Step 1: Generate Migration Data

```bash
# Navigate to the pocketbase directory
cd pocketbase

# Run the migration script to generate the JSON
python3 migrate_projects.py
```

This will create `pocketbase_migration.json` with the transformed data.

### Step 2: Configure PocketBase Connection

```bash
# Copy the example config file
cp pb_config.example.json pb_config.json

# Edit pb_config.json with your PocketBase credentials
# {
#   "url": "http://localhost:8090",
#   "admin_email": "your-admin-email@example.com",
#   "admin_password": "your-admin-password"
# }
```

**Note:** `pb_config.json` is in `.gitignore` - your credentials will NOT be committed to the repository.

### Step 3: Upload to PocketBase

```bash
# Upload the migration data to PocketBase
python3 upload_to_pocketbase.py

# Or test the connection first with dry-run
python3 upload_to_pocketbase.py --dry-run
```

The upload script will:
1. Authenticate with your PocketBase instance
2. Upload records in the correct dependency order
3. Show progress and report any failures

### Example Output

```
============================================================
Starting PocketBase upload from: pocketbase_migration.json
PocketBase URL: http://localhost:8090
============================================================
✓ Successfully authenticated as admin

Uploading 13 records to 'tags' collection...
✓ Uploaded 13/13 records to 'tags'

Uploading 12 records to 'texts' collection...
✓ Uploaded 12/12 records to 'texts'

...

============================================================
Upload Summary:
  Total records processed: 69
  Successfully uploaded: 69
  Failed: 0
============================================================

✅ All records uploaded successfully!
```

## Scripts Reference

### migrate_projects.py

Transforms the Angular JSON format into PocketBase-compatible records.

The script will:
1. Read `/src/app/shared/jsons/projects-EN.json`
2. Transform the data into PocketBase format
3. Generate output to `pocketbase/pocketbase_migration.json`

**Output Collections:**
- **tags**: Unique tags used across all projects (e.g., "Software", "Frontend", "Angular")
- **texts**: Text content from project summaries
- **features**: Core and additional features of projects
- **summaries**: Project summaries with references to tags and texts
- **slides**: Carousel slide information for each project
- **projectPages**: Detailed project page information
- **projects**: Main project records linking slides and project pages

### upload_to_pocketbase.py

Uploads migration data directly to your PocketBase instance via the REST API.

**Usage:**
```bash
# Upload with default config
python3 upload_to_pocketbase.py

# Upload with custom config file
python3 upload_to_pocketbase.py --config /path/to/pb_config.json

# Test connection without uploading
python3 upload_to_pocketbase.py --dry-run

# Use custom migration file
python3 upload_to_pocketbase.py --migration /path/to/custom_migration.json
```

**Features:**
- Automatic authentication with PocketBase admin API
- Uploads records in dependency order (respects foreign key relationships)
- Progress reporting and error handling
- Dry-run mode to test configuration

## Configuration File

Create `pb_config.json` with your PocketBase credentials:

```json
{
  "url": "http://localhost:8090",
  "admin_email": "admin@example.com",
  "admin_password": "your-secure-password"
}
```

**Security Notes:**
- `pb_config.json` is automatically ignored by git
- Never commit credentials to the repository
- Use environment variables for production deployments
- Consider using PocketBase's API tokens for programmatic access

## Data Structure Mapping

### Source: projects-EN.json
```json
{
  "projects": [
    {
      "ProjectID": "LSM",
      "slide": { ... },
      "projectPage": {
        "summary": { "title": "...", "text": [...], "tags": [...] },
        "coreFeatures": [...],
        "additionalFeatures": [...],
        ...
      }
    }
  ]
}
```

### Output: pocketbase_migration.json
The script creates normalized records following the PocketBase schema with proper ID references between related collections.

## Important Notes

### File Uploads
The script does **NOT** handle file uploads (pictures). These fields are left empty in the migration output:
- `slides.picture`
- `projectPages.picture`
- `projectPages.additionalPictures`

File uploads must be handled separately using the PocketBase API after importing the records.

### ID Generation
The script generates random IDs matching PocketBase's format (15-character lowercase alphanumeric strings). These IDs are used to create relationships between collections.

### Language
All migrated projects are set to language `"eng"` (English). If you need to migrate German projects (`projects-DE.json`), you'll need to modify the script or run it separately with language set to `"ger"`.

## Manual Import (Alternative to Upload Script)

If you prefer to manually import the data instead of using `upload_to_pocketbase.py`:

1. **Review the output**: Check `pocketbase_migration.json` to ensure data was transformed correctly

2. **Import records**: Use the PocketBase Admin UI or API to import records in the correct order:
   - First: `tags`, `texts`, `features` (no dependencies)
   - Then: `summaries` (depends on tags and texts)
   - Then: `slides`, `projectPages` (slides has no deps, projectPages depends on summaries and features)
   - Finally: `projects` (depends on slides and projectPages)

3. **Upload files**: After importing records, upload the corresponding image files using the PocketBase API

## Customization

To modify the script for different input files or languages, edit the `main()` function in `migrate_projects.py`:

```python
# Change input file
input_file = repo_root / "src" / "app" / "shared" / "jsons" / "projects-DE.json"

# Or modify the language parameter in create_project():
project_record = create_project(
    project_id_label,
    page_data.get("progress", 0),
    slide["id"],
    project_page["id"],
    "ger"  # Change language here
)
```

## Schema Reference

The PocketBase schema is defined in `pb_schema.json`. Key collections:

- **projects** (pbc_2723121715): Main collection linking slides and project pages
- **slides** (pbc_2412994015): Carousel slides with position, title, picture, text, link
- **projectPages** (pbc_3533256308): Detailed project information
- **summaries** (pbc_39049810): Project summaries with tags and text content
- **features** (pbc_4287529994): Project features with name, syntax, and explanation
- **tags** (pbc_1219621782): Unique tags for categorizing projects
- **texts** (pbc_3581128020): Text content for summaries
