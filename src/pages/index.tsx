import { type NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { Navbar, Sidebar, Descbar, Layerbar } from '~/components';
import { IHO102, inputNames } from '~/constants/texts';
import useFetchS102Data from '~/hooks/useFetchS102Data';
import useMutationCreateS102Data from '~/hooks/useMutationCreateS102Data';
import useDownloadFetchedData from '~/hooks/useDownloadFetchedData';
import { type Metadata } from '~/iso_components/Form102/types';
import MapV2 from '~/iso_components/mapV2';
import { AddFeature, Form } from '~/iso_components';
import bathymetry from '../../public/bathymetry.png';
import waterLevel from '../../public/water_level.png';
import surfaceCurrents from '../../public/surface_current.png';
import useMutationDeleteS102Data from '~/hooks/useMutationDeleteS102Data';

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

const menuItems = [
  { name: 'S102', icon: bathymetry, label: 'Bathymetry' },
  { name: 'S104', icon: waterLevel, label: 'Water Level' },
  { name: 'S111', icon: surfaceCurrents, label: 'Surface Currents' },
];

export type MenuItemsType = typeof menuItems;

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowSidebar = () => setIsOpen(!isOpen);
  const [isDataLayerOpen, setIsDataLayerOpen] = useState(true);

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

  // TEMPORARY CODE BELOW
  const { mutate, isLoading: isMutateDataLoading } = useMutationCreateS102Data(requestParam);
  const { mutate: mutateDeleteData, isLoading: isLoadingDelete } = useMutationDeleteS102Data();

  const { data: s102Data, isLoading: isS102DataLoading } = useFetchS102Data({
    user_id: '60a7b1b9d6b9a4a7f0a3b3a0',
  });

  const { data, isLoading: isDownloadDataLoading } = useDownloadFetchedData(s102Data?.data ?? []);

  const isLoading = isMutateDataLoading || isS102DataLoading || isDownloadDataLoading || isLoadingDelete;

  const handleOpenDataLayer = () => {
    setIsDataLayerOpen(!isDataLayerOpen);
  };

  const handleClearData = () => {
    setMetaData({
      epoch: '',
      extent_type_code: true,
      file_name: '',
      geographicIdentifier: '',
      horizontalDatumReference: '',
      horizontalDatumValue: 4326,
      issueDate: '',
      issueTime: '',
      metadata: '',
    });
    setFormatData({
      common_point_rule_dt_type: 1,
      data_coding_format_dt_type: 2,
      interpolation_type_dt_type: 1,
      sequencing_rule_type_dt_type: 1,
      vertical_datum_dt_type: 3,
    });
  };

  const handleDeleteData = (param: { id: string; geojsonUri: string; hdf5Uri: string }) => {
    mutateDeleteData({ _id: param.id, geojsonUri: param.geojsonUri, hdf5Uri: param.hdf5Uri });
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
        <MapV2 geojsonData={data?.[0]?.geojsonData as string} />
        <Descbar isOpen={isOpen} />
        <Sidebar menuItems={menuItems}>
          <Form
            handleClear={handleClearData}
            options={IHO102}
            state={formState}
            setState={setFormState}
            inputNames={inputNames}
            metadata={metadata}
            setMetaData={setMetaData}
            FormatData={formatData}
            setFormatData={setFormatData}
            handleUpload={mutate}
          />
        </Sidebar>
        <Layerbar isOpen={isDataLayerOpen} position="right" size="large" handleShowLayerbar={handleOpenDataLayer}>
          <AddFeature data={data} isLoading={isLoading} handleDeleteData={handleDeleteData} />
        </Layerbar>
      </main>
    </>
  );
};

export default Home;
