---
title: "Gravity Dropper"
description: "C++ physics sandbox built on SFML2 — drop blobs with adjustable mass, radius, and color and watch gravity interactions play out."
long_description: "A 2D gravity simulation sandbox in C++/SFML2, primarily used as a testbed for a portable cross-platform C++ build system (Conan2 + GNU Make with named cross-compilation profiles)."
tags: ["C++", "SFML", "Physics", "Simulation", "Build Systems"]
year: 2026
role: "Software Engineer"
repo: "https://github.com/PyroFlareX/gravity-dropper"
images: ["/assets/projects/gravity-dropper.svg"]
specs:
  Graphics: "SFML2"
  Language: "C++"
  Build: "Conan2 + GNU Make (cross-compilation profiles)"
  Controls: "Click to place · scroll to zoom · middle-click to pan"
outcome: "Physics sandbox with configurable blob parameters, paired with a reusable portable C++ build system."
highlights:
  - "Implemented a 2D gravity simulation in C++ with SFML2 — per-blob mass, radius, and color; left-panel UI for configuration before placement"
  - "Built on top of a portable project-tools build system using Conan2 and GNU Make, supporting named cross-compilation profiles"
  - "Used as a practical testbed for evaluating and iterating on C++ project configuration and build tooling"
draft: false
---

A 2D physics sandbox where you place blobs with adjustable mass, radius, and color onto a canvas and watch gravitational interactions unfold. Written in C++ with SFML2 for rendering.

Click to place a blob at the current settings, scroll to zoom, middle-click or arrow keys to pan, N to reset. The project is explicitly a testbed — the primary engineering interest is in the accompanying project-tools build system (Conan2 + GNU Make) with named cross-compilation profiles, which is designed to be portable across unrelated C++ projects.
