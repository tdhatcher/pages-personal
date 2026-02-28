---
title: Exploring .NET Aspire for Local Development
date: 2026-02-16
description: .NET Aspire promises to solve the "it works on my machine" problem for distributed apps.
tags: [dotnet, aspire, devops]
---

Running a distributed app locally used to mean juggling docker-compose files, environment variables, and prayer. .NET Aspire changes that.

## What Is It?

Aspire is an opinionated stack for building observable, distributed .NET apps. The key piece for local dev is the **App Host** — a project that orchestrates all your services.

## App Host Setup

```csharp
var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("db")
    .WithPgAdmin();

var redis = builder.AddRedis("cache");

var api = builder.AddProject<Projects.MyApp_Api>("api")
    .WithReference(postgres)
    .WithReference(redis);

builder.AddProject<Projects.MyApp_Web>("web")
    .WithReference(api);

builder.Build().Run();
```

## The Dashboard

Running the app host launches a local dashboard at `http://localhost:15888` showing:
- All running services and their health
- Structured logs from every service
- Distributed traces (OpenTelemetry built in)
- Environment variables and connection strings

## My Take

For new projects: use Aspire from day one. For existing projects: the migration is worth it if you have more than 3 services. The local dashboard alone saves hours per week.
