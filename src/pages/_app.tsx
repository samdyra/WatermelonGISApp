import { type AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { api } from '~/utils/api';
import { Toaster } from 'react-hot-toast';
import '~/styles/globals.css';
import Head from 'next/head';
import 'leaflet/dist/leaflet.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider {...pageProps}>
        <Head>
          <title>🍉 Urban Connect</title>
          <meta name="description" content="Fruits" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </ClerkProvider>
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
