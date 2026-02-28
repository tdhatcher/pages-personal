---
title: Source Generators in C# — Practical Use Cases
date: 2026-02-10
description: Source generators sound complex but solving real problems with them is surprisingly approachable.
tags: [csharp, dotnet, source-generators]
---

Source generators run at compile time and add code to your project automatically. Here's where they actually add value.

## The Classic Problem: Boilerplate Mapping

Instead of maintaining hand-written mapping code, a generator can produce it from attributes:

```csharp
[GenerateMapper]
public partial class UserMapper
{
    // Generator fills in:
    // public static UserDto ToDto(User user) => new(...);
    // public static User FromDto(UserDto dto) => new(...);
}
```

## Writing a Simple Generator

```csharp
[Generator]
public class HelloGenerator : IIncrementalGenerator
{
    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        context.RegisterPostInitializationOutput(ctx =>
        {
            ctx.AddSource("HelloWorld.g.cs", """
                namespace Generated
                {
                    public static class Hello
                    {
                        public static string World() => "Hello, World!";
                    }
                }
                """);
        });
    }
}
```

## Real-World Libraries That Use Them

- **System.Text.Json** — `[JsonSerializable]` for AOT-safe serialization
- **Refit** — generates HTTP client implementations
- **Mediator** — generates MediatR-compatible dispatchers with zero reflection

The key insight: generators replace reflection with compile-time code. Faster startup, AOT compatible, and errors at compile time instead of runtime.
