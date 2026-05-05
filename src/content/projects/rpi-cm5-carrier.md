---
title: "Compute Module Custom Embedded Device Board"
description: "Custom Raspberry Pi Compute Module 5 carrier integrating battery management and power-path charging."
long_description: "Designed a custom Raspberry Pi CM5 carrier board with integrated battery management, power-path charging, and hot-swap protection. Responsibilities included schematic capture, multi-layer PCB layout, battery charger selection, and firmware for power state management and safe shutdown."
tags: ["Electronics", "PCB", "Power Management", "Firmware"]
year: 2026
role: "Hardware & Firmware Engineer"
repo: ""
images: ["/assets/rpi-cm5.svg"]
specs:
  Battery: "Li-ion 1S support"
  Charger: "PMIC with power-path (BQ25975)"
  Protection: "Hot-swap & thermal"
  Networking: "Pi5 Onboard, boosted by eSIM and RFID capabilities"
outcome: "Reliable battery-backed CM5 deployments in mobile test rigs."
highlights:
  - "Designed multi-layer PCB with schematic capture and optimization"
  - "Integrated PMIC (BQ25975) for power-path charging"
  - "Implemented firmware for safe shutdown and power state management"
  - "Designed hot-swap and thermal protection circuits"
  - "Enabled reliable battery-backed CM5 deployments in mobile test rigs"
draft: false
---

Custom carrier board for the Raspberry Pi Compute Module 5, designed for mobile and field-deployed embedded applications requiring reliable battery-backed operation.

The board integrates a PMIC (BQ25975) for power-path charging — allowing the system to run directly from input power while simultaneously charging the battery, with seamless switchover during input loss. Hot-swap and thermal protection circuits ensure safe operation under varying field conditions.

Firmware handles power state transitions, safe shutdown sequencing, and telemetry for battery health monitoring.
