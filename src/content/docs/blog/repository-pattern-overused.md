---
title: The Repository Pattern is Overused — Here's What I Do Instead
date: 2026-01-31
description: The repository pattern adds a layer of abstraction that often provides no real value with EF Core.
tags: [dotnet, architecture, efcore]
---

I used to wrap every EF Core `DbContext` in a repository. I don't anymore. Here's why.

## The Problem

```csharp
// Classic repository — what does this actually add?
public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);
    Task<List<User>> GetAllAsync();
    Task AddAsync(User user);
    Task SaveChangesAsync();
}
```

EF Core's `DbContext` *is already a unit of work*. `DbSet<T>` *is already a repository*. You're abstracting an abstraction.

## What I Do Instead

Inject `DbContext` directly into handlers (I use MediatR):

```csharp
public class GetUserHandler : IRequestHandler<GetUserQuery, UserDto?>
{
    private readonly AppDbContext _db;

    public GetUserHandler(AppDbContext db) => _db = db;

    public async Task<UserDto?> Handle(GetUserQuery request, CancellationToken ct)
    {
        return await _db.Users
            .Where(u => u.Id == request.Id)
            .Select(u => new UserDto(u.Id, u.Name, u.Email))
            .FirstOrDefaultAsync(ct);
    }
}
```

## When Repositories Make Sense

- You're switching databases (rare in practice)
- You need to unit test without an in-memory database
- You're wrapping a non-EF data source (Dapper, external API)

Otherwise, keep it simple.
