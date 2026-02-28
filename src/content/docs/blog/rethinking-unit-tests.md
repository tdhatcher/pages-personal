---
title: Why I Stopped Writing Unit Tests for Everything
date: 2026-02-14
description: Unit tests have their place, but I've shifted toward integration tests for most business logic.
tags: [testing, architecture, dotnet]
---

Hot take: most unit tests I wrote 5 years ago were testing implementation details, not behavior. Integration tests would have caught the real bugs.

## The Problem with Isolation

```csharp
// This test passes even if the feature is completely broken
[Fact]
public async Task GetUser_CallsRepository()
{
    var mockRepo = new Mock<IUserRepository>();
    mockRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(new User());

    var handler = new GetUserHandler(mockRepo.Object);
    await handler.Handle(new GetUserQuery(1), CancellationToken.None);

    mockRepo.Verify(r => r.GetByIdAsync(1), Times.Once);
}
```

This test verifies that the handler *called the mock*, not that the feature *works*.

## What I Do Instead

```csharp
public class GetUserTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public GetUserTests(WebApplicationFactory<Program> factory)
        => _client = factory.CreateClient();

    [Fact]
    public async Task GetUser_ReturnsUser_WhenExists()
    {
        var response = await _client.GetAsync("/users/1");

        response.EnsureSuccessStatusCode();
        var user = await response.Content.ReadFromJsonAsync<UserDto>();
        Assert.NotNull(user);
    }
}
```

## My Current Rule

- **Unit tests** for pure logic: parsers, validators, calculators, domain rules
- **Integration tests** for everything that touches infrastructure
- **No mocking** of things you own — mock external HTTP APIs only

Less test code, more confidence.
