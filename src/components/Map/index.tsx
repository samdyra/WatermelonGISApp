import dynamic from 'next/dynamic';
import { type GeoJson } from '~/helpers/types';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

interface Props {
  data?: GeoJson[];
  bm: string;
  size: [string, string];
  isDirection: boolean;
}

const Map = (props: Props) => (
  <DynamicMap data={props.data} bm={props.bm} size={props.size} isDirection={props.isDirection} />
);

export default Map;
