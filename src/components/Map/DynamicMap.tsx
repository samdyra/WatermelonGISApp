import s from './map.module.scss';
import 'leaflet/dist/leaflet.css';
import { TileLayer, MapContainer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { useEffect, useRef, useState } from 'react';
import LatLngTuple = L.LatLngTuple;
import { type GeoJson, type GeoJsonSingle } from '~/helpers/types';
import { marker, Icon } from 'leaflet';
import L from 'leaflet';
import RegressionModuleModal from '../RegressionModuleModal';
interface Props {
  data?: GeoJson[];
  bm: string;
  size: [string, string];
  isDirection: boolean;
}

type IFlyTo = {
  data: GeoJson;
};

type ISetUrl = (url: string) => void;

type ICurrent = {
  setUrl: ISetUrl;
};

type FeatureType = {
  properties: {
    place: string;
    r2: number;
    equation: string;
    id: string | number;
    points: [number, number][];
    intercept: number;
    slope: number;
  };
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
        map.flyTo(reverseCoord, 12, { animate: true });
      }

      if (type === TYPE_POLYGON) {
        const coord = data.features[0]?.geometry.coordinates[0] as LatLngTuple[][];
        if (coord == undefined) return;
        const setCoord = coord[0] as LatLngTuple[];
        if (setCoord[0] == undefined) return;
        const firstCoord = [...setCoord[0]];
        const unreversedCoord = [firstCoord[0], firstCoord[1]];
        const reverseCoord = unreversedCoord.reverse() as LatLngTuple;
        map.flyTo(reverseCoord, 12, { animate: true });
      }

      if (type === TYPE_POINT) {
        if (data.features[0]?.geometry.coordinates == undefined) return;
        const coord: LatLngTuple = data.features[0]?.geometry.coordinates as LatLngTuple;
        if (coord == undefined) return;
        const coordUnreversed = [coord[0], coord[1]];
        const reverseCoord: LatLngTuple = [...coordUnreversed].reverse() as LatLngTuple;
        map.flyTo(reverseCoord, 12, { animate: true });
      }

      if (type === TYPE_LINESTRING) {
        const coord = data.features[0]?.geometry.coordinates[0] as LatLngTuple[];
        if (coord == undefined) return;
        const unreversedCoord = [coord[0], coord[1]];
        if (unreversedCoord == undefined) return;
        const reverseCoord = unreversedCoord.reverse() as unknown as LatLngTuple;
        map.flyTo(reverseCoord, 12, { animate: true });
      }
    }
  };

  useEffect(() => {
    handleMapTo();
  }, [type, data]);

  return null;
};

const Map = (props: Props) => {
  const ref = useRef(null);
  const [mapData, setMapData] = useState<{ feature: FeatureType; isModalOpen: boolean }>({
    feature: { properties: { place: '', r2: 0, equation: '', id: '', points: [], intercept: 0, slope: 0 } },
    isModalOpen: false,
  });

  useEffect(() => {
    if (ref.current) {
      (ref.current as ICurrent).setUrl(props.bm);
    }
  }, [props.bm]);

  const onEachPolygons = (feature: FeatureType, layer: L.Layer) => {
    layer.on({
      click: () => {
        if (feature.properties.r2) {
          setMapData({ feature, isModalOpen: true });
        }
      },
    });
  };

  const pointToLayer = (feature: { color: string; properties: object }, latlng: LatLngTuple) => {
    const color = feature.color.substring(1);
    const greenIcon = new Icon({
      iconUrl: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}&chf=a,s,ee00FFFF`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    let popupContent = '';
    for (const [key, value] of Object.entries(feature.properties)) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      popupContent += `<b>${key}</b>: ${value}<br/>`;
    }

    const markerView = marker(latlng, { icon: greenIcon });
    markerView.bindPopup(popupContent);

    return markerView;
  };

  const style = (feature: GeoJsonSingle) => {
    function getStrengthLevel(number: number) {
      switch (true) {
        case number > 0.67:
          return '#00ff00';
        case number > 0.33:
          return '#ffff00';
        case number > 0.19:
          return '#ff7800';
        default:
          return '#ff0000';
      }
    }
    if (feature.properties.r2) {
      return {
        fillColor: getStrengthLevel(feature.properties.r2),
        weight: 2,
        opacity: 1,
        border: 'solid',
        color: getStrengthLevel(feature.properties.r2),
        dashArray: '',
        fillOpacity: 0.6,
      };
    }

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
    <>
      {mapData && (
        <RegressionModuleModal
          isModalVisible={mapData.isModalOpen}
          handleHideModal={() => setMapData({ ...mapData, isModalOpen: false })}
          feature={mapData.feature}
        />
      )}
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
          {props.data && props.data[0] && props.isDirection && <GeoJSON data={props.data[0]} style={style} />}
          {props.data && props.data[0] && props.isDirection && <PanTo data={props.data[0]} />}

          {/* // <FeatureDirection data={props.data[0]} */}
          {!props.isDirection && props.data && props.data[0] && <PanTo data={props.data[0]} />}
          {!props.isDirection &&
            props.data &&
            props.data.map((el: GeoJson) => {
              const r = (Math.random() + 1).toString(36).substring(7);
              return (
                <GeoJSON data={el} key={r} style={style} pointToLayer={pointToLayer} onEachFeature={onEachPolygons} />
              );
            })}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
