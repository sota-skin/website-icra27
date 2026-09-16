# SoTa anonymous research website

A dependency-free static site for the anonymous paper, with local media only.

Preview from this directory:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. For GitHub Pages, publish the `main` branch from `/ (root)`. `.nojekyll` enables direct static hosting; no build step is needed.

## Content

- Abstract, paper teaser, sensor design, training description, discussion, and limitations.
- Nine selected real evaluation clips across the eight paper conditions and one robot-only failure comparison.
- Recorded 202-taxel activation synchronized with each saved video observation at 30 fps. The displayed signals are processed activation, not calibrated force. A common 0–0.25 color scale is used; higher values saturate. No per-episode rescaling is applied.
- Interactive SVG plots, downloadable standalone SVG figures, and a CSV transcribed from paper Figures 6–7. All counts are full successes out of 40; partial outcomes count as failures.

The source videos are constant-frame-rate recordings. Tactile alignment follows frame index, not wall-clock timestamps; independent hardware-level sensor timing is not available in these trajectory files. The two comparison clips are separate selected rollouts, not paired statistical trials.

## Anonymous publishing

No author section, affiliations, contact links, BibTeX block, analytics, external fonts, or third-party embeds are included. The PDF retains the scientific references without identifying the submitting authors. All videos are silent and re-encoded without source metadata, chapters, or auxiliary tracks. Image metadata, including metadata within the PDF's embedded figures, is stripped. The PDF has no author/creator/date metadata, links, annotations, attachments, XMP, or original document ID. Tactile exports omit absolute capture times and private recording identifiers.

Before publishing new media, run a local metadata audit and visually review every asset. Remove audio, source metadata, and identifying content. Separately verify Git author, committer, commit messages, and the authenticated pushing account. Use only the designated anonymous identity and SSH key; do not add personal co-author trailers or import source repository history. Keep audit tools and private provenance outside the published tree.

Browser validation covers desktop/mobile overflow, results controls, every ID/OOD selector, tactile seeking, comparison playback, image loading, and absence of external requests.
