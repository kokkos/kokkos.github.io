---
authors: ["kokkos-team"]
title: Kokkos Features as the On-Node Programming Model in the Code Winning the 2023 ACM Gordon Bell Prize for Climate Modelling
date: "2023-11-18"
tags: ["blog"]
thumbnail: img/kokkos-blog-post4_a.jpg
---

## In a nutshell

At SC23, the Association for Computing Machinery (ACM), awarded the [inaugural ACM Gordon Bell Prize for Climate Modelling for their project](https://awards.acm.org/bell-climate) to `The Simple Cloud-Resolving E3SM Atmosphere Model (SCREAM) Running on the Frontier Exascale System`.

SCREAM is a cloud-resolving global atmosphere model with state-of-the-art
parametrizations for microphysics, moist turbulence and radiation.
The team, composed of nineteen members from a diverse set of institutions including
several national labs, has made a great effort to develop SCREAM from scratch in C++.

To do this, they relied on the Kokkos library as the programming model for the on-node computations.
All the multi-dimensional fields in SCEAM are stored as [`Kokkos::Views`](https://kokkos.github.io/kokkos-core-wiki/API/core/view/view.html), and loops
implemented using [`Kokkos::parallel_for`](https://kokkos.github.io/kokkos-core-wiki/API/core/parallel-dispatch/parallel_for.html)
constructs, specifically leveraging the [`TeeamPolicy`](https://kokkos.github.io/kokkos-core-wiki/API/core/policies/TeamPolicy.html).

This enabled them to achieve on-node performance portability and deliver a code
that is the first simulating such model to run on both AMD GPUs and NVIDIA GPUs.
Moreover, complementing the Kokkos-based on-node component with
the Message Passing Interface (MPI) for the inter-node communication, allowed them to run
the code on (nearly) an entire Exascale system (Frontier).


## The ACM Gordon Bell Prize for climate modelling

This award aims to ["recognize innovative parallel computing contributions toward solving the global climate crisis. Climate scientists and software engineers are evaluated for the award based on the performance and innovation in their computational methods."](https://awards.acm.org/bell-climate).

This is the first year that ACM awards this ... **FINISH**


## Why is this a major achievement?

Perhaps the best way to answer is the quote Mark Taylor, the leading author of
the [paper winning the prize](https://dl.acm.org/doi/pdf/10.1145/3581784.3627044),
and chief computational scientist for E3SM:
"We have created the first global cloud-resolving model to simulate a world’s year of climate in a day".
His sentence highlights two key aspects of this work, namely a scientific and computational one.
On the scientific side, SCREAM provides a model with state-of-the-art
parametrizations for microphysics, moist turbulence and radiation.
On the computational side, it is the first code to break the 1 simulated *year* per wallday (SYPD)
by running on nearly an entire Exascale system (Frontier).
Building a global cloud-resolving models (GCRMs) surpassing 1 SYPD is a climate science grand
challenge, that the authors have achieved.

**FINISH**


## Representative plot from their SC23 paper

{{< image src="img/kokkos-blog-post4_b.png" style="float: center; height=10">}}

Extracted from: https://dl.acm.org/doi/pdf/10.1145/3581784.3627044

Strong scaling results of the 3.25 km configuration of SCREAM v1 without I/O.
Throughput measured in simulated-days-per-day, plotted as a function of compute nodes on the exascale system Frontier.
The plot shows the performance based on time spent in the atmosphere component.
The plot shows the throughput of their baseline code on Summit (red curve) and Frontier (green curve)
as well as the improvements obtained from the targeted GPU optimizations (blue curve).
The yellow line shows the 1 SYPD performance target.


### References

- https://www.hpcwire.com/2023/04/07/frontier-supercomputer-powers-scream-climate-model/

- "The Simple Cloud-Resolving E3SM Atmosphere Model Running on the Frontier Exascale System",
Mark Talor et al., SC'23: Proceedings of the International Conference for High Performance Computing, Networking, Storage and Analysis, Nov. 2023 (https://dl.acm.org/doi/10.1145/3581784.3627044)