import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), { ssr: false });

const Map = () => (
  <div className='w-screen h-screen'>
    <DynamicMap />
  </div>
)

export default Map;