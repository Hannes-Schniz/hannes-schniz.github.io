#!/usr/bin/env python3
"""
PocketBase Migration Script for Projects
Converts projects-EN.json and projects-DE.json to PocketBase schema format with bilingual support
"""

import json
import random
import string
from typing import Dict, List, Any, Set
from pathlib import Path


# Track generated IDs to ensure uniqueness
_generated_ids: Set[str] = set()


def generate_id(length: int = 15) -> str:
    """Generate a unique PocketBase-style ID (lowercase alphanumeric)"""
    while True:
        new_id = "".join(
            random.choices(string.ascii_lowercase + string.digits, k=length)
        )
        if new_id not in _generated_ids:
            _generated_ids.add(new_id)
            return new_id


def create_tag(tag_name: str) -> Dict[str, Any]:
    """Create a tag record"""
    return {"id": generate_id(), "tag": tag_name}


def create_text(text_content: str, language: str = "eng") -> Dict[str, Any]:
    """Create a text record with language"""
    return {"id": generate_id(), "text": text_content, "language": language}


def create_feature(
    feature_data: Dict[str, str], name_text_ids: List[str], explanation_text_ids: List[str]
) -> Dict[str, Any]:
    """Create a feature record with relations to texts"""
    return {
        "id": generate_id(),
        "name": name_text_ids,
        "syntax": feature_data.get("syntax", ""),
        "text": explanation_text_ids,
    }


def is_empty_feature(feature_data: Dict[str, str]) -> bool:
    """Check if a feature is empty (has no meaningful content)"""
    return not feature_data.get("feature") and not feature_data.get("title")


def create_resource(
    src: str = "", title: str = "", description: str = ""
) -> Dict[str, Any]:
    """Create a resource record for pictures"""
    return {
        "id": generate_id(),
        "picture": "",  # Actual file upload needs to be handled separately
        "title": title,
        "description": description,
        "src": src,  # Store the path for reference
    }


def create_summary(
    summary_data: Dict[str, Any], tags: List[Dict], texts: List[Dict]
) -> Dict[str, Any]:
    """Create a summary record with related tags and texts"""
    tag_ids = [tag["id"] for tag in tags]
    text_ids = [text["id"] for text in texts]

    return {
        "id": generate_id(),
        "title": summary_data.get("title", ""),
        "tags": tag_ids,
        "texts": text_ids,
    }


def create_slide(
    slide_data: Dict[str, Any],
    title_text_ids: List[str],
    slide_text_ids: List[str],
    picture_id: str = "",
) -> Dict[str, Any]:
    """Create a slide record with relations to texts and resources"""
    return {
        "id": generate_id(),
        "position": slide_data.get("position", 0),
        "title": title_text_ids,
        "picture": picture_id,
        "text": slide_text_ids,
        "link": slide_data.get("link", ""),
    }


def create_project_page(
    page_data: Dict[str, Any],
    summary_id: str,
    core_feature_ids: List[str],
    additional_feature_ids: List[str],
    title_text_ids: List[str],
    picture_id: str = "",
    additional_picture_ids: List[str] | None = None,
) -> Dict[str, Any]:
    """Create a project page record with relations"""
    if additional_picture_ids is None:
        additional_picture_ids = []
    return {
        "id": generate_id(),
        "title": title_text_ids,
        "picture": picture_id,
        "summary": summary_id,
        "coreFeatures": core_feature_ids,
        "additionalFeatures": additional_feature_ids,
        "gitLink": page_data.get("gitLink", ""),
        "progress": page_data.get("progress", 0),
        "additionalPictures": additional_picture_ids,
    }


def create_project(
    project_id: str,
    progress: float,
    slide_id: str,
    project_page_id: str,
) -> Dict[str, Any]:
    """Create a project record"""
    return {
        "id": generate_id(),
        "progress": progress,
        "slide": slide_id,
        "projectPage": project_page_id,
        "projectName": project_id,
    }


