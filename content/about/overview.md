---
title: Overview
sharing: false
metadata: none
---

The Kokkos C++ Performance Portability Ecosystem is a production level
solution for writing modern C++ applications in a hardware agnostic way.
It is a Linux Foundation project and part of the [High Performance
Software Foundation (HPSF)](https://hpsf.io). Kokkos originated in the
US Department of Energy National Labs, and was part of the Exascale
Computing Project – at its time the leading effort in the US to prepare
the HPC community for the next generation of super computing platforms.

Today, the principal organizations supporting Kokkos development are
Sandia National Laboratories, Oak Ridge National Laboratory and the
French Alternative Energies and Atomic Energy Commission. The Ecosystem
consists of multiple libraries addressing the primary concerns for
developing and maintaining applications in a portable way. The three
main components are the Kokkos Core Programming Model, the Kokkos
Kernels Math Libraries and the Kokkos Profiling and Debugging Tools.

More recently additional efforts have started including to support Fast
Fourier Transforms with Kokkos-FFT and inter-node communication with
Kokkos-Comm. Furthermore, the Kokkos team helps develop new ISO C++
features such as `std::mdspan` and `std::linalg`, for which the team
maintains backports to toolchains and standard versions supported by
Kokkos.

{{< image src="img/Kokkos-Architecture-4-2025.jpg" ratio="auto" wrapper="col-12 mx-auto" >}}

{{< button color="primary" href="/projects/kokkos-core"      >}}Kokkos (Core)   {{< /button >}}
{{< button color="primary" href="/projects/kokkos-kernels"   >}}Kokkos Kernels  {{< /button >}}
{{< button color="primary" href="/projects/kokkos-tools"     >}}Kokkos Tools    {{< /button >}}
{{< button color="primary" href="/projects/kokkos-tutorials" >}}Kokkos Tutorials{{< /button >}}
