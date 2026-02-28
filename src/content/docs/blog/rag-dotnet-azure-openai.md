---
title: Building RAG Applications with .NET and Azure OpenAI
date: 2026-02-25
description: Retrieval-Augmented Generation lets you chat with your own data. Here's the architecture and .NET implementation.
tags: [ai, azure, dotnet, rag]
---

RAG (Retrieval-Augmented Generation) grounds an LLM's responses in your actual data. Instead of the model guessing, it retrieves relevant context first.

## The Architecture

```
User Query
    │
    ▼
[Embed Query] ──► [Vector Search] ──► Top K Documents
                                           │
                                           ▼
                              [LLM Prompt = Query + Context]
                                           │
                                           ▼
                                      Grounded Answer
```

## Implementation

```csharp
public class RagService(
    AzureOpenAIClient openAiClient,
    SearchClient searchClient)
{
    public async Task<string> AskAsync(string question)
    {
        // 1. Embed the question
        var embedder = openAiClient.GetEmbeddingClient("text-embedding-3-small");
        var embedding = await embedder.GenerateEmbeddingAsync(question);
        var queryVector = embedding.Value.ToFloats().ToArray();

        // 2. Retrieve relevant chunks
        var searchOptions = new SearchOptions
        {
            VectorSearch = new VectorSearchOptions
            {
                Queries = { new VectorizedQuery(queryVector)
                    { KNearestNeighborsCount = 3, Fields = { "contentVector" } } }
            },
            Select = { "content" }
        };

        var results = await searchClient.SearchAsync<SearchDocument>("*", searchOptions);
        var context = string.Join("\n\n", results.Value.GetResults()
            .Select(r => r.Document["content"]?.ToString()));

        // 3. Ask the LLM with context
        var chat = openAiClient.GetChatClient("gpt-4o");
        var response = await chat.CompleteChatAsync([
            new SystemChatMessage("Answer using only the provided context."),
            new UserChatMessage($"Context:\n{context}\n\nQuestion: {question}")
        ]);

        return response.Value.Content[0].Text;
    }
}
```

Chunk size and overlap are the biggest tuning levers — start with 512 tokens and 10% overlap.
