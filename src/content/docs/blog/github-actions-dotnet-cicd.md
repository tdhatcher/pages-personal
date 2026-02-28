---
title: Using GitHub Actions for .NET CI/CD
date: 2026-02-07
description: A complete GitHub Actions workflow for building, testing, and publishing a .NET application.
tags: [devops, github-actions, dotnet]
---

Here's the GitHub Actions workflow I use as a starting point for most .NET projects.

## The Workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: 9.x

      - name: Restore
        run: dotnet restore

      - name: Build
        run: dotnet build --no-restore --configuration Release

      - name: Test
        run: dotnet test --no-build --configuration Release --logger trx

      - name: Publish test results
        uses: dorny/test-reporter@v1
        if: always()
        with:
          name: .NET Tests
          path: '**/*.trx'
          reporter: dotnet-trx
```

## What I Add for Deployments

- **Docker build + push** to Azure Container Registry
- **Azure Container Apps** deploy step using `azure/container-apps-deploy-action`
- **Environment secrets** via GitHub Environments for staging/prod separation

Keep your workflow files lean — one job per concern.
