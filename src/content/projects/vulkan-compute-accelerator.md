---
title: "Vulkan Compute Accelerator"
description: "Flowgraph-based Vulkan 1.2 orchestrator with multi-queue dispatch and sparse memory management for composable compute pipelines."
long_description: "Implemented a Vulkan 1.2 compute pipeline orchestrator using a flowgraph model, enabling composable and reusable shader pipeline construction with multi-queue dispatch, sparse memory management, and fine-grained synchronization."
tags: ["Vulkan", "Compute", "C++", "GPU"]
year: 2023
role: "Compute Systems Engineer"
repo: ""
images: ["/assets/projects/vulkan-accelerator.svg"]
specs:
  API: "Vulkan 1.2"
  Architecture: "Multi-queue, sparse memory"
  Pattern: "Flowgraph abstraction"
outcome: "Measurable GPU throughput improvements through careful synchronization design and queue utilization."
highlights:
  - "Implemented a Vulkan 1.2 compute pipeline orchestrator using a flowgraph model, enabling composable and reusable shader pipeline construction"
  - "Designed multi-queue dispatch system with batching optimization and sparse memory management"
  - "Achieved measurable GPU throughput improvements through careful synchronization design and queue utilization"
draft: false
---

A Vulkan 1.2 compute orchestrator that runs flows of prewritten compute shaders as composable pipelines. The core abstraction is a flowgraph: nodes represent shader dispatches, edges define data dependencies, and the scheduler resolves execution order and resource hazards automatically.

Multi-queue dispatch allows independent shader stages to run concurrently across compute queues. Sparse memory support reduces VRAM overhead for large intermediate buffers. Synchronization uses Vulkan timeline semaphores for fine-grained pipeline dependencies without over-synchronization — the system can express complex multi-stage compute workloads without manual barrier insertion per shader.
