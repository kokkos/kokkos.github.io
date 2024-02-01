---
authors: ["kokkos-team"]
title: Kokkos User Group Meeting 2023
date: "2024-01-17"
tags: ["blog", "KUG"]
thumbnail: img/kokkos-blog-post-5_a.jpg
---

## In a nutshell

We held the second Kokkos User Group meeting in Albuquerque from December 12th-15th, 2023.
Because of the pandemic, this was almost five years since we had the first one.

### Day 0

The Kokkos team got together, some of us meeting in person for the first time!
It was great to finally put names to faces.

{{< image src="img/kokkos-blog-post-5_c.jpg" style="float: center; height=10">}}

### Day 1

This was our time to meet the community and for the community to meet us.

The morning started out with updates on the state Kokkos Core and Kokkos Kernels on various exascale architectures,
followed by build system updates to Kokkos Core.

One big topic is the future of Kokkos, now that ECP is over.
As announced at [SC23](https://sc23.supercomputing.org),
the Linux Foundation is forming the
[High Performance Software Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-intent-to-form-high-performance-software-foundation-hpsf)
with Kokkos being one of the initial projects being transferred over to it.
We are still figuring out how the project is going to be governed.

After a break we went over Kokkos Kernels updates, covering batched algorithms, ML/IR, mixed precision and GEMMA.

During the afternoon the first set of community talks were presented.  These included:
* CExA (GPU computing at CEA)
* Entity (General coordinate (QED)(GR)PIC Code for high-energy plasma-astrophysical simulation)
* Benchmarking LQCD (Lattice Quantum Chromodynamics) applications
* Performance Portability for LAMMPS and SPARTA
* Profiling the Performance of Albany Land-Ice (ice sheet model for Earth)
* Cabana (Kokkos+MPI library for particle/particle-grid simulation)
* FFT Interface for Kokkos
* Radiation Hydrodynamics (Astrophysics)
* Kokkos Sorting in ArborX: Experience, Limitations and an Ideal Future
* Integrating PETSc (Portable, Extensible Toolkit for Scientific Computation) with Kokkos (solvers, optimizers, etc.)
* Direct Measurement of Numerical Accuracy



### Day 2

The morning started out with the Kokkos 4.2 Release Briefing, for both Kokkos Core and Kokkos Kernels,
followed by more community talks (mainly on Fortran):
* Alegra/NG
* ADIOS2 (Framework for large-scale I/O storage/streaming)
* xRage (LANL ASC multiphysics code) - Moving a Fortran code to GPUs with Kokkos
* Porting Fortran-based NWP (Numerical Weather Prediction) code to Kokkos with the Fortran Compatibility Layer

In the afternoon, we talked about Kokkos Tools, Kokkos Resilience and Kokkos Remote Spaces,
followed by related community talks:
* Kokkos support in TAU and APEX Performance Measuring Tools
* Memory Management and Profiling with Kokkos: A Trilinos Case Study
* Using Kokkos in Template Task Graphs
* DDC (Discrete Domain Computation) Library


### Day 3

This morning we went over Kokkos Core directions, including SIMD, std::algorithms, instances/asynchronicity, support policies and
experimental backends.  More community talks:
* Use of Kokkos for imaging with radio interferometric telescopes
* Implementing a radio camera using Kokkos
* Parthenon: Adaptive Mesh Refinement for Exascale Astrophysics
* Performance Boosting Portable Acceleration of SISSO++ for Symbolic Descriptor Learning via Kokkos
* Kokkos for additive manufacturing simulations

In the afternoon, we covered Kokkos Core and Kokkos Kernels improvements now in place,
including our new additions to ISO C++, new documentation, Compiler Explorer (Godbolt) support,
multiple reducers, and nested MDRange policies, along with the streams interfaces of spiluk and sptrsv 
as well as ODE time integrators.  And then the final set of community talks:
* ArborX (Geometric Search Library)
* Moving Least Squares
* A Performance Portability Study Using Tensor Contraction Benchmarks
* SPECFEM++: Modular implementation of spectral element method

{{< image src="img/kokkos-blog-post-5_d.jpg" style="float: center; height=10">}}

### Day 4

This was feedback day, where both the Kokkos team discussed some future plans and the community told
us how we can improve.  This has given the Kokkos Team lots to think about as we go forward.

#### Kill master branch
A vote was taken on changing the default to develop: 24 in favor, 7 neutral and 2 against.

#### MPI interoperability
There is an [ACM](https://dl.acm.org/doi/pdf/10.1145/3615318.3615321) article about offering an MPI interface for Kokkos.
The discussion brought up a number of points:
* Are folks interested in a Kokkos interface to MPI that takes a `View` instead of a raw pointer
* How should we do it: `deep_copy`, copy to CPU, use MPI types, etc.
* Should it be separate from Kokkos core
* Should it try to get better performance than raw MPI, such as using things like nvshmem
* Can the offical MPI specification handle `mdspan`
* It should be able to discover what devices are available on each node
* It would be nice to have a canonical way to serialize a `View`
* Implicit optimizations under the hood shouldn't break expectations or code

#### FFT
We've needed one for years.
* Wrap a single node / device, like cuFFT, rocFFT, FFTw
* Offer multi-node FFTs, like heFFT.  However, this requires MPI, which is a different target

#### Kokkos ecosystem
* Adding a new third-party library is a hassle
* Could Kokkos offer a singe meta-package that includes all the ecosystem
  * This sounds a bit like re-implementing spack
  * The choices made for the package would not be the correct ones for everyone
  * The experience in Trillinos is that it is quite difficult to handle
    * Having too many package in the ecosystem does not scale
    * Should all packages follow the release cycle
    * What are the rules for the ecosystem
    * Tight coupling of packages is hard to manage
* If a package is part of Kokkos, it discourages alternatives
  * But that does help to get collaboration
* Maybe a hierarchy of tightly coupled projects and loosely coupled projects
* Maybe a list of external libraries based on Kokkos
  * Maybe a way for projects to be marked as such
  * Automated by P/R

#### Algorithms
* The C++ standard is not ideal, as it uses a pair of iterators
  * Kokkos range-like interface is better
* For min-max a reduction is a better solution
* How do we generalize it, as there are many algorithms
  * Lazy submission (long term)
* Explore using pipes with range-based algorithms
* How much should we diverge from the standard
  * The standard doesn't know about GPUs, so some divergence is expected
  * We don't want suboptimal code
  * We should eventually propose additions to the standard
* Should Kokkos make it difficult to use the inefficient versions of algorithms

#### Misc
* Virtual device backend as a debugging facility
  * All attempts to provide it have failed so far :-(
* `MDRange` for Rank-1
  * We will do it
* More than 7D view
  * A good idea but lots of work to do it and to do it efficiently
* Deterministic random number generator for Cuda
  * Possible
  * Getting good random numbers is hard
  * Maybe a bad one as well for debugging purposes
* Memory pools
  * How to make Umpire available to Kokkos applications
* Support kernel pipelining
  * What about more complex dataflows
* SYCL style dependency detection
  * Hard to do as it prevents encapsulation
* Per thread scratch memory for `MDRange`
  * Could be expensive
* Access allocation label on GPU for debugging
  * Could be extremely expensive
  * Leads to different ABI for debug vs. non-debug builds
* Optimized indexing in many `View`s with the same shape
  * Maybe with `mdspan` where an external mapping could be shared

#### Pain points
* Reduction over a subset of dimensions
  * Not an `MDRange`
  * Extremely difficult to offer something with decent performance
* Typelist with all available execution spaces
  * Useful to instantiate something on all backends
* Global device symbol
  * Not possible on all backends
  * Very messy on backends where it is possible
* Clarify blocking status
  * We should do this
* `deep_copy` restrictions should be documented
  * Improving documentation always a good idea

#### Makefile
* Can we remove it
  * LAMMPS Makefile build system would need to go
  * Only supports building Kokkos inline with the application
  * Can we depend on CMake to be available

#### CMake
* How should CMake understand Cuda/HIP: language or compiler wrapper
  * Has to be language on Windows
  * CMake doesn't support multi-langugage well

#### Containers
* Hard to maintain
* Who is the audience
  * Kokkos ecosystem CI
    * Maybe just share those Dockerfiles without Kokkos
  * Tutorials
  * Onboarding new users
  * Run on supercomputers
    * Charlycloud, podman or singularity might be better

#### Tutorials
* Are they useful compared with videos?
  * In-person makes it possible to ask questions
  * Half-day os too short
  * Open question on dealing with folks at various levels of knowledge
  * Maybe 1 day for beginners, 1 day for advanced and 1 day for questions
  * Beginners might do better with a hackathon


## Closing thoughts

For those looking for slides, they can be found at [https://github.com/orgs/kokkos/projects/6/](https://github.com/orgs/kokkos/projects/6/).
Videos of the sessions will (eventually) be available as well.

