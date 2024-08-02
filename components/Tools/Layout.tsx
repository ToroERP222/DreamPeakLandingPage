import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './NavBar';
import Footer from './Footer';
import { User } from '@supabase/supabase-js'

interface LayoutProps {
  children: ReactNode
  user: User | null
}

const Layout: React.FC<LayoutProps> = ({ children ,user}: LayoutProps) => {
  return (
    <Box>
      <Navbar user={null} />
      <Box as="main" pt={100}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
