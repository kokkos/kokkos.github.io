---
layout: minimal
authors: ["kokkos-team"]
title: "Kokkos Graduates to HPSF Core Stage"
date: "2026-09-03"
description: The High Performance Software Foundation's Technical Advisory Council voted to graduate Kokkos from Established to Core Stage.
tags: ["HPSF"]
thumbnail: img/blog/2026/2026-09-hpsf-core-graduation.png
---

We're excited to announce that Kokkos has graduated to Core Stage in the [High
Performance Software Foundation (HPSF)](https://hpsf.io)!
Following a project review, HPSF's Technical Advisory Council (TAC) voted
unanimously to move Kokkos from the Established Stage to the Core Stage, the
highest of the three maturity stages a technical project can reach in the
foundation.

## From Established to Core

Kokkos [joined HPSF](/blog/kokkos-joins-hpsf/) as one of its founding technical
projects back in 2024, entering directly at the Established Stage.
Since then we have continued to grow our community, formalize our governance,
and broaden adoption of the Kokkos Ecosystem across the HPC landscape.

The Core Stage is reserved for projects that HPSF considers to be on a
sustaining cycle of development, maintenance, and long-term support: essential
to the HPC software ecosystem, widely used in production, and developed by a
broad, multi-institutional community.
To graduate, a project must, in addition to meeting all Established Stage
criteria:

* Have a defined governing body of four or more owners/core maintainers, with no more than half affiliated with the same employer, and no single institution controlling a voting majority.
* Have a documented, publicly accessible description of its governance, decision-making, and release processes.
* Have a healthy number of committers from at least two organizations.
* Have explicitly defined security reporting and incident mitigation processes.
* Provide evidence of widespread adoption in the HPC ecosystem.
* Receive a 2/3 majority vote from the TAC.

Our [project review](https://github.com/hpsfoundation/tac/issues/70)
highlighted the breadth of Kokkos usage across the Ecosystem: long-standing
production deployments at Sandia and Los Alamos National Laboratories
(including the Sierra code suite, Empire, and SPARC), open science codes such
as LAMMPS, Trilinos, E3SM, PETSc, and Viskores, and continued deployment at
CEA.
It also pointed to the sustained pace of development across our subprojects,
with hundreds of pull requests merged over the past year in Kokkos Core and
Kokkos Kernels alone.

The review also underlined the diversification of our contributor base.
CEA in particular has ramped up significantly and is now, alongside Sandia and
ORNL, one of the major institutional contributors to Kokkos.
We're hoping this trend continues, with more institutions joining in and the
contributor base growing even more diverse. A team is already taking shape at
Los Alamos National Laboratory, since one of the project leads recently joined
the lab.
A broader, more diverse contributor base makes Kokkos more resilient as a
project, and it's exactly the kind of evidence the TAC looks for when assessing
Core Stage criteria.

## Growing Beyond the Code

Meeting the Core Stage criteria required more than technical work.
To grow as a project, we had to learn to look beyond the code and software
engineering itself, and put real, intentional effort into the people side of
Kokkos: community building, governance, and broader outreach.
That meant stepping out of our comfort zone as developers and treating
community health as a first-class engineering concern.

On the technical side, that same push for rigor is what earned [Kokkos Core the
OpenSSF Best Practices "Passing" badge](/blog/openssf-passing-badge/) last
year, a badge Kokkos Kernels has since earned as well.
We also invested in ourselves: some of our project leaders took part in the
inaugural cohort of the [Birdaro Training
Program](https://www.cscce.org/2025/10/09/introducing-the-inaugural-birdaro-training-program-cohort/),
run by the Center for Scientific Collaboration and Community Engagement (CSCCE)
to help open-source research software leads build community engagement skills.
They shared what it taught them in their [Performance Portability for People: The Kokkos Community Playbook](https://hpsf2026.sched.com/event/2Ei96/performance-portability-for-people-the-kokkos-community-playbook-damien-lebrun-grandie-oak-ridge-national-laboratory-luc-berger-vergiat-sandia-national-laboratories) talk at HPSFcon 2026.

## Why This Matters

Core Stage status is a strong external signal of Kokkos's maturity, stability,
and community health.
It reflects years of investment by contributors across multiple national
laboratories, universities, and industry partners in building not just
performant software, but the governance, processes, and community practices
needed to sustain it for the long run.

For Kokkos users and downstream projects, this changes nothing about how you
use Kokkos day to day.
It does mean continued and deepened access to HPSF resources, mentorship, and
cross-project collaboration as we keep growing the performance portability
ecosystem together.

This is not the end of the road for Kokkos: there's always more to build, both
in the code and in the community around it. But it's a milestone worth pausing
to celebrate.
We want to thank the HPSF TAC for their thorough review, and every contributor
and stakeholder who helped Kokkos earn this milestone.

---

## Appendix: What the HPSF Stages Mean

HPSF projects progress through three stages: Emerging, Established, and Core.
These stages aren't a judgment of the intrinsic value or technical quality of a
codebase: plenty of excellent software can and does stay at the Emerging stage.
Instead, they reflect the health and maturity of a project *as a community*:
the size and diversity of its contributor base, the robustness of its
governance and development processes, and the breadth of its adoption.

{{< carousel id="carousel-1x1" ratio="1x1" class="col-sm-12 col-lg-6 mx-auto" >}}
  {{< img src="https://raw.githubusercontent.com/hpsfoundation/hpsf-logos/57728e26f1d9da1af10e81310e9decaaa326605d/Badges/HPSF_Project_Badge_Emerging.png" caption="Emerging" >}}
  {{< img src="https://raw.githubusercontent.com/hpsfoundation/hpsf-logos/57728e26f1d9da1af10e81310e9decaaa326605d/Badges/HPSF_Project_Badge_Established.png" caption="Established" >}}
  {{< img src="https://raw.githubusercontent.com/hpsfoundation/hpsf-logos/57728e26f1d9da1af10e81310e9decaaa326605d/Badges/HPSF_Project_Badge_Core.png" caption="Core" >}}
{{< /carousel >}}
