---
authors: ["kokkos-team"]
title: "Kokkos Releases New Autotuning Features"
date: 2024-12-10
tags: ["blog"]
thumbnail: img/blog/apex-kokkos.png
---

# Motivation

By default, internal Kokkos execution space parameters are empirically or heuristically hand-tuned with fixed parameter values to provide "one size fits most" performance, with the goal of minimizing the effect of the abstraction overhead and approximating the performance of an optimized, lower-level implementation. Can these parameters be tuned for a particular application and architecture for programmers to easily tackle further performance opportunities? The Kokkos Tools APEX auto-tuning connector [5], a git submodule in Kokkos Tools with a stable version released in Kokkos 4.5 [4], offers an answer.

# How it Works

Kokkos includes a Tuning API (TuningInterface) that can be used to construct a tuning context around a computational kernel, declare input variables that define the context state, declare output variables to be tuned, and request output variables when the kernel is executed. The Kokkos Tools infrastructure provide integrated support to utilize this API during Kokkos application execution, i.e., online, rather than offline [2]. Together, Kokkos Tools and the Tuning API is used in APEX to tune at runtime Kokkos kernel parameters running in any execution space / policy combination. We note through this Kokkos auto-tuning capability from APEX allows for (a) switching its tuning heuristics between Kokkos Execution Spaces (i.e. choose between serial or OpenMP depending on the problem size, etc.) or execution policies and (b) auto-tuning any arbitrary parameter within an application that uses Kokkos - solver choices, algorithmic parameters, tolerances, etc.

# Outcomes

Our experiments have shown that in most cases the actively tuning case still performs faster than the default, untuned configuration despite the search exploration overhead. Figure 1 shows  how the Kokkos Tools APEX auto-tuning connector adjusts the occupancy for a Kokkos parallel_for in a Kokkos benchmark [3] via APEX’s auto-tuning capabilities. From the figure, we see how the best-performing parameter value converges half-way through the Kokkos application’s execution. The figure below shows how Kokkos tuning parameter values converge over Kokkos Application Execution. 

{{< image src="img/blog/2024/kokkos-blog-post9.png" style="float: center; height=10">}}

For an in-depth example on how to use the Kokkos Tools runtime auto-tuning API with the APEX performance measurement and runtime adaptation tool, see the Wiki post at [https://github.com/UO-OACISS/apex/wiki/Kokkos-Runtime-Auto-Tuning-with-APEX](https://github.com/UO-OACISS/apex/wiki/Kokkos-Runtime-Auto-Tuning-with-APEX).

The Kokkos team welcomes users to try the Kokkos Tools APEX auto-tuning capabilities and provide feedback given their auto-tuning needs. The Kokkos team is actively working on new features for auto-tuning, including providing a new flag for Kokkos executables, ML-guidance of auto-tuning, per-MPI process auto-tuning, and utilizing feedback from performance monitoring software such as LDMS. 

# References

[1] Kokkos Tools library: [https://github.com/kokkos/kokkos-tools](https://github.com/kokkos/kokkos-tools)

[2] GPTune for Kokkos Albany: [https://linkinghub.elsevier.com/retrieve/pii/S0377042723001668](https://linkinghub.elsevier.com/retrieve/pii/S0377042723001668)

[3] Kokkos Occupancy Tuning Benchmark: [https://github.com/khuck/apex-kokkos-tuning/blob/main/tests/occupancy.cpp](https://github.com/khuck/apex-kokkos-tuning/blob/main/tests/occupancy.cpp)

[4] Kokkos 4.5 Release Briefing: [https://github.com/kokkos/kokkos-tutorials/blob/main/Other/ReleaseBriefings/release-45.pdf](https://github.com/kokkos/kokkos-tutorials/blob/main/Other/ReleaseBriefings/release-45.pdf)

[5] Autonomic Performance Environment for eXascale (APEX): [https://github.com/UO-OACISS/apex](https://github.com/UO-OACISS/apex)
