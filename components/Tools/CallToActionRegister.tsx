import React from 'react';
import { Box, Button, Text, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const spring = {
  type: "spring",
  damping: 10,
  stiffness: 100
};

const CallToActionRegister: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const fontSize = useBreakpointValue({ base: 'xl', md: '3xl' });
  const lineHeight = useBreakpointValue({ base: 'normal', md: 'shorter' });
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <Box
      position="relative"
      width="100%"
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundImage="url('/fondo2.jpg')" // Imagen de fondo
      backgroundSize="cover"
      backgroundPosition="center"
      ref={ref}
      p={4}
    >
      <MotionBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        backgroundColor="rgba(0, 0, 0, 0.4)" // Filtro oscuro para mejorar la legibilidad
        p={8}
        borderRadius="md"
        maxWidth="800px"
        mx="auto"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <MotionText
          fontSize={fontSize}
          lineHeight={lineHeight}
          fontWeight="bold"
          color="white"
          mb={4}
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          ¡Únete a nuestras aventuras de hiking y excursiones de montañas!
        </MotionText>
        <MotionText
          fontSize="lg"
          color="gray.300"
          mb={6}
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          No te pierdas nuestras próximas aventuras. Regístrate ahora y comienza a explorar las maravillas de la naturaleza con nosotros.
        </MotionText>
        <MotionButton
          size={buttonSize}
          colorScheme="teal"
          onClick={() => window.location.href = '/register'}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ ...spring, delay: 0.4 }}
         
          _hover={{
            shadow: 'lg',
            transform: 'scale(1.05)',
            transition: 'all 0.3s',
            backgroundColor: 'green.500',
          }}
        >
          Regístrate Ahora
        </MotionButton>
      </MotionBox>
    </Box>
  );
};

export default CallToActionRegister;
