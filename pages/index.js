import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import length from '@turf/length';
import Head from 'next/head';

// styles
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from '../styles/Home.module.css';

const geojson = {
  type: 'FeatureCollection',
  features: [],
};

const linestring = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: [],
  },
};

export default function Home() {
  const [measuredDistance, setMeasuredDistance] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 54.6872,
    longitude: 25.2797,
    zoom: 7,
  });

  const mapRef = useRef(null);

  const onMapClick = (e) => {
    const map = mapRef.current.getMap();
    console.log('clicked', map)

    const features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points'],
    });

    if (geojson.features.length > 1) geojson.features.pop();

    if (features.length) {
      const id = features[0].properties.id;
      geojson.features = geojson.features.filter(function (point) {
        return point.properties.id !== id;
      });
    } else {
      const point = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [e.lngLat.lng, e.lngLat.lat],
        },
        properties: {
          id: String(new Date().getTime()),
        },
      };

      geojson.features.push(point);
    }

    if (geojson.features.length > 1) {
      linestring.geometry.coordinates = geojson.features.map(function (point) {
        return point.geometry.coordinates;
      });

      geojson.features.push(linestring);
      const dist = length(linestring).toLocaleString();

      // setMeasuredDistance(length(linestring).toLocaleString());
      console.log(dist)
    }

    map.getSource('geojson').setData(geojson);
  };

  const onMapLoad = () => {
    console.log('LOADED');
    const map = mapRef.current.getMap();

    // map.addSource('geojson', {
    //   type: 'geojson',
    //   data: geojson,
    // });

    // map.addLayer({
    //   id: 'measure-points',
    //   type: 'circle',
    //   source: 'geojson',
    //   paint: {
    //     'circle-radius': 5,
    //     'circle-color': '#000',
    //   },
    //   filter: ['in', '$type', 'Point'],
    // });

    // map.addLayer({
    //   id: 'measure-lines',
    //   type: 'line',
    //   source: 'geojson',
    //   layout: {
    //     'line-cap': 'round',
    //     'line-join': 'round',
    //   },
    //   paint: {
    //     'line-color': '#000',
    //     'line-width': 2.5,
    //   },
    //   filter: ['in', '$type', 'LineString'],
    // });

    map.on('mousemove', onMapMouseMove)
    map.on('click', onMapClick);
  };

  const onMapMouseMove = (e) => {
    // console.log('mouse move', e)
    const map = mapRef.current.getMap();
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['measure-points'],
    });

    // UI indicator for clicking/hovering a point on the map
    map.getCanvas().style.cursor = features.length ? 'pointer' : 'crosshair';
  };

  useEffect(() => {
    const map = mapRef.current;
    console.log(map)
    onMapLoad()
    if (isLoaded) {
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Distance Measurement App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles.container}>
        <h3>Accumulated Distance: {measuredDistance}</h3>
      </div>

      <ReactMapGL
        {...viewport}
        ref={mapRef}
        // className={styles.map}
        mapboxApiAccessToken='pk.eyJ1IjoiZGhydXZiaGF0bmFnYXIxMCIsImEiOiJja2c3dmx6ZWowMmVmMnRtcWVkaWRlMjAzIn0.j_CTYHulY0ohTDABdHLr2g'
        mapStyle='mapbox://styles/mapbox/streets-v11'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onLoad={() => {
          setIsLoaded(true);
        }}
        // onClick={onMapClick}
        // onMouseMove={onMapMouseMove}
      />
    </div>
  );
}
