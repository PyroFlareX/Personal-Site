---
title: "3DS Portable C++ Build System"
description: "Portable cross-compilation build system targeting the Nintendo 3DS from a standard C++ project structure."
long_description: "A portable build system enabling standard C++ projects to cross-compile for the Nintendo 3DS, handling toolchain configuration, library linking, and output packaging for the 3DS homebrew environment."
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
  - "Built a portable build system for cross-compiling C++ projects to the Nintendo 3DS target architecture"
  - "Handled devkitARM toolchain configuration, 3DS-specific linker flags, and output packaging into runnable homebrew format"
  - "Designed to be droppable into an existing C++ project with minimal configuration overhead"
draft: false
---

A portable build system for cross-compiling standard C++ projects to the Nintendo 3DS. The system handles devkitARM toolchain setup, 3DS-specific compiler and linker flags, library paths, and packages output into the homebrew format that runs on hardware.

The goal was minimal friction — droppable into an existing C++ project without requiring manual toolchain reconfiguration per build target.
