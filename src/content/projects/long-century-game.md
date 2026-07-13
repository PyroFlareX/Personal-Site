---
title: "The Long Century"
description: "Victorian-era grand strategy game on a custom C++ engine with deterministic lockstep multiplayer and moddable scripting."
long_description: "Lead developer on a custom C++ game engine and Victorian-era grand strategy simulator. Full-stack: engine architecture, OpenGL rendering, deterministic multiplayer, and a moddable data-driven rules engine."
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
  - "Custom C++ game engine architecture designed around a complex simulation workload, built from scratch"
  - "OpenGL rendering pipeline with scene graph management and performance-aware draw call batching"
  - "Deterministic lockstep multiplayer: every client runs the same simulation from the same inputs, no server-side state"
  - "Economic and political simulation driven by a modular, data-driven rules engine with scenario scripting for map authors"
draft: false
---

The Long Century is a grand strategy game set in the Victorian era, built on a custom C++ engine from the ground up. The project covers the full stack: engine architecture, rendering, simulation, and networking.

The rendering pipeline uses OpenGL with performance-aware batching and scene graph management. Multiplayer uses deterministic lockstep: every client runs the same simulation from the same inputs, which eliminates server-side state synchronization entirely. The economic and political simulation is driven by a modular data-driven rules engine, and the scenario scripting framework lets map authors define custom scenarios without touching the engine.
