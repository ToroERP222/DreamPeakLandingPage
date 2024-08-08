// components/Tools/AdminNavbar.tsx
import React from 'react';
import { Box, Flex, Heading, Button, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const AdminNavbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/'); // Redirect to login page or wherever needed
  };

  return (
    <Box bg="gray.700" color="white" px={4} py={2}>
      <Flex justify="space-between" align="center">
        <Heading size="md">Admin Dashboard</Heading>
        <Flex>
      
          
          <Button onClick={handleLogout} ml={4} colorScheme="red">
            Logout
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminNavbar;
