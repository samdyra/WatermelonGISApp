import { type NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { Navbar, Sidebar, Descbar, Form } from '~/components';
import { IHO102, inputNames } from '~/constants/texts';
import { postData } from '~/api/api';
import Map, {
  MapProvider,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  AttributionControl,
  Source,
  Layer,
} from 'react-map-gl';
import sampleData from '../../sample-data.json';
import useMutationCreateS102Data from '~/hooks/useMutationCreateS102Data';
import { type Metadata } from '~/components/Form102/types';
import { sampleTiffBase64 } from '~/constants/misc';

interface FormState {
  [key: string]: string;
}

interface FormatData {
  common_point_rule_dt_type: number;
  data_coding_format_dt_type: number;
  interpolation_type_dt_type: number;
  sequencing_rule_type_dt_type: number;
  vertical_datum_dt_type: number;
}

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'S102', icon: 'home' },
    { name: 'S104', icon: 'about' },
    { name: 'S111', icon: 'contact' },
  ];

  const [formState, setFormState] = useState<FormState>({
    tiffFile: '' as string,
  });

  const [metadata, setMetaData] = useState<Metadata>({
    // TODO: revert default value ("", bool, 0), use placeholder instead
    epoch: 'G1762',
    extent_type_code: true,
    file_name: '102ID00_ITBS100PROJECT',
    geographicIdentifier: 'Selat Alas',
    horizontalDatumReference: 'EPSG',
    horizontalDatumValue: 4326,
    issueDate: '20230409',
    issueTime: '1237',
    metadata: '102ID00_ITBS100PROJECT.xml',
  });

  const [formatData, setFormatData] = useState<FormatData>({
    // TODO: revert default value (0), use placeholder instead
    common_point_rule_dt_type: 1,
    data_coding_format_dt_type: 2,
    interpolation_type_dt_type: 1,
    sequencing_rule_type_dt_type: 1,
    vertical_datum_dt_type: 3,
  });

  const requestParam = {
    // TODO: change user_id to real user_id from clerk, and remove sampleTiffBase64
    user_id: '60a7b1b9d6b9a4a7f0a3b3a0',
    metadata: metadata,
    format_data: formatData,
    tiffFile: formState.tiffFile ?? '',
  };

  // const handleUpload = async () => {
  //   try {
  //     await postData('s102/', requestParam);
  //     console.log('Success!');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const { data, fetchData, isLoading } = useMutationCreateS102Data(requestParam);

  return (
    <>
      <Head>
        <title>🍉Urban Connect</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="border-3 overflow-hidden">
        <Navbar handleShowSidebar={handleShowSidebar} />
        <MapProvider>
          <Map
            initialViewState={{
              longitude: 116.5925,
              latitude: -8.2775,
              zoom: 13,
            }}
            mapboxAccessToken="pk.eyJ1IjoiZHdpcHV0cmFzYW0iLCJhIjoiY2xlMDRxZDU2MTU3dTNxb2Fkc3Q0NWFpciJ9.M-nfqnbgrf7QQdXHAXn07Q"
            style={{
              width: '100vw',
              height: '92vh',
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            attributionControl={false}
          >
            <AttributionControl customAttribution="Made with love by Sam X Datasintesa" style={{ color: 'black' }} />
            <NavigationControl position="bottom-right" />
            <FullscreenControl />
            <GeolocateControl />
            <Source id="polygonlayer" type="geojson" data={sampleData as string}>
              <Layer
                id="polygonlayer"
                type="line"
                source="my-data"
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': 'rgba(230, 0, 0, 1)',
                  'line-width': 2,
                }}
              />
            </Source>
          </Map>
        </MapProvider>
        <Descbar isOpen={isOpen} />
        <Sidebar menuItems={menuItems}>
          <Form
            options={IHO102}
            state={formState}
            setState={setFormState}
            inputNames={inputNames}
            metadata={metadata}
            setMetaData={setMetaData}
            FormatData={formatData}
            setFormatData={setFormatData}
            handleUpload={fetchData}
          />
        </Sidebar>
      </main>
    </>
  );
};

export default Home;
