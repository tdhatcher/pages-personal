---
title: .NET Project Structure That Scales
description: A practical folder and project structure for .NET solutions that stays clean as the codebase grows.
---

The default `dotnet new` template gives you one project. Here's how to structure a solution that can grow without becoming a mess.

## Solution Layout

```
MyApp/
├── MyApp.sln
├── src/
│   ├── MyApp.Api/          # ASP.NET Core entry point
│   ├── MyApp.Application/  # Use cases, commands, queries (MediatR)
│   ├── MyApp.Domain/       # Entities, value objects, domain logic
│   └── MyApp.Infrastructure/ # EF Core, external services, repos
└── tests/
    ├── MyApp.UnitTests/
    └── MyApp.IntegrationTests/
```

## Creating the Structure

```bash
dotnet new sln -n MyApp
dotnet new webapi -n MyApp.Api -o src/MyApp.Api
dotnet new classlib -n MyApp.Application -o src/MyApp.Application
dotnet new classlib -n MyApp.Domain -o src/MyApp.Domain
dotnet new classlib -n MyApp.Infrastructure -o src/MyApp.Infrastructure

dotnet sln add src/MyApp.Api
dotnet sln add src/MyApp.Application
dotnet sln add src/MyApp.Domain
dotnet sln add src/MyApp.Infrastructure

# Wire up references
dotnet add src/MyApp.Api reference src/MyApp.Application
dotnet add src/MyApp.Application reference src/MyApp.Domain
dotnet add src/MyApp.Infrastructure reference src/MyApp.Application
dotnet add src/MyApp.Api reference src/MyApp.Infrastructure
```

## Dependency Rule

```
Api → Application → Domain
Infrastructure → Application
```

Domain has **zero** project references. Application references only Domain. This keeps business logic free of framework concerns.

## Directory.Build.props

Add a `Directory.Build.props` at the solution root to share settings across all projects:

```xml
<Project>
  <PropertyGroup>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
    <LangVersion>latest</LangVersion>
  </PropertyGroup>
</Project>
```
