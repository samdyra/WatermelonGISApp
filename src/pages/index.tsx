import { type NextPage } from 'next';
import { useState, useId } from 'react';
import Head from 'next/head';
import { Navbar, Sidebar, Descbar, Map, Form } from '~/components';
import { IHO102, inputNames } from '~/constants/texts';
import { postData } from '~/api/api';

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
        <Map bm="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" size={['100%', '100%']} isDirection={false} />
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
