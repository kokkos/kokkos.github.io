---
authors: ["kokkos-team"]
title: "Abstract"
date: "2023-01-01"
tags: ["Core", "Kernels", "Tools", "Tutorials"]
---

The Kokkos C++ Performance Portability EcoSystem is a production level solution for writing modern C++ applications in a hardware agnostic way. It is part of the US Department of Energies Exascale Project – the leading effort in the US to prepare the HPC community for the next generation of super computing platforms. The EcoSystem consists of multiple libraries addressing the primary concerns for developing and maintaining applications in a portable way. The three main components are the Kokkos Core Programming Model, the Kokkos Kernels Math Libraries and the Kokkos Profiling and Debugging Tools.

{{< image src="img/Kokkos-Architecture3-1024x582.png">}}

# [Core]({{<ref "/about/core" >}})

**Kokkos Core** is a programming model for parallel algorithms that use many-core chips and share memory among those cores. The programming model includes computation abstractions for frequently used parallel computing patterns, policies that provide details for how those computing patterns are applied, and execution spaces that denote on which cores the parallel computation is performed. The programming model also includes patterns for common data structures, policies that provide details for how those data structures are laid out in memory, and memory spaces that denote in which memory the data reside. The Kokkos Core programming model works by requiring that application development teams implement their algorithms in terms of Kokkos’ patterns, policies, and spaces. Kokkos Core can then map these algorithms onto the target architecture according to architecture-specific rules necessary to achieve best performance. While other programming models support execution patterns, execution policies, execution spaces, and memory spaces; only Kokkos supports data patterns and policies, which are necessary for performance portability.

# [Kernels]({{<ref "/about/kernels" >}})

**Kokkos Kernels** is a software library of linear algebra and graph algorithms used across many HPC applications to achieve best (not just good) performance on every architecture. The baseline version of this library is written using the Kokkos Core programming model for portability and good performance. The library has architecture-specific optimizations or uses vendor-specific versions of these mathematical algorithms where needed. This reduces the amount of architecture-specific software that an application team potentially needs to develop, thus further reducing their modification cost to achieve “best in class” performance. 

# [Tools]({{<ref "/about/tools" >}})

**Kokkos Tools** is an innovative “plug in” software interface and a growing set of performance measurement and debugging tools that plug into that interface for application development teams to analyze the execution and memory performance of their software. Teams use this performance profiling and debugging information to determine how well they have designed and implemented their algorithms and to identify portions of their software that should be improved. Kokkos Tools interfaces  leverage the Kokkos Core programming model interface to improve an application developer’s experience dramatically, by forwarding application specific information and their context within the Kokkos Core programming model to the tools.

# [Tutorials](https://github.com/kokkos/kokkos-tutorials)

# [News]({{<ref "/blog" >}})
