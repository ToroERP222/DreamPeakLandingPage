import React from 'react';
import { Box, Button, Text, Image, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
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
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
  const buttonColorScheme = useColorModeValue('teal', 'cyan');

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
      bg={bgColor}
      p={12}
      overflow="hidden"
      ref={ref}
    >
      <MotionBox
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        bg={bgColor}
        p={8}
        borderRadius="md"
        boxShadow="lg"
        maxWidth="800px"
        mx="auto"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={{
          visible: { opacity: 1, transition: { duration: 1 } },
          hidden: { opacity: 0 }
        }}
      >
        <MotionBox
          flex="1"
          textAlign={{ base: 'center', md: 'left' }}
          mr={{ md: 6 }}
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          <MotionText fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
            ¡Únete a nuestras aventuras de hiking y excursiones de montañas!
          </MotionText>
          <MotionText fontSize="lg" color="gray.400" mb={6}>
            No te pierdas nuestras próximas aventuras. Regístrate ahora y comienza a explorar las maravillas de la naturaleza con nosotros.
          </MotionText>
          <MotionButton
            size={buttonSize}
            colorScheme={buttonColorScheme}
            onClick={() => window.location.href = '/register'}
            _hover={{ transform: 'scale(1.05)' }}
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ ...spring, delay: 0.4 }}
          >
            Regístrate Ahora
          </MotionButton>
        </MotionBox>
        <Box flex="1" mt={{ base: 6, md: 0 }}>
          <Image
            src="/escalada.jpg"
            alt="Hiking"
            borderRadius="md"
            boxShadow="lg"
          />
        </Box>
      </MotionBox>
    </Box>
  );
};

export default CallToActionRegister;
