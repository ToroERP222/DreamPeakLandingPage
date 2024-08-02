import React, { useState } from 'react';
import { Box, Text, Stack, Image, Divider, Badge, useColorModeValue, Center, Heading } from '@chakra-ui/react';
import Layout from '../components/Tools/MainLayout';
import MainLayout from '../components/Tools/MainLayout';
import VideoHero from '@/components/Pages/HeroVideo';
import Carousel from '@/components/Pages/Carousel';
import Cuestionario from '@/components/Pages/Cuestionario';
import About from '@/components/Pages/About';
import { GetServerSidePropsContext } from 'next';
import { createClient } from '@/utils/supabase/server-props';
import PhotoGallery from '@/components/Tools/PhotoGallery';
import AvailableDates from '@/components/Tools/AvailableDates';
import TripWithDates from '@/components/Tools/TripsWithDates';
import HikingStats from '@/components/Pages/HikingStats';
import TripsWithDates from '@/components/Tools/TripsWithDates';

const activityImages: { [key: string]: string } = {
  Escalada: '/escalada.jpg',
  Hiking: '/path/to/hiking-image.jpg',
  // Add other activities and their corresponding image paths
};

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
  trips:any;
}
const photos = [
  '/images/trip1.jpg',
  '/images/trip2.jpg',
  '/images/trip3.jpg',
  // Add more photo URLs
];

const availableDates = [
  '2024-08-01',
  '2024-08-15',
  '2024-09-01',
  // Add more dates
];
const Home: React.FC<HomeProps> = ({ user, profile,trips }) => {

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  return (
    <>
      {user ? (
        <>
          <MainLayout user={user}>
            
         <TripWithDates user={user} trips={trips}/>
     
          
   
          </MainLayout>
        </>
      ) : (
        <>
          <Layout user={null}>
            <div style={{marginTop:-80}}>
            <VideoHero title={'Herovideo'} description={'descripcion'} videoSrc={'example.mp4'} />
            
            </div>
            
            <Box p={10} m={5}>
              <HikingStats/>
            </Box>
            <Box id="contact" py={0}>
            <Carousel/>
            </Box>
            <Box id="calendar" py={24}>
              <Cuestionario />
            </Box>
          
            <Box id="about" py={0}>
              <About />
            </Box>
          </Layout>
        </>
      )}
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
      trips
    },
  };
}

export default Home;
