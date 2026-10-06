<!--
  Thanks for registering your application with Kokkos! If you'd rather not touch
  Git, you can file this as an issue instead using our application issue form:
  https://github.com/kokkos/kokkos.github.io/issues/new?template=register-application.yml
-->

## Registering a new application or library

- [ ] Added `content/community/applications/<slug>.md` (one file per application,
      see existing files in that directory for examples, or run
      `hugo new community/applications/<slug>.md` to scaffold one; the
      [contribution guide](https://kokkos.org/community/applications/contributing/)
      describes every field)
- [ ] Front matter includes all required fields: `title`,
      `entryType` (`application` or `library`), `area` (a list), `institution`, `status`, `contactName`, `contactEmail`
      (`institution` is a list, e.g. `institution: ["Sandia", "NREL"]`, to
      support multi-institution collaborations)
- [ ] Front matter includes at least one of `source` (GitHub/GitLab/Bitbucket
      repo URL), `website`, or `documentation` — these show up as icon links
      on your page. Not needed for private/proprietary projects, which set
      `availability: "Restricted"`
- [ ] I am allowed to list this project, its name and its institution publicly
      (including any institutional release review). No classified information
      is included
- [ ] `area` and `libraries` only use values from `data/registry.yaml` (to
      add a value, edit that file in this same pull request)
- [ ] (Optional) `libraries` lists the libraries you build on top of, e.g.
      `libraries: ["kokkos-kernels", "kokkos-fft", "petsc"]` — shown as
      badges on your page and in the applications table
- [ ] (Optional) Added a logo/screenshot under `assets/img/applications/<slug>/`
      and referenced it in the page body with `{{</* image src="img/applications/<slug>/<file>" */>}}`
      (or linked an image from your own repository with a permanent, commit-pinned
      URL; see the contribution guide)
- [ ] Previewed locally with `hugo server -D` and confirmed the entry shows up
      on the [Applications](https://kokkos.org/community/applications/) page
