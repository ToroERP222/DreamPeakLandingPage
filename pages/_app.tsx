// pages/_app.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../components/Tools/Loader';
import SEO from '@/components/Tools/SEO';
import { Head } from 'next/document';
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ChakraProvider>
      
      <SEO title={'Dream Peak'} description={'Hiking y mas...'}/>
      {loading ? <Loader />: <Component {...pageProps} /> }
      
    </ChakraProvider>
  );
}

export default MyApp;
