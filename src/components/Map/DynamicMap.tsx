import s from "./map.module.scss";
import "leaflet/dist/leaflet.css";
import {
  TileLayer, MapContainer, GeoJSON 
} from "react-leaflet";

interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: object;
  }[];
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  name: string;
}
interface Props {
  data?: GeoJson[];
}

const Map = (props: Props) => (
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
      {props.data &&
        props.data.map((el) => {
          const r = (Math.random() + 1).toString(36).substring(7);
          return <GeoJSON data={el} key={r} />;
        })}
    </MapContainer>
  </div>
);

export default Map;
