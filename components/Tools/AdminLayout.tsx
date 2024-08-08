// components/Tools/AdminLayout.tsx
import React from 'react';
import AdminSidebar from './AdminSideBar';
import { Box } from '@chakra-ui/react';
import AdminNavbar from './AdminNavbar';
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Box>
      <AdminNavbar/>
      <AdminSidebar />
      <Box ml='100px' as="main" p={4}>
        {children}
      </Box>
      <Box as="footer" textAlign="center" p={4} bg="gray.200">
        &copy; {new Date().getFullYear()} Dream Peak
      </Box>
    </Box>
  );
};

export default AdminLayout;