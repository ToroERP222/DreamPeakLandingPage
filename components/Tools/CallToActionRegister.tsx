import React from 'react';
import { Box, Button, Text, Stack, Image, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';

const CallToActionRegister: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const bgColor = useColorModeValue('gray.800', 'gray.900');
  const textColor = useColorModeValue('whiteAlpha.900', 'whiteAlpha.900');
  const buttonColorScheme = useColorModeValue('teal', 'cyan');

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      p={8}
      overflow="hidden"
    >
      <Box
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
      >
        <Box flex="1" textAlign={{ base: 'center', md: 'left' }} mr={{ md: 6 }}>
          <Text fontSize="2xl" fontWeight="bold" mb={4} color={textColor}>
            ¡Únete a nuestras aventuras de hiking y excursiones de montañas!
          </Text>
          <Text fontSize="lg" color="gray.400" mb={6}>
            No te pierdas nuestras próximas aventuras. Regístrate ahora y comienza a explorar las maravillas de la naturaleza con nosotros.
          </Text>
          <Button
            size={buttonSize}
            colorScheme={buttonColorScheme}
            onClick={() => window.location.href = '/register'} // Cambia '/register' por la ruta de tu página de registro
            _hover={{ transform: 'scale(1.05)' }}
            transition="transform 0.3s"
          >
            Regístrate Ahora
          </Button>
        </Box>
        <Box flex="1" mt={{ base: 6, md: 0 }}>
          <Image
            src="/escalada.jpg" // Cambia esta ruta por la ruta de tu imagen relacionada con hiking o montañas
            alt="Hiking"
            borderRadius="md"
            boxShadow="lg"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CallToActionRegister;
