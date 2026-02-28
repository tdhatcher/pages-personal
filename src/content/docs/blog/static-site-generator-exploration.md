---
title: Comparing Static Site Generators for Documentation
description: My exploration of MkDocs, Docusaurus, and Astro + Starlight
date: 2026-02-28
prev: false
next: false
tableOfContents: false
---

Today I decided to investigate the landscape of documentation site generators. Specifically, I wanted to understand the tradeoffs between three popular options: **MkDocs**, **Docusaurus**, and **Astro + Starlight**.

## The Contenders

### MkDocs
- **Pros**: Simplest to set up, Python-based, Markdown-first
- **Cons**: Less modern UI, limited customization

### Docusaurus  
- **Pros**: React-based, great features (versioning, blog support), GitHub Pages friendly
- **Cons**: Heavier, steeper learning curve

### Astro + Starlight
- **Pros**: Modern, fast, excellent for multi-language, GitHub Pages ready
- **Cons**: Requires Node.js

## Real-World Examples

I found some interesting examples in the wild:
- **Goose docs** (by Block) use **Docusaurus** (block.github.io/goose)
- **Aspire docs** (by Microsoft) use **Astro + Starlight** with 15+ languages
- **Plotly**, **Siemens**, and **DataRobot** all use **MkDocs** successfully

## My Choice

For this site, I chose **Astro + Starlight** because:
1. I wanted a modern tech stack
2. Good balance between simplicity and features
3. Fast build times
4. Excellent Markdown support with blog capabilities

More on this as I continue building!
