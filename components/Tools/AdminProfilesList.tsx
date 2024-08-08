// components/Profiles/ProfilesList.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, useToast, Stack, useBreakpointValue, Text, Flex } from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/component';

const ProfilesList: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchProfiles = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('profile').select('*');

      if (error) {
        toast({
          title: 'Error loading profiles',
          description: error.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        return;
      }

      setProfiles(data);
    };

    fetchProfiles();
  }, [toast]);

  return (
    <Box p={4}>
      
      <Stack spacing={4}>
        {isMobile ? (
          <Box>
            {profiles.map((profile) => (
              <Box key={profile.id} p={4} borderWidth={1} borderRadius="md" mb={4}>
                <Text fontWeight="bold">{profile.name}</Text>
                <Text>Email: {profile.email}</Text>
                <Text>Created At: {new Date(profile.created_at).toLocaleDateString()}</Text>
              </Box>
            ))}
          </Box>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Created At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {profiles.map((profile) => (
                  <Tr key={profile.id}>
                    <Td>{profile.name}</Td>
                    <Td>{profile.email}</Td>
                    <Td>{new Date(profile.created_at).toLocaleDateString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Stack>

      
    </Box>
  );
};

export default ProfilesList;
