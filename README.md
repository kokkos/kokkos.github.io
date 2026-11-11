# kokkos.org

Source for the [Kokkos](https://kokkos.org) website, built with [Hugo](https://gohugo.io/) and the [Hinode](https://github.com/gethinode/hinode) theme via Hugo Modules.

## Requirements

- [Hugo](https://gohugo.io/installation/) (extended edition), version 0.136.3 or later
- [Go](https://go.dev/dl/) (for Hugo Modules dependency resolution)
- [Node.js](https://nodejs.org/) (for Dart Sass and PostCSS)

## Local development

```bash
npm install
hugo server
```

The site will be available at `http://localhost:1313`.

## Build

```bash
npm install
hugo --gc --minify
```

Output is written to `public/`.

## Deployment

The site is built and deployed to GitHub Pages by [`.github/workflows/hugo.yml`](.github/workflows/hugo.yml) on every push to `main`.
