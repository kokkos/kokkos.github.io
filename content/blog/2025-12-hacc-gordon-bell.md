---
authors: ["kokkos-team"]
title: Kokkos powers large-scale analysis in a Gordon Bell Prize finalist
date: "2026-01-16"
tags: ["blog"]
thumbnail: img/blog/2026-arborx/thumbnail_alt.png
---

At SC25, the Association for Computing Machinery (ACM) announced `Cosmological
Hydrodynamics at Exascale: A Trillion-Particle Leap in Capability` project as
one of the six finalists of the annual [ACM Gordon Bell Prize](https://awards.acm.org/bell),
awarded for outstanding achievement in high-performance computing.

CRK-HACC, a premier cosmological hydrodynamics code built for extreme
scalability, executed Frontier-E: a four trillion particle full-sky simulation,
over an order of magnitude larger than previous efforts. The run achieved 513.1
PFLOPs peak performance, processing 46.6 billion particles per second and
writing more than 100 PB of data in just over one week of runtime.

The achievement was possible in part due to in-situ analysis capability. A
central component of this pipeline is the support for clustering-based analysis
methods, including DBSCAN (Density-based Spatial Clustering of Applications
with Noise) halo finding and SOD (Spherical Overdensity). Cluster finding is
computationally intensive, requiring efficient spatial search and neighborhood
queries across potentially hundreds of millions of particles per rank.

To enable this at scale, the team relied on the publicly available ArborX library,
which provides GPU-native spatial indexing and traversal routines. ArborX uses
Kokkos for all of its parallel constructs and data structures. The team ran
simulations on top supercomputers in the world, including Frontier (AMD GPUs),
Perlmutter(Nvidia GPUs), and Aurora (Intel GPUs).

The main index in ArborX is a bounding volume hierarchy (BVH). BVH is a tree
structure created from a set of objects in a multi-dimension space. Fast BVH
construction algorithms use a space-filling curve (Z-curve) to improve the
spatial locality of the user data, followed by a single bottom-up construction
to produce a binary tree structure (hierarchy). ArborX was developed from
scratch using Kokkos as the on-node programming model. All the data in ArborX
are stored as Kokkos views, and all the parallel kernels are implemented using
Kokkos' parallel regions. The development is also guided by using Kokkos native
profiling tools, as well as connectors to the vendor provided toolkits.

{{< image src="img/blog/2026-arborx/analysis.pdf" style="float: center; height=10">}}

Visualization of the performance impact of ArborX on analysis steps for a production gravity-only cosmology simulation.

{{< image src="img/blog/2026-arborx/scaling.pdf" style="float: center; height=10">}}

Strong (left axis, in red) and weak (right axis, in blue) scaling of the full
application from 128 to 9,000 nodes on Frontier, with the lower panel showing
efficiency relative to the ideal case. Weak scaling is presented in terms of
the number of particles processed per second by the solver.


### References

- https://www.hpcwire.com/off-the-wire/ornl-largest-ever-universe-simulation-up-for-supercomputings-highest-prize/
- "Cosmological Hydrodynamics at Exascale: A Trillion-Particle Leap in Capability", Frontiere et al., SC '25: Proceedings of the International Conference for High Performance Computing, Networking, Storage and Analysis, Nov. 2025 (https://doi.org/10.1145/3712285.3771786)
- "Advances in ArborX to support exascale applications", Prokopenko et al., The International Journal of High Performance Computing Applications. 2024;39(1):167-176. (https://doi.org/10.1177/10943420241298296)
