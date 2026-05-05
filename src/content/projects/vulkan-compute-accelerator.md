---
title: "Vulkan Compute Accelerator"
description: "A Vulkan-based compute orchestrator that runs flows of prewritten compute shaders via a flowgraph."
long_description: "Implemented a Vulkan compute accelerator to orchestrate compute shader tasks using a flowgraph abstraction. The project handled synchronization, memory management, and batching across multiple queues for high-throughput compute workloads."
tags: ["Vulkan", "Compute", "C++", "GPU"]
year: 2023
role: "Compute Systems Engineer"
repo: ""
images: ["/assets/vulkan-accelerator.svg"]
specs:
  API: "Vulkan 1.2"
  Features: "Multi-queue, sparse memory"
  Use: "Batch shader workflow"
outcome: "Achieved efficient multi-shader orchestration and demonstrable throughput gains."
highlights:
  - "Implemented Vulkan 1.2 compute orchestrator with multi-queue support"
  - "Designed flowgraph abstraction for composable shader pipelines"
  - "Managed GPU synchronization, sparse memory, and batching optimization"
  - "Achieved efficient multi-shader orchestration with demonstrable throughput gains"
  - "Enabled high-throughput compute workload processing"
draft: false
---

A Vulkan 1.2 compute orchestrator designed to run flows of prewritten compute shaders as composable pipelines. The core abstraction is a flowgraph — nodes represent shader dispatches, edges define data dependencies, and the scheduler resolves execution order and resource hazards.

Multi-queue dispatch allows independent shader stages to run concurrently across compute queues. Sparse memory support reduces VRAM overhead for large intermediate buffers. Synchronization uses Vulkan timeline semaphores for fine-grained pipeline dependencies without over-synchronization.
