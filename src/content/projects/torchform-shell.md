---
title: "Torchform"
description: "A Rust-native desktop environment for Project Minerva — a handheld device with dual DSI displays, a custom controller layout, and a Cirque SPI trackpad."
long_description: "Torchform is a full desktop environment built in Rust for Project Minerva, a custom handheld. It combines a Smithay Wayland compositor managing dual DSI outputs with a Slint UI shell, a hardware input daemon abstracting a Cirque SPI trackpad and USB HID gamepad into semantic actions, and a TOML-driven configuration system — all designed to run headless on a Raspberry Pi CM5."
tags: ["Rust", "Linux", "Wayland", "Embedded", "Systems", "UI/UX"]
year: 2026
role: "Lead Developer"
repo: ""
images: ["/assets/projects/torchform-shell.svg"]
specs:
  Language: "Rust"
  UI Toolkit: "Slint"
  Compositor: "Smithay (Wayland)"
  Displays: "Dual DSI (1920×1080 + 640×480)"
  Input: "Cirque SPI trackpad, USB HID gamepad, uinput"
outcome: "Full-stack handheld DE running on-device and testable on desktop via a dual-screen emulator window."
highlights:
  - "Built a Smithay-based Wayland compositor managing two independent DSI outputs — upper display (1920×1080) for apps and overlays, lower display (640×480) for status and virtual keyboard"
  - "Wrote a Slint UI shell with a radial menu, command palette, and app switcher as composable overlay components, compiled from .slint source at build time"
  - "Implemented an input daemon (torchform-inputd) that reads a Cirque SPI trackpad via spidev, a USB HID gamepad via gilrs, and emits a uinput virtual device — translating all physical inputs to semantic ShellAction variants over a Unix socket"
  - "Designed a keybind abstraction layer: RawInput → ShellAction mapping is TOML-driven with built-in defaults, so no button names appear in shell logic"
  - "Structured the workspace as 11 Rust crates with strict dependency isolation — shared libs (torchform-actions, torchform-config) carry zero Slint dependency so input and config logic compile without the UI stack"
  - "Built a dual-screen emulator crate (minerva-emulator) that renders both displays inside a single hardware-frame window for rapid desktop development without physical hardware"
draft: false
---

Torchform is the desktop environment for Project Minerva, a custom handheld with two DSI displays and a gamepad-style controller. The upper display (1920×1080) runs apps and shell overlays; the lower (640×480) carries system status and a virtual keyboard. Everything is written in Rust and targets Alpine Linux on a Raspberry Pi CM5.

## Compositor

The Wayland compositor is built on Smithay, using the `udev` backend for direct DRM/KMS output to both DSI panels in production and the `winit` backend for running nested inside an X11 or Wayland session during development. Each DSI output is a separate `TorchOutput`, with XDG tiling managing surface placement per output. The compositor handles seat management via `libseat` (no logind dependency) and delegates input to the input daemon.

## Shell UI

The shell is a Slint process that connects to the compositor as a Wayland client. UI is authored in `.slint` declarative markup and compiled at build time by `slint_build`; the Rust shell binary drives state machines for each overlay component. The radial menu takes analog stick input to select an action arc; the command palette lists registered app and system commands in a scrollable overlay; the app switcher shows live workspace tiles. All three are composable — any combination can be visible simultaneously.

Shared UI panels (Settings, Files) are compiled once into the shell and also linked into standalone Slint app binaries (`torchform-settings`, `torchform-files`), so the in-shell stubs and their standalone counterparts share the same `.slint` source.

## Input Daemon

`torchform-inputd` is a separate process that owns all physical input and abstracts it away from the shell entirely. It opens `/dev/spidev0.0` for the Cirque capacitive SPI trackpad (with a kernel evdev fallback), scans `/dev/input/event*` for the USB HID gamepad via gilrs, and creates a uinput virtual gamepad. A `ChordDetector` translates button combinations and D-pad holds into low-level `Action` variants; `InputMap` (backed by `~/.config/torchform/keybinds.toml`) maps those to `ShellAction` enum variants, which are serialized as JSON and published over a Unix socket at `/run/torchform/inputd.sock`. The shell reads only `ShellAction` — no raw button names appear in shell logic.

## Crate Architecture

The workspace is 11 crates with deliberate dependency isolation. `torchform-actions` (ShellAction enum, InputMap) and `torchform-config` (TorchformConfig, settings schema) are shared libs with no Slint dependency — they compile in seconds and can be pulled into tools or tests without the UI stack. The compositor crates (`torchform-compositor`, `torchform-inputd`) carry no Slint dependency either. The Slint build step is isolated to the shell and standalone app crates, keeping incremental build times short.

## Development Emulator

`minerva-emulator` renders both displays inside a single desktop window styled as a hardware frame — like a DS emulator. Keyboard mappings simulate the gamepad and stick, all `ShellAction` variants are reachable from a keyboard, and `--demo` flags start the shell with a specific overlay open. This lets the entire shell be developed and tested on a desktop without physical hardware or a compositor.
