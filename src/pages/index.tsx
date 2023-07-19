import { type NextPage } from 'next';
import { useState, useId } from 'react';
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

interface FormState {
  [key: string]: string;
}

interface Metadata {
  epoch: string;
  extent_type_code: boolean;
  geographicIdentifier: string;
  horizontalDatumReference: string;
  horizontalDatumValue: number;
  issueDate: string;
  issueTime: string;
  file_name: string;
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
  const id = useId();

  const menuItems = [
    { name: 'IHO BANG', icon: 'home' },
    { name: 'IHO IYAK', icon: 'about' },
    { name: 'IHO BENER', icon: 'contact' },
    { name: 'IHO ASLI', icon: 'settings' },
  ];

  const [formState, setFormState] = useState<FormState>({
    tiffFile: '' as string,
  });

  const [metadata, setMetaData] = useState<Metadata>({
    epoch: '',
    extent_type_code: true as boolean,
    geographicIdentifier: '',
    horizontalDatumReference: 'EPSG',
    horizontalDatumValue: 0,
    issueDate: '',
    issueTime: '',
    file_name: '',
  });

  const [formatData, setFormatData] = useState<FormatData>({
    common_point_rule_dt_type: 0,
    data_coding_format_dt_type: 0,
    interpolation_type_dt_type: 0,
    sequencing_rule_type_dt_type: 0,
    vertical_datum_dt_type: 0,
  });

  const handleUpload = async () => {
    const data = {
      _id: id,
      metadata: metadata,
      format_data: formatData,
      tiffFile: formState.tiffFile ?? '',
    };

    try {
      await postData('s102/', data);
      console.log('Success!');
    } catch (error) {
      console.log(error);
    }
  };

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
            handleUpload={handleUpload}
          />
        </Sidebar>
      </main>
    </>
  );
};

export default Home;
