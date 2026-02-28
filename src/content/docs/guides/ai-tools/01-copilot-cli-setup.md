---
title: Setting Up GitHub Copilot CLI
description: A practical guide to installing and configuring GitHub Copilot CLI for daily use.
---

GitHub Copilot CLI brings AI assistance directly into your terminal — explaining commands, translating intent into shell commands, and suggesting fixes.

## Installation

```bash
npm install -g @github/copilot-cli
github-copilot-cli auth
```

## Core Commands

| Command | Alias | Purpose |
|---------|-------|---------|
| `github-copilot-cli what-the-shell` | `??` | Translate plain English into a shell command |
| `github-copilot-cli git-assist` | `git?` | Help with git commands |
| `github-copilot-cli gh-assist` | `gh?` | Help with GitHub CLI commands |

## Example Usage

```bash
# Describe what you want
?? "find all files larger than 100MB modified in the last 7 days"

# Copilot suggests:
find . -size +100M -mtime -7
```

## Shell Aliases

Add these to your profile for the short aliases to work:

```powershell
# PowerShell ($PROFILE)
function ?? { github-copilot-cli what-the-shell $args }
function git? { github-copilot-cli git-assist $args }
function gh? { github-copilot-cli gh-assist $args }
```

## Tips

- Be conversational — "list all docker containers that are stopped" works better than terse queries
- Use `git?` before running destructive git operations to double-check the command
- Combine with your shell history for explaining commands you didn't write
