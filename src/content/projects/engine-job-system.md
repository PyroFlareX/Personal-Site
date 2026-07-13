---
title: "Multithreaded Job System"
description: "Lock-free, dependency-aware job system in C++ that parallelizes game engine simulation workloads across all hardware threads."
long_description: "C++ multithreaded job system at the core of The Long Century's engine. Lock-free ring-buffer queue, work-stealing thread pool, and atomic dependency counters form a lightweight job DAG for parallelizing province simulation, AI evaluation, and render prep."
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
  - "Lock-free job queue on a fixed-size ring buffer with atomic head/tail pointers; no mutex on the hot dispatch path"
  - "Thread pool runs N-1 worker threads pinned to physical cores; work-stealing fallback keeps queues from draining unevenly"
  - "Simulation phases (province economics, AI evaluation, event processing) run as parallel batches; happens-before edges between phases are enforced via atomic completion counters"
  - "Province data in SoA layout, partitioned into cache-aligned chunks; each worker owns its chunk with no shared writes, then a reduce pass merges aggregates"
  - "Render-prep batch fires the moment the final simulation phase counter hits zero, with no blocking between the render and simulation threads"
  - "Determinism for lockstep multiplayer is preserved by running reduce merges in a fixed canonical order and enforcing strict IEEE 754 semantics across all worker paths"
draft: false
---

The Long Century's engine runs hundreds of province ticks, trade-network resolution, and multi-nation AI every game-turn. A single-threaded simulation hits the bottleneck almost immediately. The job system saturates all hardware threads without giving up the determinism that lockstep multiplayer requires.

## Architecture

The thread pool runs N-1 worker threads, leaving one core for OS scheduling and main-thread coordination. Each thread owns a fixed-size lock-free ring buffer. Jobs are enqueued with an atomic write to the head pointer and dequeued with an atomic read from the tail. No mutexes on the dispatch path. When a thread's queue empties, it steals from the tail of a sibling queue, keeping all cores busy without a centralized scheduler.

Dependency between phases is tracked with atomic completion counters. Each simulation phase (province economics, political events, AI evaluation, trade resolution) is a job batch. Workers atomically decrement a shared counter on completion; when it hits zero, the dependent batch is unblocked and enqueued. The result is a directed acyclic graph of work with no separate scheduler thread and no heap allocation per edge.

## Simulation Partitioning

Province data is in structure-of-arrays form, partitioned into cache-line-aligned chunks. A worker owns its chunk for the full economics tick and writes no shared state mid-pass. Cross-province dependencies (trade flows, migration) go into thread-local buffers and get merged in a single reduce pass after the batch finishes. The hot path stays free of cache coherence traffic between cores.

AI evaluation for each active nation is an independent job. Nations share only read-only world state during evaluation, so the batch runs fully parallel with no synchronization.

## Render/Simulation Decoupling

The render thread never blocks on simulation. Once the final simulation phase counter fires, a render-prep batch is queued: scene graph updates, draw call sorting, uniform buffer writes. The render thread consumes completed prep data without touching live simulation state. Clean producer-consumer boundary, no need to double-buffer entire simulation structures.

## Determinism Under Parallelism

Lockstep multiplayer requires bit-identical simulation output across all clients. The job system preserves this by running reduce merges in a fixed canonical order regardless of which physical thread executed each chunk, and by enforcing strict IEEE 754 semantics (no extended-precision registers, no cross-chunk FMA reordering). Work stealing affects which core runs a job, not the logical order of its effects on shared state.
