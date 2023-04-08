import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

interface Props {
  data?: {
    id: string;
    name: string;
    feature: string;
  }[]
}

const Map = (props: Props) => (
  <DynamicMap data={props.data}/>
)

export default Map;