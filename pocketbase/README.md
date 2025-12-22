# PocketBase Migration Script

This directory contains Python scripts to migrate project data from the Angular JSON format to PocketBase schema format and upload it directly to your PocketBase instance.

## Overview

The PocketBase schema uses a normalized, relational structure where text content and media resources are stored in separate collections and referenced by IDs. This allows for:
- Multi-language support through the `texts` collection with bilingual (English and German) content
- Centralized resource management through the `resources` collection
- Efficient data reuse and relationship management

1. **`migrate_projects.py`** - Transforms `projects-EN.json` AND `projects-DE.json` into PocketBase-compatible records following the normalized schema with bilingual support
2. **`upload_to_pocketbase.py`** - Uploads the migration data directly to your PocketBase instance

## Quick Start

### Prerequisites

- Python 3.7 or higher
- `pocketbase` library: `pip install pocketbase`
- A running PocketBase instance
- Admin credentials for your PocketBase instance

### Step 1: Generate Migration Data

```bash
# Navigate to the pocketbase directory
cd pocketbase

# Run the migration script to generate the JSON (processes both EN and DE files)
python3 migrate_projects.py

# Or use custom input files
python3 migrate_projects.py --input-en /path/to/projects-EN.json --input-de /path/to/projects-DE.json

# Or use custom output file
python3 migrate_projects.py --output /path/to/output.json
```

This will create `pocketbase_migration.json` with the transformed data, including:
- Text content stored in the `texts` collection with language metadata (both English and German)
- Picture references stored in the `resources` collection
- Proper relational IDs linking all entities together
- Each project, slide, and feature links to texts in BOTH languages

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

Uploading 70 records to 'texts' collection...
✓ Uploaded 70/70 records to 'texts'

Uploading 14 records to 'resources' collection...
✓ Uploaded 14/14 records to 'resources'

...

============================================================
Upload Summary:
  Total records processed: 129
  Successfully uploaded: 129
  Failed: 0
============================================================

✅ All records uploaded successfully!
```

## Scripts Reference

### migrate_projects.py

Transforms the Angular JSON format into PocketBase-compatible records with bilingual support.

The script will:
1. Read both `/src/app/shared/jsons/projects-EN.json` and `/src/app/shared/jsons/projects-DE.json`
2. Transform the data into PocketBase format with texts from both languages
3. Generate output to `pocketbase/pocketbase_migration.json`

**Key Features:**
- **Bilingual Support**: Processes both English and German project files simultaneously
- **Text Deduplication**: Ensures no duplicate texts within the same language
- **Proper Language Tagging**: Each text record is tagged with its language (eng/ger)
- **Unified Structure**: Creates single project/slide/feature records that reference texts from both languages

**Output Collections:**
- **tags**: Unique tags used across all projects (e.g., "Software", "Frontend", "Angular")
- **texts**: Text content with language metadata (eng/ger) - used for all translatable strings from both language files
- **resources**: Media resources (pictures) with metadata (title, description, src path)
- **features**: Core and additional features of projects (with relations to texts for name and explanations in both languages)
- **summaries**: Project summaries with references to tags and texts from both languages
- **slides**: Carousel slide information with relations to texts (heading, text) from both languages and resources (picture)
- **projectPages**: Detailed project page information with relations to texts (heading) from both languages and resources (picture)
- **projects**: Main project records linking slides and project pages (no language field - supports both via text relations)

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

The new schema uses a normalized, relational structure where text content and resources are stored separately:

### Source: projects-EN.json and projects-DE.json

The migration script reads BOTH language files and creates unified records:

```json
// projects-EN.json
{
  "projects": [
    {
      "ProjectID": "LSM",
      "slide": { 
        "title": "LSM",
        "text": "Localstorage management system",
        "picture": "../../assets/pictures/projects/Slides/LSM_Picture.png",
        ...
      },
      ...
    }
  ]
}

// projects-DE.json
{
  "projects": [
    {
      "ProjectID": "LSM",
      "slide": { 
        "title": "LSM",
        "text": "Localstorage Verwaltungssystem",
        "picture": "../../assets/pictures/projects/Slides/LSM_Picture.png",
        ...
      },
      ...
    }
  ]
}
```

### Output: pocketbase_migration.json

The script creates normalized records with proper ID references and bilingual support:

**texts** collection (all translatable strings from both languages):
```json
// English version
{
  "id": "abc123xyz456789",
  "text": "Localstorage management system",
  "language": "eng"
}

