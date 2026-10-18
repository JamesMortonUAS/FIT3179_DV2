# Interview preparation — Powering the Transition

## 30-second summary

This visualisation investigates how Australian electricity generation changed from 2015 to 2025 and how the 2025 mix differs by state. It is aimed at a general Australian audience. The story moves from the national mix and decade-long transition to state variation, then uses station locations to add geographic context. The main conclusion is that renewables reached 39.5% of generation in 2025, but coal remained the largest single source and the transition is geographically uneven.

## What to say about the data

- **Main source:** Australian Energy Statistics Table O supplies national and state generation estimates, including rooftop solar and off-grid generation.
- **Second source:** Geoscience Australia's Major Power Stations dataset supplies station locations, capacity and primary-fuel categories.
- **Geometry source:** Australian state and territory GeoJSON supplies boundaries for all four maps.
- **Time coverage:** national and state trends cover 2015–2025; the station inventory is a 2026 snapshot.
- **ACT:** Table O includes the ACT within NSW, so it is not presented as an independent state value.
- **Derived values:** grouped fuel totals, shares, the 2024 renewable share and threshold categories are calculated from or stated by the source. Rounding can cause small differences.

## Units you must keep separate

| Measure | Unit | Meaning |
|---|---:|---|
| Generation share | % | Proportion of electricity generated |
| Annual generation | GWh or TWh | Energy produced over a year |
| Station capacity | MW | Rated instantaneous power, not annual output |

One terawatt-hour is 1,000 gigawatt-hours. Do not describe MW as generation.

## Design rationale

- The hero gives the main number immediately, then the page moves from national to state evidence.
- Warm colours identify fossil sources; greens, blue and yellow identify renewable sources. The same semantic colours recur across charts.
- Figure 03 is a **zero-based stacked area chart**, not a centred streamgraph. This lets band thickness encode TWh honestly and makes black coal start at zero.
- Figure 02 uses a complete **0–100% axis** because it compares proportions. A truncated 30–70% axis made the 3.8-point change look larger than it was.
- Annual observations in Figure 03 use straight joins. Smoothing was removed because it can imply values between yearly observations that were not measured.
- Australian maps use an **Equal Earth** projection, an equal-area choice. That is more defensible for thematic area comparison than Mercator.
- Tooltips provide precision on demand while titles and annotations carry the story without requiring interaction.

## Four map idioms

1. **Continuous choropleth:** renewable share by state.
2. **Categorical/threshold map:** which states reached at least 50%.
3. **Proportional-symbol map:** total generation volume by state.
4. **Point map:** locations and recorded primary fuel of major stations.

These answer different questions. Do not claim that four maps means four independent geographic datasets.

## The “Water” question

Geoscience Australia's source field uses `Water` as a primary-fuel category. On the public chart it is displayed as **Hydro**, the conventional electricity-generation term. This is a display-only transformation in `specs/13_station_dots.json`; the raw source value is preserved. Likewise, the source's broad `Fossil` class is retained, so this map cannot separate coal, gas and oil stations.

## Likely interview questions

### Why does black coal start at zero now?

The chart uses Vega-Lite's `stack: "zero"`. Black coal is deliberately ordered first, so its lower boundary is the zero baseline. Each other band accumulates above it. A centred streamgraph would have no common zero baseline and would make source magnitudes harder to read accurately.

### Why not use the station dots to infer electricity generation?

A dot represents a station and the tooltip shows rated capacity in MW. It does not encode annual GWh. Capacity and generation are different measures, and the page states that explicitly.

### Why use both share and total generation?

Share shows the composition of a state's mix, while GWh/TWh shows magnitude. Tasmania can have a very high renewable share while producing less electricity than a larger state.

### Why is 2024 shown only in Figure 02?

The release states that the 2025 renewable share was 3.8 percentage points higher than 2024. Figure 02 isolates that recent change; the longer 2015–2025 charts provide broader context.

### Is the visualisation causal?

No. It describes change and geographic variation. It does not prove that a particular policy, price or technology caused the transition.

### What interactivity is used?

Hover tooltips reveal exact values, source categories and units. Interactivity is deliberately lightweight because the story must remain understandable on a single scrolling page without requiring the audience to configure filters.

### How is the code organised?

`index.html` holds the narrative, `style.css` the responsive visual system, `main.js` the chart registry and shared map-boundary preparation, and each chart has its own readable JSON file in `specs/`. Data are stored separately in `data/`.

### Why is boundary preparation needed?

The source GeoJSON uses polygon ring directions that can be interpreted inconsistently by geographic rendering libraries. `main.js` normalises the exterior and hole winding once, checks that all seven mapped states/territories are present, then passes the same geometry to all maps.

## Brief-compliance checklist

| Requirement | Evidence |
|---|---|
| Public single scrolling page | GitHub Pages live site |
| Vega/Vega-Lite with readable JSON | 14 files in `specs/` |
| At least 10 charts | 14 rendered visualisations |
| At least 3 map idioms | 4 distinct map idioms |
| Multiple reliable data sources | Australian Energy Statistics, Geoscience Australia, boundary GeoJSON |
| General Australian audience | Plain-language titles, unit definitions and interpretation notes |
| Interactivity | Tooltips on chart marks |
| Sources, author, date, AI acknowledgement | Source ledger and footer |
| Hand-drawn sketch URL | **Outstanding:** add approved scan as `docs/sketch.pdf` |

## Honest limitations to volunteer

- 2025 values are published estimates and source values are rounded.
- The station inventory is a 2026 snapshot, so it is not temporally identical to the 2025 generation data.
- The ≥100 MW filter improves legibility but omits smaller generators, especially distributed renewables.
- State-centre positions on the proportional-symbol map are indicative.
- The station source uses broad fuel categories.
- The story describes generation, not electricity consumption, interstate flows, prices, emissions or causality.

## Two-minute walkthrough

1. State the question, audience and 39.5% headline.
2. Use Figure 01 and Figure 03 to explain the current mix and decade-long transition.
3. Use the state ranking and maps to show why the national average hides variation.
4. Distinguish share, annual generation and capacity.
5. Explain the two audit corrections: full percentage scale and Water→Hydro display label.
6. End with limitations and the main conclusion: the transition is substantial but incomplete and uneven.
