---
layout: minimal
authors: ["kokkos-team"]
title: "Kokkos on Godbolt"
date: "2026-10-23"
description: Kokkos is now available on Godbolt for C++ and Cuda
tags: ["Godbolt"]
thumbnail: img/blog/2026/2026-10-kokkos-on-godbolt.png
---

We're excited to announce that Kokkos is now available as a library on Godbolt for both C++ and CUDA.

This makes it easy to prototype designs, check whether code is portable to NVIDIA GPUs, and discuss ideas by sharing code that others can modify, compile, and run in seconds—without any setup.

We plan to keep the available Kokkos versions up to date so you can try new features, while retaining some flexibility about which versions we make available on Godbolt.

## Godbolt: A powerful tool

If you're not already familiar with Godbolt, this section is for you. If you already live on Godbolt, feel free to skip it.

[Godbolt](https://godbolt.org) is a website that lets you compile code in various languages quickly and easily. You simply start typing in the code window, and Godbolt automatically compiles your code with the compiler you select. You can view the assembly, run the code, inspect compiler output, and much more.

This makes Godbolt a useful tool for testing software designs, quickly checking assumptions about how code behaves, and more. You can share anything you type using a special link, making it easy to involve others in your work.

You can select compiler versions and languages, add compiler flags, and even edit code in Vim mode.

But there's more: crucially, Godbolt lets you load libraries. Just click the book symbol and choose from the vast list of available libraries!

It made your day, didn't it?

There are many great resources about Godbolt. Check them out for more details.

## What can this be used for?

There are countless use cases, but if you need some inspiration, here are a few ways we use Godbolt on the dev team:

- Discuss a problem precisely—for example, an issue with a PR, our API, or a design—in a way that's easy to share
- Check our assumptions about what works and how code behaves
- Create small reproducers
- Investigate whether a reported problem depends on the version

## Kokkos on Godbolt for C++

If you use C++ on Godbolt, you've been able to load Kokkos as a library for quite some time. We never publicly announced it, but the dev team has been using it extensively.

It lets us quickly reproduce simple failures, express precisely what we mean in PR discussions, and check our assumptions about what our interface allows.

What's new is that you can now choose from a wide variety of versions. The last version with the legacy `View` implementation (4.6.02), the last version of Kokkos 4 (4.7.04), and the new major version, Kokkos 5, are all available.

This makes it easy to explore migration paths for code that uses deprecated functionality. Just put a reproducer in Godbolt and switch between versions.

> [!NOTE]
> This version of Kokkos uses the `SERIAL` backend, with no host architecture specified.
> This also means that the `Simd` sublibrary of Kokkos on Godbolt may differ from what you get when you compile Kokkos with a host architecture specified.
> Depending on the compiler and Kokkos version, you may need to specify the C++ standard—for example, with `-std=c++20`.

## Kokkos on Godbolt for CUDA

This is the newest addition, and we think it's particularly useful.

If you select `CUDA C++` as the language on Godbolt, you can now also select Kokkos with the `CUDA` backend enabled in the library window.

When you do, you'll get Kokkos built with `Kokkos_ARCH_TURING75=ON`, regardless of the architecture listed in the compiler selection window. Fewer versions are available than for the host-only `C++` version of Kokkos, but the list includes 4.7.04.

> [!NOTE]
> Currently, this works only with `nvcc >= 13.0`. You'll need to specify the C++ standard with `-std=c++20`.
> Additionally, to run the program on Godbolt, you'll need to link the CUDA runtime with `-lcuda`.
> The host backend is `SERIAL`, and no host architecture is specified.

## Which versions of Kokkos will be available in the future?

Now that the initial integration is complete, we plan to keep the Kokkos versions available on Godbolt up to date. That doesn't mean we'll publish every bug-fix release immediately.

Godbolt needs resources to build and store the libraries, and maintainers need time to review and merge pull requests. We're grateful for the opportunity to integrate Kokkos on Godbolt.org. We'll decide which versions to make available based on new features and the status of bug-fix releases.

## Got feedback or want a version added?

Just [contact us](contact.md) using whichever method works best for you. We'd love to hear your feedback!

If you'd like a specific version added to Godbolt, or want to see Kokkos made available with HIP or SYCL, let us know.
