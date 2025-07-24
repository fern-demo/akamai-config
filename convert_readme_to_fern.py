#!/usr/bin/env python3
"""
Convert ReadMe syntax to Fern/markdown syntax.

This script handles:
1. Block parameters (JSON tables) → Standard markdown tables
2. Block HTML (JSON format) → Clean HTML (iframes as-is, images wrapped in Frames)
3. Block images (JSON format) → Fern Frame syntax
4. ReadMe variables (<<VAR>> → {{VAR}})
5. Doc links ([text](doc:filename#anchor) → proper markdown links)
6. Images (![](url) → Fern Frame syntax)

TODO - Future Enhancements:
- Fix hyperlink paths: Currently doc links assume files are in same directory,
  need to build file map and use proper relative paths
- Replace ReadMe variables with actual values instead of just converting syntax
  (e.g., {{COMPANY_NICKNAME}} → "Akamai", {{CHAR_CHECK}} → "✓")
"""

import os
import re
import json
import argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple


def convert_block_parameters(content: str) -> str:
    """Convert ReadMe block parameters to standard markdown tables."""
    
    def parse_block_table(match) -> str:
        try:
            # Extract JSON content between [block:parameters] and [/block]
            json_str = match.group(1).strip()
            data = json.loads(json_str)
            
            if 'data' not in data:
                return match.group(0)  # Return original if no data
            
            table_data = data['data']
            cols = data.get('cols', 2)
            rows = data.get('rows', 1)
            align = data.get('align', ['left'] * cols)
            
            # Build markdown table
            markdown_lines = []
            
            # Header row
            headers = []
            for col in range(cols):
                header_key = f"h-{col}"
                headers.append(table_data.get(header_key, ""))
            
            markdown_lines.append("| " + " | ".join(headers) + " |")
            
            # Separator row with alignment
            separators = []
            for col in range(cols):
                align_type = align[col] if col < len(align) else 'left'
                if align_type == 'center':
                    separators.append(":---:")
                elif align_type == 'right':
                    separators.append("---:")
                else:
                    separators.append("---")
            
            markdown_lines.append("| " + " | ".join(separators) + " |")
            
            # Data rows
            for row in range(rows):
                row_data = []
                for col in range(cols):
                    cell_key = f"{row}-{col}"
                    cell_value = table_data.get(cell_key, "")
                    # Handle line breaks in cells
                    cell_value = cell_value.replace("  \n", "<br/>")
                    row_data.append(cell_value)
                
                markdown_lines.append("| " + " | ".join(row_data) + " |")
            
            return "\n".join(markdown_lines)
            
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Warning: Failed to parse block parameters: {e}")
            return match.group(0)  # Return original content if parsing fails
    
    # Pattern to match [block:parameters] ... [/block] (both single-line and multi-line formats)
    pattern = r'^(\s*)\[block:parameters\]\s*\n?(.*?)\n?\s*\[/block\]'
    
    def replace_with_proper_indentation(match):
        leading_whitespace = match.group(1)  # Capture but don't use leading spaces
        json_content = match.group(2)
        
        # Parse the block table
        result = parse_block_table(type('Match', (), {'group': lambda self, x: json_content})())
        
        # Tables should start at column 0
        return result
    
    return re.sub(pattern, replace_with_proper_indentation, content, flags=re.DOTALL | re.MULTILINE)


def convert_readme_variables(content: str) -> str:
    """Convert ReadMe variables from <<VAR>> to {{VAR}}."""
    
    # TODO: Eventually replace ReadMe variables with actual values
    # Current variables found include:
    # - {{COMPANY_NICKNAME}} -> should become "Akamai" 
    # - {{PORTAL_NAME}} -> should become "Akamai Control Center"
    # - {{CHAR_CHECK}} -> should become "✓" or checkmark symbol
    # - {{CHAR_MENU_DELIMITER}} -> should become ">" or appropriate delimiter
    # - {{PORTAL_ICON_ROOT}} -> should be removed or replaced with appropriate text
    # For now, we just convert the syntax from << >> to {{ }}
    
    return re.sub(r'<<([^>]+)>>', r'{{\1}}', content)


