'use client'
import {
  Container,
  Stack,
  Heading,
  Text,
  Button,
  useBreakpointValue,
  useColorModeValue,
  Center,
  Box,
  Image,
  keyframes,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

// Definimos la animación
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

export default function CallToAction() {
  const router = useRouter()

  const handleRegisterClick = () => {
    router.push('/register') // Cambia la ruta a la página de registro que corresponda
  }

  return (
    <Container
      maxW={'container.lg'}
      py={{ base: 12, md: 16 }}
      centerContent
      bg={'gray.900'}
      borderRadius="lg"
      boxShadow="xl"
      overflow="hidden"
    >
      <Box
        position="relative"
        w="full"
        h={{ base: '200px', md: '300px' }}
        mb={{ base: 8, md: 12 }}
      >
        <Image
          src="/calltoaction.jpg" // Asegúrate de tener esta imagen en tu carpeta de public/images
          alt="Mobi CRM"
          w="full"
          h="full"
          objectFit="cover"
          opacity={0.8}
          borderRadius="lg"
        />
        <Center
          position="absolute"
          top={0}
          left={0}
          w="full"
          h="full"
          bg="rgba(0, 0, 0, 0.5)"
          borderRadius="lg"
        >
          <Heading
            fontSize={{ base: '2xl', md: '4xl' }}
            color="white"
            fontWeight="bold"
            textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)"
          >
            ¡Da el siguiente paso hacia el éxito!
          </Heading>
        </Center>
      </Box>
      <Stack spacing={{ base: 6, md: 8 }} textAlign={'center'} px={4}>
        <Text
          color={'white'}  // Cambié el color a blanco
          fontSize={{ base: 'lg', md: 'xl' }}
          lineHeight="1.6"
          maxW={'2xl'}
          mx={'auto'}
        >
          Únete a Mobi CRM y lleva tu gestión de ventas al siguiente nivel. Disfruta de todas las herramientas esenciales para organizar tus contactos, agendar citas y hacer un seguimiento detallado de cada oportunidad, todo de manera gratuita. Además, potencia tu rendimiento con nuestra integración avanzada con EasyBroker, que te ofrece una solución completa para el manejo de propiedades y clientes, a un costo accesible.
        </Text>
        <Text
          color={'white'}  // Cambié el color a blanco
          fontSize={{ base: 'lg', md: 'xl' }}
          lineHeight="1.6"
          maxW={'2xl'}
          mx={'auto'}
        >
          ¡Empieza gratis hoy y descubre cómo Mobi CRM puede transformar tu negocio! Regístrate ahora y explora cómo la integración con EasyBroker puede optimizar aún más tu flujo de trabajo.
        </Text>
        <Button
          colorScheme={'blue'}
          size={'lg'}
          onClick={handleRegisterClick}
          variant={'solid'}
          _hover={{ bg: useColorModeValue('blue.500', 'blue.600') }}
          _focus={{ boxShadow: 'outline' }}
          borderRadius="full"
          py={6}
          px={10}
          textTransform="uppercase"
          letterSpacing="wide"
          animation={`${pulseAnimation} 2s infinite`} // Añade la animación al botón
        >
          Regístrate Ahora
        </Button>
      </Stack>
    </Container>
  )
}
