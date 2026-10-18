// Registry linking each page container to one readable Vega-Lite JSON specification.
// Keeping specs separate makes the required JSON easy to inspect and discuss.
const items = [
  ['chart-stream', '14_stream'],
  ['chart-mix', '01_mix'],
  ['chart-shift', '02_shift'],
  ['chart-rank', '03_regional_rank'],
  ['chart-tiles', '04_fuel_tiles'],
  ['map-renewable', '05_map_renewable'],
  ['map-select', '06_map_select'],
  ['map-symbols', '07_map_symbols'],
  ['chart-trajectories', '08_trajectories'],
  ['chart-heatmap', '09_heatmap'],
  ['chart-change', '10_change'],
  ['chart-absolute', '11_absolute'],
  ['chart-fuel-state', '12_fuel_state'],
  ['map-stations', '13_station_dots']
];

// One shared boundary source is normalised once before the four map idioms render.
const boundaryUrl = 'https://raw.githubusercontent.com/rowanhogan/australian-states/master/states.min.geojson';
const mappedNames = new Set([
  'New South Wales', 'Victoria', 'Queensland', 'Western Australia',
  'South Australia', 'Tasmania', 'Northern Territory'
]);
const stateCodes = {
  NSW: 'New South Wales', VIC: 'Victoria', QLD: 'Queensland',
  WA: 'Western Australia', SA: 'South Australia',
  TAS: 'Tasmania', NT: 'Northern Territory'
};

// D3/Vega treats clockwise exterior rings as the inside of small polygons.
// A counterclockwise exterior instead paints its complement: nearly the entire map.
function signedRingArea(ring) {
  let twiceArea = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    twiceArea += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return twiceArea / 2;
}

function rewindPolygon(rings) {
  return rings.map((ring, index) => {
    const clockwise = signedRingArea(ring) < 0;
    const shouldBeClockwise = index === 0;
    return clockwise === shouldBeClockwise ? ring : [...ring].reverse();
  });
}

function prepareBoundary(source) {
  if (source.type !== 'FeatureCollection' || !Array.isArray(source.features)) {
    throw new Error('State boundary file is not a GeoJSON FeatureCollection');
  }
  const features = source.features.map(feature => {
    const geometry = feature.geometry;
    if (!geometry) return feature;
    const coordinates = geometry.type === 'Polygon'
      ? rewindPolygon(geometry.coordinates)
      : geometry.type === 'MultiPolygon'
        ? geometry.coordinates.map(rewindPolygon)
        : geometry.coordinates;
    const properties = { ...feature.properties };
    const name = properties.STATE_NAME || properties.name || properties.STATE || properties.state;
    properties.STATE_NAME = stateCodes[name] || name;
    return { ...feature, properties, geometry: { ...geometry, coordinates } };
  });
  const found = new Set(features.map(f => f.properties.STATE_NAME));
  const missing = [...mappedNames].filter(name => !found.has(name));
  if (missing.length) throw new Error(`State boundary join is missing: ${missing.join(', ')}`);
  return features;
}

// All four maps share one prepared copy, so their fills and outlines agree.
const boundaries = fetch(boundaryUrl)
  .then(response => {
    if (!response.ok) throw new Error(`State boundaries: HTTP ${response.status}`);
    return response.json();
  })
  .then(prepareBoundary);

// Replace only the known boundary URL. Chart data files and transforms remain unchanged.
function usePreparedBoundaries(spec, features) {
  function replaceData(node) {
    if (!node || typeof node !== 'object') return;
    if (node.data?.url === boundaryUrl) {
      node.data = { values: features };
    }
    if (Array.isArray(node.layer)) node.layer.forEach(replaceData);
  }
  replaceData(spec);
  return spec;
}

// Load charts independently so one failed specification shows a local error rather than
// preventing the rest of the data story from rendering.
for (const [id, name] of items) {
  const isMap = id.startsWith('map-');
  const spec = fetch(`specs/${name}.json`).then(response => {
    if (!response.ok) throw new Error(`Chart specification: HTTP ${response.status}`);
    return response.json();
  });
  Promise.all([spec, isMap ? boundaries : Promise.resolve(null)])
    .then(([chart, features]) => vegaEmbed(`#${id}`,
      isMap ? usePreparedBoundaries(chart, features) : chart,
      { actions: false, renderer: 'svg' }))
    .catch(error => {
      document.getElementById(id).textContent = `Chart unavailable: ${error.message}`;
      console.error(id, error);
    });
}
