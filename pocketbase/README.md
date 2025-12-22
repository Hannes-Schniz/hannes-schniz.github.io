# PocketBase Migration Script

This directory contains a Python script to migrate project data from the Angular JSON format to PocketBase schema format.

## Overview

The migration script (`migrate_projects.py`) reads the `projects-EN.json` file from the Angular application and transforms it into PocketBase-compatible records following the schema defined in `pb_schema.json`.

## Usage

### Prerequisites

- Python 3.6 or higher
- Access to the repository files

### Running the Script

```bash
# Navigate to the pocketbase directory
cd pocketbase

# Run the migration script
python3 migrate_projects.py
```

The script will:
1. Read `/src/app/shared/jsons/projects-EN.json`
2. Transform the data into PocketBase format
3. Generate output to `pocketbase/pocketbase_migration.json`

### Output

The script generates a JSON file with the following collections:

- **tags**: Unique tags used across all projects (e.g., "Software", "Frontend", "Angular")
- **texts**: Text content from project summaries
- **features**: Core and additional features of projects
- **summaries**: Project summaries with references to tags and texts
- **slides**: Carousel slide information for each project
- **projectPages**: Detailed project page information
- **projects**: Main project records linking slides and project pages

### Example Output Statistics

```
Migration completed successfully!
  Tags: 13
  Texts: 12
  Features: 20
  Summaries: 6
  Slides: 6
  Project Pages: 6
  Projects: 6
```

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

## Importing to PocketBase

After running the migration script:

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
