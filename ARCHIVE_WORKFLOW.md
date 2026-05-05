# VRMMO Archive Workflow

The website is a static GitHub Pages-ready archive.

## Add Or Update Docs

1. Add or edit markdown files in `public/docs`.
2. Update `public/docs/VRMMO_INDEX.md` with links to the docs you want shown.
3. Run `npm run build`.
4. Push the repo to GitHub Pages.

## GitHub Pages Deployment

This repo includes `.github/workflows/deploy-pages.yml`.

To publish:

1. Push the repo to GitHub.
2. Open the repo on GitHub.
3. Go to `Settings > Pages`.
4. Set `Build and deployment` to `GitHub Actions`.
5. Push to `master` or `main`, or manually run the `Deploy GitHub Pages` workflow.

The Vite config uses `base: "./"` so the archive works under a GitHub Pages project URL such as:

```text
https://username.github.io/repository-name/
```

## Add Reference Images

1. Put image files in `public/references`.
2. Link them from `public/docs/VRMMO_INDEX.md`.

Example:

```md
## Reference Images

- [Wrist vial reference](../references/wrist-vials.png)
- [Grimoire ring concept](../references/grimoire-ring.webp)
```

The site reads image links from the index and shows them in the reference shelf.

## Source Folder Note

The design docs were copied from:

```text
C:\Users\Admin\Documents\VRMMO
```

For GitHub Pages, the hosted copies need to live inside `public/docs`.
