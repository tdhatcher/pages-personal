---
title: Using Ollama for Local AI Development
description: How to run open-source LLMs locally with Ollama for private, cost-free AI development.
---

Ollama runs LLMs locally on your machine — no API keys, no usage costs, no data leaving your network. Essential for prototyping and privacy-sensitive work.

## Installation

Download from [ollama.com](https://ollama.com/download) or via winget:

```powershell
winget install Ollama.Ollama
```

## Running Models

```bash
# Pull and run interactively
ollama run llama3.2

# Pull without running
ollama pull mistral
ollama pull nomic-embed-text   # for embeddings

# List installed models
ollama list
```

## Recommended Models by Use Case

| Use Case | Model | Size |
|----------|-------|------|
| General chat | `llama3.2` | 2GB |
| Code generation | `codellama` | 4GB |
| Reasoning | `mistral` | 4GB |
| Embeddings | `nomic-embed-text` | 274MB |
| Fast/lightweight | `phi3:mini` | 2GB |

## Using the OpenAI-Compatible API

Ollama exposes a local API at `http://localhost:11434` that is compatible with the OpenAI SDK:

```csharp
using OpenAI;

var client = new OpenAIClient(
    new ApiKeyCredential("ollama"),
    new OpenAIClientOptions
    {
        Endpoint = new Uri("http://localhost:11434/v1")
    });

var chat = client.GetChatClient("llama3.2");
var response = await chat.CompleteChatAsync("What is the Result pattern in C#?");
Console.WriteLine(response.Value.Content[0].Text);
```

## Keeping Models Updated

```bash
# Update all installed models
ollama list | tail -n +2 | awk '{print $1}' | xargs -I {} ollama pull {}
```
