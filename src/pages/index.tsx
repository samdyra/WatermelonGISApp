import { type NextPage } from "next";
import Head from "next/head";
import Map from "~/components/Map";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";

const Home: NextPage = () => (
  <>
    <Head>
      <title>🍉Watermelon GIS App</title>
      <meta name="description" content="Fruits" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="border-3 h-full w-full">
      <Navbar />
      <Map />
      <Sidebar />
    </main>
  </>
);

export default Home;
