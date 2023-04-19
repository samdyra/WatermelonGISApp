import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import {
  Navbar,
  Layerbar,
  Descbar,
  AddFeature,
  Map,
  Analysis,
  BaseMaps,
  Table
} from "~/components";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { handleUploadData, deleteFirebaseData } from "~/helpers/globalHelpers";
import useModalState from "~/hooks/useModalState";
import { type GeoJson } from "~/helpers/types";

const Playground: NextPage = () => {

  // ---------- HOOKS ----------
  const ctx = api.useContext();
  const { data } = api.features.getFeaturesByUserId.useQuery();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isLayerOpen, setIsLayerOpen ] = useState(true);
  const [ isAnalysisOpen, setIsAnalysisOpen ] = useState(true);
  const [ bm, setBm ] = useState("https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=cm12mCvBTIOBGz4tb8FTAoubM28MtIRzTmxkCcVplrCbgz20duEVixioH3HT8OMw");
  const [ isModalVisible, handleShowModal, handleHideModal ] = useModalState()
  const [ tableData, setTableData ] = useState<GeoJson | undefined>(data?.[0])

  // ---------- MUTATIONS ----------
  const { mutate, isLoading: loadingCreateData } = api.features.create.useMutation({
    onSuccess: () => {
      void ctx.features.getFeaturesByUserId.invalidate()
    },
    onError: () => {
      toast.error("Something Went Wrong!");
    },
  });

  const { mutate: deleteFeature, isLoading: loadingDeleteData } = api.features.delete.useMutation({
    onSuccess: async ({ feature }) => {
      void ctx.features.getFeaturesByUserId.invalidate();
      await deleteFirebaseData(feature)
    },
    onError: () => {
      toast.error("Something Went Wrong!");
    },
  });

  const isLoading = loadingCreateData || loadingDeleteData;

  // ---------- HANDLERS ----------
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUploadData(event, (url, fileName) => mutate({ feature: url, name: fileName }));
  };
  const handleTableData = (data: GeoJson) => {
    setTableData(data)
    handleShowModal()
  }

  const handleDelete = (id: string) => deleteFeature({ id });
  const handleShowSidebar = () => setIsOpen(!isOpen);
  const handleShowLayerbar = () => setIsLayerOpen(!isLayerOpen);
  const handleShowAnalysisbar = () => setIsAnalysisOpen(!isAnalysisOpen);

  return (
    <>
      <Head>
        <title>🍉Watermelon GIS App</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="border-3 overflow-hidden">
        {tableData && <Table handleHideModal={handleHideModal} isModalVisible={isModalVisible} name={tableData.name} table={tableData}/>}
        <Navbar handleShowSidebar={handleShowSidebar} />
        <Map data={data} bm={bm} />
        <Layerbar
          isOpen={isLayerOpen}
          handleShowLayerbar={handleShowLayerbar}
          position="left"
          size="large"
        >
          <AddFeature handleUpload={handleUpload} data={data} handleDelete={handleDelete} isLoading={isLoading} handleShowModal={handleTableData}/>
        </Layerbar>
        <Layerbar isOpen={isAnalysisOpen} position="right" size="small" handleShowLayerbar={handleShowAnalysisbar}>
          <Analysis data={data} />
          <BaseMaps bm={bm} setBm={setBm}/>
        </Layerbar>
        <Descbar isOpen={isOpen} />
      </main>
    </>
  );
};

export default Playground;
