---
title: Feature Flags Without a Framework — A Lightweight Approach
date: 2026-02-21
description: You don't always need LaunchDarkly. Here's a simple feature flag system built on .NET configuration.
tags: [dotnet, architecture, csharp]
---

Feature flags are powerful, but for many apps a full SaaS solution is overkill. Here's a lightweight approach using `IConfiguration`.

## The Model

```csharp
public class FeatureFlags
{
    public bool NewCheckoutFlow { get; init; }
    public bool DarkModeDefault { get; init; }
    public bool BetaSearch { get; init; }
}
```

## Registration

```csharp
builder.Services.Configure<FeatureFlags>(
    builder.Configuration.GetSection("FeatureFlags"));
```

## appsettings.json

```json
{
  "FeatureFlags": {
    "NewCheckoutFlow": true,
    "DarkModeDefault": false,
    "BetaSearch": false
  }
}
```

## Usage

```csharp
public class CheckoutController(IOptions<FeatureFlags> flags) : ControllerBase
{
    [HttpPost("checkout")]
    public IActionResult Checkout()
    {
        if (flags.Value.NewCheckoutFlow)
            return RedirectToAction("NewCheckout");

        return RedirectToAction("LegacyCheckout");
    }
}
```

## Enabling Per-Environment

In `appsettings.Production.json`:

```json
{
  "FeatureFlags": {
    "NewCheckoutFlow": false
  }
}
```

When you need user-targeting or gradual rollouts, graduate to a proper service. Until then, this is zero-dependency and works everywhere .NET configuration works — including Azure App Configuration.
