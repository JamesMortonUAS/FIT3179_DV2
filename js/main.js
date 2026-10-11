/*
 * Register each finished Vega or Vega-Lite specification here.
 * Keeping one human-readable JSON file per visualisation satisfies the
 * assignment's repository-access requirement.
 */
const visualisations = [
  // { target: "#chart-global-stream", spec: "js/specs/01-global-stream.json" },
  // { target: "#chart-source-rank", spec: "js/specs/02-source-rank.json" },
  // { target: "#chart-alluvial", spec: "js/specs/03-alluvial.json" },
  // { target: "#map-clean-share", spec: "js/specs/04-clean-share-map.json" },
  // { target: "#map-renewable-output", spec: "js/specs/05-renewable-output-map.json" },
  // { target: "#map-change", spec: "js/specs/06-change-map.json" },
  // { target: "#chart-country-heatmap", spec: "js/specs/07-country-heatmap.json" },
  // { target: "#chart-fingerprint", spec: "js/specs/08-country-fingerprint.json" },
  // { target: "#chart-trajectories", spec: "js/specs/09-transition-trajectories.json" },
  // { target: "#chart-regional-pattern", spec: "js/specs/10-regional-pattern.json" },
  // { target: "#map-australia", spec: "js/specs/11-australia-map.json" },
  // { target: "#chart-state-heatmap", spec: "js/specs/12-state-heatmap.json" }
];

const embedOptions = {
  actions: false,
  renderer: "svg",
  theme: "none"
};

for (const visualisation of visualisations) {
  vegaEmbed(visualisation.target, visualisation.spec, embedOptions).catch((error) => {
    console.error(`Could not render ${visualisation.spec}`, error);
  });
}
