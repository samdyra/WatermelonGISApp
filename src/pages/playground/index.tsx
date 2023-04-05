import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Descbar from "~/components/Descbar";
import Map from "~/components/Map";
import Navbar from "~/components/Navbar";
import Layerbar from "~/components/Layerbar";

const Playground: NextPage = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isLayerOpen, setIsLayerOpen ] = useState(false);
  const [ isToolsOpen ] = useState(true);
  const handleShowSidebar = () => setIsOpen(!isOpen);
  const handleShowLayerbar = () => setIsLayerOpen(!isLayerOpen);

  return (
    <>
      <Head>
        <title>🍉Watermelon GIS App</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="border-3 overflow-hidden bg-red-600">
        <Navbar handleShowSidebar={handleShowSidebar}/>
        <Map />
        <Layerbar isOpen={isLayerOpen} handleShowLayerbar={handleShowLayerbar} position="left" size="large"/>
        <Layerbar isOpen={isToolsOpen} position="right" size="small"/>
        <Descbar isOpen={isOpen}/>
      </main>
    </>
  )
}

export default Playground;
