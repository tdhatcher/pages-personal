---
title: Running LLMs Locally with Ollama
date: 2026-02-20
description: Ollama makes running open-source models locally trivially easy. Here's my setup.
tags: [ai, ollama, tools]
---

Privacy concerns, cost, or just curiosity — there are good reasons to run models locally. Ollama makes it a one-liner.

## Install and Run

```bash
# Install Ollama (Windows/Mac/Linux)
# https://ollama.com/download

# Pull and run a model
ollama run llama3.2

# Pull without running
ollama pull mistral
ollama pull codellama
```

## Using the API

Ollama exposes an OpenAI-compatible API at `http://localhost:11434`:

```csharp
var client = new OpenAIClient(
    new ApiKeyCredential("ollama"),
    new OpenAIClientOptions { Endpoint = new Uri("http://localhost:11434/v1") }
);

var chat = client.GetChatClient("llama3.2");
var response = await chat.CompleteChatAsync("Explain async/await in C# in 2 sentences.");

Console.WriteLine(response.Value.Content[0].Text);
```

## Models Worth Trying

| Model | Best For | Size |
|-------|----------|------|
| `llama3.2` | General chat | 2GB |
| `codellama` | Code generation | 4GB |
| `mistral` | Reasoning | 4GB |
| `nomic-embed-text` | Embeddings | 274MB |

## My Use Case

I use `nomic-embed-text` for local RAG experiments — it's tiny, fast, and good enough for prototyping before switching to Azure OpenAI in production.
