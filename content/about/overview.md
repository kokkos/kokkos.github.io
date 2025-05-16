---
authors: ["kokkos-team"]
title: "Overview"
date: "2025-05-13"
tags: ["Core", "Kernels", "Tools", "Tutorials"]
---

The Kokkos C++ Performance Portability Ecosystem is a production level solution for writing modern C++ applications in a hardware agnostic way.
It is a Linux Foundation project and part of the High Performance Software Foundation ([HPSF](https://hpsf.io)).
Kokkos originated in the US Department of Energy National Labs, and was part of the Exascale Computing Project
– at its time the leading effort in the US to prepare the HPC community for the next generation of super computing platforms.

Today, the principal organizations supporting Kokkos development are Sandia National Laboratories, Oak Ridge National Laboratory and the French Alternative Energies and Atomic Energy Commission.
The Ecosystem consists of multiple libraries addressing the primary concerns for developing and maintaining applications in a portable way.
The three main components are the Kokkos Core Programming Model, the Kokkos Kernels Math Libraries and the Kokkos Profiling and Debugging Tools.

More recently additional efforts have started including to support Fast Fourier Transforms with Kokkos-FFT and inter-node communication with Kokkos-Comm.
Furthermore, the Kokkos team helps develop new ISO C++ features such as `std::mdspan` and `std::linalg`, for which the team maintains backports to toolchains and standard versions supported by Kokkos.

{{< image src="img/Kokkos-Architecture-4-2025.jpg">}}

# [Core](https://github.com/kokkos/kokkos)

**Kokkos Core** is a programming model for parallel algorithms that use
many-core chips and share memory among those cores. The programming model
includes computation abstractions for frequently used parallel computing
patterns, policies that provide details for how those computing patterns are
applied, and execution spaces that denote on which cores the parallel
computation is performed. The programming model also includes patterns for
common data structures, policies that provide details for how those data
structures are laid out in memory, and memory spaces that denote in which
memory the data reside. The Kokkos Core programming model works by requiring
that application development teams implement their algorithms in terms of
Kokkos’ patterns, policies, and spaces. Kokkos Core can then map these
algorithms onto the target architecture according to architecture-specific
rules necessary to achieve best performance. While other programming models
support execution patterns, execution policies, execution spaces, and memory
spaces; only Kokkos supports data patterns and policies, which are necessary
for performance portability.

# [Kernels](https://github.com/kokkos/kokkos-kernels)

**Kokkos Kernels** is a software library of linear algebra and graph algorithms
used across many HPC applications to achieve best (not just good) performance
on every architecture. The baseline version of this library is written using
the Kokkos Core programming model for portability and good performance. The
library has architecture-specific optimizations or uses vendor-specific
versions of these mathematical algorithms where needed. This reduces the amount
of architecture-specific software that an application team potentially needs to
develop, thus further reducing their modification cost to achieve “best in
class” performance.

# [Tools](https://github.com/kokkos/kokkos-tools)

**Kokkos Tools** is an innovative “plug in” software interface and a growing
set of performance measurement and debugging tools that plug into that
interface for application development teams to analyze the execution and memory
performance of their software. Teams use this performance profiling and
debugging information to determine how well they have designed and implemented
their algorithms and to identify portions of their software that should be
improved or behave erroneously. Kokkos Tools interfaces leverage the Kokkos Core
programming model interface to improve an application developer’s experience
dramatically, by forwarding application specific information and their context
within the Kokkos Core programming model to the tools.

# [Tutorials](https://github.com/kokkos/kokkos-tutorials)

**Kokkos Tutorials** provides lectures and exercises that introduce
capabilities of Kokkos step-by-step and teach users how to leverage these
features to write performance portable code.  Recordings of the lectures are
available.
