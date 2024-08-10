// pages/index.tsx
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Layout from '@/components/Tools/Layout';
import Hero from '@/components/Landing/Hero'
import Features from '@/components/Landing/Features'
import CallToAction from '@/components/Landing/CallToAction';
const Home: NextPage = () => {
  return (
    <>
    <Layout>
<Hero/>
<Features/>
<CallToAction/>
    </Layout>
    </>
  );
};

export default Home;
