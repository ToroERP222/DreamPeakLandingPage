import React from 'react';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'xl', md: 'lg' });

  const handleClick = () => {
    window.open('https://wa.me/1234567890', '_blank'); // Reemplaza con tu número de WhatsApp
  };

  return (
    <Box
      position="fixed"
      bottom="80px"
      right="80px"
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        icon={<FaWhatsapp style={{ fontSize: '2rem' }} />}
        aria-label="Chat with us on WhatsApp"
        colorScheme="teal"
        size={'lg'}
        borderRadius="full"
        onClick={handleClick}
        p="20px"
        boxShadow="md"
        _hover={{
          shadow: 'lg',
          transform: 'scale(1.1)',
          transition: 'all 0.3s',
          color: 'white', // Cambia el color del icono al pasar el cursor
          backgroundColor: 'green.500', // Cambia el fondo al pasar el cursor
          boxShadow: '0 0 15px rgba(0, 128, 0, 0.6)', // Añade una sombra más pronunciada
        }}
      />
    </Box>
  );
};

export default WhatsAppButton;