// German version
{
  "id": "def456uvw789012",
  "text": "Localstorage Verwaltungssystem",
  "language": "ger"
}
```

**slides** collection (with relations to texts in both languages):
```json
{
  "id": "jkl012mno678901",
  "heading": ["text_id_for_eng_title", "text_id_for_ger_title"],
  "text": ["text_id_for_eng_text", "text_id_for_ger_text"],
  "picture": "resource_id_for_picture",
  "position": 0,
  "link": "/LSM"
}
```

**features** collection (with bilingual text relations):
```json
{
  "id": "ghi789rst345678",
  "name": ["text_id_for_eng_name", "text_id_for_ger_name"],
  "syntax": "static register(componentID: string)",
  "text": ["text_id_for_eng_explanation", "text_id_for_ger_explanation"]
}
```

This normalized structure enables:
- Multi-language support (same structure, text IDs reference both English and German)
- Efficient text reuse across collections
- Centralized resource management
- Clean separation of content and metadata
- No duplicate texts within the same language

## Important Notes

### Schema Changes (v2)

The PocketBase schema has been updated to use a normalized, relational structure:

**Text Content**: All text fields (titles, descriptions, feature names, etc.) are now stored in the `texts` collection with language metadata and referenced by ID. This enables:
- Multi-language support
- Efficient text reuse
- Centralized text management

**Resources**: All pictures and media files are now stored in the `resources` collection with metadata (title, description, src) and referenced by ID. This enables:
- Centralized resource management
- Better organization of media files
- Metadata attachment to resources

**Affected Collections**:
- `features`: `name` and `text` are now relations to `texts` collection (arrays of text IDs)
- `slides`: `heading` and `text` are now relations to `texts` collection; `picture` is a relation to `resources`
- `projectPages`: `heading` is now a relation to `texts` collection; `picture` and `additionalPictures` are relations to `resources`
- `summaries`: `texts` field is a relation to `texts` collection (already was)

### File Uploads

The script does **NOT** upload actual picture files. The `resources` collection stores:
- Empty `picture` field (for future file upload)
- `title`: Descriptive title
- `description`: Description of the resource
- `src`: Original file path from the JSON (for reference)

File uploads must be handled separately using the PocketBase API after importing the records.

### ID Generation
The script generates random IDs matching PocketBase's format (15-character lowercase alphanumeric strings). These IDs are used to create relationships between collections.

### Language

The script now automatically processes both language files:
- Reads both `projects-EN.json` and `projects-DE.json`
- Creates text records for each language with proper language tags (`eng` and `ger`)
- Links all project structures to texts from BOTH languages
- Ensures no duplicate texts within the same language

All text records in the `texts` collection are tagged with their language code, and each project/slide/feature references texts from both languages.

## Manual Import (Alternative to Upload Script)

If you prefer to manually import the data instead of using `upload_to_pocketbase.py`:

1. **Review the output**: Check `pocketbase_migration.json` to ensure data was transformed correctly

2. **Import records**: Use the PocketBase Admin UI or API to import records in the correct order:
   - First: `tags`, `texts`, `resources` (no dependencies)
   - Then: `features` (depends on texts), `summaries` (depends on tags and texts)
   - Then: `slides` (depends on texts and resources), `projectPages` (depends on summaries, features, texts, and resources)
   - Finally: `projects` (depends on slides and projectPages)

3. **Upload files**: After importing records, upload the corresponding image files to the `resources` collection using the PocketBase API. The `src` field in each resource record contains the original file path for reference.

## Customization

The migration script automatically processes both English and German files. You can customize the input and output paths:

```bash
# Use custom input files
python3 migrate_projects.py --input-en /path/to/projects-EN.json --input-de /path/to/projects-DE.json

# Use custom output file
python3 migrate_projects.py --output /path/to/output.json
```

## Schema Reference

The PocketBase schema is defined in `pb_schema.json`. Key collections:

- **projects** (pbc_2723121715): Main collection linking slides and project pages
  - `projectName` (text): Project identifier
  - `progress` (number): Project completion percentage
  - `slide` (relation): Reference to slides collection
  - `projectPage` (relation): Reference to projectPages collection

- **slides** (pbc_2412994015): Carousel slides
  - `position` (number): Display order
  - `heading` (relation): Array of text IDs for title
  - `text` (relation): Array of text IDs for description
  - `picture` (relation): Resource ID for slide image
  - `link` (text): Navigation link

- **projectPages** (pbc_3533256308): Detailed project information
  - `heading` (relation): Array of text IDs for page title
  - `summary` (relation): Reference to summaries collection
  - `coreFeatures` (relation): Array of feature IDs
  - `additionalFeatures` (relation): Array of feature IDs
  - `picture` (relation): Resource ID for main image
  - `additionalPictures` (relation): Array of resource IDs
  - `gitLink` (url): GitHub repository link
  - `progress` (number): Project completion percentage

- **summaries** (pbc_39049810): Project summaries
  - `title` (text): Summary title
  - `tags` (relation): Array of tag IDs
  - `texts` (relation): Array of text IDs for summary content

- **features** (pbc_4287529994): Project features
  - `name` (relation): Array of text IDs for feature name
  - `syntax` (text): Code syntax example
  - `text` (relation): Array of text IDs for feature explanation

- **texts** (pbc_3581128020): Text content with language support
  - `text` (text): The actual text content
  - `language` (select): Language code ('eng' or 'ger')

- **resources** (pbc_2337082678): Media resources
  - `picture` (file): The actual file (uploaded separately)
  - `title` (text): Resource title
  - `description` (text): Resource description
  - `src` (url): Original file path reference

- **tags** (pbc_1219621782): Project tags
  - `tag` (text): Tag name
