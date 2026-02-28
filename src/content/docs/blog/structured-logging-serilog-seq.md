---
title: Structured Logging with Serilog and Seq
date: 2026-02-04
description: Switching from Console.WriteLine to structured logging changed how I debug production issues.
tags: [dotnet, logging, devops]
---

Unstructured logs are a wall of text. Structured logs are queryable data. Here's how I set up Serilog with Seq.

## Setup

```bash
dotnet add package Serilog.AspNetCore
dotnet add package Serilog.Sinks.Seq
```

## Configuration

```csharp
builder.Host.UseSerilog((ctx, config) =>
{
    config
        .ReadFrom.Configuration(ctx.Configuration)
        .Enrich.FromLogContext()
        .Enrich.WithMachineName()
        .WriteTo.Console(new JsonFormatter())
        .WriteTo.Seq("http://localhost:5341");
});
```

## Structured vs Unstructured

```csharp
// ❌ Unstructured — can't query by OrderId
_logger.LogInformation($"Order {orderId} processed for customer {customerId}");

// ✅ Structured — Seq can filter by OrderId or CustomerId
_logger.LogInformation(
    "Order {OrderId} processed for customer {CustomerId}",
    orderId, customerId);
```

## Running Seq Locally

```bash
docker run -d --name seq -e ACCEPT_EULA=Y -p 5341:5341 -p 8081:80 datalust/seq
```

Then open `http://localhost:8081` for the Seq UI. You'll never go back to grepping log files.
