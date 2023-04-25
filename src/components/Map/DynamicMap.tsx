import s from './map.module.scss';
import 'leaflet/dist/leaflet.css';
import { TileLayer, MapContainer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { useEffect, useRef } from 'react';
import LatLngTuple = L.LatLngTuple;
import { type GeoJson } from '~/helpers/types';
import { marker, Icon, type LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { center } from '@turf/turf';
import 'leaflet-polylinedecorator';

interface Props {
  data?: GeoJson[];
  bm: string;
  size: [string, string];
  isDirection: boolean;
}

type IFlyTo = {
  data: GeoJson;
};

const FeatureDirection = (props: IFlyTo) => {
  const map = useMap();
  const lineString = props.data.features[0]?.geometry.coordinates as unknown as LatLngExpression[][];

  if (lineString && lineString.length > 0) {
    for (let i = 0; i < lineString.length; i++) {
      if (lineString[i] !== undefined) {
        if (lineString[i] !== undefined && lineString[i] !== null) {
          lineString[i]?.reverse();
        }
      }
    }
  }

  let getCenter;
  if (props.data) {
    getCenter = center(props.data);
    const getCoord = getCenter.geometry.coordinates;
    const getCoordReverse = [...getCoord].reverse() as LatLngTuple;
    map.flyTo(getCoordReverse, 15, { animate: true });
  }

  const line = L.polyline(lineString, { fillColor: 'red', color: 'red', opacity: 1 }).addTo(map);
  L.polylineDecorator(line, {
    patterns: [
      // defines a pattern of 10px-wide dashes, repeated every 20px on the line
      { offset: 0, repeat: 20, symbol: L.Symbol.arrowHead({ pixelSize: 20 }) },
    ],
  }).addTo(map);

  return null;
};

const PanTo = (props: IFlyTo) => {
  const map = useMap();

  const { data } = props;
  const type = data.features[0]?.geometry.type;
  const TYPE_STRING = 'MultiLineString';
  const TYPE_LINESTRING = 'LineString';
  const TYPE_POINT = 'Point';
  const TYPE_POLYGON = 'MultiPolygon';

  const handleMapTo = () => {
    if (type === TYPE_STRING || type === TYPE_POLYGON || type === TYPE_POINT || type === TYPE_LINESTRING) {
      if (type === TYPE_STRING) {
        const coord = data.features[0]?.geometry.coordinates[0] as LatLngTuple[];
        if (coord == undefined) return;
        const firstCoord = coord[0];
        if (firstCoord == undefined) return;
        const unreversedCoord = [firstCoord[0], firstCoord[1]];
        const reverseCoord = [...unreversedCoord].reverse() as LatLngTuple;
        map.flyTo(reverseCoord, 17, { animate: true });
      }

      if (type === TYPE_POLYGON) {
        const coord = data.features[0]?.geometry.coordinates[0] as LatLngTuple[][];
        if (coord == undefined) return;
        const setCoord = coord[0] as LatLngTuple[];
        if (setCoord[0] == undefined) return;
        const firstCoord = [...setCoord[0]];
        const unreversedCoord = [firstCoord[0], firstCoord[1]];
        const reverseCoord = unreversedCoord.reverse() as LatLngTuple;
        map.flyTo(reverseCoord, 17, { animate: true });
      }

      if (type === TYPE_POINT) {
        if (data.features[0]?.geometry.coordinates == undefined) return;
        const coord: LatLngTuple = data.features[0]?.geometry.coordinates as LatLngTuple;
        if (coord == undefined) return;
        const coordUnreversed = [coord[0], coord[1]];
        const reverseCoord: LatLngTuple = [...coordUnreversed].reverse() as LatLngTuple;
        map.flyTo(reverseCoord, 17, { animate: true });
      }

      if (type === TYPE_LINESTRING) {
        const coord = data.features[0]?.geometry.coordinates[0] as LatLngTuple[];
        if (coord == undefined) return;
        const unreversedCoord = [coord[0], coord[1]];
        if (unreversedCoord == undefined) return;
        const reverseCoord = unreversedCoord.reverse() as unknown as LatLngTuple;
        map.flyTo(reverseCoord, 17, { animate: true });
      }
    }
  };

  useEffect(() => {
    handleMapTo();
  }, [type, data]);

  return null;
};

type ISetUrl = (url: string) => void;

type ICurrent = {
  setUrl: ISetUrl;
};

const Map = (props: Props) => {
  useEffect(() => {
    if (ref.current) {
      (ref.current as ICurrent).setUrl(props.bm);
    }
  }, [props.bm]);

  const ref = useRef(null);

  const pointToLayer = (feature: GeoJson, latlng: LatLngTuple) => {
    const color = feature.color.substring(1);
    const greenIcon = new Icon({
      iconUrl: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}&chf=a,s,ee00FFFF`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const markerView = marker(latlng, { icon: greenIcon });
    markerView.bindPopup('test');

    return markerView;
  };

  const style = (feature: GeoJson) => {
    let color = feature.color;
    if (color == undefined) {
      color = '#ff7800';
    }
    return {
      fillColor: color,
      weight: 2,
      opacity: 1,
      border: 'solid',
      color: color,
      dashArray: '',
      fillOpacity: 0.6,
    };
  };

  return (
    <div className={s.wrapper}>
      <MapContainer
        center={[-6.918759110120172, 107.6165053230779]}
        zoom={13}
        style={{
          height: props.size[0],
          width: props.size[1],
          position: 'relative',
          zIndex: 0,
          boxShadow: '-2px 3px 5px 0 rgba(0,.9,0,.4)',
        }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={props.bm}
          ref={ref}
        />
        {props.data && props.data[0] && props.isDirection && <FeatureDirection data={props.data[0]} />}
        {!props.isDirection && props.data && props.data[0] && <PanTo data={props.data[0]} />}
        {!props.isDirection &&
          props.data &&
          props.data.map((el: GeoJson) => {
            const r = (Math.random() + 1).toString(36).substring(7);
            return <GeoJSON data={el} key={r} style={style} pointToLayer={pointToLayer} />;
          })}
      </MapContainer>
    </div>
  );
};

export default Map;
