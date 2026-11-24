---
layout: minimal
authors: ["kokkos-team"]
title: "Introducing the Kokkos Application Registry"
date: "2026-11-20"
description: A searchable, community-maintained list of the applications and libraries that use Kokkos, and how to add yours.
tags: ["Community", "Applications"]
thumbnail: img/blog/application-registry-launch.jpg
---

# Introducing the Kokkos Application Registry

Kokkos is used in a wide range of codes, from large simulation frameworks to
small libraries and research prototypes. We hear about many of them at the
Kokkos User Group meetings, but that leaves a lot of people out of the
conversation for most of the year. Today we are launching the
[**Kokkos Application Registry**](/community/applications/) to change that: one
place to see what the community is building with Kokkos.

## What is in it?

The registry launches with **70 entries**, 55 applications and 15 libraries,
covering areas from molecular dynamics and climate modeling to astrophysics,
finite elements and linear algebra. Many were collected from a long-running
[GitHub issue, kokkos/kokkos#1950](https://github.com/kokkos/kokkos/issues/1950),
where users have been listing their applications in comments over the years.
Those entries now live here, with a page each.

Each entry has its own page with the project's area, institution and status,
plus links to its source code, website and documentation. The status tells you
how far along a project is with Kokkos: **Evaluating**, **Porting** or **In
production**.

The table on the [registry page](/community/applications/) is searchable. You
can filter it by type, area, status, the Kokkos ecosystem libraries a project
builds on (such as Kokkos Kernels), and availability.

## Why a registry?

- **Advertise your work.** A project that needs a solution you already built
  can find you and collaborate, instead of redeveloping the same thing.
- **See what the community is doing.** The registry lets all of us see, all year
  round, what we otherwise only see at user group meetings.
- **Show Kokkos' impact.** A visible record of who uses Kokkos, and for what,
  helps the project make the case to its sponsors for continued support.

## Private and proprietary codes are welcome

Not every project can have public source code. Entries can be marked
**Restricted** and do not need to link to a repository or website. If you work at
a laboratory or company, check that you are allowed to list the project, its
name and its institution publicly before submitting, and never include
classified information. Contact details are optional too: you can use a team
address or leave them out.

## Add your project

This is a partial list, and we would like it to grow. If you use Kokkos, please
add your application or library:

- fill in the [registration form](https://github.com/kokkos/kokkos.github.io/issues/new?template=register-application.yml),
  and a maintainer will create the page for you, or
- [open a pull request](https://github.com/kokkos/kokkos.github.io/compare?template=register-application.md)
  that adds a Markdown page for your project.

The [contribution guide](/community/applications/contributing/) describes every
field. Already listed? Open a pull request on your project's page to update it,
for example to move its status from Porting to In production.

We look forward to seeing what you are building.
