import React from 'react';
import { Box, Heading, Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdEmail, MdPhone, MdDateRange } from 'react-icons/md';

interface UserProfileProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    birthdate: string;
    primer: string;
    segundo: string;
    activities: string[];
    estado: string;
    created_at: string;
    d: number;
    number: number;
    userid: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  const {
    name,
    email,
    phone,
    birthdate,
    primer,
    segundo,
    activities,
    estado,
    created_at,
    d,
    number,
    userid,
  } = profile;

  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading as="h2" size="lg" mb={4}>
        User Profile
      </Heading>
      <Text>
        <strong>Name:</strong> {name}
      </Text>
      <Text>
        <strong>Email:</strong> {email}
      </Text>
      <Text>
        <strong>Phone:</strong> {phone}
      </Text>
      <Text>
        <strong>Birthdate:</strong> {birthdate}
      </Text>
      <Text>
        <strong>Primer:</strong> {primer}
      </Text>
      <Text>
        <strong>Segundo:</strong> {segundo}
      </Text>
      <Text>
        <strong>Estado:</strong> {estado}
      </Text>
      <Text>
        <strong>Created At:</strong> {created_at}
      </Text>
      <Text>
        <strong>d:</strong> {d}
      </Text>
      <Text>
        <strong>Number:</strong> {number}
      </Text>
      <Text>
        <strong>User ID:</strong> {userid}
      </Text>
      <List mt={4}>
        <Heading as="h3" size="md" mb={2}>
          Activities
        </Heading>
        {activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <ListItem key={index}>
              <ListIcon as={MdDateRange} color="green.500" />
              {activity}
            </ListItem>
          ))
        ) : (
          <ListItem>No activities</ListItem>
        )}
      </List>
    </Box>
  );
};

export default UserProfile;
