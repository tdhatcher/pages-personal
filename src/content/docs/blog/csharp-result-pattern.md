---
title: Mastering the C# Result Pattern
date: 2026-02-22
description: Exceptions are for exceptional cases. The Result pattern makes error handling explicit and composable.
tags: [csharp, dotnet, architecture]
---

Throwing exceptions for expected failure cases (like "user not found") is an antipattern. The Result pattern makes failures first-class.

## A Simple Result Type

```csharp
public readonly struct Result<T>
{
    public T? Value { get; }
    public string? Error { get; }
    public bool IsSuccess { get; }

    private Result(T value) { Value = value; IsSuccess = true; }
    private Result(string error) { Error = error; IsSuccess = false; }

    public static Result<T> Ok(T value) => new(value);
    public static Result<T> Fail(string error) => new(error);
}
```

## Usage

```csharp
public async Task<Result<User>> GetUserAsync(int id)
{
    var user = await _db.Users.FindAsync(id);
    return user is null
        ? Result<User>.Fail($"User {id} not found")
        : Result<User>.Ok(user);
}

// At the call site
var result = await GetUserAsync(42);
if (!result.IsSuccess)
    return NotFound(result.Error);

return Ok(result.Value);
```

## Pattern Matching

```csharp
return await GetUserAsync(id) switch
{
    { IsSuccess: true, Value: var user } => Ok(user),
    { Error: var error } => NotFound(error)
};
```

## Libraries to Consider

- **FluentResults** — rich result type with multiple errors
- **ErrorOr** — discriminated union style
- **OneOf** — full union types for C#

Start simple, reach for a library when you need structured error types.
