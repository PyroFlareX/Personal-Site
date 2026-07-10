---
title: "CM5 Custom Embedded Device Board"
description: "Custom Raspberry Pi CM5 carrier board with power-path charging, hot-swap protection, eSIM & RFID — for battery-backed mobile deployments."
long_description: "Designed a custom Raspberry Pi CM5 carrier board integrating battery management, power-path charging, hot-swap protection, eSIM, and RFID — built for mobile and field-deployed embedded applications requiring reliable battery-backed operation."
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
  - "Designed custom Raspberry Pi CM5 carrier board with battery management, power-path charging, and hot-swap protection for mobile and battery-backed test deployments"
  - "Performed multi-layer PCB layout with schematic capture, component selection, and DFM review; selected and integrated BQ25975 PMIC"
  - "Developed firmware for power state management, battery level monitoring, and safe shutdown sequences"
  - "Integrated eSIM and RFID modules to expand connectivity capabilities for field-deployable applications"
draft: false
---

Custom carrier board for the Raspberry Pi Compute Module 5, designed for mobile and field-deployed embedded applications requiring reliable battery-backed operation.

The board integrates a BQ25975 PMIC for power-path charging — the system runs from input power while simultaneously charging the battery, with seamless switchover during input loss. Hot-swap and thermal protection circuits ensure safe operation under varying field conditions.

eSIM and RFID modules extend connectivity options beyond standard Pi networking, enabling field deployments that require SIM-based connectivity or RFID asset tracking without external adapters. Firmware handles power state transitions, safe shutdown sequencing, and battery health telemetry.
