---
title: "Basalt VR/XR Engine"
description: "Multi-backend 3D rendering engine supporting OpenGL, Vulkan, and OpenVR for PC VR environments and Nintendo Switch."
long_description: "Basalt is a 3D rendering engine built to target multiple graphics backends — OpenGL, Vulkan, and OpenVR — from a single codebase, rendering 3D scenes and VR environments on PC and Nintendo Switch."
tags: ["Vulkan", "OpenGL", "OpenVR", "C++", "VR/XR", "Engine", "Nintendo Switch"]
year: 2022
role: "Graphics & Engine Engineer"
repo: ""
images: ["/assets/projects/basalt-vr.svg"]
specs:
  Backends: "Vulkan, OpenGL, OpenVR"
  Platforms: "PC VR, Nintendo Switch"
  Language: "C++"
  Architecture: "Multi-backend scene renderer"
outcome: "Single-codebase rendering engine running across PC VR headsets and Nintendo Switch hardware."
highlights:
  - "Designed and implemented a multi-backend rendering engine targeting Vulkan, OpenGL, and OpenVR from a shared codebase"
  - "Built 3D scene rendering pipeline supporting VR environments via OpenVR integration"
  - "Ported rendering backend to Nintendo Switch, adapting the pipeline for the Switch's constrained GPU and memory model"
  - "Abstracted graphics API differences behind a unified renderer interface for backend-agnostic scene management"
draft: false
---

Basalt is a 3D rendering engine designed to run on multiple graphics backends — Vulkan, OpenGL, and OpenVR — from a single architecture. The engine renders 3D scenes and VR environments on PC, with an additional port targeting the Nintendo Switch.

The multi-backend approach required abstracting Vulkan and OpenGL differences behind a unified interface, letting scene and object code remain backend-agnostic. OpenVR integration adds stereoscopic rendering for VR headsets. The Switch port adapted the rendering pipeline to the hardware's constrained GPU and memory model, demonstrating cross-platform portability of the engine core.