def convert_doc_links(content: str) -> str:
    """Convert doc links from [text](doc:filename#anchor) to relative markdown links."""
    
    # TODO: Fix hyperlink paths - currently assumes files are in same directory
    # The referenced files could be in different folders, so we need to:
    # 1. Build a map of all markdown files and their paths
    # 2. Find the correct relative path from current file to target file
    # 3. Update links to use proper relative paths (e.g., ../folder/file.md)
    
    def replace_doc_link(match) -> str:
        link_text = match.group(1)
        doc_reference = match.group(2)
        
        # Split doc reference into filename and anchor
        if '#' in doc_reference:
            filename, anchor = doc_reference.split('#', 1)
            # Convert to proper markdown link format
            return f"[{link_text}]({filename}.md#{anchor})"
        else:
            return f"[{link_text}]({doc_reference}.md)"
    
    # Pattern to match [text](doc:filename) or [text](doc:filename#anchor)
    pattern = r'\[([^\]]+)\]\(doc:([^)]+)\)'
    
    return re.sub(pattern, replace_doc_link, content)


def convert_block_html(content: str) -> str:
    """Convert ReadMe block HTML to clean HTML, wrapping images in Frames."""
    
    def parse_block_html(match) -> str:
        try:
            # Extract JSON content between [block:html] and [/block]
            json_str = match.group(1).strip()
            data = json.loads(json_str)
            
            if 'html' not in data:
                return match.group(0)  # Return original if no html field
            
            # Extract HTML content and clean it up
            html_content = data['html']
            
            # Remove leading/trailing newlines and whitespace
            html_content = html_content.strip()
            
            # Fix missing quotes in HTML attributes (common in ReadMe exports)
            html_content = fix_html_attributes(html_content)
            
            # If it's an img tag, wrap it in Frame component
            if html_content.strip().startswith('<img'):
                return f'<Frame>\n  {html_content}\n</Frame>'
            else:
                # For other HTML (like iframes), return as-is
                return html_content
            
        except (json.JSONDecodeError, KeyError) as e:
            print(f"Warning: Failed to parse block HTML: {e}")
            return match.group(0)  # Return original content if parsing fails
    
    # Pattern to match [block:html] ... [/block] (both single-line and multi-line formats)
    pattern = r'^(\s*)\[block:html\]\s*\n?(.*?)\n?\s*\[/block\]'
    
    def replace_with_proper_indentation(match):
        leading_whitespace = match.group(1)  # Capture any leading spaces/tabs
        json_content = match.group(2)
        
        # Parse the HTML block
        result = parse_block_html(type('Match', (), {'group': lambda self, x: json_content})())
        
        # Don't preserve the leading whitespace for Frame blocks - they should start at column 0
        return result
    
    return re.sub(pattern, replace_with_proper_indentation, content, flags=re.DOTALL | re.MULTILINE)


def fix_html_attributes(html: str) -> str:
    """Fix missing quotes in HTML attributes."""
    
    # Fix src attributes without quotes
    # Pattern: src=URL (without quotes) -> src="URL"
    html = re.sub(r'src=([^\s>]+)(?=[\s>])', r'src="\1"', html)
    
    # Fix href attributes without quotes
    html = re.sub(r'href=([^\s>]+)(?=[\s>])', r'href="\1"', html)
    
    # Fix other common attributes that might be missing quotes
    html = re.sub(r'alt=([^\s>]+)(?=[\s>])', r'alt="\1"', html)
    html = re.sub(r'title=([^\s>]+)(?=[\s>])', r'title="\1"', html)
    
    return html


