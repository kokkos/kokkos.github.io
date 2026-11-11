---
layout: minimal
title: "Kokkos 5.3 Release Briefing"
date: "2026-11-04"
eventDate: "2026-12-03"
description: Join the Kokkos team online on December 3rd for updates on the Kokkos community and the changes in Kokkos Core, Kokkos Kernels and Kokkos Tools 5.3.
sharing: false
metadata: none
thumbnail: img/kokkos-ecosystem-hero.jpg
---

The Kokkos Team is inviting you to the **Kokkos 5.3 release briefing**.
The briefing will be held online on **December 3rd, 2026** and will cover
updates on the Kokkos community and changes in Kokkos Core, Kokkos Kernels and
Kokkos Tools since 5.2.

- **When:** December 3rd, 2026, 90 minutes
  - 9 AM MST
  - 11 AM EST
  - 5 PM CET
- **Where:** online. [Register](https://zoom-lfx.platform.linuxfoundation.org/meeting/97696786086?password=5ec25f0c-51b8-4757-bc28-d84e19483c1f) to receive a calendar invite with the meeting details.  (Click "Need an invite?".)

## Agenda

1. Community announcements, including the
   [Kokkos User Group meeting 2027]({{% ref "/community/events/2027-04-14-kokkos-user-group-meeting" %}})
   in Montréal and its open call for submissions
2. Kokkos Core
3. Kokkos Kernels
4. Kokkos Tools
5. Questions and discussion

## Key Changes

The full changelogs are available for
[Kokkos Core](https://github.com/kokkos/kokkos/blob/5.3.0/CHANGELOG.md#530),
[Kokkos Kernels](https://github.com/kokkos/kokkos-kernels/blob/5.3.0/CHANGELOG.md#530) and
[Kokkos Tools](https://github.com/kokkos/kokkos-tools/blob/5.3.0/CHANGELOG.md#530).

### Kokkos Core

**New features**

- `Kokkos::single`: a new top-level parallel construct for executing
  non-parallel code on the device, optionally returning a value.
- NextSilicon backend (close to feature complete).
- `DefaultMemorySpace` and `DefaultHostMemorySpace` type aliases.
- `RangePolicy` can take a team handle in place of `ThreadVectorRange` in
  hierarchical parallelism (`parallel_for` only for now).
- `mdspan`-style template arguments for `DualView`, and `View::size_type`
  aligned with the `mdspan` specification.

**Architectures and backends**

- New architectures: NVIDIA Rubin GPUs, NVIDIA Vera CPUs, Intel Battlemage
  (SYCL) and Hygon DCU (HIP).
- Larger grid sizes for `MDRangePolicy` reductions on the CUDA and HIP
  backends, and a reduced device memory footprint for team scratch pads on SYCL.
- Faster `sort_by_key` on CUDA and HIP, and shorter compile times when passing
  labels to `parallel_for`, `parallel_reduce` and `parallel_scan`.

**Breaking changes and removals**

- The legacy `View` implementation is removed.
- Code guarded by `KOKKOS_ENABLE_DEPRECATED_CODE_4` is removed.
- Functors taking indices as non-const references in
  `parallel_for(TeamThreadRange, ...)` are no longer accepted.
- The Clacc compiler and AMD GPU support in the OpenACC backend, and the
  deprecated AMD GPU architectures, are removed.

### Kokkos Kernels

- LAPACK: new `GETRF` and `GETRS`.
- Batched: new `SPR`, `SYMV` and `SYRK` kernels, genuine L1 and L-infinity
  norms, and right-transpose `SerialApplyQ`.
- BLAS: `GEMM` is optimized for special cases (`beta = 0`, `alpha = 0`), and
  fewer layout combinations are instantiated by default, reducing build times.
- Sparse: faster `ParILUT`, `SpGEMM` and `TRSV`, and device implementations of
  Recursive Coordinate Bisection (RCB) and diagonal block extraction.
- TPLs: a oneMKL SYCL binding for `KokkosBlas::gemm`.
- ODE: many fixes to the implicit BDF solver for improved robustness.

### Kokkos Tools

- The Kokkos Profiling interface is updated to reflect the changes in Kokkos
  Core, including `Kokkos::single` and the NextSilicon backend.
- `Kokkos::single` support in the kernel-filter, kokkos-sampler, kernel-logger
  and simple-kernel-timer tools.

## Slides and recording

Slides and a recording will be posted on this page after the briefing.
