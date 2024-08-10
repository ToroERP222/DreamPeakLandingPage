'use client';

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const MotionButton = motion(Button);

export default function SplitScreen() {
  return (
    <>
      <Head>
        <title>Mobi CRM - Gestiona tus Propiedades con Facilidad</title>
        <meta
          name="description"
          content="Descubre Mobi CRM, la herramienta ideal para gestionar tus propiedades de manera eficiente usando la API de EasyBroker."
        />
        <meta name="keywords" content="CRM, EasyBroker, gestión de propiedades, inmobiliarias" />
        <meta property="og:title" content="Mobi CRM - Gestiona tus Propiedades con Facilidad" />
        <meta
          property="og:description"
          content="Descubre Mobi CRM, la herramienta ideal para gestionar tus propiedades de manera eficiente usando la API de EasyBroker."
        />
        <meta property="og:image" content="https://yourimageurl.com/mobi-crm.png" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <VStack spacing={6} w={'full'} maxW={'lg'} align="flex-start">
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} lineHeight={1.2}>
              <Text as={'span'} position={'relative'} _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'teal.400',
                zIndex: -1,
              }}>
                Gestiona tus
              </Text>
              <br />
              <Text color={'teal.400'} as={'span'}>
                Propiedades con Mobi CRM
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.600'}>
              Mobi CRM te ofrece una solución eficiente y fácil de usar para gestionar todas tus propiedades
              inmobiliarias usando la poderosa API de EasyBroker.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                rounded={'full'}
                bg={'teal.400'}
                color={'white'}
                _hover={{
                  bg: 'teal.500',
                }}>
                Comienza Ahora
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                rounded={'full'}
                variant="outline"
                borderColor="teal.400"
                color={'teal.400'}
                _hover={{
                  bg: 'teal.50',
                }}>
                Cómo Funciona
              </MotionButton>
            </Stack>
          </VStack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Gestión de propiedades con Mobi CRM'}
            objectFit={'cover'}
            src='/heroimage.jpg'
          />
        </Flex>
      </Stack>
    </>
  );
}
