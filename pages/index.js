import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 54.6872,
    longitude: 25.2797,
    zoom: 7,
  });

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ReactMapGL
        {...viewport}
        // className={styles.map}
        mapboxApiAccessToken='pk.eyJ1IjoiZGhydXZiaGF0bmFnYXIxMCIsImEiOiJja2c3dmx6ZWowMmVmMnRtcWVkaWRlMjAzIn0.j_CTYHulY0ohTDABdHLr2g'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />
    </div>
  );
}
