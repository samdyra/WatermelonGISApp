import dynamic from 'next/dynamic';
import { type GeoJson } from '~/helpers/types';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });


interface Props {
  data?: GeoJson[]
}

const Map = (props: Props) => (
  <DynamicMap data={props.data}/>
)

export default Map;