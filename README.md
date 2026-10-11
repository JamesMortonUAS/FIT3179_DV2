# Powering the Transition — FIT3179 Data Visualisation 2

An interactive data story investigating how electricity generation has changed
across technologies, countries and Australian states.

## Live visualisation

After GitHub Pages is enabled, add the public URL here:

`https://YOUR-GITHUB-USERNAME.github.io/dv2-electricity-generation/`

## Repository structure

```text
.
├── index.html              Single scrolling visualisation page
├── css/style.css           Responsive layout and visual system
├── js/main.js              Vega/Vega-Lite embed registrations
├── js/specs/               One readable JSON specification per chart
├── data/                   Small cleaned CSV/TopoJSON extracts
├── docs/sketch.pdf         Approved assignment sketch (add before submission)
└── CRITIQUE_READINESS.md   Week 11 hurdle and critique checklist
```

## Assignment compliance checklist

- [ ] Public GitHub repository and working GitHub Pages URL
- [ ] One scrolling webpage, visible on a small laptop without horizontal scroll
- [ ] More than 10 charts
- [ ] At least three different map idioms
- [ ] At least eight advanced idioms targeted for an HD submission
- [ ] Maps and diagrams produced using Vega or Vega-Lite
- [ ] Every JSON specification readable in `js/specs/`
- [ ] Accurate, current real-world data from at least two sources
- [ ] Total downloadable data below a few megabytes
- [ ] Four clearly structured narrative sections
- [ ] Meaningful interactivity and extensive annotations
- [ ] Data, image, icon and AI acknowledgements
- [ ] Author name and creation date shown on the webpage
- [ ] Approved A4 sketch exported to `docs/sketch.pdf`
- [ ] All URLs tested in an incognito window

## Week 11 critique hurdle

The public draft must already contain enough diagrams and applied design work
for another student to provide useful critique. A placeholder-only page, or a
page containing only a small number of basic charts, is not sufficient. Use
`CRITIQUE_READINESS.md` before posting the URL to the Moodle group forum.

## Planned data sources

1. [Ember Yearly Electricity Data](https://ember-energy.org/data/yearly-electricity-data/)
2. [Australian Energy Statistics](https://www.energy.gov.au/energy-data/australian-energy-statistics)
3. Optional: [Open Electricity](https://openelectricity.org.au/) or AEMO for a
   small pre-aggregated daily profile.

## Local preview

Because browser security can block local JSON/CSV loading, serve the folder
through a small local web server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages setup

1. Push this project to a public repository named
   `dv2-electricity-generation`.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select branch **main**, folder **/(root)**, then save.
5. Wait for the deployment to finish and test the URL in an incognito window.

## Before publishing

Replace `YOUR NAME` in `index.html`, add the sketch PDF, populate the data
directory, add chart specifications, and uncomment their registrations in
`js/main.js`.

## Acknowledgements

Document any generative-AI assistance here and in the webpage footer in the
format required by Monash University. All analysis, visual encodings and final
editorial decisions should be reviewed and owned by the student.
