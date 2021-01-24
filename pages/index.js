import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiZGhydXZiaGF0bmFnYXIxMCIsImEiOiJja2c3dmx6ZWowMmVmMnRtcWVkaWRlMjAzIn0.j_CTYHulY0ohTDABdHLr2g'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
    </div>
  );
}
