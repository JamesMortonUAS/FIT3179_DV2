# Final visualisation audit

This checklist follows the unit's critique priority: accuracy first, then data/idiom choice, chart design, colour, layout and typography.

## Accuracy and interpretation

- [x] Figure 02 uses a complete 0–100% scale, so a 3.8 percentage-point movement is not visually exaggerated.
- [x] Figure 03 is a zero-based stacked area chart; band thickness represents TWh and black coal begins at zero.
- [x] Annual observations in Figure 03 use straight interpolation rather than a smoothed curve that could imply unobserved values.
- [x] The station map calls the source category `Water` “Hydro” in the display and documents the relabelling.
- [x] Generation share (%), annual energy (GWh/TWh) and station capacity (MW) are distinguished in the narrative.
- [x] ACT treatment is disclosed: Table O includes it within NSW.
- [x] Map 04 says its state-centre points are indicative rather than station locations.

## Idioms and brief coverage

- [x] Four map idioms: continuous choropleth, threshold/categorical map, proportional symbols and station points.
- [x] Australian maps use an equal-area projection.
- [x] Fourteen Vega-Lite visualisations exceed the ten-chart minimum.
- [x] More than two data sources are combined and credited.
- [x] The page is a public, scrolling GitHub Pages data story.
- [x] Vega-Lite JSON files are readable in `specs/`.
- [x] Tooltips expose exact values without replacing the written story.

## Design and usability

- [x] A consistent palette groups fossil sources in warm colours and renewable sources in greens/blues/yellow.
- [x] Headings state the intended takeaway; captions state scope and units.
- [x] Responsive container widths support desktop and smaller screens.
- [x] Source dates, author, AI acknowledgement and limitations are visible.
- [ ] Add the approved hand-drawn sketch as `docs/sketch.pdf` and link it from the assignment template.

## Final manual checks

- Open the live URL in a signed-out or incognito window.
- Hover one mark in every visualisation and confirm the tooltip matches the unit.
- Test at desktop width and at approximately 390 px wide.
- Confirm the submitted template contains the live site URL, repository URL and sketch URL.
