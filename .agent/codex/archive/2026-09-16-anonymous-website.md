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

The first Discussion heading now states its conclusion directly: “Human demonstrations broaden object coverage.”

## Discussion take-home messages

`index.html:876` now states that human demonstrations improve generalization to unseen objects and that touch improves trained-task performance without ensuring generalization. The limitations heading is simply “Limitations,” as requested.

## Manuscript v6

Replaced `assets/paper.pdf` with the supplied anonymous v6 manuscript, clearing document metadata, embedded-image metadata, document identifiers, and external link actions. Verified eight pages, anonymous author line, and no attachments. Removed the architecture figure download link from `index.html` as requested.

## Full demonstrations and eight-condition comparisons

`index.html` adds paired human and robot training demonstrations for all three tasks, separate from policy rollouts. `tactile.js` offers all eight ID/OOD comparison conditions with recorded outcome labels; success/success pairs are retained where selected. All players keep fixed 2x controls. Human demonstrations use the human taxel geometry.

## Tactile processing audit and correction

All 16 evaluation displays now derive from raw ADC using the canonical first-30-frame mean baseline, spike suppression, exponential normalization, and exactly one clipped [0.1,2.0] to [0,1] rescale. Five training displays also derive from raw readings; the human cup source already has the verified requested processing and is used unchanged. Original plug sources used alternate baseline conventions, and the older human box source used ten baseline frames; those values were not re-normalized in place. Raw readings were recovered and processed instead. This supersedes earlier notes describing all saved processed policy channels as the display source. The plots show standardized post-processing of recordings, not necessarily the exact online policy input.

`assets/tactile-data.js` contains only post-clip arrays and geometry. `tactile.js` performs color lookup and sizing only, with no second signal rescale. Checked all 22 arrays for 202 channels, finite [0,1] values, and zero first 30 frames. Evaluation exports match the canonical pipeline to rounding precision. Browser checks cover six demonstrations, all eight comparisons, seeking, 2x rate, and responsive layouts. New images and videos contain no source metadata or audio; raw provenance remains outside this repository.

## Readability and clearer human thumb contact

`styles.css` raises desktop body text to 20px (18px mobile), with larger headings, captions, controls, and tactile labels. `app.js` enlarges plot labels. The human cup demonstration now shows sustained thumb contact; RGB and tactile arrays were replaced together from one verified post-clip source, without additional rescaling. Browser checks passed all players and conditions at three viewport widths.

Plug baseline review remains pending: the selected human recording begins with contact, so a first-30-frame baseline erased the signal. Its documented baseline is the final ten released frames, and the robot source uses its recorded sensor baseline. Restoring those conventions requires resolving the earlier explicit first-30-frame requirement with the user; these plug assets are unchanged in this commit.

## Remove section subtitles

`index.html` removes the sensor, action, training-demonstration, comparison, and characterization subtitles. The Quantitative Results introduction is preserved verbatim, as requested.
