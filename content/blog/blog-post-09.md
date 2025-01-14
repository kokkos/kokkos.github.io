---
authors: ["kokkos-team"]
title: "Kokkos 4.5 Release Introduces New Auto-tuning Features"
date: 2024-12-11
tags: ["blog"]
thumbnail: img/blog/2024-autotuning/apex-kokkos.jpg
---

# Motivation

By default, internal Kokkos execution space parameters are empirically or heuristically hand-tuned with fixed parameter values to provide "one-size-fits-most" performance, with the goal of minimizing the effect of the abstraction overhead and approximating the performance of an optimized, lower-level backend implementation. Can these parameters be automatically tuned for a particular application and architecture so that programmers can easily tackle further performance opportunities? Auto-tuning features for Kokkos programmer productivity [5], released in Kokkos 4.5 [4], offer an answer.

# How it Works

Kokkos includes a Tuning API that can be used to construct a tuning context around a computational kernel, declare input variables that define the context state, declare output variables to be tuned, and request output variables when the kernel is executed. The Kokkos Tools infrastructure provides integrated support to utilize this API _during_ Kokkos application execution, i.e., online, rather than offline [2]. Together, Kokkos Tools and the Tuning API is used in APEX to tune at runtime Kokkos kernel parameters running in any execution space / policy combination. We note that the Kokkos auto-tuning capability from APEX allows for (a) switching its tuning heuristics between Kokkos Execution Spaces (i.e. choose between Serial or OpenMP depending on the problem size, etc.) or Execution Policies, and (b) auto-tuning any arbitrary parameter within an application that uses Kokkos - solver choices, algorithmic parameters, tolerances, etc.

# Outcomes

Our experiments have shown that, in most scenarios, using our online auto-tuning features speeds up a Kokkos program despite the added search exploration overhead. Figure 1 shows how the Kokkos Tools APEX auto-tuning connector adjusts the occupancy for a Kokkos::parallel_for in a Kokkos benchmark [3] via APEX’s auto-tuning capabilities. From the figure, we see how the best-performing parameter value converges half-way through the Kokkos application’s execution. The figure below shows how Kokkos tuning parameter values converge over the course of the Kokkos application's execution.

{{< image src="img/blog/2024-autotuning/APEX-tuning.png" style="float: center; height=10">}}

For an in-depth example on how to use the Kokkos Tools runtime auto-tuning API with the APEX performance measurement and runtime adaptation tool, see this [Wiki Post](https://github.com/UO-OACISS/apex/wiki/Kokkos-Runtime-Auto-Tuning-with-APEX).

The Kokkos team welcomes Kokkos users to try out these new auto-tuning capabilities for their applications and provide feedback based on their auto-tuning needs. The Kokkos team is actively working on new features for auto-tuning, including providing a new flag for Kokkos executables, ML-guidance of auto-tuning, per-MPI-process auto-tuning, and utilizing feedback from performance monitoring software such as LDMS.

# References

[1] Kokkos Tools library: [https://github.com/kokkos/kokkos-tools](https://github.com/kokkos/kokkos-tools)

[2] GPTune for Kokkos Albany: [https://linkinghub.elsevier.com/retrieve/pii/S0377042723001668](https://linkinghub.elsevier.com/retrieve/pii/S0377042723001668)

[3] Kokkos Occupancy Tuning Benchmark: [https://github.com/khuck/apex-kokkos-tuning/blob/main/tests/occupancy.cpp](https://github.com/khuck/apex-kokkos-tuning/blob/main/tests/occupancy.cpp)

[4] Kokkos 4.5 Release Briefing: [https://github.com/kokkos/kokkos-tutorials/blob/main/Other/ReleaseBriefings/release-45.pdf](https://github.com/kokkos/kokkos-tutorials/blob/main/Other/ReleaseBriefings/release-45.pdf)

[5] Autonomic Performance Environment for eXascale (APEX): [https://github.com/UO-OACISS/apex](https://github.com/UO-OACISS/apex)
