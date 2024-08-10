import { ReactNode } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Your page description" />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Box minHeight="100vh" bg={bg} color={color}>
        <Navbar />
        <Box as="main" p={4}>
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
