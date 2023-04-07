import dynamic from 'next/dynamic';

const DynamicFeature = dynamic(() => import('./Feature'), { ssr: false });

const Map = () => (
  <DynamicFeature />
)

export default Map;