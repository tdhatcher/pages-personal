---
title: Semantic Kernel — Microsoft's Framework for AI-Powered Apps
date: 2026-01-27
description: Semantic Kernel bridges the gap between LLMs and your existing .NET code. Here's a practical look.
tags: [ai, dotnet, semantic-kernel]
---

Semantic Kernel is Microsoft's SDK for integrating LLMs into .NET (and Python) applications. It's grown significantly and is worth a serious look.

## Core Concepts

- **Kernel** — the central orchestrator
- **Plugins** — groups of functions (native or semantic) the AI can call
- **Planner** — lets the AI decide which functions to call and in what order

## A Simple Example

```csharp
var builder = Kernel.CreateBuilder();
builder.AddAzureOpenAIChatCompletion(
    deploymentName: "gpt-4o",
    endpoint: "https://my-instance.openai.azure.com/",
    apiKey: Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY")!
);

var kernel = builder.Build();

var result = await kernel.InvokePromptAsync(
    "Summarize this in one sentence: {{$input}}",
    new KernelArguments { ["input"] = longText }
);

Console.WriteLine(result);
```

## Native Functions as Plugins

```csharp
[KernelFunction, Description("Get the current weather for a city")]
public async Task<string> GetWeatherAsync(string city)
{
    return await _weatherService.GetAsync(city);
}
```

The AI can now call your weather function as part of answering a user query. That's the power of function calling.
