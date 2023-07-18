import { type AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { api } from '~/utils/api';
import { Toaster } from 'react-hot-toast';
import '~/styles/globals.css';
import Head from 'next/head';
import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const MyApp: AppType = ({ Component, pageProps }) => (
  <ClerkProvider {...pageProps}>
    <Head>
      <title>🍉 Urban Connect</title>
      <meta name="description" content="Fruits" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Toaster position="top-center" />
    <Component {...pageProps} />
  </ClerkProvider>
);

export default api.withTRPC(MyApp);
