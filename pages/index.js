import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import length from '@turf/length';
import Head from 'next/head';

// styles
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../styles/Home.module.css';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZGhydXZiaGF0bmFnYXIxMCIsImEiOiJja2c3dmx6ZWowMmVmMnRtcWVkaWRlMjAzIn0.j_CTYHulY0ohTDABdHLr2g';

const GEOJSON = {
  type: 'FeatureCollection',
  features: [],
};

const LINESTRING = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [],
  },
};

const measurePointLayer = {
  id: 'measure-points',
  type: 'circle',
  source: 'geojson',
  paint: {
    'circle-radius': 5,
    'circle-color': '#000',
  },
  filter: ['in', '$type', 'Point'],
};

const measureLineLayer = {
  id: 'measure-lines',
  type: 'line',
  source: 'geojson',
  layout: {
    'line-cap': 'round',
    'line-join': 'round',
  },
  paint: {
    'line-color': '#000',
    'line-width': 2.5,
  },
  filter: ['in', '$type', 'LineString'],
};

function App() {
  const mapRef = React.useRef(null);

  const [geojson, setGeojson] = React.useState(GEOJSON);
  const [linestring, setLinestring] = React.useState(LINESTRING);
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14,
  });

  const onMapClicked = (e) => {
    let localGeojson = geojson;
    let localLineString = linestring;
    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ['measure-points'],
    });

    console.log(localGeojson);

    if (localGeojson.features.length > 1) {
      setGeojson((old) => ({
        ...old,
        features: old.features.pop(),
      }));
      //   localGeojson.features.pop();
      console.log(localGeojson);
    }

    if (features.length) {
      const id = features[0].properties.id;
      const tempFeatures = localGeojson.features.filter(
        (point) => point.properties.id !== id
      );

      localGeojson.features = tempFeatures;

      //   setGeojson((old) => ({
      //     ...old,
      //     features: tempFeatures,
      //   }));
    } else {
      const point = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [e.lngLat[0], e.lngLat[1]],
        },
        properties: {
          id: String(new Date().getTime()),
        },
      };

      //   setGeojson((old) => ({
      //     ...old,
      //     features: [...old.features, point],
      //   }));
      localGeojson.features.push(point);
    }

    if (localGeojson.features.length > 1) {
      const tempCords = localGeojson.features.map(
        (point) => point.geometry.coordinates
      );

      localLineString.geometry.coordinates = tempCords;

      //   setLinestring((old) => ({
      //     ...old,
      //     geometry: {
      //       ...old.geometry,
      //       coordinates: tempCords,
      //     },
      //   }));

      localGeojson.features.push(localLineString);

      //   setGeojson((old) => ({
      //     ...old,
      //     features: [...old.features, linestring],
      //   }));

      console.log('Distance: ', length(localLineString).toLocaleString());
    }

    // console.log(features);
    setGeojson(localGeojson);
    setLinestring(localLineString);
  };

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      {...viewport}
      width='100vw'
      height='100vh'
      onViewportChange={setViewport}
      onClick={onMapClicked}
    >
      <Source id='geojson' type='geojson' data={geojson}>
        <Layer {...measurePointLayer} />
        <Layer {...measureLineLayer} />
      </Source>
    </ReactMapGL>
  );
}

export default App;
