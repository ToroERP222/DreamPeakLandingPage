import React, { useState } from 'react';
import { Box, Center, Text, Image, Grid, GridItem, Heading, IconButton } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

import { GetServerSidePropsContext } from 'next';
import { createClient } from '@/utils/supabase/server-props';
import { User } from '@supabase/supabase-js';

interface Trip {
  fecha: string;
  titulo: string;
  actividad: string;
  descripcion: string;
  imagenName: string;
}

interface TripsWithDatesProps {
  user: User | null;
  trips: Trip[];
}

const TripsWithDates: React.FC<TripsWithDatesProps> = ({ user, trips }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // Agrupar los viajes por mes
  const tripsByMonth = trips.reduce((acc, trip) => {
    const tripDate = new Date(trip.fecha);
    if (!isNaN(tripDate.getTime())) {
      const month = tripDate.getMonth();
      if (!acc[month]) acc[month] = [];
      acc[month].push(trip);
    } else {
      console.error(`Invalid date: ${trip.fecha}`);
    }
    return acc;
  }, {} as Record<number, Trip[]>);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <Box py={10}>
      <Center mb={8}>
        <IconButton
          icon={<ArrowLeftIcon />}
          aria-label="Previous Month"
          onClick={handlePrevMonth}
          mr={4}
        />
        <Heading as="h2" size="lg">
          {months[currentMonth]} {currentYear}
        </Heading>
        <IconButton
          icon={<ArrowRightIcon />}
          aria-label="Next Month"
          onClick={handleNextMonth}
          ml={4}
        />
      </Center>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
        {tripsByMonth[currentMonth]?.map((trip, index) => (
          <GridItem key={index} position="relative">
            <Box
              position="relative"
              borderRadius="md"
              overflow="hidden"
              boxShadow="md"
              _hover={{
                '& img': { opacity: 0.3 },
                '& .overlay': { opacity: 1 },
              }}
            >
              <Center>
              {/* Imagen del viaje */}
              <Image
                src={`/uploads/${trip.imagenName}`}
                alt={trip.titulo}
                borderRadius="md"
                boxSize="150px"
                objectFit="cover"
                w="100%"
                h="auto"
                maxH="450px" 
                maxW={"450px"} // Establece la altura máxima para reducir la imagen
                transition="opacity 0.3s ease"
              />
             
              {/* Overlay de actividad */}
              <Box
                className="overlay"
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bg="rgba(0, 0, 0, 0.7)"
                color="white"
                opacity={0}
                transition="opacity 0.3s ease"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" fontWeight="bold">
                  {trip.actividad}
                </Text>
              </Box>
              </Center>
            </Box>
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              bg="rgba(0, 0, 0, 0.6)"
              color="white"
              p={2}
              textAlign="center"
              borderRadius="md"
            >
              <Text fontSize="md" fontWeight="bold">
                {new Date(trip.fecha).toDateString()}
              </Text>
              <Text fontSize="md">{trip.descripcion}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Fetch trips from Supabase
  const { data: trips, error: tripsError } = await supabase
    .from('Trips')
    .select('*');

  if (tripsError) {
    console.error('Error fetching trips:', tripsError);
    return {
      props: {
        user: user.user,
        trips: [],
      },
    };
  }

  return {
    props: {
      user: user.user,
      trips: trips || [],
    },
  };
}

export default TripsWithDates;
