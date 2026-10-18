# Powering the Transition — FIT3179 Data Visualisation 2

An interactive, single-page data story about how Australia's electricity generation mix is changing.

## Live site

https://jamesmortonuas.github.io/FIT3179_DV2/

The dashboard contains 14 Vega-Lite visualisations, including four map idioms and a zero-based stacked-area chart. It is designed for a general Australian audience and separates electricity generation (GWh/TWh), generation share (%) and station capacity (MW).

## Interview preparation

Read [INTERVIEW_PREP.md](INTERVIEW_PREP.md) before the interview. It records the design rationale, data lineage, likely questions, limitations and a brief-compliance checklist.

## Repository structure

- `index.html` — narrative, chart containers, definitions and source notes
- `style.css` — responsive layout and visual system
- `main.js` — chart registry, Vega-Lite embedding and map-boundary normalisation
- `specs/` — one readable Vega-Lite JSON specification per visualisation
- `data/` — cleaned electricity and power-station data used by the page
- `tests/map_geometry.js` — chart registration, map joins and polygon-winding checks
- `docs/` — submission-document checklist; the approved hand-drawn sketch still needs to be added as `docs/sketch.pdf`
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

The site deploys automatically when `main` changes.

## Data and terminology

- Australian Government, *Australian Energy Statistics — Table O: Electricity generation by fuel type, 2024–25 and calendar year 2025*.
- Geoscience Australia, *Major Power Stations*.
- Australian state and territory GeoJSON from Rowan Hogan.

The station source's category `Water` is displayed as `Hydro`, an audience-facing label change only. The raw source category `Fossil` remains broad and should not be interpreted as a coal/gas/oil breakdown.

## Submission note

The public site, source code and JSON chart specifications are present. Before submitting the assignment template, add the tutor-approved hand-drawn A4 sketch as `docs/sketch.pdf` and confirm that the template links to it.

## AI acknowledgement

AI assisted with layout, code development and review. This contribution is acknowledged on the page and should also be recorded in the submitted assignment template in accordance with the unit requirements.
