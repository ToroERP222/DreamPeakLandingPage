'use client'
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoCalendarSharp, IoPeopleSharp, IoBarChartSharp, IoRocketSharp } from 'react-icons/io5'
import { ReactElement } from 'react'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'} spacing={{ base: 4, md: 6 }}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600} fontSize={{ base: 'md', md: 'lg' }}>{text}</Text>
    </Stack>
  )
}

export default function SplitWithImage() {
  return (
    <Container maxW={'100%'} px={0} py={{ base: 8, md: 12 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 10 }} alignItems={'center'}>
        <Flex w={'100%'} justify={'center'} px={0}>
          <Image
            rounded={'md'}
            alt={'Imagen del CRM'}
            src={'/features.jpg'}
            objectFit={'cover'}
            width={'100%'}
            height={'100%'}
            margin={0}
            padding={0}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 8 }} textAlign={{ base: 'center', md: 'left' }}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
            textAlign={{ base: 'center', md: 'left' }}>
            Lo que ofrecemos
          </Text>
          <Heading fontSize={{ base: '2xl', md: '3xl' }} textAlign={{ base: 'center', md: 'left' }}>
            Mobi CRM: Tu Socio Ideal en la Gestión de Ventas
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'md', md: 'lg' }} textAlign={{ base: 'center', md: 'left' }}>
            Mobi CRM se integra perfectamente con EasyBroker para ofrecerte una solución integral en la gestión de ventas. Nuestro sistema no solo te permite agendar citas, sino que también te ayuda a visualizar y gestionar tus contactos de manera efectiva, realizar un seguimiento detallado de tus ventas y mejorar tu proceso de venta.
          </Text>
          <Stack
            spacing={{ base: 4, md: 6 }}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoCalendarSharp} color={'teal.500'} w={5} h={5} />}
              iconBg={useColorModeValue('teal.100', 'teal.900')}
              text={'Agenda de Citas'}
            />
            <Feature
              icon={<Icon as={IoPeopleSharp} color={'blue.500'} w={5} h={5} />}
              iconBg={useColorModeValue('blue.100', 'blue.900')}
              text={'Gestión de Contactos'}
            />
            <Feature
              icon={<Icon as={IoBarChartSharp} color={'orange.500'} w={5} h={5} />}
              iconBg={useColorModeValue('orange.100', 'orange.900')}
              text={'Seguimiento de Ventas'}
            />
            <Feature
              icon={<Icon as={IoRocketSharp} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Optimización del Proceso de Venta'}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}
