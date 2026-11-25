---
author: ["Andrey Prokopenko"]
title: "Introducing ArborX: Geometric Search for the Kokkos Ecosystem"
date: 2026-11-15
description: "ArborX official joins Kokkos ecosystem"
tags: ["blog"]
thumbnail: https://raw.githubusercontent.com/kokkos/ArborX/master/docs/logos/arborx_logo_v1.0.svg
---

Many scientific applications repeatedly ask a geometric question: Which
particles are close to this one? Which mesh elements intersect this region?
Which objects lie within a given radius? These queries show up in particle
methods, mesh workflows, molecular dynamics, astrophysics, ray tracing, and
clustering. As problem sizes grow, answering them efficiently—and across
different processors—becomes a substantial part of the application.

[ArborX](https://github.com/kokkos/ArborX) is an open-source C++ library for
performance-portable geometric search. It brings spatial indexing and search
algorithms to the Kokkos ecosystem, so Kokkos users can build these
capabilities into applications that target CPUs and accelerators without
writing a separate search implementation for each platform.

## From coordinates to useful neighbors

A common starting point is a collection of geometric objects and a collection
of queries. ArborX builds a spatial index over the objects, then uses that
index to answer questions such as:

- Which objects does this box/sphere/ray/etc intersect?
- Which objects are within a specified distance?
- Which objects are the nearest neighbors?

For example, a particle simulation can ask for all particles within a cutoff
radius of each particle. The resulting neighbor relationships can feed a force
calculation, collision check, or local analysis. The same basic search pattern
applies to different application domains, even though the objects and the work
performed for each match may differ.

ArborX includes spatial indexes and a range of geometric operations.
Applications can also provide callbacks to perform user-defined work when a
query matches an object. This lets search be more than a way to assemble a
list: it can serve as a step in a larger parallel computation. The library also
provides higher-level capabilities, including clustering algorithms and
distributed search using MPI.

## A natural fit with Kokkos

ArborX is built on Kokkos. Its data structures and algorithms use Kokkos’s
programming model and execution and memory spaces, which makes it possible to
use the library within a performance-portable application. The application can
keep its data in Kokkos Views and select the execution environment through the
same Kokkos configuration used elsewhere in the program.

That relationship is useful in practice. Geometric search often sits between
two parts of a simulation: data preparation and a compute-heavy kernel. With
ArborX, users can express the search with a library interface while keeping the
surrounding computation in their existing Kokkos code. This avoids embedding a
one-off tree or neighbor-search implementation in every application and helps
make the search stage portable along with the rest of the workload.

## Beyond a single node

Some search problems span multiple MPI ranks. ArborX includes distributed
search facilities for this setting, so applications can query spatial data
distributed across ranks. This is especially relevant when the geometry itself
is partitioned, as in large-scale particle and mesh calculations.

The library also includes clustering methods such as DBSCAN, with distributed
variants available. These algorithms turn proximity relationships into groups
of related points, a useful operation in scientific data analysis as well as
simulation workflows. As always, the right algorithm and configuration depend
on the application's data distribution and performance goals.

## Getting started

The project's [GitHub repository](https://github.com/kokkos/ArborX) links to
installation instructions, [interface
documentation](https://kokkos.org/ArborX/docs), examples, and contribution
guidance. ArborX is released under the BSD 3-Clause license. The [ArborX 2.0
paper](https://doi.org/10.1145/3772288) describes the library and its recent
development.

If your application already uses Kokkos and has a geometric search step, ArborX
may be a useful building block. Try an example that resembles your workload,
then adapt the geometry, query, and match processing to your application.
Questions, bug reports, and contributions are welcome through the project's
GitHub repository.

Geometric search is a small operation in some applications and a central
bottleneck in others. By making it a reusable part of the Kokkos ecosystem,
ArborX gives the community another way to express important scientific
computations once and carry them across a changing landscape of hardware.
