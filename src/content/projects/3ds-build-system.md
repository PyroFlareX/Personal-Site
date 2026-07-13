---
title: "3DS Portable C++ Build System"
description: "Portable cross-compilation build system targeting the Nintendo 3DS from a standard C++ project structure."
long_description: "A portable build system for cross-compiling standard C++ projects to the Nintendo 3DS. Handles devkitARM toolchain configuration, library linking, and homebrew output packaging without requiring manual toolchain reconfiguration per project."
tags: ["C++", "Build Systems", "Nintendo 3DS", "Cross-compilation", "Embedded", "Tooling"]
year: 2021
role: "Systems Engineer"
repo: ""
images: ["/assets/projects/3ds-build-system.svg"]
specs:
  Target: "Nintendo 3DS"
  Language: "C++"
  Type: "Cross-compilation build system"
  Toolchain: "devkitARM / 3DS homebrew SDK"
outcome: "C++ projects buildable for 3DS from a standard project layout without manual toolchain configuration."
highlights:
  - "Portable build system for cross-compiling C++ projects to the Nintendo 3DS target; droppable into an existing project with minimal configuration"
  - "Handles devkitARM toolchain setup, 3DS-specific linker flags, and output packaging into runnable homebrew format"
  - "Abstracts away the difference between native and cross-compilation targets behind a single Make interface"
draft: false
---

A portable build system for cross-compiling standard C++ projects to the Nintendo 3DS. The system handles devkitARM toolchain setup, 3DS-specific compiler and linker flags, library paths, and packages output into the homebrew format that runs on hardware.

The goal was minimal friction: drop it into an existing C++ project and it works, without requiring per-project toolchain reconfiguration.
