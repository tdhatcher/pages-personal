---
title: Vector Search with Azure AI Search and .NET
date: 2026-02-12
description: Adding semantic search to your app using embeddings and Azure AI Search.
tags: [ai, azure, dotnet]
---

Keyword search breaks down when users don't know the exact terms. Vector search finds semantically similar results even when the words don't match.

## The Concept

1. Convert text to an embedding (a numeric vector) using an AI model
2. Store vectors alongside your documents
3. At query time, convert the search query to a vector
4. Find the nearest vectors in the index

## Generating Embeddings

```csharp
var client = new AzureOpenAIClient(
    new Uri(endpoint),
    new AzureKeyCredential(apiKey));

var embeddingClient = client.GetEmbeddingClient("text-embedding-3-small");

var result = await embeddingClient.GenerateEmbeddingAsync(text);
float[] vector = result.Value.ToFloats().ToArray();
```

## Uploading to Azure AI Search

```csharp
var doc = new SearchDocument
{
    ["id"] = Guid.NewGuid().ToString(),
    ["content"] = text,
    ["contentVector"] = vector
};

await searchClient.UploadDocumentsAsync(new[] { doc });
```

## Querying

```csharp
var options = new SearchOptions
{
    VectorSearch = new VectorSearchOptions
    {
        Queries = { new VectorizedQuery(queryVector) { KNearestNeighborsCount = 5, Fields = { "contentVector" } } }
    }
};

var results = await searchClient.SearchAsync<SearchDocument>("*", options);
```

Combine with a reranker and you get results that feel almost magical to users.
