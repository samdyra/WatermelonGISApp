import s from "./map.module.scss";
import "leaflet/dist/leaflet.css";
import {
  TileLayer, MapContainer, GeoJSON 
} from "react-leaflet";
import { useEffect, useState } from "react";
import type { GeoJsonObject } from 'geojson';


interface Props {
  data?: {
    id: string;
    name: string;
    feature: string;
  }[]
}

const Map = (props: Props) => {
  const [ geoJson, setGeoJson ] = useState<GeoJsonObject | null>(null);
  const sample = props.data && props.data[0]?.feature;

  useEffect(() => {
    if (sample) {
      fetch(sample)
        .then((res) => res.json().then((out: GeoJsonObject) => setGeoJson(out)))
        .catch((err) => console.log(err));
    }
  }, [ sample ]);

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
        {geoJson && <GeoJSON data={geoJson} />}
      </MapContainer>
    </div>
  );
};

export default Map;
