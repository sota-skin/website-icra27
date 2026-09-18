# SoTa anonymous research website

A dependency-free static site for the anonymous paper, with local media only.

Preview from this directory:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. For GitHub Pages, publish the `main` branch from `/ (root)`. `.nojekyll` enables direct static hosting; no build step is needed.

## Content

- Abstract, paper teaser, sensor design, interactive vector architecture, discussion, and limitations.
- Six human/robot training demonstrations and sixteen evaluation clips, with paired comparisons across all eight paper conditions. Outcomes are taken from recorded labels.
- Recorded 202-taxel activation synchronized with each saved video observation at 30 fps. The displayed signals are processed activation, not calibrated force. A common 0–0.20 color scale is used; higher values saturate. No per-episode rescaling is applied.
- Interactive SVG plots, downloadable standalone SVG figures, and a CSV transcribed from paper Figures 6–7. All counts are full successes out of 40; partial outcomes count as failures.

The source videos are constant-frame-rate recordings. Tactile alignment follows frame index, not wall-clock timestamps; independent hardware-level sensor timing is not available in these trajectory files. The two comparison clips are separate selected rollouts, not paired statistical trials.

## Anonymous publishing

No author section, affiliations, contact links, BibTeX block, analytics, external fonts, or third-party embeds are included. The PDF retains the scientific references without identifying the submitting authors. All videos are silent and re-encoded without source metadata, chapters, or auxiliary tracks. Image metadata, including metadata within the PDF's embedded figures, is stripped. The PDF has no author/creator/date metadata, links, annotations, attachments, XMP, or original document ID. Tactile exports omit absolute capture times and private recording identifiers.

Before publishing new media, run a local metadata audit and visually review every asset. Remove audio, source metadata, and identifying content. Separately verify Git author, committer, commit messages, and the authenticated pushing account. Use only the designated anonymous identity and SSH key; do not add personal co-author trailers or import source repository history. Keep audit tools and private provenance outside the published tree.

Browser validation covers desktop/mobile overflow, results controls, every ID/OOD selector, tactile seeking, comparison playback, image loading, and absence of external requests.

Tactile activation has exactly one clipped linear rescaling from [0.1, 2.0] to [0, 1]. Plug evaluation uses saved post-clip policy observations, verified against raw ADC and recorded delta with the original sensor baseline. Plug training demonstrations use their processed source arrays unchanged: last-ten-frame baseline for human and recorded sensor baseline for robot. Other task displays retain their existing processing. The browser maps these values to the fixed color scale without rescaling the data again.

## Evaluation Tactile Synchronization
Evaluation displays copy the saved post-clip policy observations without another rescale. All sixteen exported evaluation arrays were reconstructed exactly from raw values with the causal evaluation pipeline. The taller-stack cup clips previously used an offline spike filter; they now use the saved causal signals. RGB and touch share the recorded observation index in gapless playback. The browser uses presented-video-frame timestamps as its playback clock, without competing timeupdate updates. Original independent tactile capture timestamps are unavailable for these cup recordings, so this correction does not claim to reconstruct hardware capture latency.
