---
title: "Multithreaded Job System"
description: "A lock-free, dependency-aware job system built in C++ to parallelize game engine simulation workloads across all hardware threads."
long_description: "A from-scratch C++ multithreaded job system at the core of The Long Century's engine — a lock-free ring-buffer queue, work-stealing thread pool, and atomic dependency counters that form a lightweight job DAG for parallelizing province simulation, AI evaluation, and render prep."
tags: ["C++", "Multithreading", "Engine", "Game Dev", "Systems"]
year: 2024
role: "Engine Programmer"
repo: ""
images: ["/assets/projects/engine-job-system.svg"]
specs:
  Language: "C++17"
  Concurrency: "Lock-free ring buffer, work stealing"
  Threads: "N-1 worker threads (hardware_concurrency)"
  Dependency model: "Atomic completion counters"
outcome: "Simulation workload parallelized across all cores with determinism preserved for lockstep multiplayer."
highlights:
  - "Designed a lock-free job queue using a fixed-size ring buffer with atomic head/tail pointers, eliminating mutex contention on the hot dispatch path"
  - "Implemented a thread pool with N-1 worker threads pinned to physical cores; work-stealing fallback prevents starvation when queues drain unevenly"
  - "Built a dependency graph for simulation phases — province economics, AI evaluation, and event processing run as parallel batches with happens-before edges enforced via atomic completion counters"
  - "Parallelized per-entity economic simulation by partitioning province data into cache-aligned SoA chunks; workers own their chunk with no shared writes, then a reduce pass merges aggregates"
  - "Decoupled render thread from simulation thread — render-prep batch is enqueued the moment the final simulation phase counter fires, with no blocking between threads"
  - "Maintained determinism under parallelism for lockstep multiplayer by enforcing canonical reduce order and strict IEEE 754 semantics across all worker paths"
draft: false
---

The Long Century's engine runs hundreds of province ticks, trade-network resolution, and multi-nation AI every game-turn. A single-threaded simulation becomes the bottleneck immediately. The job system was built to saturate all hardware threads without sacrificing the determinism that lockstep multiplayer requires.

## Architecture

The thread pool runs N-1 worker threads, leaving one core for OS scheduling and main-thread coordination. Each thread owns a fixed-size lock-free ring buffer — jobs are enqueued with an atomic write to the head pointer and dequeued with an atomic read from the tail. No mutexes on the dispatch path. When a thread's own queue empties, it steals from the tail of a sibling queue, keeping all cores busy without a centralized scheduler.

Dependency between phases is tracked with atomic completion counters. Each simulation phase (province economics, political events, AI evaluation, trade resolution) is a job batch. Workers atomically decrement a shared counter on completion; when it hits zero, the dependent batch is unblocked and enqueued. This forms a directed acyclic graph of work — lightweight, with no separate scheduler thread or heap allocation per edge.

## Simulation Partitioning

Province data is laid out in structure-of-arrays form, partitioned into cache-line-aligned chunks. A worker owns its chunk for the full economics tick and writes no shared state mid-pass. Cross-province dependencies (trade flows, migration) are accumulated into thread-local buffers and merged in a single reduce pass once the batch completes. This keeps the hot path free of cache coherence traffic between cores.

AI evaluation for each active nation is an independent job — nations share only read-only world state during evaluation, so the batch runs fully parallel with zero synchronization.

## Render/Simulation Decoupling

The render thread never blocks on simulation. Once the final simulation phase counter fires, a render-prep batch is enqueued: scene graph updates, draw call sorting, uniform buffer writes. The render thread consumes completed prep data without touching live simulation state — a clean producer-consumer boundary with no need to double-buffer entire simulation structures.

## Determinism Under Parallelism

Lockstep multiplayer requires bit-identical simulation output across all clients. The job system preserves this by running reduce merges in a fixed canonical order regardless of which physical thread executed each chunk, and by enforcing strict IEEE 754 semantics (no extended-precision registers, no cross-chunk FMA reordering). Work stealing affects which core runs a job, never the logical order of its effects on shared state.
