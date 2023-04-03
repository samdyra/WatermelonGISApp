import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

const Map = () => (
  <DynamicMap />
)

export default Map;