def migrate_projects(input_file_en: str, input_file_de: str, output_file: str):
    """
    Migrate projects from both language JSON files to PocketBase format

    Args:
        input_file_en: Path to projects-EN.json
        input_file_de: Path to projects-DE.json
        output_file: Path to output PocketBase migration JSON
    """
    # Read input JSONs
    with open(input_file_en, "r", encoding="utf-8") as f:
        data_en = json.load(f)
    
    with open(input_file_de, "r", encoding="utf-8") as f:
        data_de = json.load(f)

    # Initialize collections
    all_projectIDs = []
    all_tags = []
    all_texts = []
    all_features = []
    all_summaries = []
    all_slides = []
    all_project_pages = []
    all_projects = []
    all_resources = []

    # Track unique tags and texts to avoid duplicates
    tag_map = {}  # tag_name -> tag_record
    text_map = {}  # (text_content, language) -> text_record

    # Helper function to get or create text record
    def get_or_create_text(text_content: str, language: str) -> Dict[str, Any]:
        key = (text_content, language)
        if key not in text_map:
            text_record = create_text(text_content, language)
            text_map[key] = text_record
            all_texts.append(text_record)
        return text_map[key]

    # Ensure both files have the same projects in the same order
    projects_en = data_en.get("projects", [])
    projects_de = data_de.get("projects", [])
    
    if len(projects_en) != len(projects_de):
        print(f"Warning: Different number of projects in EN ({len(projects_en)}) and DE ({len(projects_de)})")
    
    # Process each project (pairing EN and DE versions)
    for idx in range(max(len(projects_en), len(projects_de))):
        project_en = projects_en[idx] if idx < len(projects_en) else None
        project_de = projects_de[idx] if idx < len(projects_de) else None
        
        # Get project ID (should be the same in both)
        if project_en and project_de:
            project_id_en = project_en.get("ProjectID", "")
            project_id_de = project_de.get("ProjectID", "")
            if project_id_en != project_id_de:
                print(f"Warning: Project ID mismatch at index {idx}: EN='{project_id_en}' vs DE='{project_id_de}'")
            project_id_label = project_id_en  # Use EN as primary
        elif project_en:
            project_id_label = project_en.get("ProjectID", "")
        else:
            project_id_label = project_de.get("ProjectID", "")
        
        all_projectIDs.append(project_id_label)

        # Process slides for both languages
        slide_title_text_ids = []
        slide_text_text_ids = []
        slide_picture_resource = None
        # Extract position and link from first available project (they should be language-independent)
        slide_position = 0
        slide_link = ""
        if project_en:
            slide_data_en = project_en.get("slide", {})
            slide_position = slide_data_en.get("position", 0)
            slide_link = slide_data_en.get("link", "")
        elif project_de:
            slide_data_de = project_de.get("slide", {})
            slide_position = slide_data_de.get("position", 0)
            slide_link = slide_data_de.get("link", "")
        
        for project, language in [(project_en, "eng"), (project_de, "ger")]:
            if not project:
                continue
            
            slide_data = project.get("slide", {})
            
            # Create text records for slide title
            slide_title = slide_data.get("title", "")
            if slide_title:
                slide_title_text = get_or_create_text(slide_title, language)
                slide_title_text_ids.append(slide_title_text["id"])
            
            # Create text records for slide text
            slide_text = slide_data.get("text", "")
            if slide_text:
                slide_text_text = get_or_create_text(slide_text, language)
                slide_text_text_ids.append(slide_text_text["id"])
            
            # Create resource for slide picture (only once)
            if not slide_picture_resource:
                slide_picture_path = slide_data.get("picture", "")
                if slide_picture_path:
                    slide_picture_resource = create_resource(
                        src=slide_picture_path,
                        title=f"{project_id_label} Slide Picture",
                        description=f"Slide picture for {project_id_label}",
                    )
                    all_resources.append(slide_picture_resource)

        slide = create_slide(
            {"position": slide_position, "link": slide_link},
            slide_title_text_ids,
            slide_text_text_ids,
            slide_picture_resource["id"] if slide_picture_resource else "",
        )
        all_slides.append(slide)

        # Process project pages for both languages
        page_title_text_ids = []
        page_picture_resource = None
        additional_picture_ids = []
        # Extract progress and gitLink from first available project (language-independent)
        page_progress = 0
        page_git_link = ""
        if project_en:
            page_data_en = project_en.get("projectPage", {})
            page_progress = page_data_en.get("progress", 0)
            page_git_link = page_data_en.get("gitLink", "")
        elif project_de:
            page_data_de = project_de.get("projectPage", {})
            page_progress = page_data_de.get("progress", 0)
            page_git_link = page_data_de.get("gitLink", "")
        
        # Process summary texts and tags
        summary_title = ""
        summary_text_ids_set = set()  # Use set for O(1) lookups
        tags_list = []
        
        for project, language in [(project_en, "eng"), (project_de, "ger")]:
            if not project:
                continue
                
            page_data = project.get("projectPage", {})
            
            # Create text records for project page title
            page_title = page_data.get("title", "")
            if page_title:
                page_title_text = get_or_create_text(page_title, language)
                page_title_text_ids.append(page_title_text["id"])
            
            # Create resource for project page picture (only once)
            if not page_picture_resource:
                page_picture_path = page_data.get("picture", "")
                if page_picture_path:
                    page_picture_resource = create_resource(
                        src=page_picture_path,
                        title=f"{project_id_label} Page Picture",
                        description=f"Project page picture for {project_id_label}",
                    )
                    all_resources.append(page_picture_resource)
            
            # Process additional pictures (only once)
            if not additional_picture_ids:
                for i, pic_path in enumerate(page_data.get("additionalPictures", [])):
                    if pic_path:
                        add_pic_resource = create_resource(
                            src=pic_path,
                            title=f"{project_id_label} Additional Picture {i+1}",
                            description=f"Additional picture {i+1} for {project_id_label}",
                        )
                        all_resources.append(add_pic_resource)
                        additional_picture_ids.append(add_pic_resource["id"])
            
            # Process summary
            summary_data = page_data.get("summary", {})
            summary_title = summary_data.get("title", "")
            
            # Process tags (only once, they're language-independent)
            if not tags_list:
                for tag_name in summary_data.get("tags", []):
                    if tag_name not in tag_map:
                        tag = create_tag(tag_name)
                        tag_map[tag_name] = tag
                        all_tags.append(tag)
                    tags_list.append(tag_map[tag_name])
            
            # Process summary texts
            for text_content in summary_data.get("text", []):
                if text_content:
                    text_record = get_or_create_text(text_content, language)
                    summary_text_ids_set.add(text_record["id"])

        # Create summary
        summary = create_summary({"title": summary_title}, tags_list, [])
        summary["texts"] = list(summary_text_ids_set)  # Convert set to list
        all_summaries.append(summary)

        # Process core features for both languages
        core_features = []
        
        # Get the maximum number of core features
        max_core_features = 0
        if project_en:
            max_core_features = max(max_core_features, len(project_en.get("projectPage", {}).get("coreFeatures", [])))
        if project_de:
            max_core_features = max(max_core_features, len(project_de.get("projectPage", {}).get("coreFeatures", [])))
        
        for feat_idx in range(max_core_features):
            feature_name_text_ids_set = set()  # Use set for O(1) lookups
            feature_explanation_text_ids_set = set()  # Use set for O(1) lookups
            feature_syntax = ""
            
            for project, language in [(project_en, "eng"), (project_de, "ger")]:
                if not project:
                    continue
                
                page_data = project.get("projectPage", {})
                core_features_data = page_data.get("coreFeatures", [])
                
                if feat_idx >= len(core_features_data):
                    continue
                
                feature_data = core_features_data[feat_idx]
                
                # Skip empty features
                if is_empty_feature(feature_data):
                    continue
                
                # Get syntax (language-independent, use first non-empty)
                if not feature_syntax:
                    feature_syntax = feature_data.get("syntax", "")
                
                # Create text record for feature name
                feature_name = feature_data.get("feature", feature_data.get("title", ""))
                if feature_name:
                    feature_name_text = get_or_create_text(feature_name, language)
                    feature_name_text_ids_set.add(feature_name_text["id"])
                
                # Create text record for feature explanation
                feature_explanation = feature_data.get("explanation", feature_data.get("text", ""))
                if feature_explanation:
                    feature_explanation_text = get_or_create_text(feature_explanation, language)
                    feature_explanation_text_ids_set.add(feature_explanation_text["id"])
            
            # Only create feature if we have at least one name or explanation
            if feature_name_text_ids_set or feature_explanation_text_ids_set:
                feature = create_feature(
                    {"syntax": feature_syntax},
                    list(feature_name_text_ids_set),  # Convert set to list
                    list(feature_explanation_text_ids_set),  # Convert set to list
                )
                core_features.append(feature)
                all_features.append(feature)

        # Process additional features for both languages
        additional_features = []
        
        # Get the maximum number of additional features
        max_additional_features = 0
        if project_en:
            max_additional_features = max(max_additional_features, len(project_en.get("projectPage", {}).get("additionalFeatures", [])))
        if project_de:
            max_additional_features = max(max_additional_features, len(project_de.get("projectPage", {}).get("additionalFeatures", [])))
        
        for feat_idx in range(max_additional_features):
            feature_name_text_ids_set = set()  # Use set for O(1) lookups
            feature_explanation_text_ids_set = set()  # Use set for O(1) lookups
            
            for project, language in [(project_en, "eng"), (project_de, "ger")]:
                if not project:
                    continue
                
                page_data = project.get("projectPage", {})
                additional_features_data = page_data.get("additionalFeatures", [])
                
                if feat_idx >= len(additional_features_data):
                    continue
                
                feature_data = additional_features_data[feat_idx]
                
                # Skip empty features
                if is_empty_feature(feature_data):
                    continue
                
                # Create text record for feature name
                feature_name = feature_data.get("feature", feature_data.get("title", ""))
                if feature_name:
                    feature_name_text = get_or_create_text(feature_name, language)
                    feature_name_text_ids_set.add(feature_name_text["id"])
                
                # Create text record for feature explanation
                feature_explanation = feature_data.get("explanation", feature_data.get("text", ""))
                if feature_explanation:
                    feature_explanation_text = get_or_create_text(feature_explanation, language)
                    feature_explanation_text_ids_set.add(feature_explanation_text["id"])
            
            # Only create feature if we have at least one name or explanation
            if feature_name_text_ids_set or feature_explanation_text_ids_set:
                feature = create_feature(
                    {},
                    list(feature_name_text_ids_set),  # Convert set to list
                    list(feature_explanation_text_ids_set),  # Convert set to list
                )
                additional_features.append(feature)
                all_features.append(feature)

        # Create project page
        project_page = create_project_page(
            {"progress": page_progress, "gitLink": page_git_link},
            summary["id"],
            [f["id"] for f in core_features],
            [f["id"] for f in additional_features],
            page_title_text_ids,
            page_picture_resource["id"] if page_picture_resource else "",
            additional_picture_ids,
        )
        all_project_pages.append(project_page)

        # Create project (single project with texts in both languages)
        project_record = create_project(
            project_id_label,
            page_progress,
            slide["id"],
            project_page["id"],
        )
        all_projects.append(project_record)

    # Create output structure
    output = {
        "tags": all_tags,
        "projectName": all_projectIDs,
        "texts": all_texts,
        "resources": all_resources,
        "features": all_features,
        "summaries": all_summaries,
        "slides": all_slides,
        "projectPages": all_project_pages,
        "projects": all_projects,
    }

    # Write output JSON
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    # Print statistics
    print(f"Migration completed successfully!")
    print(f"  Tags: {len(all_tags)}")
    print(f"  Texts: {len(all_texts)}")
    print(f"  Resources: {len(all_resources)}")
    print(f"  Features: {len(all_features)}")
    print(f"  Summaries: {len(all_summaries)}")
    print(f"  Slides: {len(all_slides)}")
    print(f"  Project Pages: {len(all_project_pages)}")
    print(f"  Projects: {len(all_projects)}")
    print(f"\nOutput written to: {output_file}")
    print(
        "\nNote: File uploads (pictures) need to be handled separately using PocketBase API"
    )


