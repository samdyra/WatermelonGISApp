import s from "./map.module.scss";
import "leaflet/dist/leaflet.css";
import { TileLayer, MapContainer } from "react-leaflet";


const Map = ({}) => (
  <div className={s.wrapper}>
    <MapContainer
      center={[ -6.733252, 108.552161 ]}
      zoom={13}
      style={{
        height: "100%",
        position: "relative",
        zIndex: 0,
        boxShadow: "-2px 3px 5px 0 rgba(0,.9,0,.4)",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  </div>
);

export default Map;
