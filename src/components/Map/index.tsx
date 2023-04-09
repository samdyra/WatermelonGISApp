import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

interface GeoJson {
  type: string;
  features: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    }
    properties: object;
  }[]
  crs: {
    type: string;
    properties: {
      name: string
    }
  };
  name?: string;
}
interface Props {
  data?: GeoJson[]
}

const Map = (props: Props) => (
  <DynamicMap data={props.data}/>
)

export default Map;