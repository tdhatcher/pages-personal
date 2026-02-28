---
title: Building a CLI Tool with System.CommandLine
date: 2026-01-18
description: System.CommandLine is Microsoft's answer to building rich, testable CLI tools in .NET.
tags: [dotnet, cli, csharp]
---

`System.CommandLine` is still technically in beta but it's been stable enough for production use for a while. Here's how to build a proper CLI with it.

## Setup

```bash
dotnet add package System.CommandLine
```

## Defining Commands

```csharp
var fileOption = new Option<FileInfo>("--file", "The file to process") { IsRequired = true };
var verboseOption = new Option<bool>("--verbose", "Enable verbose output");

var rootCommand = new RootCommand("My file processor tool");
rootCommand.AddOption(fileOption);
rootCommand.AddOption(verboseOption);

rootCommand.SetHandler(async (file, verbose) =>
{
    if (verbose) Console.WriteLine($"Processing: {file.FullName}");
    await ProcessFileAsync(file);
}, fileOption, verboseOption);

await rootCommand.InvokeAsync(args);
```

## Why Not Spectre.Console?

Spectre is great for rich terminal UI. `System.CommandLine` is better for testable, structured command hierarchies. I use both — System.CommandLine for the command model, Spectre for the output rendering.
