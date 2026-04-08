---
authors: ["kokkos-team"]
title: "Field report for the Kokkos User Group Meeting 2026"
date: 2026-03-31
tags: ["blog"]
thumbnail: img/blog/2026/2026-03-19-hpsfcon-kokkos.jpg
---
<br>

The [High Performance Software Foundation (HPSF) Conference 2026](https://hpsf2026.sched.com/) took place in Chicago IL from March 16th to March 20th.  There were Kokkos talks all week, with the last two days having a dedicated track for the Kokkos User Group (KUG) meeting. The program brought together Kokkos developers, library maintainers, and application teams to share updates on performance portability work across the Kokkos ecosystem, with recurring discussion topics including GPU performance tuning, interoperability (especially with Fortran), memory management, and distributed execution.

# Day 1 (Thursday March 19th):

Thursday focused primarily on Kokkos usage in applications and libraries, along with adoption experiences and training-related discussions.

A number of talks highlighted end-to-end application workflows and the combination of Kokkos with other ecosystem components.

In [multi-GPU radiative transport work integrated into OpenFOAM](https://youtu.be/FdE_RxQyxDY), [Nicolas Tricard](https://nick-jt.github.io/) described improvements for both performance and scalability by grouping rays and using ArborX for spatial searches; speedups of approximately 400× over serial and 10× over OpenMP were reported.

In [high-order CFD](https://youtu.be/FQIFJLaaqaY), batching was presented by [Sana Nazir](https://sananazir.github.io/) as a key technique to improve GPU performance. Furthermore, the importance of evaluating the performance of the complete solver (not only individual kernels) was emphasized.

For [Particle Systems with CabanaPD](https://youtu.be/I6vHFeMK2HA), [Sam Reeve](https://hpsf2026.sched.com/speaker/reevest2) reported that a multimaterial extension is now usable and that performance on MI250 GPUs remained reasonable even with conditional logic in the main kernel path.

Several presentations centered on ecosystem libraries and portability challenges encountered in practice.

[Ramzi Messahel](https://hpsf2026.sched.com/speaker/ramzi.messahel) gave a talk on [a portable mesh interpolation library described using ArborX](https://youtu.be/UNFvSxrhdzE) for neighbor searches while implementing interpolation outside of ArborX. The talk also outlined the migration away from Eigen toward Kokkos-Kernels due to incomplete GPU support in Eigen.

Memory management was also a topic: [Kristi Belcher](https://hpsf2026.sched.com/speaker/belcher6) spoke on [UmpireSpace](https://youtu.be/BT_Mvugd1ug): She showed an experimental implementation of Umpire as a Kokkos memory space.

Adoption-oriented talks addressed programming model choices and developer experience.

[Nigel Tan](https://hpsf2026.sched.com/speaker/ntan3) made a presentation on [performance-portable SIMD for vector Particle in Cell codes](https://youtu.be/8wzKch6Z85o) and noted that automatic vectorization by the compiler can be effective but may not match hand-optimized performance.

Framework integration perspectives were provided by two talks:

[Namjae Choi](https://hpsf2026.sched.com/speaker/namjae.choi) spoke on [MOOSE](https://youtu.be/-NtRHRDA_rU)’s integration of Kokkos in a code based heavily on dynamic polymorphism. The talk mentions separate compilation and RDC as main challenges for accelerator use in their case

[Timo Heister](https://hpsf2026.sched.com/speaker/heister1) reported on the [deal.II finite element library](https://youtu.be/EPIMqKDvzGU) bundling Kokkos and highlighted the role of Kokkos training in enabling student contributions to deal.II.

On the Python front, a [pyKokkos](https://youtu.be/70Rx289cl-w) update by [Ivan Grigorik](https://hpsf2026.sched.com/speaker/grigorik) described kernel fusion efforts and a shift away from exposing Kokkos::View directly. pyKokkos is moving towards using NumPy and CuPy as main data structure, allowing for easier interoperability and a more python-like feel.

Training and education session concluded the day with a panel discussion on teaching and training (Panelists: [Daniel Holladay](https://hpsf2026.sched.com/speaker/danl9), [Pariksheet Nanda](https://hpsf2026.sched.com/speaker/pan79), [Hariprasad Kannan](https://hpsf2026.sched.com/speaker/hkannan3), and [John K. Holmen](https://hpsf2026.sched.com/speaker/holmenjk)). The panelists emphasized the value of hands-on components, the usefulness of recorded materials, and the observation that C++ fundamentals are often a larger barrier than Kokkos concepts. Kokkos' documentation search behavior was also identified as an area for improvement (e.g., common terms not consistently surfacing the most relevant pages).  

As a prelude to the panel discussion, [Pariksheet Nanda](https://hpsf2026.sched.com/speaker/pan79) spoke about the challenge of [teaching domain scientists just enough C++ for accelerators](https://youtu.be/VE5Y7NTzrSk), and [Daniel Holladay](https://hpsf2026.sched.com/speaker/danl9) talked about his experiences with [transitioning Fortran developers to Kokkos](https://youtu.be/imxH_6Ie8sA).


# Day 2 (Friday March 20th):
Friday broadened to topics related to performance mechanisms, distributed execution, build/packaging, and Fortran interoperability and migration paths.

Performance-focused talks included updates on library capabilities and execution policies.

[Yuuichi Asahi](https://hpsf2026.sched.com/speaker/y.asahi6412) reported that MPI support in [Kokkos-FFT](https://youtu.be/gwY3HfhE5L8) is a key next step and that communication costs were a dominant factor in some performance testing.

A talk by [Hariprasad Kannan](https://hpsf2026.sched.com/speaker/hkannan3) on [MDRangePolicy efficiency](https://youtu.be/qVX-VwqyrTk) discussed differences between serial loop behavior (including limited autovectorization) and `parallel_for` execution, and outlined possible directions for improved SIMD utilization while noting the difficulty of vectorizing arbitrary user functors.

For [spectral element kernels](https://youtu.be/J_Leu9TZEhw), [Rohit Kakodkar](https://hpsf2026.sched.com/speaker/rk9481) reported that hardware-aware tiling and chunking are effective for accelerating 3D stencil computations. Comparisons noted that CuTe achieved higher performance in part through overlapping memory loads and computation, motivating interest in more explicit asynchronos data-movement strategies in Kokkos.

[Trung Nguyen](https://hpsf2026.sched.com/speaker/ndtrung) talked about application package updates including mixed precision support in the [Kokkos package for LAMMPS](https://youtu.be/cOYvUxNk0ZM).

[Jakob Bludau](https://hpsf2026.sched.com/speaker/bludauj) presented Kokkos' [Build & Packaging working group](https://youtu.be/d-Nep68pzqk). The group maintains and improves Kokkos' build system and tries to simplify downstream consumption of Kokkos. It also supports cases where Kokkos integration into the software stack is complicated. The talk also references updates on Spack packaging, Kokkos-on-Godbolt, and ongoing efforts toward binary distribution.

Several talks addressed extending Kokkos to new environments and scaling models.

A [neuromorphic integration update](https://youtu.be/YESNZBW57SA) by [Bradley Theilman](https://hpsf2026.sched.com/speaker/bhtheil) described ongoing work toward a Kokkos backend targeting neuromorphic/heterogeneous systems, with incremental implementation progress and early support for `deep_copy` and work toward `parallel_for`.

For distributed multi-GPU execution, [KokkosComm](https://youtu.be/OPPtRLYDvRQ) was presented by [Nicolas Morales](https://hpsf2026.sched.com/speaker/n.morales.0) as a communication layer designed to manage lifetimes and abstract non-contiguous data handling, with NCCL and RCCL backends.

A substantial portion of Friday covered Fortran interoperability and modernization strategies.

[Bruno Turcksin](https://hpsf2026.sched.com/speaker/bruno.turcksin) discussed the [Kokkos Fortran interop update](https://youtu.be/6me0wfoh8zs) and recommended using the `develop` branch given the age of available pre-release versions and noted current limitations such as lack of automatic memory management and primarily SharedSpace support.

In parallel, an approach for [automatic translation of Fortran to Kokkos](https://youtu.be/k4SSSZlRvBI) was presented by [Brayden Wagoner](https://hpsf2026.sched.com/speaker/bwagoner4). The approach is using flang-derived AST information to generate C++ instructions.

In terms of integrating Kokkos into existing Fortran applications [Jian Sun](https://github.com/sjsprecious) introduced a [C++/Kokkos dynamical core behind an existing Fortran interface](https://youtu.be/widas70vAMI) in an earth system model.

Next was [Yuuichi Asahi](https://hpsf2026.sched.com/speaker/y.asahi6412) talking about [porting portions of a Fortran plasma simulation library](https://youtu.be/-Qevn9vLD9A) to C++/Kokkos. The approach uses with C bindings and identified memory access as primary performance concern.

Additional sessions addressed specialized performance and scaling issues.

An [in-kernel inference library (PONNI)](https://youtu.be/UbYjvU2RV4M?si=vxWpyKywGr23MM3i) was presented by [Matthew Norman](https://hpsf2026.sched.com/speaker/normanmr). In his performance testing `bfloat16` DRAM loads/stores were close in cost to float which should be further investigated.

[ExaCA performance optimization work](https://youtu.be/S-EwVNr-sVY) presented by [Matt Rolchigo](https://hpsf2026.sched.com/speaker/rolchigomr) described imbalance challenges in microstructure modeling. The talk also presented efforts to overcome the imbalance, but pointed to remaining scaling limitations.

[Daniel Holladay](https://hpsf2026.sched.com/speaker/danl9) ended the week with a [proposal for RangePolicy-compatible per-iteration scratch memory](https://youtu.be/oRSf1dds8x8) by discussing desired functionality and potential contributions into Kokkos.
