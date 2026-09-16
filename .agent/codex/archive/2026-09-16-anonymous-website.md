---
author: codex
date: 2026-09-16
status: resolved
touches: [index.html, styles.css, app.js, tactile.js, assets]
anchors: [index.html:1, app.js:1, tactile.js:1]
---

## What changed and why

Created the requested anonymous static research site. Added the abstract, paper teaser, local evaluation videos, shared-layout sensor explanation, interactive training stages, vector results, and discussion. Figures 6–7 define the results and OOD labels; do not substitute historical cup-condition ordering.

## Verify against code

All public assets are local. `app.js` contains the eight published conditions and five methods. `tactile.js` matches each decoded video frame to the corresponding saved 202-channel tactile observation. Left-hand maps reflect geometry without reordering channels. The scale is fixed across clips. The raw trajectory files and private provenance are deliberately excluded from the repository.

The PDF's embedded image metadata is sanitized separately from document metadata. Public assets contain no private paths, raw source IDs, author contact information, or absolute capture timestamps. Keep this constraint when replacing media.

## Open questions

None for the implementation. GitHub Pages activation is a repository setting controlled by the user.

## Next

Preserve the designated anonymous Git author, committer, and pushing account for every future update. Run a local public-file audit and visually review new footage before publishing.

## Editorial revision

The user requires a paper website, with factual headings and no promotional slogans. The paper teaser is directly beneath the title; the opening video and tagline are removed. The abstract is verbatim from the source manuscript, with only TeX markup converted. The layer-stack image is regenerated from its vector PDF to preserve transparency and complete labels. Use “Sensor Construction” and “Real Robot Results” as specified.
