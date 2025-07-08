---
authors: ["kokkos-team"]
title: "Aligning Our Numbers: Kokkos Adopts Semantic Versioning with v5.0"
date: "2025-07-08"
tags: ["2025", "5.0"]
thumbnail: img/blog/2025/semver-in-5x-series.png
---


**TL;DR: Starting with the Kokkos 5.x series, we're officially aligning with
[Semantic Versioning (SemVer) 2.0.0](https://semver.org). This means our patch
versions will now look like `5.X.Y` instead of `5.X.0Y`, getting rid of that
leading zero that wasn't quite SemVer-compliant**

For years, the Kokkos team has strived for consistency in our versioning, even
when it meant sticking to some unconventional numbering. Since the `2.8.00`
release in 2019, you might have noticed our patch versions featured a leading
zero (e.g., `4.6.01`). This format was an attempt to maintain continuity with
earlier practices.

While we maintained this scheme out of a desire for consistency and concern for
potentially breaking downstream scripts, it has led to many questions over the
years. Frankly, most of us on the development team weren't fond of it either!

The community's feedback, combined with our commitment to making Kokkos as
user-friendly as possible, has driven this decision. Adopting this aspect of
SemVer will provide clearer, more predictable version numbers for you, our
users.

---


### Our Versioning Strategy Going Forward

With this alignment, we would like to reiterate how we handle major, minor, and
patch releases, ensuring our numbering clearly communicates the nature of
changes within Kokkos:

* **Major Releases (X.y.z):** A bump in the major version (e.g., from 4.x to 5.x)
  continues to indicate **backward-incompatible changes**. In Kokkos, this
  typically means:
  * **Bumping the minimum C++ standard requirement** (e.g., C++20 for Kokkos 5.0).
  * **Updating minimum compiler and toolchain requirements.**
  * **Removing features that had been deprecated** in previous release series.
    (You can already test this behavior today by configuring your 4.x series
    build with` -DKokkos_ENABLE_DEPRECATED_CODE_4=OFF`.)

* **Minor Releases (x.Y.z):** A bump in the minor version (e.g., from 5.0.x to
  5.1.x) signifies **new features and/or significant improvements** that are
  **backward-compatible** with the previous minor versions within the same major
  series. Your existing code should continue to work.

* **Patch Releases (x.y.Z):** A bump in the patch version (e.g., from 5.0.0 to
  5.0.1) will now strictly indicate **backward-compatible bug fixes and minor
  performance enhancements**. This is where you'll see the direct effect of
  removing that stray leading zero, moving from `5.0.01` to `5.0.1`, `5.0.2`,
  and so on. These updates are generally safe and recommended for all users.


---

We believe this move, while seemingly small, significantly enhances clarity and
adheres to a widely recognized industry standard. This change is part of our
ongoing effort to make Kokkos the most robust and user-friendly performance
portability ecosystem for the HPC community.

We're excited about Kokkos 5.0 and the future it brings, both in terms of
features and clarity. As always, we encourage you to read the detailed release
notes for every update.

Stay tuned for more updates on Kokkos 5.0!
