import React, { useEffect } from 'react';
import {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Layer,
  Map,
  MapProvider,
  NavigationControl,
  Source,
  useMap,
} from 'react-map-gl';

import centroid from '@turf/centroid';
import { type AllGeoJSON } from '@turf/turf';

interface MapV2Props {
  geojsonData: string;
  type?: 's102' | 's104' | 's111';
}

interface NavigateProps {
  center: [number, number];
}

function NavigateButton(center: NavigateProps) {
  const { mainMap } = useMap();
  const { center: mapCenter } = center;

  const onClick = () => {
    mainMap?.flyTo({ center: mapCenter, zoom: 9 });
  };

  useEffect(() => {
    onClick();
  }, [center]);

  return null;
}

const MapV2 = ({ geojsonData, type = 's104' }: MapV2Props) => {
  const [center, setCenter] = React.useState<[number, number]>([116.5925, -8.2775]);

  useEffect(() => {
    if (geojsonData) {
      const centerPoint = centroid(geojsonData as unknown as AllGeoJSON);

      setCenter(centerPoint.geometry.coordinates as [number, number]);
    }
  }, [geojsonData]);

  return (
    <>
      <MapProvider>
        <Map
          id="mainMap"
          initialViewState={{
            longitude: center[0],
            latitude: center[1],
            zoom: 5,
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

          <NavigateButton center={center} />
          <Source id="my-data" type="geojson" data={geojsonData}>
            {type === 's102' && (
              <Layer
                id="my-polygon"
                type="fill"
                paint={{
                  'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'depth'],
                    0,
                    'rgb(0, 0, 200)', // Dark red for depth = 0
                    500,
                    'rgb(0, 0, 50)', // Light red for depth = 500
                  ],
                  'fill-opacity': 0.5,
                }}
              />
            )}
            {type === 's104' && (
              <Layer
                id="my-polygon"
                type="fill"
                paint={{
                  'fill-color': 'red',
                  'fill-opacity': 0.5,
                }}
              />
            )}
            {type === 's111' && (
              <Layer
                id="my-polygon"
                type="fill"
                paint={{
                  'fill-color': 'blue',
                  'fill-opacity': 0.5,
                }}
              />
            )}
          </Source>
        </Map>
      </MapProvider>
    </>
  );
};

export default MapV2;
