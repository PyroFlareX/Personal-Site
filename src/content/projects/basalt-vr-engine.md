---
title: "Basalt VR/XR Engine"
description: "Multi-backend 3D rendering engine supporting OpenGL, Vulkan, and OpenVR for PC VR environments and Nintendo Switch."
long_description: "Basalt is a 3D rendering engine targeting Vulkan, OpenGL, and OpenVR from a single codebase. Renders 3D scenes and VR environments on PC, with a port to Nintendo Switch."
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
  - "Multi-backend rendering engine targeting Vulkan, OpenGL, and OpenVR from a shared codebase; scene and object code stays backend-agnostic behind a unified renderer interface"
  - "3D scene rendering pipeline with VR support via OpenVR integration for stereoscopic output on PC headsets"
  - "Ported the rendering backend to Nintendo Switch, adapting it to the hardware's constrained GPU and memory model"
draft: false
---

Basalt is a 3D rendering engine that runs on Vulkan, OpenGL, and OpenVR from a single architecture. It renders 3D scenes and VR environments on PC, with a port to the Nintendo Switch.

The multi-backend approach required abstracting Vulkan and OpenGL differences behind a unified interface, so scene and object code stays backend-agnostic. OpenVR adds stereoscopic rendering for PC VR headsets. The Switch port adapted the pipeline to the hardware's constrained GPU and memory model, which validated that the engine core was genuinely portable.
