---
title: "The Long Century"
description: "A Victorian-era map and grand strategy game using C++, OpenGL, and multiplayer networking."
long_description: "Developed core engine systems for 'The Long Century', a grand strategy game set in a richly-detailed Victorian world. Work included C++ gameplay systems, OpenGL rendering pipelines, deterministic multiplayer systems, and tools for map editing and scenario scripting."
tags: ["C++", "OpenGL", "Multiplayer", "Game Dev"]
year: 2024
role: "Gameplay & Engine Developer"
repo: ""
images: ["/assets/long-century.svg"]
specs:
  Engine: "Custom C++ engine"
  Networking: "Deterministic lockstep support"
  Graphics: "OpenGL-based renderer"
outcome: "Prototypes with deterministic multiplayer gameplay and a moddable map system."
highlights:
  - "Designed and implemented core game engine architecture"
  - "Built economic and political simulation systems"
  - "Implemented OpenGL rendering pipeline with performance optimization"
  - "Developed deterministic lockstep multiplayer networking"
  - "Created moddable map systems and scenario scripting framework"
draft: false
---

The Long Century is a grand strategy game set in the Victorian era, built on a custom C++ engine. The project covered the full stack from engine architecture to gameplay simulation systems.

The rendering pipeline uses OpenGL with performance-aware batching. Multiplayer uses deterministic lockstep — every client runs the same simulation from the same inputs, eliminating server-side state sync. The map system supports modding through a scenario scripting framework, enabling custom scenarios without engine changes.
