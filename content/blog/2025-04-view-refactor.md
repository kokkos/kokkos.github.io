---
authors: ["kokkos-team"]
title: "Kokkos::View meets std::mdspan"
date: "2025-04-11"
tags: ["2025", "View"]
thumbnail: img/blog/2025/view-impl-bridge.jpg
---

After a long long time in the works, we finally merged the refactor of the
`Kokkos::View` implementation details, which moves its underpinnings to
leverage `std::mdspan` capabilities.

This rework is essentially a complete rewrite of `Kokkos::View` throwing out
thousands of lines of complicated code (lots of it dating back to before Kokkos
was available on GitHub), and replacing them with something new.
While the intent is that no user visible changes (with some exceptions noted below)
occur, a change of this magnitude is bound to uncover gaps in our test-coverage
once exposed to the wide range of use-case scenarios found in the Kokkos community.

To this end we ask our community for help:
* **Functionality Testing**: please report to us if you observe breaking behavior
change with the latest `develop` branch, and help us iterate on addressing those.
* **Performance Testing**: try the `develop` branch out and compare to the 4.6
release to identify performance regressions.
* **Compile Time Testing**: please compare compile times of your code with and without
the new `View` implementation and report back to us.

To help with testing these changes we introduced temporarily the ability to switch
between the old and the new `View` implementation using the option `Kokkos_ENABLE_IMPL_VIEW_LEGACY`.
The default for this option is `ON` unless you compile with GCC 8 or GCC 9.

Since the new implementation of `View` leverages a lot more modern C++ features,
we are particular interested to hear about **experiences when using C++20** and thus
compilers which meet the minimum requirements for the upcoming Kokkos 5.0 release.

### Known Issues

* Trilinos Sacado is not currently supported
  * i.e. code that relied on implementation detail customization points of `View` will not work anymore.
  * we expect to rewrite Sacado before Kokkos 4.7 is released
* Significant compile time increase and increase in memory consumption during compilation with GCC 8 & 9
  * we by default use the old View implementation for these compilers
  * we do not intend to try and fix this, since these compilers will be invalid for Kokkos 5.0
* `__ldg` loads are not yet used when providing the `RandomAccess` memory trait.
  * we expect this to be implemented before Kokkos 4.7 is released
* Software compiled in Debug mode (without optimization) runs noticable slower
  * we don't think we can do much about this, if this is a serious concern please let us know

### Why we did this

The legacy implementation of `View` was somewhat of a mess - to use a technical term.
It violated many best practices of software design and was getting harder and harder to maintain.

For the design of `std::mdspan` we learned from our mistakes and with the help of a lot of feedback from the
ISO C++ committee ended up with a design that is superior in every way.

Leveraging this design not only cleans up our internal `View` implementation, but also opens up the
path for `Kokkos::View` to expose the same public customization points `std::mdspan` has.
This will make it possible to implement capabilities such as Trilinos' Sacado without partial specialization
of classes we consider implementation details.
It also means that these customization points are extremely well specified, since they are the same as in `std::mdspan`.

Thank you for your continued support!

The Kokkos Team.
