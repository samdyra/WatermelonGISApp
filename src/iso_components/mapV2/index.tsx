import React from 'react';
import {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Layer,
  Map,
  MapProvider,
  NavigationControl,
  Source,
} from 'react-map-gl';

interface MapV2Props {
  geojsonData: string;
}

const MapV2 = ({ geojsonData }: MapV2Props) => {
  return (
    <>
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
          <AttributionControl customAttribution="Made with love by Sam" style={{ color: 'black' }} />
          <NavigationControl position="bottom-right" />
          <FullscreenControl />
          <GeolocateControl />
          <Source id="my-data" type="geojson" data={geojsonData}>
            <Layer
              id="my-polygon"
              type="fill"
              paint={{
                'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'depth'],
                  0,
                  'rgb(255, 0, 0)', // Dark red for depth = 0
                  500,
                  'rgb(100, 0, 0)', // Light red for depth = 500
                ],
                'fill-opacity': 0.5,
              }}
            />
          </Source>
        </Map>
      </MapProvider>
    </>
  );
};

export default MapV2;