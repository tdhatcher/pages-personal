---
title: Minimal APIs in .NET 8 — Are They Ready for Production?
date: 2026-01-09
description: Exploring whether .NET 8 Minimal APIs are a viable replacement for controller-based APIs.
tags: [dotnet, api, csharp]
---

Minimal APIs landed in .NET 6, but .NET 8 is where they really matured. Let's look at whether they're ready to replace traditional controllers.

## The Basics

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/users/{id}", async (int id, IUserService svc) =>
{
    var user = await svc.GetByIdAsync(id);
    return user is null ? Results.NotFound() : Results.Ok(user);
});

app.Run();
```

## What I Like

- **Less boilerplate** — no controller classes, no `[ApiController]` attributes
- **Explicit routing** — you see all routes in one place
- **Native AOT friendly** — great for containerized microservices

## What I Miss

- Route grouping gets verbose in large apps
- No built-in action filters (use middleware instead)

## Verdict

For microservices and smaller APIs: **yes, absolutely**. For large monolithic APIs with complex authorization pipelines: stick with controllers for now.
