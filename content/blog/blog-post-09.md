---
authors: ["kokkos-team"]
title: "Kokkos Releases New Autotuning Features"
date: 2024-12-20
tags: ["blog"]
thumbnail: img/blog/2024/kokkos-tuning.png
---

# Motivation

By default, internal Kokkos execution space parameters are empirically or heuristically hand-tuned with fixed parameter values to provide "one size fits most" performance, with the goal of minimizing the effect of the abstraction overhead and approximating the performance of an optimized, lower-level implementation. Can these parameters be tuned for a particular application and architecture for programmers to easily tackle further performance opportunities? The Kokkos Tools APEX auto-tuning connector, a git submodule in Kokkos Tools with a stable version released in Kokkos 4.5, offers an answer.

# How it Works

Kokkos includes an API that can be used to construct a tuning context around a computational kernel, declare input variables that define the context state, declare output variables to be tuned, and request output variables when the kernel is executed. Tool libraries of Kokkos Tools can integrate support to utilize this API at runtime to tune Kokkos kernel parameters running in any execution space / policy combination, and even switch between Kokkos Execution Spaces (i.e. choose between serial or OpenMP depending on the problem size, etc.) or execution policies. In addition, this API can be used to auto-tune any arbitrary parameter within an application that uses Kokkos - solver choices, algorithmic parameters, tolerances, etc.

## Tuning Contexts 
In some cases, these hand-tuned, internal Kokkos parameter choices can be improved upon for different input data sizes or microarchitecture differences. Some Kokkos kernels may also be written as "generic" solvers that are reused within a library or application, and the same kernel can have different performance behavior depending on where in the code it is called, which execution space architecture it is run on (CUDA, HIP, SYCL, OpenMP, OpenMP Offload), and with different inputs. In addition, some assumptions (i.e. 100% occupancy is always ideal) do not hold for some cases, and sometimes the best performing settings don't make intuitive sense. By exploring the internal parametric search space, we expect to find settings yielding better performance.

## Online and Offline Auto-tuning
Auto-tuning can be performed either offline or online. In offline auto-tuning[2], the parameter space is explored outside of a full application context, and the program runs to completion with a given combination of parametric settings. After executing the application multiple times with values from the parameter space (either a sampled set or exhaustively), the "best performing" parameter combination is stored for later use for the full application. In online auto-tuning, the parameter space is explored inside a full application context, and the settings are constantly updated until convergence or the end of execution. In either case, once the search space has been sufficiently explored by the search algorithm (i.e. the search has converged on a solution), those results can be cached and subsequently used for future executions with the same experiment configuration. The benefit of online auto-tuning is that the potentially large overhead of offline searching is avoided. The downsides of online tuning include being limited to parameters that can only be changed at runtime (i.e. GPU block tiling factors but not launch bounds) and the inclusion of runtime overhead (exploring parameter combinations with worse performance than the default) which can potentially slow down the application. However, sub-optimal choices are only used for a brief amount of time, not for a full application run. In addition, the tuning time itself is yielding productive results, and the settings are tuned to the specific problem at hand. 

# Outcomes

Our experiments have shown that in most cases the actively tuning case still performs faster than the default, untuned configuration despite the search exploration overhead. Figure 1 shows  how the Kokkos Tools APEX auto-tuning connector adjusts the occupancy for a Kokkos parallel_for in a Kokkos benchmark [3] via APEX’s auto-tuning capabilities. From the figure, we see how the best-performing parameter value converges half-way through the Kokkos application’s execution.

Figure 1: Tuning parameter values converge over Kokkos Application Execution 
 
For an in-depth example on how to use the Kokkos Tools runtime auto-tuning API with the APEX performance measurement and runtime adaptation tool, see the Wiki post at https://github.com/UO-OACISS/apex/wiki/Kokkos-Runtime-Auto-Tuning-with-APEX.

The Kokkos team welcomes users to try the Kokkos Tools APEX auto-tuning capabilities and provide feedback given their auto-tuning needs. The Kokkos team is actively working on new features for auto-tuning, including providing a new flag for Kokkos executables, ML-guidance of auto-tuning, and per-MPI process auto-tuning, and utilizing feedback from performance monitoring software such as LDMS. 

# References

[1] Kokkos Tools library. https://github.com/kokkos/kokkos-tools

[2] GPTune: https://linkinghub.elsevier.com/retrieve/pii/S0377042723001668

[3] Occupancy Tuning Benchmark: https://github.com/khuck/apex-kokkos-tuning/blob/main/tests/occupancy.cpp 

[4] Kokkos 4.5 Release Briefing: https://github.com/kokkos/kokkos-tutorials/blob/main/Other/ReleaseBriefings/release-45.pdf
