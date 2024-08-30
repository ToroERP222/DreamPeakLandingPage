import React from 'react';
import { Box, Button, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const AdventureBanner: React.FC = () => {
  const fontSize = useBreakpointValue({ base: '3xl', md: '5xl' });
  const lineHeight = useBreakpointValue({ base: 'normal', md: 'tall' });
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });

  const handleContactClick = () => {
    window.open('https://wa.me/1234567890', '_blank'); // Reemplaza con tu número de WhatsApp
  };

  return (
    <Box
      position="relative"
      height="100vh"
      width="100%"
      backgroundImage="url('/fondo6.jpg')" // Ruta de la imagen de fondo
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      px={4}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Estado inicial
        whileInView={{ opacity: 1, y: 0 }} // Estado cuando entra en vista
        transition={{ duration: 1, ease: 'easeOut' }} // Duración y tipo de transición
        viewport={{ once: false }} // Se anima cada vez que entra en vista
      >
        <Box
          as="h1"
          fontSize={fontSize}
          lineHeight={lineHeight}
          fontWeight="bold"
          color="white"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
          mb={6}
        >
          HAY DEMASIADAS <br />
          AVENTURAS AHÍ <br />
          AFUERA <br />
          ESPERANDO A SER <br />
          VIVIDAS...
        </Box>
      </motion.div>
      <Button
        size={buttonSize}
        colorScheme="teal"
        onClick={handleContactClick}
        px={8}
        py={6}
        boxShadow="md"
        _hover={{
          shadow: 'lg',
          transform: 'scale(1.05)',
          transition: 'all 0.3s',
          backgroundColor: 'green.500',
        }}
      >
        Contáctanos
      </Button>
    </Box>
  );
};

export default AdventureBanner;
