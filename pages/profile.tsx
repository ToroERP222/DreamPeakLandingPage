import React, { useState } from 'react';
import { 
  Box, Center, Divider, Stack, Text, Image, useColorModeValue, Button, 
  IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalBody, ModalFooter, Select,Flex 
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import MainLayout from '../components/Tools/MainLayout';
import { GetServerSidePropsContext } from 'next';
import { createClient } from '../utils/supabase/server-props';
import { User } from '@supabase/supabase-js';
import EditProfileForm from '../components/Tools/EditProfileForm';
import { activities } from '../data';  // Import the activities array

interface ProfileProps {
  user: User | null;
  profile: Profile | null;
}

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

const activityImages: { [key: string]: string } = {
  'Escalada': '/escalada.jpg',
  'Cañonismo': '/cañonismo.jpg'
  // Add more activity images as needed
  // 'ActivityName': 'image/path.jpg'
};

const ProfilePage: React.FC<ProfileProps> = ({ user, profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleProfileUpdated = () => {
    setIsEditing(false);
    // Optionally, you can re-fetch the profile data or handle the updated state here
  };

  const handleAddActivity = async () => {
    if (selectedActivity && profile && !profile.activities.includes(selectedActivity)) {
      const updatedActivities = [...profile.activities, selectedActivity];
      
      const response = await fetch('/api/update-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: profile.userid,
          activities: updatedActivities,
        }),
      });

      if (response.ok) {
        profile.activities.push(selectedActivity); // Update the profile activities state
        onClose();
      } else {
        const { error } = await response.json();
        console.error(error);
      }
    }
  };

  if (!user || !profile) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <MainLayout user={user}>
      <Box py={24}>
        <Center>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Welcome, {user.email}
          </Text>
        </Center>

        {isEditing ? (
          <EditProfileForm user={user} profile={profile} onProfileUpdated={handleProfileUpdated} />
        ) : (
          <>
            {profile && (
              <Box p={4} borderWidth={1} borderRadius="md" bg={useColorModeValue('gray.50', 'gray.700')}>
                <Stack spacing={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    Profile Information
                  </Text>
                  <Divider />
                  <Stack spacing={2}>
                    <Text><b>Nombre:</b> {profile.name}</Text>
                    <Text><b>Primer Apellido:</b> {profile.primer}</Text>
                    <Text><b>Segundo Apellido:</b> {profile.segundo}</Text>
                    <Text><b>Fecha de Nacimiento:</b> {profile.birthdate}</Text>
                    <Text><b>Email:</b> {profile.email}</Text>
                    <Text><b>Telefono:</b> {profile.phone}</Text>
                    <Text><b>Estado:</b> {profile.estado}</Text>
                  </Stack>
                  <Divider />
                  <Text fontSize="lg" fontWeight="bold">
                    Actividades
                  </Text>
                  <Stack spacing={4}>
                  <Flex wrap="wrap" >
                    {profile.activities.map((activity, index) => (
                      <Box key={index} p={2}>
                        <Text fontSize="md" fontWeight="bold">
                          {activity}
                        </Text>
                        <Image
                          src={activityImages[activity] || '/path/to/default-image.jpg'}
                          alt={activity}
                          borderRadius="md"
                          mt={2}
                          boxSize="400px"
                          objectFit="cover"
                        />
                      </Box>
                    ))}
                   <Center>
                   <IconButton
                      icon={<AddIcon />}
                      aria-label="Add Activity"
                      onClick={onOpen}
                      m={5}
                    />
                   </Center>
                  </Flex>
                  </Stack>
                </Stack>
              </Box>
            )}
            <Center>
              <Button mt={4} colorScheme="teal" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </Center>
          </>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Activity</ModalHeader>
          <ModalBody>
            <Select
              placeholder="Select activity"
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
            >
              {activities.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddActivity}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
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

  const { data: profile, error: profileError } = await supabase
    .from('profile')
    .select('*')
    .eq('userid', user.user.id)
    .single();

  if (profileError || !profile) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user.user,
      profile: profile,
    },
  };
}

export default ProfilePage;
