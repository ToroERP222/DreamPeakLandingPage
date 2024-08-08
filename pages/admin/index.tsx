// pages/admin.tsx
import React, { useEffect, useState } from 'react';
import UploadFormWithDetails from '@/components/Pages/UploadFormWithDetails';
import AdminLayout from '@/components/Tools/AdminLayout';
import Login from '@/components/Pages/AdminLogin';
import { Box } from '@chakra-ui/react';
import AdminDashboard from '@/components/Tools/AdminDashboard';
const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <AdminLayout>
      <Box>
        <AdminDashboard/>
      </Box>
    </AdminLayout>
  );
};

export default Admin;
