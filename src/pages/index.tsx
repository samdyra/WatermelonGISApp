import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Navbar, Sidebar, Descbar, Form } from '~/components';
import { IHO102, inputNames } from '~/constants/texts';
import useFetchS102Data from '~/hooks/useFetchS102Data';
import useMutationCreateS102Data from '~/hooks/useMutationCreateS102Data';
import { type Metadata } from '~/components/Form102/types';
import MapV2 from '~/iso_components/mapV2';
import toast from 'react-hot-toast';

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

  // TEMPORARY CODE BELOW
  const { mutate, isLoading, isError } = useMutationCreateS102Data(requestParam);
  const { s102_data } = useFetchS102Data({
    user_id: '60a7b1b9d6b9a4a7f0a3b3a0',
  });

  return (
    <>
      <Head>
        <title>🍉Urban Connect</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="border-3 overflow-hidden">
        <Navbar handleShowSidebar={handleShowSidebar} />
        <MapV2 geojsonData={{} as string} />
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
            handleUpload={mutate}
          />
          {/* {s102_data?.data?.map((el) => {
            return (
              <a className="text-blue-700" href={el?.hdf5Uri}>
                link data 1
              </a>
            );
          })} */}
        </Sidebar>
      </main>
    </>
  );
};

export default Home;
