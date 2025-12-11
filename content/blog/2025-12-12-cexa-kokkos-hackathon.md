---
authors: ["kokkos-team"]
title: "CExA Kokkos Hackathon"
date: "2025-12-11"
tags: ["2025", "Hackathon"]
thumbnail: img/blog/2025/cexa_kokkos_hackathon.jpg
---

CExA organizes a Kokkos hackathon on January 12-16, 2026, at Maison de la Simulation (MdlS), Gif-sur-Yvette, France.

This training is two-fold.

- It first features a full-day course to discover Kokkos or refresh ones knowledge of the library.
- It then proposes a 3-day hackathon, where teams of participants eager to go get their hands dirty will get to know Kokkos by finishing the porting of a provided code to GPU, accelerating and optimizing it.

Trainees can choose to attend either or both parts. Computers with access to a local GPU cluster will be provided.

Registration is free but mandatory, there is a limit of 90 attendants for the course, and 45 attendants for the hackathon.
Registration is [over here](https://indico.math.cnrs.fr/event/15313/).

# The course

The course teaches the basis of Kokkos and of GPU programming.[^1]
The difference between CPU and GPU for numerical computation are highlighted.
The Kokkos data containers and parallel constructs are introduced.
Practical examples will be given live by the teacher.

## Outline

1. Introduction
2. Basic concepts of Kokkos
    1. Compilation
    2. Starting and compiling a Kokkos program
    3. Data container
    4. Parallel loops
    5. Extending loop policies
    6. Parallel reduction
3. Conclusion

# The hackathon

The hackathon is based on a lightweight version of MiniPIC,[^2] a pedagogic, single-node, particles-in-cell (PIC) solver developed by M. Lobet et al., CEA.[^3]
With the support of trainers including Kokkos developers and PIC optimization experts, the participants will team up in groups of three to port and accelerate a sequential version of the code, where Kokkos data containers and some Kokkos loops are already present.
Each team will profile it with Kokkos-tools and NVIDIA tools (namely, Nsight Systems and Nsight Compute), and optimize it with Kokkos features.
In the end the teams will compare the performance of their resulting code while keeping its accuracy.

## Outline

*Note that the following notions may be discussed during the hackathon depending on the progress of the teams.*

- Profiling and debugging;
- Atomic operations;
- Hierarchical parallelism.

# Pre-requisites

| Notion               | Course | Hackathon      |
|----------------------|--------|----------------|
| C++                  | Basic  | Basic          |
| Parallel programming | Basic  | Basic          |
| CMake                | Basic  | Basic          |
| Linux                | Basic  | Intermediate\* |
| Kokkos               | None   | Basic          |

\*use of SSH and submission of Slurm jobs.

[^1]: https://github.com/cexa-project/cexa-kokkos-tutorials

[^2]: https://github.com/Maison-de-la-Simulation/miniPIC

[^3]: https://www.sciencedirect.com/science/article/pii/S0010465525001493
