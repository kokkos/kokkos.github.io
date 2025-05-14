---
authors: ["kokkos-team"]
title: "Field report for the Kokkos User Group Meeting 2025"
date: 2025-05-09
tags: ["blog"]
thumbnail: img/blog/2025/KUG2025-1.jpg
---

The Kokkos User Group (KUG) Meeting 2025 took place in Chicago, IL, from May 7th to 8th, 2025, as part of the inaugural High Performance Software Foundation (HPSFcon) conference.
The meeting brought together researchers, developers, and HPC professionals interested in the Kokkos ecosystem.
The full schedule including slides and recordings can be found [here](https://events.linuxfoundation.org/hpsf-conference/program/schedule/) (you can filter with the "Kokkos User Group Meeting" option.

{{< image src="img/blog/2025/KUG2025-4.jpg" style="float: center; height=10">}}

# Day 1: 
The first day of the KUG Meeting kicked off with essential updates from the core Kokkos development team.
These updates covered the roadmap for the Kokkos ecosystem, including progress towards the anticipated Kokkos 5 release slated for Summer 2025, which will require a C++20 compiler.
Besides the technical updates, this session highlighted how much the Kokkos community has diversified since the last user group meeting, and, in particular, how much CEA has become a major contributor to the ecosystem.

Following the updates, the focus shifted to practical applications of Kokkos in the "Kokkos in Applications" session.
Here, users from various domains presented their work, highlighting how they are leveraging Kokkos to achieve performance portability and tackle complex computational challenges.
Many of the talks provided feedback to the Kokkos team on areas where improvements need to be made - with the most prominent one being the default performance of `MDRangePolicy`, a sore point for several presenters.

The afternoon continued with a session dedicated to "Adopting Kokkos," which featured talks and discussions centered around strategies, best practices, and lessons learned when integrating Kokkos into existing or new projects.
Several of the talks discussed the integration of Kokkos into Fortran-based applications, which is an approach taken by Los Alamos National Laboratories, but was also used to demonstrate a path forward for NOAA's weather applications.
Another highlight was a presentation of integrating the memory management library Umpire with Kokkos. This had particular relevance since the lack of native Kokkos support for memory pools was mentioned by a number of presenters.

The day concluded with a dynamic lightning talks session, offering a series of short presentations on a diverse range of Kokkos-related topics. This format allowed for a broad overview of ongoing work and emerging ideas within the Kokkos community.

{{< image src="img/blog/2025/KUG2025-2.jpg" style="float: center; height=10">}}
#
{{< image src="img/blog/2025/KUG2025-group.jpg" style="float: center; height=10">}}

# Day 2
The second day broadened the scope to the wider "Kokkos Ecosystem".
This session included presentations on libraries and tools that extend the core Kokkos functionality, including the integration of performance tuning capabilities, the creation of a Kokkos-FFT library, and status updates on pyKokkos.

The meeting then delved into the critical aspects of "Tuning and Performance," where attendees shared techniques, methodologies, and insights for optimizing Kokkos-based applications to achieve peak performance on diverse hardware architectures.
This included a discussion of the use of SIMD in SPECFEM++ as well as deep dive into the Kokkos tools callback interface.

The session was followed by a number of presentations on "Algorithms," showcasing how specific algorithms are being implemented and optimized using Kokkos' parallel programming models.
One highlight was the use of Kokkos in expression template programming for Lattice QCD methods. Not for the faint of heart, but a powerful approach for extremely expressive algorithm composition.
We also had one of the principal developers of PETSc report on his use of Kokkos, demonstrating the impact Kokkos has on some of the most well-known and long-established HPC projects.

The KUG Meeting ended with a panel discussion, bringing together Kokkos developers, application experts, numerical toolkit developers, and educators.
The panel discussed key challenges and future directions, and answered questions from the audience, providing valuable insights and fostering a deeper understanding of the Kokkos landscape.

{{< image src="img/blog/2025/KUG2025-3.jpg" style="float: center; height=10;">}}
#
{{< image src="img/blog/2025/KUG2025-Team.jpeg" style="float: center; height=10;">}}
