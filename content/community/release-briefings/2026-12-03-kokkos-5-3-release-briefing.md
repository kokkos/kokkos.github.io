---
layout: minimal
title: "Kokkos 5.3 Release Briefing"
date: "2026-11-04"
eventDate: "2026-12-03"
description: Join the Kokkos team online on December 3rd for updates on the Kokkos community and the changes in Kokkos Core, Kokkos Kernels and Kokkos Tools 5.3.
sharing: false
metadata: none
---

The Kokkos Team is inviting you to the **Kokkos 5.3 release briefing**, which
follows the 5.3.0 release of November 11th.
The briefing will be held online on **December 3rd, 2026** and will cover
updates on the Kokkos community and changes in Kokkos Core, Kokkos Kernels and
Kokkos Tools since 5.2.

- **When:** December 3rd, 2026, 90 minutes
  - 9 AM MST
  - 11 AM EST
  - 5 PM CET
- **Where:** online, meeting link to be announced

## Agenda

1. Community announcements, including the
   [Kokkos User Group meeting 2027]({{% ref "/community/events/2027-04-14-kokkos-user-group-meeting" %}})
   in Montréal and its open call for submissions
2. Kokkos Core 5.3
3. Kokkos Kernels 5.3
4. Kokkos Tools 5.3
5. Questions and discussion

## Key Changes

Kokkos Tools is released in lockstep with Kokkos Core and Kokkos Kernels.
The full change logs are available in the
[Kokkos Core](https://github.com/kokkos/kokkos/blob/develop/CHANGELOG.md),
[Kokkos Kernels](https://github.com/kokkos/kokkos-kernels/blob/develop/CHANGELOG.md)
and [Kokkos Tools](https://github.com/kokkos/kokkos-tools) repositories.

### Kokkos Core

- `Kokkos::single`: a new top-level parallel construct for executing
  non-parallel code on the device, optionally returning a value.
- Default memory spaces: new `DefaultMemorySpace` and `DefaultHostMemorySpace`
  type aliases.
- New architectures: support for NVIDIA Rubin GPUs, NVIDIA Vera CPUs, and
  Intel Battlemage (SYCL).
- GPU performance: larger grid sizes for `MDRangePolicy` reductions on the CUDA
  and HIP backends, and a reduced device memory footprint for team scratch pads
  on SYCL.

### Kokkos Kernels

- Recursive Coordinate Bisection (RCB): improved algorithm on GPU.
- LAPACK: added support for `GETRF` and `GETRS`.
- Batched kernels: numerous new batched kernels, including `SPR`, `SYMV`,
  `SYRK` and L1 norm.

### Kokkos Tools

- Minor bug fixes
- Profiling interface update to support `Kokkos::single`

## Slides and recording

Slides and a recording will be posted on this page after the briefing.
