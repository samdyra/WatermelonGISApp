import { type NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import {
  Navbar,
  Layerbar,
  Descbar,
  AddFeature,
  Map,
  Analysis,
  BaseMaps,
  Table,
  AvailableData,
  ModalInfo,
  DirectionModule,
} from '~/components';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';
import { handleUploadData, deleteFirebaseData } from '~/helpers/globalHelpers';
import useModalState from '~/hooks/useModalState';
import { type GeoJson } from '~/helpers/types';

const Playground: NextPage = () => {
  // ---------- HOOKS ----------
  const ctx = api.useContext();
  const { data } = api.features.getFeaturesByUserId.useQuery();
  const { data: dataStats } = api.stats.getStatsByUserId.useQuery();
  const { data: dataDirection } = api.direction.getDirectionByUserId.useQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [isLayerOpen, setIsLayerOpen] = useState(true);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(true);
  const [bm, setBm] = useState(
    'https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=cm12mCvBTIOBGz4tb8FTAoubM28MtIRzTmxkCcVplrCbgz20duEVixioH3HT8OMw'
  );
  const [isModalVisible, handleShowModal, handleHideModal] = useModalState();
  const [isModalDirectionVisible, handleShowModalDirection, handleHideModalDirection] = useModalState();
  const [tableData, setTableData] = useState<GeoJson | undefined>(data?.[0]);
  const [modalInfo, setModalInfo] = useState({ isOpen: false, desc: '' });

  // ---------- MUTATIONS ----------
  const { mutate, isLoading: loadingCreateData } = api.features.create.useMutation({
    onSuccess: () => {
      void ctx.features.getFeaturesByUserId.invalidate();
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  const { mutate: deleteFeature, isLoading: loadingDeleteData } = api.features.delete.useMutation({
    onSuccess: async ({ feature }) => {
      void ctx.features.getFeaturesByUserId.invalidate();
      await deleteFirebaseData(feature);
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  const { mutate: deleteStats, isLoading: loadingDeleteStats } = api.stats.delete.useMutation({
    onSuccess: async ({ stats }) => {
      void ctx.stats.getStatsByUserId.invalidate();
      await deleteFirebaseData(stats);
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  const { mutate: deleteDirection, isLoading: loadingDeleteDirection } = api.direction.delete.useMutation({
    onSuccess: async ({ feature }) => {
      void ctx.direction.getDirectionByUserId.invalidate();
      await deleteFirebaseData(feature);
    },
    onError: () => {
      toast.error('Something Went Wrong!');
    },
  });

  const isLoading = loadingCreateData || loadingDeleteData || loadingDeleteStats || loadingDeleteDirection;

  // ---------- HANDLERS ----------
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUploadData(event, (url, fileName) => mutate({ feature: url, name: fileName }));
  };
  const handleTableData = (data: GeoJson) => {
    setTableData(data);
    handleShowModal();
  };

  const handleDirectionModule = (data: GeoJson) => {
    setTableData(data);
    handleShowModalDirection();
  };

  const handleDelete = (id: string) => deleteFeature({ id });
  const handleDeleteStats = (id: string) => deleteStats({ id });
  const handleDeleteDirection = (id: string) => deleteDirection({ id });
  const handleShowSidebar = () => setIsOpen(!isOpen);
  const handleShowLayerbar = () => setIsLayerOpen(!isLayerOpen);
  const handleShowAnalysisbar = () => setIsAnalysisOpen(!isAnalysisOpen);
  const handleHideModalInfo = () => setModalInfo({ isOpen: false, desc: '' });
  const handleShowModalInfo = (desc: string) => setModalInfo({ isOpen: true, desc });

  return (
    <>
      <Head>
        <title>🍉Watermelon GIS App</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="border-3 overflow-hidden">
        {tableData && (
          <Table
            handleHideModal={handleHideModal}
            isModalVisible={isModalVisible}
            name={tableData.name}
            table={tableData}
          />
        )}
        {tableData && (
          <DirectionModule
            handleHideModal={handleHideModalDirection}
            isModalVisible={isModalDirectionVisible}
            feature={tableData}
          />
        )}
        <ModalInfo handleHideModal={handleHideModalInfo} desc={modalInfo.desc} isModalVisible={modalInfo.isOpen} />
        <Navbar handleShowSidebar={handleShowSidebar} />
        <Map data={data} bm={bm} size={['100%', '100%']} isDirection={false} />
        <Layerbar isOpen={isLayerOpen} handleShowLayerbar={handleShowLayerbar} position="left" size="large">
          <AddFeature
            handleUpload={handleUpload}
            data={data}
            handleDelete={handleDelete}
            isLoading={isLoading}
            handleShowModal={handleTableData}
            handleShowModalInfo={handleShowModalInfo}
            dataStats={dataStats}
            handleDeleteStats={handleDeleteStats}
            dataDirection={dataDirection}
            handleDeleteDirection={handleDeleteDirection}
            handleShowModalDirection={handleDirectionModule}
          />
          <AvailableData handleShowModalInfo={handleShowModalInfo} />
        </Layerbar>
        <Layerbar isOpen={isAnalysisOpen} position="right" size="small" handleShowLayerbar={handleShowAnalysisbar}>
          <Analysis data={data} handleShowModalInfo={handleShowModalInfo} />
          <BaseMaps bm={bm} setBm={setBm} handleShowModalInfo={handleShowModalInfo} />
        </Layerbar>
        <Descbar isOpen={isOpen} />
      </main>
    </>
  );
};

export default Playground;
