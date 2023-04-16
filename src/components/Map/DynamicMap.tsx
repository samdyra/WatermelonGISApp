import s from "./map.module.scss";
import "leaflet/dist/leaflet.css";
import {
  TileLayer, MapContainer, GeoJSON, useMap
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import { useEffect } from "react";
import LatLngTuple = L.LatLngTuple

interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: LatLngTuple | LatLngTuple[][] | LatLngTuple[][][];
    };
    properties: object;
  }[];
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  name?: string;
  color: string;
}
interface Props {
  data?: GeoJson[];
}

type IFlyTo = {
  data: GeoJson;
};

const PanTo = (props: IFlyTo) => {
  const map = useMap();

  const { data } = props;
  const type = data.features[0]?.geometry.type;
  const TYPE_STRING = "MultiLineString" 
  const TYPE_POINT = "Point" 
  const TYPE_POLYGON = "MultiPolygon"

  const handleMapTo = () => {
    if (type === TYPE_STRING || type === TYPE_POLYGON || type === TYPE_POINT) {
      if (type === TYPE_STRING) {
        const coord = data.features[0]?.geometry.coordinates[0] as LatLngTuple[]
        if (coord == undefined) return
        const firstCoord = coord[0]
        if (firstCoord == undefined) return
        const reverseCoord = [ ...firstCoord ].reverse() as LatLngTuple
        map.flyTo(reverseCoord, 17, { animate: true })
      }

      if (type === TYPE_POLYGON) {
        const coord = data.features[0]?.geometry.coordinates[0] as LatLngTuple[][]
        if (coord == undefined) return
        const setCoord = coord[0] as LatLngTuple[]
        if (setCoord[0] == undefined) return
        const firstCoord = [ ...setCoord[0] ]
        const reverseCoord = firstCoord.reverse() as LatLngTuple
        map.flyTo(reverseCoord,17, { animate: true })
      }

      if (type === TYPE_POINT) {
        if (data.features[0]?.geometry.coordinates == undefined) return
        const coord: LatLngTuple = data.features[0]?.geometry.coordinates as LatLngTuple
        if (coord == undefined) return
        const reverseCoord: LatLngTuple = [ ...coord ].reverse() as LatLngTuple
        map.flyTo(reverseCoord, 17, { animate: true })
      }
    }
  }

  useEffect(() => {
    handleMapTo()
  }, [ type, data ]);

  return null;
};

const Map = (props: Props) => {

  // const pointToLayer = (feature, latlng) => {
  //   console.log("feature", feature, latlng)
  // }
  
  const style = (feature: GeoJson) => {
    console.log("feature", feature)
    return {
      fillColor: feature.color,
      weight: 2,
      opacity: 1,
      border: "solid",
      color: feature.color,
      dashArray: "",
      fillOpacity: 0.6,
    }
  };

  return (
    <div className={s.wrapper}>
      <MapContainer
        center={[ -6.918759110120172, 107.6165053230779 ]}
        zoom={13}
        style={{
          height: "100%",
          position: "relative",
          zIndex: 0,
          boxShadow: "-2px 3px 5px 0 rgba(0,.9,0,.4)",
        }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.data && props.data[0] && <PanTo data={props.data[0]} />}
        {props.data &&
        props.data.map((el: GeoJson) => {
          const r = (Math.random() + 1).toString(36).substring(7);
          return (

            <GeoJSON data={el} key={r} style={style} />
          );
        })}
      </MapContainer>
    </div>
  )
}

export default Map;
