---
layout: minimal
title: "Kokkos 5.3 Release Briefing"
date: "2026-11-04"
eventDate: "2026-12-03"
description: Join the Kokkos team online on December 3rd for updates on the Kokkos community and the changes in Kokkos and Kokkos Kernels 5.3.
sharing: false
metadata: none
---

The Kokkos Team is inviting you to the **Kokkos 5.3 release briefing**.
The briefing will be held online on **December 3rd, 2026** and will cover
updates on the Kokkos community and changes in Kokkos and Kokkos Kernels since
5.2.

*Time and meeting link: to be announced.*

The full change logs are available in the
[Kokkos](https://github.com/kokkos/kokkos/blob/develop/CHANGELOG.md) and
[Kokkos Kernels](https://github.com/kokkos/kokkos-kernels/blob/develop/CHANGELOG.md)
repositories.

## Kokkos Core Key Changes

- `Kokkos::single`: a new top-level parallel construct for executing
  non-parallel code on the device, optionally returning a value.
- Default memory spaces: new `DefaultMemorySpace` and `DefaultHostMemorySpace`
  type aliases.
- New architectures: support for NVIDIA Rubin GPUs, NVIDIA Vera CPUs, and
  Intel Battlemage (SYCL).
- GPU performance: larger grid sizes for `MDRangePolicy` reductions on the CUDA
  and HIP backends, and a reduced device memory footprint for team scratch pads
  on SYCL.

## Kokkos Kernels Key Changes

- Recursive Coordinate Bisection (RCB): improved algorithm on GPU.
- LAPACK: added support for `GETRF` and `GETRS`.
- Batched kernels: numerous new batched kernels, including `SPR`, `SYMV`,
  `SYRK` and L1 norm.

## Try the release candidates

The `release-candidate-5.3.0` branches are available in the
[Kokkos](https://github.com/kokkos/kokkos) and
[Kokkos Kernels](https://github.com/kokkos/kokkos-kernels) repositories. We
encourage you to test them against your applications and build environments
ahead of the final 5.3.0 tags.

## Slides and recording

Slides and a recording will be posted on this page after the briefing.
