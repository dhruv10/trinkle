import React from 'react';
import Head from 'next/head';
import length from '@turf/length';
import { useDispatch, useSelector } from 'react-redux';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { updateDistance } from '../store/actions/distance';

// components
import StatisticsContainer from '../components/StatisticsContainer';

// styles
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../styles/Home.module.css';

// lib
import {
  GEOJSON,
  LINESTRING,
  MAPBOX_TOKEN,
  measureLineLayer,
  measurePointLayer,
} from '../lib/constants';

function App() {
  const dispatch = useDispatch();
  const mapRef = React.useRef(null);
  const { distance } = useSelector((state) => state.distance);

  const [geojson, setGeojson] = React.useState(GEOJSON);
  const [linestring, setLinestring] = React.useState(LINESTRING);
  const [viewport, setViewport] = React.useState({
    longitude: 25.2797,
    latitude: 54.6872,
    zoom: 14,
  });

  const onMapClicked = (e) => {
    const localGeojson = geojson;
    const localLineString = linestring;
    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ['measure-points'],
    });

    if (localGeojson.features.length > 1) {
      setGeojson((old) => ({
        ...old,
        features: old.features.pop(),
      }));
    }

    if (features.length) {
      const id = features[0].properties.id;
      const tempFeatures = localGeojson.features.filter(
        (point) => point.properties.id !== id
      );

      localGeojson.features = tempFeatures;
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

      localGeojson.features.push(point);
    }

    if (localGeojson.features.length > 1) {
      const tempCords = localGeojson.features.map(
        (point) => point.geometry.coordinates
      );

      localLineString.geometry.coordinates = tempCords;
      localGeojson.features.push(localLineString);

      const localTotalDistance = Number(
        length(localLineString).toLocaleString()
      );
      dispatch(updateDistance(localTotalDistance));
    }

    setGeojson(localGeojson);
    setLinestring(localLineString);
  };

  return (
    <>
      <Head>
        <title>Trinkle</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StatisticsContainer styles={styles} totalDistance={distance} />
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width='100vw'
        height='100vh'
        onClick={onMapClicked}
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Source id='geojson' type='geojson' data={geojson}>
          <Layer {...measurePointLayer} />
          <Layer {...measureLineLayer} />
        </Source>
      </ReactMapGL>
    </>
  );
}

export default App;
