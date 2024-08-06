// components/Tools/AdminLayout.tsx
import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Box } from '@chakra-ui/react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Box>
      <AdminNavbar />
      <Box as="main" p={4}>
        {children}
      </Box>
      <Box as="footer" textAlign="center" p={4} bg="gray.200">
        &copy; {new Date().getFullYear()} Dream Peak
      </Box>
    </Box>
  );
};

export default AdminLayout;
