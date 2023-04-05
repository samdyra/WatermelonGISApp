import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Descbar from "~/components/Descbar";
import Map from "~/components/Map";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";

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
      <main className="border-3 overflow-hidden bg-red-600">
        <Navbar handleShowSidebar={handleShowSidebar}/>
        <Map />
        <Descbar isOpen={isOpen}/>
        <Sidebar />
      </main>
    </>
  )
}

export default Home;
