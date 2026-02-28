---
title: Why I Switched from REST to gRPC for Internal Services
date: 2026-01-13
description: After years of REST, I moved internal service communication to gRPC. Here's what changed.
tags: [dotnet, grpc, architecture]
---

Internal service communication doesn't need human-readable JSON. gRPC gives you typed contracts, streaming, and serious performance gains.

## Defining a Service

```protobuf
syntax = "proto3";

service OrderService {
  rpc GetOrder (GetOrderRequest) returns (Order);
  rpc StreamOrders (StreamOrdersRequest) returns (stream Order);
}

message GetOrderRequest {
  int32 order_id = 1;
}

message Order {
  int32 id = 1;
  string customer = 2;
  double total = 3;
}
```

## The .NET Client

```csharp
var channel = GrpcChannel.ForAddress("https://order-service");
var client = new OrderService.OrderServiceClient(channel);

var order = await client.GetOrderAsync(new GetOrderRequest { OrderId = 42 });
Console.WriteLine($"Order total: {order.Total}");
```

## Results

- **~60% reduction** in payload size vs JSON
- **Strongly typed** contracts catch breaking changes at compile time
- **Streaming** makes real-time feeds trivial

The main downside: browser clients need grpc-web. For internal services though, it's a no-brainer.
