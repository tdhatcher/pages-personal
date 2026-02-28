---
title: Azure Container Apps vs Azure Kubernetes Service — Choosing the Right Fit
date: 2026-01-22
description: Not every workload needs Kubernetes. Here's my decision framework for ACA vs AKS.
tags: [azure, containers, architecture]
---

When people hear "containers on Azure" they jump to AKS. But Azure Container Apps covers 80% of use cases with 20% of the operational overhead.

## When to Use ACA

- Microservices with event-driven scaling (KEDA built-in)
- Teams without dedicated platform/infra engineers
- Apps that scale to zero (cost savings)

```bash
az containerapp create \
  --name my-api \
  --resource-group my-rg \
  --environment my-env \
  --image myregistry.azurecr.io/my-api:latest \
  --target-port 8080 \
  --ingress external \
  --min-replicas 0 \
  --max-replicas 10
```

## When to Use AKS

- Complex networking requirements (custom CNI, service mesh)
- Stateful workloads needing persistent volumes
- Workloads that need custom admission controllers
- Teams that already have Kubernetes expertise

## My Rule of Thumb

> Start with ACA. Migrate to AKS when you hit a wall.

Most teams never hit that wall.
