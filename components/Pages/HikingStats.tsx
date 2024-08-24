import React from 'react';
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';

const DreamPeakComponent: React.FC = () => {
  // Determine text size and padding based on screen size
  const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' });
  const fontSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const padding = useBreakpointValue({ base: 4, md: 10 });

  return (
    <Box
      position="relative"
      height="100vh"
      backgroundImage="url('/fondo3.jpg')"  // Replace with your image path
      backgroundSize="cover"
      backgroundPosition="center"
    >
      {/* Overlay for darkening the background image */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="rgba(0, 0, 0, 0.6)"
        zIndex={1} // Ensure the overlay is below the text
      />

      <Flex
        direction={{ base: 'column', md: 'row' }}  // Stack vertically on small screens
        justifyContent="center"
        alignItems="center"
        p={padding}
        height="100%"
        zIndex={2} // Ensure the content is above the overlay
        position="relative"
        textAlign={{ base: 'center', md: 'left' }} // Center text on small screens
      >
        {/* Left-aligned content on medium screens and up */}
        <Box
          flex="1"
          maxWidth={{ base: '100%', md: '50%' }}
          textAlign={{ base: 'center', md: 'left' }}
          mb={{ base: 8, md: 0 }}
        >
          <Heading
            as="h1"
            size={headingSize}
            mb={2}
            
            fontWeight="bold"
            color="#FFFFFF"  // Pure white color
            textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)"  // Shadow for better visibility
          >
            DREAM PEAK.
          </Heading>
          <Text
            fontSize={fontSize}
            mb={6}
            color="#FFFFFF"  // Pure white color
            textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)"  // Shadow for better visibility
          >
            THE TRAVEL OUTDOOR COMPANY.
          </Text>
        </Box>

        {/* Right-aligned content on medium screens and up */}
        <Box
          flex="1"
          maxWidth={{ base: '100%', md: '50%' }}
          textAlign={{ base: 'center', md: 'right' }}
        >
          <Text
            fontSize={fontSize}
            lineHeight="1.8"
            color="#FFFFFF"  // Pure white color
            textShadow="1px 1px 2px rgba(0, 0, 0, 0.8)" 
            textAlign="justify" 
          >
            DREAM PEAK está formado por amantes de la aventura y los deportes. 
            <br/>
            Es por eso que queremos compartirte nuestra pasión. 
            <br/>
            Te invitamos a acompañarnos recorriendo cañones, desiertos, bosques 
            <br/>
            o escalando montañas.
            <br /><br />
            Nuestros guías cuentan con experiencia en senderismo, montañismo, 
            <br/>
            técnicas verticales, así como rescate y primeros auxilios profesionales.
             <br/>
             No importa la situación, siempre estarás acompañado 
             <br/>
             por profesionales listos para apoyarte en lo que necesites.
            <br /><br />
            En todas nuestras salidas a montaña se te proporcionará 
            <br/>
            el equipo necesario para llevar a cabo la actividad requerida de manera segura.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default DreamPeakComponent;
