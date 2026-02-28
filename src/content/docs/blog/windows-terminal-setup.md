---
title: My Terminal Setup for Windows Development
date: 2026-02-23
description: The tools and config that make my Windows terminal feel like a proper dev environment.
tags: [tools, terminal, productivity]
---

Windows Terminal + a few tools transforms the PowerShell experience into something genuinely enjoyable.

## The Stack

- **Windows Terminal** — tabbed, GPU-accelerated, fully customizable
- **Oh My Posh** — prompt themes with git status, language versions, exit codes
- **Nerd Fonts** — required for Oh My Posh icons (`CaskaydiaCove NF` is my pick)
- **zoxide** — smarter `cd` that learns your directories
- **fzf** — fuzzy finder for history and files

## Installation

```powershell
# Oh My Posh
winget install JanDeDobbeleer.OhMyPosh

# zoxide
winget install ajeetdsouza.zoxide

# fzf
winget install junegunn.fzf
```

## PowerShell Profile

```powershell
# $PROFILE
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\catppuccin_mocha.omp.json" | Invoke-Expression

Invoke-Expression (& { (zoxide init powershell | Out-String) })

# Fuzzy history search with Ctrl+R
Set-PSReadLineKeyHandler -Key Ctrl+r -ScriptBlock {
    $command = Get-Content (Get-PSReadlineOption).HistorySavePath |
        fzf --tac --no-sort
    if ($command) {
        [Microsoft.PowerShell.PSConsoleReadLine]::Insert($command)
    }
}
```

## The One Setting That Changes Everything

In Windows Terminal settings, set your default font to `CaskaydiaCove Nerd Font` and the Oh My Posh icons render correctly. Everything else is optional.
