// components/Tools/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Text, Center, Stack, useBreakpointValue } from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/component';
import AdminLayout from './AdminLayout';

const AdminDashboard: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const tableVariant = useBreakpointValue({ base: 'unstyled', md: 'simple' });

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      try {
        // Fetch Trips
        const { data: tripsData, error: tripsError } = await supabase
          .from('Trips')
          .select('*');

        if (tripsError) {
          throw new Error(tripsError.message);
        }

        // Fetch Profiles
        const { data: profilesData, error: profilesError } = await supabase
          .from('profile')
          .select('*');

        if (profilesError) {
          throw new Error(profilesError.message);
        }

        setTrips(tripsData || []);
        setProfiles(profilesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6}>
          Admin Dashboard
        </Heading>

        <Stack spacing={8}>
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Trips
            </Heading>
            <Box overflowX="auto">
              <Table variant={tableVariant}>
                <Thead display={{ base: 'none', md: 'table-header-group' }}>
                  <Tr>
                    <Th>Fecha</Th>
                    <Th>Título</Th>
                    <Th>Actividad</Th>
                    <Th>Descripción</Th>
                    <Th>Imagen</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {trips.map((trip, index) => (
                    <Tr key={index} display={{ base: 'block', md: 'table-row' }}>
                      <Td display={{ base: 'block', md: 'table-cell' }}>
                        <Text as="span" display={{ base: 'inline-block', md: 'none' }} fontWeight="bold">
                          Fecha: 
                        </Text>
                        {trip.fecha}
                      </Td>
                      <Td display={{ base: 'block', md: 'table-cell' }}>
                        <Text as="span" display={{ base: 'inline-block', md: 'none' }} fontWeight="bold">
                          Título: 
                        </Text>
                        {trip.titulo}
                      </Td>
                      <Td display={{ base: 'block', md: 'table-cell' }}>
                        <Text as="span" display={{ base: 'inline-block', md: 'none' }} fontWeight="bold">
                          Actividad: 
                        </Text>
                        {trip.actividad}
                      </Td>
                      <Td display={{ base: 'block', md: 'table-cell' }}>
                        <Text as="span" display={{ base: 'inline-block', md: 'none' }} fontWeight="bold">
                          Descripción: 
                        </Text>
                        {trip.descripcion}
                      </Td>
                      <Td display={{ base: 'block', md: 'table-cell' }}>
                        <Text as="span" display={{ base: 'inline-block', md: 'none' }} fontWeight="bold">
                          Imagen: 
                        </Text>
                        <Text isTruncated maxW="150px">{trip.imagenName}</Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Profiles
            </Heading>
            <Box overflowX="auto">
              <Table variant={tableVariant}>
                <Thead display={{ base: 'none', md: 'table-header-group' }}>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Email</Th>
                    <Th>Nombre</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {profiles.map((profile, index) => (
                    <Tr key={index} display={{ base: 'block', md: 'table-row' }}>
                      <Td display={{ base: 'block', md: 'table-cell' }}>
                        <Text as="span" display={{ base: 'inline-block', md: 'none' }} fontWeight="bold">
                          ID: 
                        </Text>
                        {profile.id}
                      </Td>
                      <Td display={{ base: 'block', md: 'table-cell' }}>
                        <Text as="span" display={{ base: 'inline-block', md: 'none' }} fontWeight="bold">
                          Email: 
                        </Text>
                        {profile.email}
                      </Td>
                      <Td display={{ base: 'block', md: 'table-cell' }}>
                        <Text as="span" display={{ base: 'inline-block', md: 'none' }} fontWeight="bold">
                          Nombre: 
                        </Text>
                        {profile.nombre}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Stack>
      </Box>
  
  );
};

export default AdminDashboard;
