---
title: "Vive Wireless Linux Driver"
description: "An out-of-tree Linux kernel module bringing 60 GHz WiGig support for the HTC Vive Wireless Adapter to Linux — enabling wireless PC VR without the Windows-only official driver stack."
long_description: "A Linux kernel module implementing device bring-up, 60 GHz WiGig radio management, and low-latency VR stream transport for the HTC Vive Wireless Adapter — reverse engineered from the Windows driver stack and implemented as a loadable kernel module against the cfg80211 and USB subsystems."
tags: ["Linux", "Kernel", "C", "Driver", "WiGig", "VR/XR", "Reverse Engineering"]
year: 2025
role: "Kernel Developer"
repo: ""
images: ["/assets/projects/basalt-vr.svg"]
specs:
  Kernel: "Linux (out-of-tree module)"
  Language: "C"
  Radio: "60 GHz WiGig (IEEE 802.11ad)"
  Interface: "PCIe + USB"
outcome: "Loadable kernel module enabling Vive Wireless Adapter bring-up on Linux with 60 GHz link establishment and VR stream transport."
highlights:
  - "Wrote an out-of-tree Linux kernel module targeting the Vive Wireless Adapter's PCIe radio card and USB companion interface, registering both with the appropriate kernel subsystems"
  - "Implemented 60 GHz WiGig (IEEE 802.11ad) link initialization — channel selection, beamforming sector sweep, and association — against the adapter's firmware command interface"
  - "Reverse engineered the Windows driver's USB control and bulk transfer protocol to reconstruct the device initialization sequence and VR stream framing without vendor documentation"
  - "Integrated with cfg80211 to expose the WiGig interface as a managed wireless device visible to standard Linux wireless tooling"
  - "Handled the latency constraints of PC VR over 60 GHz: minimized interrupt coalescing, tuned DMA transfer sizes for the streaming path, and implemented deadline-aware packet scheduling"
  - "Built a character device interface allowing SteamVR-side userspace to submit and receive stream frames without kernel modification"
draft: false
---

The HTC Vive Wireless Adapter uses a 60 GHz WiGig (IEEE 802.11ad) radio link between a PCIe card in the host PC and a receiver on the headset. HTC ships no Linux driver. This project is an out-of-tree kernel module that brings the adapter up on Linux — covering device enumeration, radio initialization, link establishment, and VR stream transport.

## Device Interface

The adapter exposes two interfaces to the host: a PCIe radio card carrying the WiGig baseband, and a USB companion interface used for control messaging and auxiliary data. The module registers a PCI driver for the radio card and a USB driver for the companion, coordinating bring-up across both. PCIe BAR space is mapped for direct register access to the radio firmware; USB handles the control plane.

## 60 GHz Link Initialization

WiGig operates in the unlicensed 60 GHz band with directional beamforming to compensate for the band's high path loss. The module drives the firmware through the bring-up sequence: channel selection across the available 2.16 GHz-wide 802.11ad channels, initiating a sector sweep to find the best transmit and receive beam pair with the headset receiver, and completing association. The firmware command interface was reconstructed from Windows driver capture — the vendor publishes no Linux documentation or specification.

## Reverse Engineering

The Windows driver's USB traffic and PCIe register access patterns were captured and analyzed to reconstruct the initialization sequence, firmware command encoding, and stream framing format. Key targets were the control-plane handshake over USB, the register sequence that arms the radio, and the bulk transfer layout carrying compressed video and tracking data. The module's firmware command layer faithfully replicates the required sequence without the Windows HAL layer.

## cfg80211 Integration

The WiGig interface is registered with the Linux cfg80211 subsystem, making it visible as a managed wireless interface to standard tools. This reuses the kernel's existing infrastructure for wireless device lifecycle management and keeps the driver's scope limited to hardware bring-up and stream transport rather than reimplementing wireless state machinery.

## Latency Constraints

PC VR over a wireless link has hard latency budgets — frame delivery jitter causes visible artifacts and motion sickness. The streaming path minimizes interrupt coalescing on the PCIe RX path, sizes DMA descriptors for single-frame transfers to avoid scatter-gather overhead, and schedules outgoing packets against a deadline derived from the headset's display refresh. A character device node exposes the stream interface to userspace (SteamVR or OpenVR runtimes) via read/write on pre-allocated DMA-coherent buffers, avoiding copy overhead on the data path.
