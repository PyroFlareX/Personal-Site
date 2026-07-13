---
title: "AngelScript Rules Engine"
description: "A full rules engine for The Long Century powered by AngelScript — exposing economics, AI, events, and scenario logic to a statically typed, C++-like scripting layer."
long_description: "The Long Century's data-driven rules engine embeds AngelScript to let modders and designers author economics models, AI decision weights, event triggers, and scenario setup in a statically typed scripting language with direct access to registered C++ types — without touching the engine."
tags: ["C++", "AngelScript", "Scripting", "Engine", "Game Dev", "Modding"]
year: 2024
role: "Engine Programmer"
repo: ""
images: ["/assets/projects/long-century.svg"]
specs:
  Language: "AngelScript (bytecode VM)"
  Host: "Custom C++ engine"
  Scope: "Economics, AI, events, scenarios"
  Interop: "Registered C++ types and functions"
outcome: "Full rules engine — economics, AI, events, and scenario logic — authored in AngelScript and hot-swappable without recompiling the engine."
highlights:
  - "Embedded AngelScript's bytecode VM into the engine and registered the core simulation types — provinces, nations, trade routes, ledger entries — as first-class script objects"
  - "Exposed the economics model entirely through script: tax rates, production modifiers, trade flow calculations, and deficit resolution are authored as AngelScript functions called by the engine each tick"
  - "Wired AI decision logic to registered callback functions — nation AI selects actions by invoking script-side weight functions that read world state through the registered API, keeping strategy tuning out of compiled code"
  - "Built an event system where trigger conditions and outcome actions are script blocks evaluated by the VM; designers write event chains without C++ knowledge"
  - "Implemented bytecode caching: scripts compile once on load to AngelScript bytecode and are saved to disk, cutting subsequent load times to a deserialize-and-bind path"
  - "Designed a sandboxed module system — each script file is a separate AngelScript module with explicit import declarations, preventing unintended cross-mod state pollution"
draft: false
---

The Long Century's simulation is fully data-driven: economics models, AI behavior, event logic, and scenario setup are authored in AngelScript rather than compiled into the engine. This keeps the design iteration loop short — rules change without a recompile — and gives modders the same authoring surface the developers use.

## Embedding AngelScript

AngelScript's registration API lets C++ types and functions appear as native objects inside script. The engine registers the core simulation types — `Province`, `Nation`, `TradeRoute`, `Ledger` — with their relevant fields and methods. Script code reads and writes simulation state through these handles; the VM enforces the type system at bytecode-compile time, so type errors surface at script load rather than mid-simulation.

The engine owns the AngelScript engine context and drives execution: each simulation phase calls into the VM at defined entry points (economics tick, AI turn, event evaluation), passes the current world state through registered references, and reads results back. Scripts never call back into engine internals outside the registered API surface.

## Economics and Rules Authoring

The entire economics model lives in script. Tax revenue, production output, trade flow allocation, and deficit resolution are implemented as AngelScript functions invoked by the simulation tick. The C++ engine provides raw world state; the script computes derived values and writes them back through the registered types. Changing a tariff formula or adding a new resource type is an edit to a script file, not a recompile.

## AI Decision Layer

Nation AI is wired to script-side weight functions. On each AI turn the engine iterates available actions, calls the registered AngelScript callback for each, and selects the highest-weighted option. The callback reads world state — treasury balances, military strength, diplomatic relationships — through the registered API and returns a numeric weight. Tuning AI aggression, economic priorities, or diplomatic posture is a script edit.

## Event System

Events are script blocks: a trigger condition function and one or more outcome action functions. The engine evaluates all loaded event triggers each tick by calling into the VM; a trigger returning true queues the event for resolution. Outcome functions fire on player or AI selection and write state changes back through registered types. Designers write branching event chains — political crises, economic booms, diplomatic incidents — without any C++ involvement.

## Module System and Bytecode Caching

Each script file is a separate AngelScript module with explicit `import` declarations. Modules see only what they import, preventing one mod's globals from silently aliasing another's. On first load the engine compiles each module to AngelScript bytecode and serializes it to a cache on disk; subsequent launches deserialize the bytecode directly, skipping the parse and compile step. The cache is invalidated by script file modification time.
