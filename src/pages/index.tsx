import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import {
  Navbar, Sidebar, Descbar, Map
} from "~/components";

const Home: NextPage = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const handleShowSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Head>
        <title>🍉Watermelon GIS App</title>
        <meta name="description" content="Fruits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="border-3 overflow-hidden">
        <Navbar handleShowSidebar={handleShowSidebar}/>
        <Map bm="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
        <Descbar isOpen={isOpen}/>
        <Sidebar />
      </main>
    </>
  )
}

export default Home;
