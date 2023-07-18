import { type NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '~/components';
import axios from 'axios';
import Map, {
  MapProvider,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  AttributionControl,
  Source,
  Layer,
} from 'react-map-gl';
import sampleData from '../../../sample-data.json';

const IsoMap: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowSidebar = () => setIsOpen(!isOpen);

  async function fetchData() {
    try {
      const response = await axios.get('http://0.0.0.0:8000/book');
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  return (
    <>
      <Head>
        <title>ISO Map</title>
        <meta name="description" content="ISO Map" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar handleShowSidebar={handleShowSidebar} />
        <button onClick={fetchData}>hit</button>
        <MapProvider>
          <Map
            initialViewState={{
              longitude: 116.5925,
              latitude: -8.2775,
              zoom: 13,
            }}
            mapboxAccessToken="pk.eyJ1IjoiZHdpcHV0cmFzYW0iLCJhIjoiY2xlMDRxZDU2MTU3dTNxb2Fkc3Q0NWFpciJ9.M-nfqnbgrf7QQdXHAXn07Q"
            style={{
              width: '100vw',
              height: '92vh',
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            attributionControl={false}
          >
            <AttributionControl customAttribution="Made with love by Sam X Datasintesa" style={{ color: 'black' }} />
            <NavigationControl position="bottom-right" />
            <FullscreenControl />
            <GeolocateControl />
            <Source id="polygonlayer" type="geojson" data={sampleData as string}>
              <Layer
                id="lineLayer"
                type="line"
                source="my-data"
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': 'rgba(230, 0, 0, 1)',
                  'line-width': 2,
                }}
              />
            </Source>
          </Map>
        </MapProvider>
      </main>
    </>
  );
};

export default IsoMap;
