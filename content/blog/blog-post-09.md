

# Overview: 

Kokkos can be thought of as a performance portable abstraction layer above hardware-specific or model-specific implementations for a given system. Kokkos Tools provides tool libraries and connectors for productivity for performance portable programming. To automatically tune Kokkos applications on next-generation Exascale Supercomputers, Kokkos Tools provides auto-tuning connectors and a tuning interface. 
Without Kokkos auto-tuning capabilities, internal Kokkos execution space parameters are empirically or heuristically hand-tuned with fixed parameter values to provide "one size fits most" performance, with the goal of minimizing the effect of the abstraction overhead and approximating the performance of an optimized, lower-level implementation. The Kokkos Tools APEX connector, a git submodule in Kokkos Tools, is the primary means of auto-tuning support offered by the Kokkos ecosystem. 

# The Need for Auto-tuning Software for Kokkos

Could Kokkos auto-tuning be done by just tuning parameters of the specific Kokkos execution spaces, e.g., CUDA performance parameters of chunks, OpenMP parameters of chunks per thread, or the OpenMP schedule type? Yes, but there are downsides to this in terms of portability to new unknown/non-existing platforms. This approach focuses specifically on tuning of Kokkos parameters in a way that is portable across different Kokkos backends. The contribution is not simply that parameter values can be reused across Kokkos backends but the process of doing the tuning is also portable.

# How it Works
Kokkos includes an API that can be used to construct a tuning context around a computational kernel, declare input variables that define the context state, declare output variables to be tuned, and request output variables when the kernel is executed. Tool libraries of Kokkos Tools can integrate support to utilize this API at runtime to tune Kokkos kernel parameters running in any execution space / policy combination, and even switch between Kokkos Execution Spaces (i.e. choose between serial or OpenMP depending on the problem size, etc.) or execution policies. In addition, this API can be used to auto-tune any arbitrary parameter within an application that uses Kokkos - solver choices, algorithmic parameters, tolerances, etc.

## Tuning Contexts 
In some cases, these hand-tuned, internal Kokkos parameter choices can be improved upon for different input data sizes or microarchitecture differences. Some Kokkos kernels may also be written as "generic" solvers that are reused within a library or application, and the same kernel can have different performance behavior depending on where in the code it is called, which execution space architecture it is run on (CUDA, HIP, SYCL, OpenMP, OpenMP Offload), and with different inputs. In addition, some assumptions (i.e. 100% occupancy is always ideal) do not hold for some cases, and sometimes the best performing settings don't make intuitive sense. By exploring the internal parametric search space, we expect to find settings yielding better performance.

## Online and Offline Auto-tuning
Auto-tuning can be performed either offline or online. In offline auto-tuning[2], the parameter space is explored outside of a full application context, and the program runs to completion with a given combination of parametric settings. After executing the application multiple times with values from the parameter space (either a sampled set or exhaustively), the "best performing" parameter combination is stored for later use for the full application. In online auto-tuning, the parameter space is explored inside a full application context, and the settings are constantly updated until convergence or the end of execution. In either case, once the search space has been sufficiently explored by the search algorithm (i.e. the search has converged on a solution), those results can be cached and subsequently used for future executions with the same experiment configuration. The benefit of online auto-tuning is that the potentially large overhead of offline searching is avoided. The downsides of online tuning include being limited to parameters that can only be changed at runtime (i.e. GPU block tiling factors but not launch bounds) and the inclusion of runtime overhead (exploring parameter combinations with worse performance than the default) which can potentially slow down the application. However, sub-optimal choices are only used for a brief amount of time, not for a full application run. In addition, the tuning time itself is yielding productive results, and the settings are tuned to the specific problem at hand. 

# Results

Our experiments have shown that in most cases the actively tuning case still performs faster than the default, untuned configuration despite the search exploration overhead. Figure 1 shows  how the Kokkos Tools APEX auto-tuning connector adjusts the occupancy for a Kokkos parallel_for in a Kokkos benchmark [3] via APEX’s auto-tuning capabilities. From the figure, we see how the best-performing parameter value converges half-way through the Kokkos application’s execution.

Figure 1: Tuning parameter values converge over Kokkos Application Execution 
 
For an in-depth example on how to use the Kokkos Tools runtime auto-tuning API with the APEX performance measurement and runtime adaptation tool, see the Wiki post at https://github.com/UO-OACISS/apex/wiki/Kokkos-Runtime-Auto-Tuning-with-APEX.




# Conclusion

In this article, we discussed ongoing work and the importance of the Kokkos Tools auto-tuning capability with the APEX auto-tuning connector. We showed why it is needed for Kokkos applications, explained Kokkos Tuning interface for auto-tuning tools, and described the Kokkos Tools APEX auto-tuning connector use and its functionality. We then showed some experimental results of using the Kokkos Tools APEX connector with a simple Kokkos benchmark to do occupancy tuning. We believe the Kokkos Tools APEX connector will provide benefits to a large number of Kokkos applications in the months to come. We have a variety of ideas for future work. First, we want to allow Kokkos users to more easily utilize Kokkos Tools APEX auto-tuning capabilities by adding a flag to Kokkos applications such as --auto-tuning=ON to reduce the effort needed for Kokkos users. Second, we plan to augment the APEX tools connector with ML-guidance, including more integration with the Kokkos Tools Apollo auto-tuning connector from LLNL. Finally, we aim to utilize Sandia LDMS performance monitoring system data and MPI profiling data to guide tuning of Kokkos applications.

# References: 

[1] Kokkos Tools library. https://github.com/kokkos/kokkos-tools

[2] GPTune: https://linkinghub.elsevier.com/retrieve/pii/S0377042723001668

[3] Occupancy Tuning Benchmark: https://github.com/khuck/apex-kokkos-tuning/blob/main/tests/occupancy.cpp 

[4] Kokkos 4.5 Release Briefing: https://github.com/kokkos/kokkos-tutorials/blob/main/Other/ReleaseBriefings/release-45.pdf
