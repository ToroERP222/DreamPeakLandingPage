// pages/index.tsx
import React from 'react';
import { Box, Center, Heading } from '@chakra-ui/react';
import Layout from '../components/Tools/MainLayout';
import MainLayout from '../components/Tools/MainLayout';
import VideoHero from '@/components/Pages/HeroVideo';
import Carousel from '@/components/Pages/Carousel';
import Card from '@/components/Pages/Carousel'
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

interface Trip {
  fecha: string;
  titulo: string;
  actividad: string;
  descripcion: string;
  imagenName: string;
}

interface HomeProps {
  user: any;
  profile: Profile | null;
  trips: Trip[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  // Fetch user data
  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log("User Data:", userData);
  
  if (userError || !userData) {
    console.log("No user logged in");
    
    // Fetch trips data even if the user is not logged in
    const { data: tripsData, error: tripsError } = await supabase
      .from('Trips')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    
    if (tripsError) {
      console.error('Error fetching trips:', tripsError);
      return {
        props: {
          user: null,
          profile: null,
          trips: [],
        },
      };
    }
    

    return {
      props: {
        user: null,
        profile: null,
        trips: tripsData || [], // Ensure trips is an array
      },
    };
  }

  const user = userData.user;

  // Fetch profile data
  const { data: profileData, error: profileError } = await supabase
    .from('profile')
    .select('*')
    .eq('userid', user.id)
    .single();

  if (profileError) {
    console.error('Error fetching profile:', profileError);
  }

  // Fetch trips data
  const { data: tripsData, error: tripsError } = await supabase
    .from('Trips')
    .select('*');

  if (tripsError) {
    console.error('Error fetching trips:', tripsError);
    return {
      props: {
        user: user,
        profile: profileData || null,
        trips: [],
      },
    };
  }

  return {
    props: {
      user: user,
      profile: profileData || null,
      trips: tripsData || [], // Ensure trips is an array
    },
  };
}
const Home: React.FC<HomeProps> = ({ user, profile, trips }) => {
  console.log(trips)
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
            <VideoHero logoSrc='/Logo.png' description="descripcion" videoSrc="0822.mp4" />
          </div>
          <Box  >
            <HikingStats />
          </Box>
          <Box >
            <Carousel cards={trips || []} />
          </Box>
          <Box id="contact">
            <CallToActionRegister />
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
export default Home
