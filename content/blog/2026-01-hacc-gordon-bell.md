---
authors: ["kokkos-team"]
title: Kokkos powers large-scale analysis in a Gordon Bell Prize finalist
date: "2026-01-16"
description: ArborX, built on Kokkos, powers the in-situ cluster analysis of CRK-HACC, a finalist for the 2025 ACM Gordon Bell Prize.
tags: ["blog"]
thumbnail: img/blog/2026-arborx/thumbnail_alt.png
---

CRK-HACC's "Cosmological Hydrodynamics at Exascale: A Trillion-Particle Leap in
Capability" was a finalist for the 2025 [ACM Gordon Bell
Prize](https://awards.acm.org/bell), which recognizes outstanding achievement
in high-performance computing. The work was presented at SC25. Its in-situ
analysis relies on [ArborX](https://github.com/arborx/ArborX), a library built
on Kokkos.

CRK-HACC, a premier cosmological hydrodynamics code built for extreme
scalability, executed Frontier-E: a four trillion particle full-sky simulation,
over an order of magnitude larger than previous efforts. The run achieved 513.1
PFLOP/s peak performance, processing 46.6 billion particles per second and
writing more than 100 PB of data in just over one week of runtime.

The achievement was possible in part due to in-situ analysis capability. A
central component of this pipeline is the support for clustering-based analysis
methods, including DBSCAN (Density-based Spatial Clustering of Applications
with Noise) halo finding and SOD (Spherical Overdensity). Cluster finding is
computationally intensive, requiring efficient spatial search and neighborhood
queries across potentially hundreds of millions of particles per rank.

To enable this at scale, the team relied on the publicly available ArborX
library, which provides GPU-native spatial indexing and traversal routines.
ArborX uses [Kokkos](https://kokkos.org) for all of its parallel constructs and
data structures. The team ran simulations on some of the top supercomputers in
the world, including Frontier (AMD GPUs), Perlmutter (NVIDIA GPUs), and Aurora
(Intel GPUs).

The main index in ArborX is a bounding volume hierarchy (BVH). A BVH is a tree
structure created from a set of objects in a multi-dimensional space. Fast BVH
construction algorithms use a space-filling curve (Z-curve) to improve the
spatial locality of the user data, followed by a single bottom-up construction
to produce a binary tree structure (hierarchy). ArborX was developed from
scratch using Kokkos as the on-node programming model. All the data in ArborX
are stored as Kokkos views, and all the parallel kernels are implemented using
Kokkos' parallel regions. The development is also guided by using Kokkos native
profiling tools, as well as connectors to the vendor provided toolkits.

{{< image src="img/blog/2026-arborx/analysis.png" caption="Time per step of the analysis for a production gravity-only cosmology simulation, with and without the ArborX optimizations (top), and the resulting speedup (bottom), up to about 2.5x on the steps where the analysis runs.">}}

{{< image src="img/blog/2026-arborx/scaling.png" caption="Strong (left axis, in red) and weak (right axis, in blue) scaling of the full application from 128 to 9,000 nodes on Frontier, with the lower panel showing efficiency relative to the ideal case. Weak scaling is presented in terms of the number of particles processed per second by the solver.">}}

### References

- ["ORNL largest-ever universe simulation up for supercomputing's highest prize"](https://www.hpcwire.com/off-the-wire/ornl-largest-ever-universe-simulation-up-for-supercomputings-highest-prize/), HPCwire
- Frontiere et al., ["Cosmological Hydrodynamics at Exascale: A Trillion-Particle Leap in Capability"](https://doi.org/10.1145/3712285.3771786), SC '25: Proceedings of the International Conference for High Performance Computing, Networking, Storage and Analysis, Nov. 2025
- Prokopenko et al., ["Advances in ArborX to support exascale applications"](https://doi.org/10.1177/10943420241298296), The International Journal of High Performance Computing Applications, 2024;39(1):167-176
