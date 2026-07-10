---
title: "Automated Drink Maker"
description: "Arduino Mega-based assembly-line beverage dispenser with stepper motors, closed-loop sensor feedback, and web recipe control."
long_description: "Built an automated drink maker using an Arduino Mega and stepper-driven dispensers to deliver precise, repeatable volumes with real-time sensor feedback, safety interlocks, and a web interface for recipe management."
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
  - "Designed and built an Arduino Mega-based automated beverage dispenser using stepper-driven dispensers for precise, repeatable volume delivery"
  - "Implemented real-time sensor feedback using flow and temperature sensors with closed-loop control"
  - "Built safety interlock system and web-based recipe interface enabling remote recipe management"
draft: false
---

An assembly-line beverage automation system driven by an Arduino Mega, stepper motors, and sensor feedback. The goal was repeatable, precise dispensing — both for QA validation and demonstration.

Stepper-driven peristaltic pumps control fluid volume per dispense with sub-milliliter precision. Flow and temperature sensors provide real-time feedback with closed-loop correction against recipe targets. Safety interlocks prevent operation outside defined parameters. A web interface allows recipe programming and real-time monitoring without touching the hardware directly — the same pattern as industrial recipe management systems.
