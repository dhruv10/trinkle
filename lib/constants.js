export const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZGhydXZiaGF0bmFnYXIxMCIsImEiOiJja2c3dmx6ZWowMmVmMnRtcWVkaWRlMjAzIn0.j_CTYHulY0ohTDABdHLr2g';

export const GEOJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.271889407350987, 54.685103772716964],
      },
      properties: {
        id: '1612128356533',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.271674830630108, 54.6870139487027],
      },
      properties: {
        id: '1612128357696',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.277125079347726, 54.68453318323244],
      },
      properties: {
        id: '1612128358823',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [25.278755862429456, 54.687162789809314],
      },
      properties: {
        id: '1612128360012',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [25.271889407350987, 54.685103772716964],
          [25.271674830630108, 54.6870139487027],
          [25.277125079347726, 54.68453318323244],
          [25.278755862429456, 54.687162789809314],
        ],
      },
    },
  ],
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
