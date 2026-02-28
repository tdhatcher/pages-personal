---
title: EF Core Performance Pitfalls and How to Fix Them
date: 2026-02-19
description: The most common EF Core performance issues I see in code reviews, and the fixes.
tags: [dotnet, efcore, performance]
---

EF Core makes database access easy — sometimes too easy. Here are the patterns that kill performance.

## Pitfall 1: N+1 Queries

```csharp
// ❌ Executes 1 + N queries
var orders = await _db.Orders.ToListAsync();
foreach (var order in orders)
{
    Console.WriteLine(order.Customer.Name); // lazy loads each customer
}

// ✅ Single query with join
var orders = await _db.Orders
    .Include(o => o.Customer)
    .ToListAsync();
```

## Pitfall 2: Loading More Than You Need

```csharp
// ❌ Loads entire entity graph
var users = await _db.Users.ToListAsync();

// ✅ Project only what you need
var names = await _db.Users
    .Select(u => new { u.Id, u.Name })
    .ToListAsync();
```

## Pitfall 3: Filtering in Memory

```csharp
// ❌ Loads all records, filters in C#
var active = (await _db.Users.ToListAsync())
    .Where(u => u.IsActive);

// ✅ Filters in SQL
var active = await _db.Users
    .Where(u => u.IsActive)
    .ToListAsync();
```

## Pitfall 4: Missing AsNoTracking

```csharp
// ❌ Change tracking overhead for read-only queries
var users = await _db.Users.ToListAsync();

// ✅ No change tracking for read-only
var users = await _db.Users.AsNoTracking().ToListAsync();
```

Enable `MiniProfiler` or log SQL with `LogTo(Console.WriteLine)` to catch these early.
