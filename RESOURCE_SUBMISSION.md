# Resource Submission Guide

This document explains how to use the automated resource submission system for the freeForGeeks project.

## How It Works

The freeForGeeks project now features an automated system for submitting and adding new resources to the README.md file. Here's how it works:

1. Users fill out a structured GitHub Issue form to submit resources
2. A GitHub Action automatically processes approved submissions
3. The Action creates a Pull Request with the new resource added to README.md
4. The maintainer only needs to review and merge PRs instead of manual editing

## Submitting a Resource

To submit a new resource:

1. Go to the [Issues tab](https://github.com/JuanPabloDiaz/freeForGeeks/issues) of the repository
2. Click on "New Issue"
3. Select the "🚀 Resource Submission" template
4. Fill out all required fields:
   - Resource Name
   - Resource URL
   - Category
   - Subcategory
   - Description
   - Resource Type
   - Confirm it's completely free
5. Optionally fill out:
   - Tags (comma-separated)
   - GitHub Stars (if applicable)
   - GitHub URL (if applicable)
   - Additional Notes
6. Submit the issue

## What Happens Next

After submitting the issue:

1. The GitHub Action will automatically process your submission
2. It will validate the required fields and URL format
3. It will add the resource to the appropriate section in README.md
4. It will create a Pull Request with the changes
5. It will comment on your issue with a link to the PR
6. It will close the issue automatically

## Modifying Categories and Fields

To modify the available categories, subcategories, or fields in the submission form:

1. Edit `.github/ISSUE_TEMPLATE/resource-submission.yml` to change the form fields
2. Edit `.github/workflows/add-resource.yml` to update the processing logic

### Adding a New Category

To add a new category:

1. Add the category to the dropdown options in `.github/ISSUE_TEMPLATE/resource-submission.yml`
2. Add the category heading to README.md (e.g., `# New Category`)

### Adding a New Subcategory

To add a new subcategory:

1. Add the subcategory to the dropdown options in `.github/ISSUE_TEMPLATE/resource-submission.yml`

## Troubleshooting

Common issues and solutions:

### Issue: Submission Failed with "Category not found"

**Solution**: Make sure you selected a category that exactly matches one of the main headings in README.md.

### Issue: Submission Failed with "Invalid URL format"

**Solution**: Ensure the URL starts with `http://` or `https://` and is a valid URL.

### Issue: Duplicate Resource

**Solution**: The system checks for duplicate resources based on name and URL. If your resource is already in the README.md, your submission will be rejected.

## Manual Workflow Dispatch

For testing or manually processing an issue:

1. Go to the Actions tab in the repository
2. Select the "Add Resource" workflow
3. Click "Run workflow"
4. Enter the issue number you want to process
5. Click "Run workflow"

## For Maintainers

As a maintainer, you only need to:

1. Review the automatically created Pull Requests
2. Make any necessary adjustments
3. Merge the PR when satisfied

The system handles the rest, from validation to formatting and placement in the README.md file.