def main():
    """Main entry point"""
    import argparse

    parser = argparse.ArgumentParser(
        description="Migrate project data to PocketBase format",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Migrate both English and German projects (default)
  %(prog)s

  # Custom input files
  %(prog)s --input-en /path/to/projects-EN.json --input-de /path/to/projects-DE.json

  # Custom output file
  %(prog)s --output /path/to/output.json
        """,
    )
    parser.add_argument(
        "--input-en",
        help="Path to English JSON file (default: ../src/app/shared/jsons/projects-EN.json)",
    )
    parser.add_argument(
        "--input-de",
        help="Path to German JSON file (default: ../src/app/shared/jsons/projects-DE.json)",
    )
    parser.add_argument(
        "--output",
        help="Path to output JSON file (default: pocketbase_migration.json)",
    )

    args = parser.parse_args()

    # Set up paths
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent

    # Determine input files
    if args.input_en:
        input_file_en = Path(args.input_en)
    else:
        input_file_en = repo_root / "src" / "app" / "shared" / "jsons" / "projects-EN.json"

    if args.input_de:
        input_file_de = Path(args.input_de)
    else:
        input_file_de = repo_root / "src" / "app" / "shared" / "jsons" / "projects-DE.json"

    # Determine output file
    if args.output:
        output_file = Path(args.output)
    else:
        output_file = script_dir / "pocketbase_migration.json"

    # Check if input files exist
    if not input_file_en.exists():
        print(f"Error: English input file not found: {input_file_en}")
        return 1
    
    if not input_file_de.exists():
        print(f"Error: German input file not found: {input_file_de}")
        return 1

    print(f"Migrating projects from:")
    print(f"  English: {input_file_en}")
    print(f"  German: {input_file_de}")
    print(f"Output will be written to: {output_file}")
    print()

    try:
        migrate_projects(str(input_file_en), str(input_file_de), str(output_file))
        return 0
    except Exception as e:
        print(f"Error during migration: {e}")
        import traceback

        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit(main())
