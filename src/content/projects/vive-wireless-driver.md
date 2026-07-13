---
title: "Vive Wireless Linux Driver"
description: "Out-of-tree Linux kernel module bringing 60 GHz WiGig support for the HTC Vive Wireless Adapter to Linux, without the Windows-only official driver stack."
long_description: "Linux kernel module implementing device bring-up, 60 GHz WiGig radio management, and low-latency VR stream transport for the HTC Vive Wireless Adapter. Reverse engineered from Windows driver captures and implemented against the cfg80211 and USB subsystems."
tags: ["Linux", "Kernel", "C", "Driver", "WiGig", "VR/XR", "Reverse Engineering"]
year: 2025
role: "Kernel Developer"
repo: ""
images: ["/assets/projects/vive-wireless-driver.svg"]
specs:
  Kernel: "Linux (out-of-tree module)"
  Language: "C"
  Radio: "60 GHz WiGig (IEEE 802.11ad)"
  Interface: "PCIe + USB"
outcome: "Loadable kernel module enabling Vive Wireless Adapter bring-up on Linux with 60 GHz link establishment and VR stream transport."
highlights:
  - "Out-of-tree kernel module targeting the Vive Wireless Adapter's PCIe radio card and USB companion interface, registered with the appropriate kernel subsystems"
  - "60 GHz WiGig (IEEE 802.11ad) link initialization: channel selection, beamforming sector sweep, and association against the adapter's firmware command interface"
  - "Firmware command interface reconstructed by capturing and analyzing the Windows driver's USB traffic and PCIe register access patterns, with no vendor documentation"
  - "WiGig interface registered with cfg80211 and visible as a managed wireless device to standard Linux wireless tooling"
  - "Streaming path tuned for PC VR latency budgets: minimal interrupt coalescing, single-frame DMA descriptors, deadline-aware packet scheduling"
  - "Character device node exposes the stream interface to userspace (SteamVR or OpenVR) via DMA-coherent buffers with no copy on the data path"
draft: false
---

The HTC Vive Wireless Adapter uses a 60 GHz WiGig (IEEE 802.11ad) radio link between a PCIe card in the host PC and a receiver on the headset. HTC ships no Linux driver. This is an out-of-tree kernel module that brings the adapter up on Linux: device enumeration, radio initialization, link establishment, and VR stream transport.

## Device Interface

The adapter exposes two interfaces to the host: a PCIe radio card carrying the WiGig baseband, and a USB companion interface for control messaging and auxiliary data. The module registers a PCI driver for the radio card and a USB driver for the companion, coordinating bring-up across both. PCIe BAR space is mapped for direct register access to the radio firmware; USB handles the control plane.

## 60 GHz Link Initialization

WiGig operates in the unlicensed 60 GHz band with directional beamforming to compensate for high path loss. The module drives the firmware through the bring-up sequence: channel selection across the 2.16 GHz-wide 802.11ad channels, a sector sweep to find the best transmit and receive beam pair with the headset receiver, and association. The firmware command interface was reconstructed from Windows driver captures; the vendor publishes no Linux documentation.

## Reverse Engineering

The Windows driver's USB traffic and PCIe register access patterns were captured and analyzed to reconstruct the initialization sequence, firmware command encoding, and stream framing format. Key targets: the control-plane handshake over USB, the register sequence that arms the radio, and the bulk transfer layout carrying compressed video and tracking data. The module's firmware command layer replicates the required sequence without the Windows HAL layer.

## cfg80211 Integration

The WiGig interface is registered with the Linux cfg80211 subsystem, making it visible as a managed wireless interface to standard tools. This reuses the kernel's existing infrastructure for wireless device lifecycle management and keeps the driver's scope limited to hardware bring-up and stream transport.

## Latency Constraints

PC VR over a wireless link has hard latency budgets; frame delivery jitter causes visible artifacts and motion sickness. The streaming path minimizes interrupt coalescing on the PCIe RX path, sizes DMA descriptors for single-frame transfers to avoid scatter-gather overhead, and schedules outgoing packets against a deadline derived from the headset's display refresh. A character device node exposes the stream interface to userspace via read/write on pre-allocated DMA-coherent buffers, avoiding copy overhead on the data path.
