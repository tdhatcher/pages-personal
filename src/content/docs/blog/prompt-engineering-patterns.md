---
title: Prompt Engineering Patterns I Actually Use
date: 2026-02-18
description: Moving beyond "write me a function" to prompts that consistently produce good results.
tags: [ai, copilot, prompt-engineering]
---

Most prompt engineering advice is vague. Here are the patterns I use every day that produce reliably good results.

## Pattern 1: Role + Task + Constraints

```
You are a senior .NET developer.
Refactor the following method to use the Result pattern instead of throwing exceptions.
Constraints: don't change the method signature, keep it synchronous.

[paste code]
```

## Pattern 2: Few-Shot Examples

Instead of explaining what you want, show it:

```
Convert these TypeScript interfaces to C# records.

Input:
interface User { id: number; name: string; }

Output:
public record User(int Id, string Name);

Now convert:
interface Product { id: number; title: string; price: number; inStock: boolean; }
```

## Pattern 3: Chain of Thought for Reviews

```
Review this code for:
1. Security issues (SQL injection, auth bypasses)
2. Performance problems (N+1 queries, missing indexes)
3. Missing error handling

Think through each category separately before giving your final assessment.

[paste code]
```

## Pattern 4: Iterative Refinement

Don't try to get it perfect in one shot. Start broad, then narrow:

1. "Write a basic implementation of X"
2. "Now add error handling"
3. "Now make it async"
4. "Now add XML documentation comments"

Each step is focused — and you can reject any step without losing the whole thing.
