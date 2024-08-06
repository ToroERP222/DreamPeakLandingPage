import React, { useState } from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import Layout from '../components/Tools/MainLayout';
import MainLayout from '../components/Tools/MainLayout';
import VideoHero from '@/components/Pages/HeroVideo';
import Carousel from '@/components/Pages/Carousel';
import Cuestionario from '@/components/Pages/Cuestionario';
import About from '@/components/Pages/About';
import { GetServerSidePropsContext } from 'next';
import { createClient } from '@/utils/supabase/server-props';
import HikingStats from '@/components/Pages/HikingStats';
import TripWithDates from '@/components/Tools/TripsWithDates';
import CallToActionRegister from '@/components/Tools/CallToActionRegister';
import CookieBanner from '@/components/Tools/CookieBanner';
interface Profile {
  id: number;
  created_at: string;
  name: string;
  primer: string;
  segundo: string;
  birthdate: string;
  activities: string[];
  email: string;
  phone: string;
  userid: string;
  estado: string;
}

interface HomeProps {
  user: any;
  profile: Profile | null;
  trips: any[];
}

const Home: React.FC<HomeProps> = ({ user, profile, trips }) => {
  return (
    <>
      {user ? (
        <MainLayout user={user}>
          <Center>
          <Heading>Proximas Salidas</Heading>
          </Center>
          <TripWithDates user={user} trips={trips} />
        </MainLayout>
      ) : (
        <Layout user={null}>
          <div style={{ marginTop: -80 }}>
            <VideoHero title="Herovideo" description="descripcion" videoSrc="example.mp4" />
          </div>
         
          <Box p={10} pt={1} m={5}>
            <HikingStats />
          </Box>
          <Box id="contact" >
            <Carousel />
          </Box>
          <Box>
           <CallToActionRegister/>
           
          </Box>
          <Box id="calendar" py={0}>
            <Cuestionario />
          </Box>
          
          <Box id="about" py={0}>
            <About />
          </Box>
        </Layout>
      )}
      <CookieBanner />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData) {
    return {
      props: {
        user: null,
        profile: null,
        trips: [],
      },
    };
  }

  const user = userData.user;

  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('*')
    .eq('userid', user.id)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError);
  }

  const trips = [
    { date: '2024-07-15', image: '/cañonismo.jpg' },
    { date: '2024-07-20', image: '/carouselimage.webp' },
    { date: '2024-08-10', image: '/escalada.jpg' },
    // Add more trips as needed
  ];

  return {
    props: {
      user: user,
      profile: profileData || null,
      trips: trips,
    },
  };
}

export default Home;
