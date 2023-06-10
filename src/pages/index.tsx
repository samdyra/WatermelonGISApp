import { type NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { Navbar, Sidebar, Descbar, Map } from '~/components';

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleShowSidebar = () => setIsOpen(!isOpen);

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
        <Sidebar />
      </main>
    </>
  );
};

export default Home;
