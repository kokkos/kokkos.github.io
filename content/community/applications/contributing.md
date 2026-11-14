---
title: Contributing to the registry
description: How to add your application or library to the Kokkos registry, or improve an existing page.
type: minimal
---

[&larr; Back to Applications](/community/applications/)

Anyone using Kokkos can add a project to the registry or improve an existing entry.

## Option 1: fill in the form

[Open the registration form](https://github.com/kokkos/kokkos.github.io/issues/new?template=register-application.yml). A maintainer creates the page for you. You can drag and drop a logo or screenshot into the form.

## Option 2: open a pull request

1. Fork [kokkos/kokkos.github.io](https://github.com/kokkos/kokkos.github.io).
2. Create `content/community/applications/<slug>.md`, or run `hugo new community/applications/<slug>.md` to scaffold it.
3. Fill in the front matter (see below) and open a pull request using the [registry PR template](https://github.com/kokkos/kokkos.github.io/compare?template=register-application.md).

To update an existing entry, edit its file in the same directory.

## Front matter reference

| Field | Required | Description |
|---|---|---|
| `title` | yes | Name of the application or library |
| `entryType` | yes | `application` or `library`; this is what makes the page appear in the registry |
| `area` | yes | List of one or more values from [`data/registry.yaml`](https://github.com/kokkos/kokkos.github.io/blob/main/data/registry.yaml), e.g. `["Molecular Dynamics"]` |
| `summary` | no | One-line description of what the project does |
| `institution` | yes | List, e.g. `["Sandia", "NREL"]` |
| `status` | yes | `Evaluating` (trying Kokkos), `Porting` (port in progress) or `In production` (used in production runs); see [`data/registry.yaml`](https://github.com/kokkos/kokkos.github.io/blob/main/data/registry.yaml) |
| `contactName`, `contactEmail` | yes | Shown on the project's page, not in the table |
| `availability` | no | `Open source` (default) or `Restricted` for private, proprietary or export-controlled projects |
| `source` | one of | Repository URL (GitHub, GitLab or Bitbucket) |
| `website` | one of | Project homepage |
| `documentation` | one of | Documentation URL |
| `lastVerified` | no | Date you last checked the page, e.g. `2026-11-08`. Helps readers spot stale entries |
| `libraries` | no | Values from the same file, e.g. `["kokkos-kernels", "petsc"]` |

At least one of `source`, `website` or `documentation` is required, unless `availability` is `Restricted`.

## Private and restricted projects

Closed-source codes are welcome. Set `availability: "Restricted"` to list one without public links; the table shows a lock icon next to the name, and visitors can filter on it. Before submitting, make sure you are allowed to list the project, its name and its institution publicly. Laboratory and company codes often need a release review first. Never include classified information; if you are unsure whether you may list a project, ask your institution first. If you prefer not to list a person, use a team or project address as the contact.

## Areas and libraries

`area`, `libraries`, `status` and `availability` only accept the values listed in `data/registry.yaml`, so the registry's filters stay consistent. A check on pull requests rejects anything else. If none of the areas fits, add a new one to that file in the same pull request, or mention it in the form's notes field and a maintainer will add it.

## Example

Use double quotes around text values, as below. They are required for values containing a comma, such as `"Mesh, I/O & Load Balancing"`. Leave dates like `lastVerified` unquoted.

```yaml
---
title: "LAMMPS"
entryType: "application"
area: ["Molecular Dynamics"]
summary: "Classical molecular dynamics code"
institution: ["Sandia"]
source: "https://github.com/lammps/lammps"
status: "In production"
lastVerified: 2026-11-08
libraries: ["kokkos-kernels"]
contactName: "Stan Moore"
contactEmail: "name@example.org"
---

{{</* application-details */>}}

Optional free-form description, images and links go here.

{{</* application-links */>}}
```

## Optional: logo or screenshot

Images go in the page body, below `{{</* application-details */>}}`. There are two ways to include one.

**Image stored in this repository.** Add the file under `assets/img/applications/<slug>/` and reference it with the site's `image` shortcode, which sizes and optimizes it:

```
{{</* image src="img/applications/<slug>/<file>" */>}}
```

**Image hosted in your own repository.** To avoid adding a binary to this repository, link to the image from yours, with plain Markdown:

```
![LAMMPS simulation snapshot](https://raw.githubusercontent.com/lammps/lammps/<commit-sha>/doc/src/JPG/<file>.jpg)
```

Use a permanent link, so the image doesn't break or change later:
- On GitHub, open the image, press <kbd>y</kbd> to switch the URL to a specific commit, then use the "Raw" link. The URL has a commit SHA in place of `main`.
- Don't use a branch name such as `main`, and don't use a URL from a pull request or issue comment, because those can change or expire.

Always give the image alt text, the part in square brackets, and keep external images reasonably small, since they are loaded straight from your repository.
