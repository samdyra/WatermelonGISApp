import dynamic from 'next/dynamic';
import LatLngTuple = L.LatLngTuple

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

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
  color: string
}
interface Props {
  data?: GeoJson[]
}

const Map = (props: Props) => (
  <DynamicMap data={props.data}/>
)

export default Map;