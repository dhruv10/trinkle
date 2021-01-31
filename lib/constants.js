export const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZGhydXZiaGF0bmFnYXIxMCIsImEiOiJja2c3dmx6ZWowMmVmMnRtcWVkaWRlMjAzIn0.j_CTYHulY0ohTDABdHLr2g';

export const GEOJSON = {
  type: 'FeatureCollection',
  features: [],
};

export const LINESTRING = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [],
  },
};

export const measurePointLayer = {
  id: 'measure-points',
  type: 'circle',
  source: 'geojson',
  paint: {
    'circle-radius': 10,
    'circle-color': '#6C63FF',
  },
  filter: ['in', '$type', 'Point'],
};

export const measureLineLayer = {
  id: 'measure-lines',
  type: 'line',
  source: 'geojson',
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
  },
  paint: {
    'line-color': '#6C63FF',
    'line-width': 2.5,
  },
  filter: ['in', '$type', 'LineString'],
};
