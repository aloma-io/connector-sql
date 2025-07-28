# Migration to Reusable Workflow

This repository has been migrated to use the organization-wide reusable Docker workflow.

## Changes Made

- Replaced local workflow with call to `aloma-io/.github/.github/workflows/docker-build-push.yml@main`
- Configuration: 
  - Image name: `connector-sql`
  - Dockerfile: `Containerfile`
  - Context: `.`
- Backed up previous workflows to `.github/workflows.backup/`

## Benefits

- Centralized maintenance
- Consistent behavior across repositories  
- Automatic updates when the central workflow is improved
- Simplified configuration
- Docker build caching support
- Parallel pushes to Azure and Google registries

## Documentation

See: https://github.com/aloma-io/.github/blob/main/REUSABLE_WORKFLOWS.md

Migration performed on: Mon Jul 28 16:06:57 -03 2025
