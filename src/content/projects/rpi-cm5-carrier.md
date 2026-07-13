---
title: "CM5 Custom Embedded Device Board"
description: "Custom Raspberry Pi CM5 carrier board with power-path charging, hot-swap protection, eSIM and RFID for battery-backed mobile deployments."
long_description: "Custom Raspberry Pi CM5 carrier board integrating battery management, power-path charging, hot-swap protection, eSIM, and RFID. Built for mobile and field-deployed embedded applications that need reliable battery-backed operation."
tags: ["Electronics", "PCB", "Power Management", "Firmware", "Embedded"]
year: 2026
role: "Hardware & Firmware Engineer"
repo: ""
images: ["/assets/projects/rpi-cm5-board.png", "/assets/projects/rpi-cm5-board-iso.png"]
specs:
  Platform: "Raspberry Pi CM5"
  PMIC: "BQ25975 (power-path charging)"
  Protection: "Hot-swap & thermal"
  Extras: "eSIM, RFID, Li-ion 1S"
outcome: "Reliable battery-backed CM5 deployments in mobile test rigs."
highlights:
  - "Custom CM5 carrier with battery management, power-path charging via BQ25975, and hot-swap protection for mobile and field-deployed test rigs"
  - "Multi-layer PCB layout with schematic capture, component selection, and DFM review"
  - "Firmware handles power state transitions, battery level monitoring, and safe shutdown sequences"
  - "eSIM and RFID modules extend connectivity for field deployments requiring SIM-based networking or RFID asset tracking without external adapters"
draft: false
---

Custom carrier board for the Raspberry Pi Compute Module 5, designed for mobile and field-deployed embedded applications that need reliable battery-backed operation.

The BQ25975 PMIC handles power-path charging: the system runs from input power while simultaneously charging the battery, with seamless switchover on input loss. Hot-swap and thermal protection circuits handle varying field conditions.

eSIM and RFID modules extend connectivity beyond standard Pi networking for field deployments that need SIM-based connectivity or RFID asset tracking without external adapters. Firmware handles power state transitions, safe shutdown sequencing, and battery health telemetry.
