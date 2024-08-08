// components/Trips/TripsList.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, useToast, Stack, useBreakpointValue, Text, Flex } from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/component';
import UploadFormWithDetails from '../Pages/UploadFormWithDetails';

const TripsList: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchTrips = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('Trips').select('*');

      if (error) {
        toast({
          title: 'Error loading trips',
          description: error.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      setTrips(data);
    };

    fetchTrips();
  }, [toast]);

  return (
    <Box p={4}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        mb={4}
      >
        <Button
          colorScheme="teal"
          onClick={onOpen}
          mb={{ base: 4, md: 0 }}
          w={{ base: 'full', md: 'auto' }}
        >
          Add New Trip
        </Button>
      </Flex>
      <Stack spacing={4}>
        {isMobile ? (
          <Box>
            {trips.map((trip) => (
              <Box key={trip.id} p={4} borderWidth={1} borderRadius="md" mb={4}>
                <Text fontWeight="bold">{trip.titulo}</Text>
                <Text>{trip.descripcion}</Text>
                <Text>{trip.fecha}</Text>
                <Text>{trip.actividad}</Text>
              </Box>
            ))}
          </Box>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Título</Th>
                  <Th>Descripción</Th>
                  <Th>Fecha</Th>
                  <Th>Actividad</Th>
                </Tr>
              </Thead>
              <Tbody>
                {trips.map((trip) => (
                  <Tr key={trip.id}>
                    <Td>{trip.titulo}</Td>
                    <Td>{trip.descripcion}</Td>
                    <Td>{trip.fecha}</Td>
                    <Td>{trip.actividad}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: 'md' }}>
        <ModalOverlay />
        <ModalContent
          maxW={{ base: '100%', md: 'md' }}
          mx={{ base: 2, md: 0 }} // Adjust horizontal margin for small screens
        >
          <ModalHeader>Add New Trip</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UploadFormWithDetails />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TripsList;
