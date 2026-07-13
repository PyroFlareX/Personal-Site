---
title: "Automated Drink Maker"
description: "Arduino Mega-based assembly-line beverage dispenser with stepper motors, closed-loop sensor feedback, and web recipe control."
long_description: "Automated beverage dispenser on an Arduino Mega. Stepper-driven peristaltic pumps, real-time flow and temperature feedback, safety interlocks, and a web interface for recipe programming and monitoring."
tags: ["Arduino", "Automation", "Embedded", "Mechanics"]
year: 2024
role: "Embedded Systems Engineer"
repo: ""
images: ["/assets/projects/drink-maker.svg"]
specs:
  Controller: "Arduino Mega"
  Actuators: "Stepper motors"
  Sensors: "Flow, temperature"
  Interface: "Web UI for recipe control"
outcome: "Repeatable, high-precision sample production for QA and demonstration."
highlights:
  - "Stepper-driven peristaltic pumps deliver precise, repeatable volume per dispense; flow and temperature sensors provide closed-loop correction against recipe targets"
  - "Safety interlock system prevents operation outside defined parameters; web interface handles recipe programming and real-time monitoring without touching the hardware"
  - "Targeted the same recipe management pattern used in industrial dispensing systems: program once, run repeatedly with consistent output"
draft: false
---

An assembly-line beverage automation system on an Arduino Mega, stepper motors, and sensor feedback. The goal was repeatable, precise dispensing for QA validation and demonstration.

Stepper-driven peristaltic pumps control fluid volume per dispense with sub-milliliter precision. Flow and temperature sensors feed a closed-loop correction loop against recipe targets. Safety interlocks prevent operation outside defined parameters. A web interface handles recipe programming and real-time monitoring without touching the hardware directly, which is the same pattern as industrial recipe management systems.
