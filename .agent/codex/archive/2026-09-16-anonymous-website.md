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

## Single vector architecture

Per user request, the training section now shows only the architecture produced by the manuscript figure renderer, exported as sanitized SVG. Removed the separate interactive flow diagram and the demonstration-count callout. Training stages and data counts are plain main text. The SVG retains native vector lines, labels, and blocks; the original photographic input and source icons remain embedded image elements. Metadata is stripped from both the SVG and its embedded images.

Quantitative section is titled “Quantitative Results”; “Effect of tactile feedback” is the first tab and default chart view.

## Interactive paper figures and revised presentation

The single source-rendered architecture now has a transparent background and semantic SVG groups for pre-training, fine-tuning, and inference path emphasis. Training descriptions remain in main text. User-requested custom dropdowns replace native controls while preserving keyboard selection, Escape, outside-click dismissal, and the original change events.

Tactile visualization now reproduces the paper renderer’s fixed 0–0.20 scale, 256-entry gray/pink/yellow colormap, nearest-neighbor activation-dependent diameter formula with the requested 2x display factor, and dark hand on white. Saved processed tactile channels remain unchanged; evaluation raw-delta channels are not used as normalized activation.

Added labeled box and plug robot-only failures and corresponding co-training successes. The three-task comparison is after quantitative results. The main video heading is “SoTa in Action”; task-title arrows and the large mean-success callout are removed. Sensor figure headings state the measured property rather than the test conditions. Board dimensions are replaced by the tested load range.

## Custom video controls

`player.js:1` adds play/pause, seeking, fullscreen, and a persistent literal “2x” speed label to every video. Playback and default playback rates are locked to 2 across source changes. The separate gapless note explains consecutive recorded observations and omitted timing gaps. Original media and observation-index tactile alignment are retained. Browser checks cover every clip, seeking, paired playback, speed enforcement, and mobile layouts.

## Discussion headings

`index.html:876` uses descriptive headings for human training-data diversity, tactile feedback and generalization, evaluation limitations, and the scope of the ablation study. Paragraphs are unchanged.

## Sensor explanation and task scope

`index.html` now explains the thin, soft skin, shared human/robot sensing layout, and in-house material cost. Sensor Construction describes heat pressing, UV laser patterning, the molded SEBS sandwich, edge sealing, and cable routing, verified against the manuscript method. SoTa in Action introduces the range of contact-rich tasks. Durability statistics remain in Sensor Characterization.

## Responsive training layout and results readability

`index.html` groups the architecture and explanation in `training-layout`. `styles.css` places the figure left and text right above 1000px, stacking them below that width. Results caveat text is 18px on desktop and 17px on mobile, with a larger label. Verified column positions, stacking, and absence of horizontal overflow at 390, 768, and 1440px.
