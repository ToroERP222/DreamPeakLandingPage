import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from './NavBar';
import Footer from './Footer';
import LoggedNavbar from './LoggedNavbar';
import WhatsAppButton from './WhatsAppButton';
import type { User } from '@supabase/supabase-js'

interface MainLayoutProps {
  children: ReactNode;
  user: User | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, user }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <LoggedNavbar user={user} />
      <Box as="main" flex="1" pt={20}> {/* Ajusta el padding superior según la altura de la navbar */}
        {children}
      </Box>
      <WhatsAppButton/>
      <Footer />
    </Box>
  );
};

export default MainLayout;
