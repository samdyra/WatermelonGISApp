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
  BaseMaps
} from "~/components";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { handleUploadData, deleteFirebaseData } from "~/helpers/globalHelpers";

const Playground: NextPage = () => {

  // ---------- HOOKS ----------
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isLayerOpen, setIsLayerOpen ] = useState(true);

  const ctx = api.useContext();
  const { data } = api.features.getFeaturesByUserId.useQuery();

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

  const handleDelete = (id: string) => deleteFeature({ id });
  const handleShowSidebar = () => setIsOpen(!isOpen);
  const handleShowLayerbar = () => setIsLayerOpen(!isLayerOpen);

  return (
    <>
      <Head>
        <title>🍉Watermelon GIS App</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="border-3 overflow-hidden">
        <Navbar handleShowSidebar={handleShowSidebar} />
        <Map data={data} />
        <Layerbar
          isOpen={isLayerOpen}
          handleShowLayerbar={handleShowLayerbar}
          position="left"
          size="large"
        >
          <AddFeature handleUpload={handleUpload} data={data} handleDelete={handleDelete} isLoading={isLoading} />
        </Layerbar>
        <Layerbar isOpen position="right" size="small">
          <Analysis data={data} />
          <BaseMaps />
        </Layerbar>
        <Descbar isOpen={isOpen} />
      </main>
    </>
  );
};

export default Playground;
