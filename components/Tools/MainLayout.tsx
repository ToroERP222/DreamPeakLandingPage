import React, { ReactNode } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import LoggedNavbar from './LoggedNavbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import type { User } from '@supabase/supabase-js';

interface MainLayoutProps {
  children: ReactNode;
  user: User | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, user }) => {
  const router = useRouter();

  const isAuthPage = router.pathname === '/login' || router.pathname === '/register';
  const isIndexPage = router.pathname === '/';

  const marginTop = useBreakpointValue({
    base: isAuthPage ? '-40px' : '0',  // -40px para login/register en móviles
    md: isAuthPage ? '-40px' : '0',    // -40px para login/register en escritorio
  });

  const paddingTop = useBreakpointValue({
    base: isIndexPage ? '80px' : '0px', // Sin padding en móviles para index y otras páginas
    md: isIndexPage ? '80px' : '0px',  // Padding normal en escritorio
  });

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" overflow="hidden">
      <LoggedNavbar user={user} />
      <Box
        as="main"
        flex="1"
        pt={paddingTop}
        mt={marginTop}
        zIndex="1"
        position="relative"
        // Añade padding horizontal para evitar que el contenido toque los bordes
      >
        {children}
      </Box>
      <WhatsAppButton />
      <Footer />
    </Box>
  );
};

export default MainLayout;
