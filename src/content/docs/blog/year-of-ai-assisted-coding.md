---
title: What I Learned From a Year of Daily AI-Assisted Coding
date: 2026-02-27
description: Reflections on how AI tools have changed my development practice — what's better, what's worse, and what surprised me.
tags: [ai, copilot, productivity]
---

A year ago I committed to using AI coding tools every day. Here's an honest assessment.

## What Got Better

**Speed on familiar ground** — Boilerplate I've written a hundred times (DI registration, controller scaffolding, test setup) now takes seconds. Copilot knows what comes next better than my fingers do.

**Exploring unfamiliar APIs** — Instead of reading docs for 20 minutes, I write a comment describing intent and iterate on the suggestion. I still read the docs, but after I have working code.

```csharp
// Create a Polly retry policy that retries 3 times with exponential backoff
// starting at 1 second, only on HttpRequestException and 5xx responses
var retryPolicy = ...  // Copilot fills this in accurately
```

## What Got Worse

**My recall of syntax** — I've noticed I'm slower without AI assistance than I was before. Muscle memory for rarely-used APIs has atrophied.

**Over-trusting suggestions** — Early on I accepted suggestions too quickly. A subtle bug from an accepted suggestion cost me 3 hours once. I'm more deliberate now.

## What Surprised Me

**The biggest gains are in non-code tasks** — Writing commit messages, PR descriptions, technical docs, email drafts. These feel less glamorous than code generation but they compound.

## My Recommendation

Use AI tools. But don't let them replace understanding — let them accelerate it. Read the code before you accept it. Ask it to explain things you don't understand. It's a learning multiplier when used intentionally.
