---
title: Getting Started with GitHub Copilot in VS Code
date: 2026-01-05
description: A practical introduction to GitHub Copilot and how it changes the way I write code daily.
tags: [ai, copilot, vscode]
---

After a few weeks of using GitHub Copilot daily, my workflow has fundamentally shifted. Here's how to get the most out of it from day one.

## Installation

Install the **GitHub Copilot** extension in VS Code, then sign in with your GitHub account. That's it — no configuration needed.

## Writing Better Prompts

The quality of suggestions depends heavily on context. A well-named function with a descriptive comment goes a long way.

```csharp
// Parse a JWT token and return the claims as a dictionary
public static Dictionary<string, string> ParseJwtClaims(string token)
{
    // Copilot will suggest the full implementation here
}
```

## Tips

- **Keep files focused** — Copilot uses open tabs as context
- **Write the comment first**, then let Copilot write the code
- **Accept partially** with `Ctrl+Right` to accept word by word

It's not perfect, but it's the best pair programmer I've ever had.
