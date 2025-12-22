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


def create_text(text_content: str) -> Dict[str, Any]:
    """Create a text record"""
    return {"id": generate_id(), "text": text_content}


def create_feature(feature_data: Dict[str, str]) -> Dict[str, Any]:
    """Create a feature record"""
    return {
        "id": generate_id(),
        "name": feature_data.get("feature", feature_data.get("title", "")),
        "syntax": feature_data.get("syntax", ""),
        "text": feature_data.get("explanation", feature_data.get("text", "")),
    }


def is_empty_feature(feature_data: Dict[str, str]) -> bool:
    """Check if a feature is empty (has no meaningful content)"""
    return not feature_data.get("feature") and not feature_data.get("title")


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


def create_slide(slide_data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a slide record"""
    return {
        "id": generate_id(),
        "position": slide_data.get("position", 0),
        "title": slide_data.get("title", ""),
        "picture": "",  # File uploads need to be handled separately
        "text": slide_data.get("text", ""),
        "link": slide_data.get("link", ""),
    }


def create_project_page(
    page_data: Dict[str, Any],
    summary_id: str,
    core_feature_ids: List[str],
    additional_feature_ids: List[str],
) -> Dict[str, Any]:
    """Create a project page record"""
    return {
        "id": generate_id(),
        "title": page_data.get("title", ""),
        "picture": "",  # File uploads need to be handled separately
        "summary": summary_id,
        "coreFeatures": core_feature_ids,
        "additionalFeatures": additional_feature_ids,
        "gitLink": page_data.get("gitLink", ""),
        "progress": page_data.get("progress", 0),
        "additionalPictures": [],  # File uploads need to be handled separately
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


def migrate_projects(input_file: str, output_file: str):
    """
    Migrate projects from JSON file to PocketBase format

    Args:
        input_file: Path to projects-EN.json
        output_file: Path to output PocketBase migration JSON
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

    # Track unique tags to avoid duplicates
    tag_map = {}  # tag_name -> tag_record

    # Process each project
    for project in data.get("projects", []):
        project_id_label = project.get("ProjectID", "")
        all_projectIDs.append(project_id_label)

        # Process slide
        slide_data = project.get("slide", {})
        slide = create_slide(slide_data)
        all_slides.append(slide)

        # Process project page
        page_data = project.get("projectPage", {})

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
            text = create_text(text_content)
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
            feature = create_feature(feature_data)
            core_features.append(feature)
            all_features.append(feature)

        # Process additional features
        additional_features = []
        for feature_data in page_data.get("additionalFeatures", []):
            # Skip empty features
            if is_empty_feature(feature_data):
                continue
            feature = create_feature(feature_data)
            additional_features.append(feature)
            all_features.append(feature)

        # Create project page
        project_page = create_project_page(
            page_data,
            summary["id"],
            [f["id"] for f in core_features],
            [f["id"] for f in additional_features],
        )
        all_project_pages.append(project_page)

        # Create project
        project_record = create_project(
            project_id_label,
            page_data.get("progress", 0),
            slide["id"],
            project_page["id"],
            "eng",
        )
        all_projects.append(project_record)

    # Create output structure
    output = {
        "tags": all_tags,
        "projectName": all_projectIDs,
        "texts": all_texts,
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
    # Set up paths
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent
    input_file = repo_root / "src" / "app" / "shared" / "jsons" / "projects-EN.json"
    output_file = script_dir / "pocketbase_migration.json"

    # Check if input file exists
    if not input_file.exists():
        print(f"Error: Input file not found: {input_file}")
        return 1

    print(f"Migrating projects from: {input_file}")
    print(f"Output will be written to: {output_file}")
    print()

    try:
        migrate_projects(str(input_file), str(output_file))
        return 0
    except Exception as e:
        print(f"Error during migration: {e}")
        import traceback

        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit(main())
