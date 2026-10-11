# Powering the Transition — FIT3179 Data Visualisation 2

An interactive, single-page data story about how Australia's electricity generation mix is changing.

## Live draft

https://jamesmortonuas.github.io/FIT3179_DV2/

This public draft is intended for the FIT2179 Week 11 peer-and-tutor critique. It contains 14 Vega-Lite specifications, more than ten visualisations, a streamgraph, and three distinct map idioms.

## Repository structure

- `index.html` — page structure, prose, chart containers and source notes
- `style.css` — responsive layout and visual system
- `main.js` — Vega-Lite embedding and map-geometry normalisation
- `specs/` — one Vega-Lite JSON specification per visualisation
- `data/` — cleaned electricity and power-station data used by the page
- `tests/map_geometry.js` — checks chart registration, map joins and polygon winding
- `.github/workflows/pages.yml` — automatic GitHub Pages deployment

## Run locally

The visualisations load local JSON files, so serve the folder over HTTP rather than opening `index.html` directly:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Verify

```bash
node --check main.js
node tests/map_geometry.js
```

The site is deployed automatically whenever `main` is updated.

## Data sources

- Australian Government, Department of Climate Change, Energy, the Environment and Water, *Australian Energy Statistics — Table O: Electricity generation by fuel type, 2024–25 and calendar year 2025*.
- Geoscience Australia, *Major Power Stations* dataset.
- Australian state and territory boundary GeoJSON, credited on the dashboard.

The dashboard distinguishes source data, derived measures and design interpretation in its methods and source sections.

## Current draft status

The core narrative, layout, typography, colour system, map treatments and interactive tooltips are ready for critique. Remaining work is to complete the required hand-drawn sketch, incorporate feedback, and perform the final accessibility and submission-template checks.

## AI acknowledgement

AI assisted with layout and code development. Its use will be acknowledged in the submitted assignment template in accordance with the unit requirements.
