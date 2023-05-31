---
authors: ["kokkos-team"]
title: "Core"
date: "2023-01-01"
tags: ["Core"]
---

**Kokkos Core** is a programming model for parallel algorithms that use many-core chips and share memory among those cores. The programming model includes computation abstractions for frequently used parallel computing patterns, policies that provide details for how those computing patterns are applied, and execution spaces that denote on which cores the parallel computation is performed. The programming model also includes patterns for common data structures, policies that provide details for how those data structures are laid out in memory, and memory spaces that denote in which memory the data reside. The Kokkos Core programming model works by requiring that application development teams implement their algorithms in terms of Kokkos’ patterns, policies, and spaces. Kokkos Core can then map these algorithms onto the target architecture according to architecture-specific rules necessary to achieve best performance. While other programming models support execution patterns, execution policies, execution spaces, and memory spaces; only Kokkos supports data patterns and policies, which are necessary for performance portability.

{{< image src="img/Abstractions.jpg">}}