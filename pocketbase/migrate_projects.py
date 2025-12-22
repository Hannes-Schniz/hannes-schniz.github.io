#!/usr/bin/env python3
"""
PocketBase Migration Script for Projects
Converts projects-EN.json to PocketBase schema format
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
    picture_path: str = "", title: str = "", description: str = "", src: str = ""
) -> Dict[str, Any]:
    """Create a resource record for pictures"""
    return {
        "id": generate_id(),
        "picture": "",  # Actual file upload needs to be handled separately
        "title": title,
        "description": description,
        "src": src or picture_path,  # Store the path as src for reference
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
    additional_picture_ids: List[str] = None,
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
    language: str = "ger",
) -> Dict[str, Any]:
    """Create a project record"""
    return {
        "id": generate_id(),
        "progress": progress,
        "slide": slide_id,
        "projectPage": project_page_id,
        "language": language,
        "projectName": project_id,
    }


def migrate_projects(input_file: str, output_file: str, language: str = "eng"):
    """
    Migrate projects from JSON file to PocketBase format

    Args:
        input_file: Path to projects-EN.json or projects-DE.json
        output_file: Path to output PocketBase migration JSON
        language: Language code ('eng' or 'ger')
    """
    # Read input JSON
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

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

    # Track unique tags to avoid duplicates
    tag_map = {}  # tag_name -> tag_record

    # Process each project
    for project in data.get("projects", []):
        project_id_label = project.get("ProjectID", "")
        all_projectIDs.append(project_id_label)

        # Process slide
        slide_data = project.get("slide", {})

        # Create text records for slide title
        slide_title_text = create_text(slide_data.get("title", ""), language)
        all_texts.append(slide_title_text)

        # Create text records for slide text
        slide_text_text = create_text(slide_data.get("text", ""), language)
        all_texts.append(slide_text_text)

        # Create resource for slide picture
        slide_picture_path = slide_data.get("picture", "")
        slide_picture_resource = None
        if slide_picture_path:
            slide_picture_resource = create_resource(
                picture_path=slide_picture_path,
                title=f"{project_id_label} Slide Picture",
                description=f"Slide picture for {project_id_label}",
            )
            all_resources.append(slide_picture_resource)

        slide = create_slide(
            slide_data,
            [slide_title_text["id"]],
            [slide_text_text["id"]],
            slide_picture_resource["id"] if slide_picture_resource else "",
        )
        all_slides.append(slide)

        # Process project page
        page_data = project.get("projectPage", {})

        # Create text records for project page title
        page_title_text = create_text(page_data.get("title", ""), language)
        all_texts.append(page_title_text)

        # Create resource for project page picture
        page_picture_path = page_data.get("picture", "")
        page_picture_resource = None
        if page_picture_path:
            page_picture_resource = create_resource(
                picture_path=page_picture_path,
                title=f"{project_id_label} Page Picture",
                description=f"Project page picture for {project_id_label}",
            )
            all_resources.append(page_picture_resource)

        # Process additional pictures
        additional_picture_ids = []
        for i, pic_path in enumerate(page_data.get("additionalPictures", [])):
            if pic_path:
                add_pic_resource = create_resource(
                    picture_path=pic_path,
                    title=f"{project_id_label} Additional Picture {i+1}",
                    description=f"Additional picture {i+1} for {project_id_label}",
                )
                all_resources.append(add_pic_resource)
                additional_picture_ids.append(add_pic_resource["id"])

        # Process summary
        summary_data = page_data.get("summary", {})

        # Process tags
        tags_list = []
        for tag_name in summary_data.get("tags", []):
            if tag_name not in tag_map:
                tag = create_tag(tag_name)
                tag_map[tag_name] = tag
                all_tags.append(tag)
            tags_list.append(tag_map[tag_name])

        # Process texts
        texts_list = []
        for text_content in summary_data.get("text", []):
            text = create_text(text_content, language)
            texts_list.append(text)
            all_texts.append(text)

        # Create summary
        summary = create_summary(summary_data, tags_list, texts_list)
        all_summaries.append(summary)

        # Process core features
        core_features = []
        for feature_data in page_data.get("coreFeatures", []):
            # Skip empty features
            if is_empty_feature(feature_data):
                continue

            # Create text record for feature name
            feature_name = feature_data.get("feature", feature_data.get("title", ""))
            if feature_name:
                feature_name_text = create_text(feature_name, language)
                all_texts.append(feature_name_text)
                feature_name_ids = [feature_name_text["id"]]
            else:
                feature_name_ids = []

            # Create text record for feature explanation
            feature_explanation = feature_data.get(
                "explanation", feature_data.get("text", "")
            )
            if feature_explanation:
                feature_explanation_text = create_text(feature_explanation, language)
                all_texts.append(feature_explanation_text)
                feature_explanation_ids = [feature_explanation_text["id"]]
            else:
                feature_explanation_ids = []

            feature = create_feature(
                feature_data, feature_name_ids, feature_explanation_ids
            )
            core_features.append(feature)
            all_features.append(feature)

        # Process additional features
        additional_features = []
        for feature_data in page_data.get("additionalFeatures", []):
            # Skip empty features
            if is_empty_feature(feature_data):
                continue

            # Create text record for feature name
            feature_name = feature_data.get("feature", feature_data.get("title", ""))
            if feature_name:
                feature_name_text = create_text(feature_name, language)
                all_texts.append(feature_name_text)
                feature_name_ids = [feature_name_text["id"]]
            else:
                feature_name_ids = []

            # Create text record for feature explanation
            feature_explanation = feature_data.get(
                "explanation", feature_data.get("text", "")
            )
            if feature_explanation:
                feature_explanation_text = create_text(feature_explanation, language)
                all_texts.append(feature_explanation_text)
                feature_explanation_ids = [feature_explanation_text["id"]]
            else:
                feature_explanation_ids = []

            feature = create_feature(
                feature_data, feature_name_ids, feature_explanation_ids
            )
            additional_features.append(feature)
            all_features.append(feature)

        # Create project page
        project_page = create_project_page(
            page_data,
            summary["id"],
            [f["id"] for f in core_features],
            [f["id"] for f in additional_features],
            [page_title_text["id"]],
            page_picture_resource["id"] if page_picture_resource else "",
            additional_picture_ids,
        )
        all_project_pages.append(project_page)

        # Create project
        project_record = create_project(
            project_id_label,
            page_data.get("progress", 0),
            slide["id"],
            project_page["id"],
            language,
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
  # Migrate English projects (default)
  %(prog)s

  # Migrate German projects
  %(prog)s --language ger --input ../src/app/shared/jsons/projects-DE.json

  # Custom input and output files
  %(prog)s --input /path/to/projects.json --output /path/to/output.json
        """,
    )
    parser.add_argument(
        "--input",
        help="Path to input JSON file (default: ../src/app/shared/jsons/projects-EN.json)",
    )
    parser.add_argument(
        "--output",
        help="Path to output JSON file (default: pocketbase_migration.json)",
    )
    parser.add_argument(
        "--language",
        choices=["eng", "ger"],
        default="eng",
        help="Language code for text content (default: eng)",
    )

    args = parser.parse_args()

    # Set up paths
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent

    # Determine input file
    if args.input:
        input_file = Path(args.input)
    else:
        # Default based on language
        if args.language == "ger":
            input_file = repo_root / "src" / "app" / "shared" / "jsons" / "projects-DE.json"
        else:
            input_file = repo_root / "src" / "app" / "shared" / "jsons" / "projects-EN.json"

    # Determine output file
    if args.output:
        output_file = Path(args.output)
    else:
        output_file = script_dir / "pocketbase_migration.json"

    # Check if input file exists
    if not input_file.exists():
        print(f"Error: Input file not found: {input_file}")
        return 1

    print(f"Migrating projects from: {input_file}")
    print(f"Language: {args.language}")
    print(f"Output will be written to: {output_file}")
    print()

    try:
        migrate_projects(str(input_file), str(output_file), args.language)
        return 0
    except Exception as e:
        print(f"Error during migration: {e}")
        import traceback

        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit(main())
