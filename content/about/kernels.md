---
authors: ["kokkos-team"]
title: "Kernels"
date: "2023-01-01"
tags: ["Kernels"]
---

**Kokkos Kernels** is a software library of linear algebra and graph algorithms used across many HPC applications to achieve best (not just good) performance on every architecture. The baseline version of this library is written using the Kokkos Core programming model for portability and good performance. The library has architecture-specific optimizations or uses vendor-specific versions of these mathematical algorithms where needed. This reduces the amount of architecture-specific software that an application team potentially needs to develop, thus further reducing their  (modification cost)to achieve “best in class” performance. Find the code and more information at https://github.com/kokkos/kokkos-kernels