def convert_block_images(content: str) -> str:
    """Convert ReadMe block images to Fern Frame syntax."""
    
    def parse_block_image(match) -> str:
        try:
            # Extract JSON content between [block:image] and [/block]
            json_str = match.group(1).strip()
            data = json.loads(json_str)
            
            if 'images' not in data or not data['images']:
                return match.group(0)  # Return original if no images
            
            # Get the first image (ReadMe block:image usually has one image)
            image_data = data['images'][0]
            
            if 'image' not in image_data or not image_data['image']:
                return match.group(0)  # Return original if no image URL
            
            # Extract URL from the image array [url, alt, title]
            image_array = image_data['image']
            url = image_array[0] if image_array and image_array[0] else ""
            alt_text = image_array[1] if len(image_array) > 1 and image_array[1] else "Image"
            
            if not url:
                return match.group(0)  # Return original if no URL
                
            return f'<Frame>\n  <img src="{url}" alt="{alt_text}"/>\n</Frame>'
            
        except (json.JSONDecodeError, KeyError, IndexError) as e:
            print(f"Warning: Failed to parse block image: {e}")
            return match.group(0)  # Return original content if parsing fails
    
    # Pattern to match [block:image] ... [/block] (both single-line and multi-line formats)
    pattern = r'^(\s*)\[block:image\]\s*\n?(.*?)\n?\s*\[/block\]'
    
    def replace_with_proper_indentation(match):
        leading_whitespace = match.group(1)  # Capture but don't use leading spaces
        json_content = match.group(2)
        
        # Parse the block image
        result = parse_block_image(type('Match', (), {'group': lambda self, x: json_content})())
        
        # Frames should start at column 0
        return result
    
    return re.sub(pattern, replace_with_proper_indentation, content, flags=re.DOTALL | re.MULTILINE)


def convert_images_to_frames(content: str) -> str:
    """Convert ![](url) to Fern Frame syntax."""
    
    def replace_image(match) -> str:
        alt_text = match.group(1) if match.group(1) else "Image"
        url = match.group(2)
        
        return f'<Frame>\n  <img src="{url}" alt="{alt_text}"/>\n</Frame>'
    
    # Pattern to match ![alt](url) - handles both empty alt and non-empty alt
    pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    
    return re.sub(pattern, replace_image, content)


def process_file(file_path: Path, dry_run: bool = False) -> bool:
    """Process a single markdown file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all conversions
        content = convert_block_parameters(content)
        content = convert_block_html(content)
        content = convert_block_images(content)
        content = convert_readme_variables(content)
        content = convert_doc_links(content)
        content = convert_images_to_frames(content)
        
        # Check if content changed
        if content != original_content:
            if dry_run:
                print(f"Would modify: {file_path}")
                return True
            else:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Modified: {file_path}")
                return True
        else:
            if not dry_run:
                print(f"No changes: {file_path}")
            return False
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def find_markdown_files(directory: Path) -> List[Path]:
    """Find all markdown files recursively."""
    markdown_files = []
    for file_path in directory.rglob("*.md"):
        markdown_files.append(file_path)
    return sorted(markdown_files)


def main():
    parser = argparse.ArgumentParser(
        description="Convert ReadMe syntax to Fern/markdown syntax"
    )
    parser.add_argument(
        "directory",
        type=Path,
        nargs='?',
        help="Directory to process (searches recursively for .md files)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be changed without making changes"
    )
    parser.add_argument(
        "--file",
        type=Path,
        help="Process a single file instead of a directory"
    )
    
    args = parser.parse_args()
    
    if args.file:
        if not args.file.exists():
            print(f"Error: File {args.file} does not exist")
            return 1
        
        process_file(args.file, args.dry_run)
        return 0
    
    if not args.directory:
        print("Error: Directory argument required when not using --file")
        return 1
        
    if not args.directory.exists():
        print(f"Error: Directory {args.directory} does not exist")
        return 1
    
    if not args.directory.is_dir():
        print(f"Error: {args.directory} is not a directory")
        return 1
    
    markdown_files = find_markdown_files(args.directory)
    
    if not markdown_files:
        print(f"No markdown files found in {args.directory}")
        return 0
    
    print(f"Found {len(markdown_files)} markdown files")
    
    if args.dry_run:
        print("\n--- DRY RUN MODE ---")
    
    modified_count = 0
    for file_path in markdown_files:
        if process_file(file_path, args.dry_run):
            modified_count += 1
    
    print(f"\nSummary: {modified_count} files {'would be' if args.dry_run else 'were'} modified")
    
    if args.dry_run and modified_count > 0:
        print("Run without --dry-run to apply changes")
    
    return 0


if __name__ == "__main__":
    exit(main()) 