import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';

const DreamPeakComponent: React.FC = () => {
  const [headingOffset, setHeadingOffset] = useState(0);
  const [textOffset, setTextOffset] = useState(0);
  const [additionalTextOffset, setAdditionalTextOffset] = useState(0);

  const headingSize = useBreakpointValue({ base: 'xl', md: '3xl' });
  const fontSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  const padding = useBreakpointValue({ base: 2, md: 10 });

  const marginTop = useBreakpointValue({ base: '8', md: '0', '435px': '20' });
  const marginBottom = useBreakpointValue({ base: '16', md: '0' });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Ajusta la velocidad del efecto parallax para el heading, el texto y el texto adicional
      setHeadingOffset(scrollY * 0.1); // Ajusta el valor para cambiar la velocidad del efecto parallax
      setTextOffset(scrollY * 0.05); // Ajusta el valor para cambiar la velocidad del efecto parallax
      setAdditionalTextOffset(scrollY * 0.1); // Ajusta el valor para cambiar la velocidad del efecto parallax del texto adicional
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      position="relative"
      height="120vh" // Mantén la altura del 120% del viewport
      backgroundImage="url('/fondo3.jpg')" // Reemplaza con la ruta de tu imagen
      backgroundSize="cover"
      backgroundPosition="center top" // Fondo estático
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="rgba(0, 0, 0, 0.6)"
        zIndex={1} 
      />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent="center"
        alignItems="center"
        p={padding}
        height="100%"
        zIndex={2}
        position="relative"
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Box
          flex="1"
          maxWidth={{ base: '90%', md: '50%' }}
          textAlign={{ base: 'center', md: 'left' }}
          mt={marginTop}
          mb={marginBottom}
        >
          <Heading
            as="h1"
            size={headingSize}
            mb={2}
            fontWeight="bold"
            color="white"
            textShadow="1px 1px 4px rgba(0, 0, 0, 0.8)"
            transform={`translateY(-${headingOffset}px)`} // Aplica el efecto parallax al heading
            transition="transform 0.1s ease-out"
          >
            DREAM PEAK.
          </Heading>
          <Text
            fontSize={fontSize}
            mb={4}
            color="white"
            textShadow="1px 1px 4px rgba(0, 0, 0, 0.8)"
            transform={`translateY(-${textOffset}px)`} // Aplica el efecto parallax al texto
            transition="transform 0.1s ease-out"
          >
            THE TRAVEL OUTDOOR COMPANY.
          </Text>
        </Box>

        <Box
          flex="1"
          maxWidth={{ base: '90%', md: '50%' }}
          textAlign={{ base: 'center', md: 'right' }}
          mb={marginBottom}
        >
          <Text
            fontSize={fontSize}
            lineHeight="1.6"
            color="white"
            textShadow="1px 1px 4px rgba(0, 0, 0, 0.8)"
            textAlign="justify"
            transform={`translateY(-${additionalTextOffset}px)`} // Aplica el efecto parallax al texto adicional
            transition="transform 0.1s ease-out"
          >
            DREAM PEAK está formado por amantes de la aventura y los deportes. 
            <br />
            Es por eso que queremos compartirte nuestra pasión. 
            <br />
            Te invitamos a acompañarnos recorriendo cañones, desiertos, bosques 
            <br />
            o escalando montañas.
            <br /><br />
            Nuestros guías cuentan con experiencia en senderismo, montañismo, 
            <br />
            técnicas verticales, así como rescate y primeros auxilios profesionales.
            <br />
            No importa la situación, siempre estarás acompañado 
            <br />
            por profesionales listos para apoyarte en lo que necesites.
            <br /><br />
            En todas nuestras salidas a montaña se te proporcionará 
            <br />
            el equipo necesario para llevar a cabo la actividad requerida de manera segura.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default DreamPeakComponent;
