---
title: "The Long Century"
description: "A Victorian-era grand strategy game built on a custom C++ engine with deterministic lockstep multiplayer and moddable scripting."
long_description: "Lead developer on a custom C++ game engine and Victorian-era grand strategy simulator, covering full-stack engine architecture, OpenGL rendering, deterministic multiplayer, and a moddable data-driven rules engine."
tags: ["C++", "OpenGL", "Multiplayer", "Game Dev", "Engine"]
year: 2024
role: "Lead Programmer"
repo: ""
images: ["/assets/projects/long-century.svg"]
specs:
  Engine: "Custom C++"
  Graphics: "OpenGL (custom renderer)"
  Networking: "Deterministic lockstep"
  Content: "Moddable scripting"
outcome: "Prototypes with deterministic multiplayer gameplay and a moddable map and scenario system."
highlights:
  - "Designed and implemented from scratch a custom C++ game engine architecture optimized for a complex simulation workload"
  - "Built an OpenGL-based rendering pipeline with scene graph management and performance-aware draw call batching"
  - "Implemented deterministic lockstep multiplayer protocol enabling real-time synchronized gameplay across clients"
  - "Developed economic and political simulation systems with configurable, modular data-driven rules engine and scenario scripting framework"
draft: false
---

The Long Century is a grand strategy game set in the Victorian era, built on a custom C++ engine from the ground up. The project covers the full stack — engine architecture, rendering, simulation, and networking.

The rendering pipeline uses OpenGL with performance-aware batching and scene graph management. Multiplayer uses deterministic lockstep: every client runs the same simulation from the same inputs, eliminating server-side state synchronization entirely. The economic and political simulation is driven by a modular data-driven rules engine, and the scenario scripting framework lets map authors define custom scenarios without touching the engine.
