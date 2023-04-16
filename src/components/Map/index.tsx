import dynamic from 'next/dynamic';
import { type GeoJson } from '~/helpers/types';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });


interface Props {
  data?: GeoJson[]
  bm: string
}

const Map = (props: Props) => (
  <DynamicMap data={props.data} bm={props.bm} />
)

export default Map;