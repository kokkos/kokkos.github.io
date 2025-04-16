---
authors: ["kokkos-team"]
title: "Kokkos::View meets std::mdspan"
date: "2025-04-11"
tags: ["2025", "View"]
thumbnail: img/blog/2025/view-impl-bridge.jpg
---

After a significant development period, we have successfully merged the refactored implementation details of `Kokkos::View`, which now utilizes the capabilities of `std::mdspan` at its core.

This substantial rework essentially involved a complete rewrite of `Kokkos::View`. We've removed thousands of lines of intricate code, much of which predates Kokkos' availability on GitHub, and replaced it with a modern foundation.

While our goal is to maintain user-visible behavior (with a few exceptions noted below), a change of this scale is likely to reveal gaps in our test coverage as it encounters the diverse range of use cases within the Kokkos community.

Therefore, we kindly request your assistance in testing this major update:

* **Functionality Testing:** Please report any unexpected changes in behavior you observe on the latest `develop` branch. Your feedback will be invaluable in helping us identify and address these issues.
* **Performance Testing:** We encourage you to try the `develop` branch and compare its performance against the 4.6 release. Please let us know if you identify any performance regressions.
* **Compile Time Testing:** Kindly compare the compilation times of your code with and without the new `View` implementation and share your findings with us.

To facilitate testing, we have temporarily introduced an option, `Kokkos_ENABLE_IMPL_VIEW_LEGACY`, which allows you to switch between the old and new `View` implementations. This option defaults to `OFF` unless you are compiling with GCC 8 or GCC 9.

Given that the new `View` implementation takes advantage of more contemporary C++ features, we are particularly interested in hearing about your **experiences using C++20** and compilers that meet the minimum requirements for the upcoming Kokkos 5.0 release.

### Known Issues

* Trilinos Sacado is currently not supported.
    * Specifically, code that relied on internal customization points of `View` will no longer function.
    * We anticipate rewriting Sacado before the release of Kokkos 4.7.
* Significant increases in compile time and memory consumption during compilation with GCC 8 & 9.
    * By default, the old `View` implementation is used for these compilers.
    * We do not plan to address this, as these compilers will not meet the requirements for Kokkos 5.0.
* `__ldg` loads are not yet utilized when the `RandomAccess` memory trait is provided.
    * We expect this to be implemented before the release of Kokkos 4.7.
* Software compiled in Debug mode (without optimization) exhibits a noticeable performance slowdown.
    * We believe the scope for improvement here is limited. If this presents a significant concern for your workflow, please inform us.

### Rationale Behind This Change

The previous implementation of `View` had become quite complex and challenging to maintain, deviating from several software design best practices.

The design of `std::mdspan` benefited from the lessons learned from the mistakes made in `View` and extensive feedback from the ISO C++ committee, leading to  improvements across the board.

Leveraging this superior design not only streamlines our internal `View` implementation but also paves the way for `Kokkos::View` to expose the same public customization points as `std::mdspan`. This will enable the implementation of features like Trilinos' Sacado without resorting to partial specialization of classes considered internal implementation details of `View`. Furthermore, these customization points will be exceptionally well-defined, aligning directly with those of `std::mdspan`.

Thank you for your ongoing support and contributions!

The Kokkos Team.

