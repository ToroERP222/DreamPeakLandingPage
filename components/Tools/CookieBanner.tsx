import React, { useState } from 'react';
import { Box, Button, Text, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
  const buttonColorScheme = useColorModeValue('teal', 'cyan');
  const bannerHeight = useBreakpointValue({ base: 'auto', md: '60px' });

  const handleAccept = () => {
    // Aquí puedes añadir la lógica para almacenar la preferencia del usuario en cookies o local storage
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      bg={bgColor}
      color={textColor}
      py={4}
      px={8}
      zIndex={1000}
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="space-between"
      height={bannerHeight}
      boxShadow="md"
    >
      <Text fontSize="sm" mb={{ base: 2, md: 0 }}>
        Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra política de cookies.
      </Text>
      <Button
        size="sm"
        colorScheme={buttonColorScheme}
        onClick={handleAccept}
      >
        Aceptar
      </Button>
    </Box>
  );
};

export default CookieBanner;
