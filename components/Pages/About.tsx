import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image as ChakraImage,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

interface Course {
  title: string;
  description: string;
  image: string;
  link: string;
  guide: string;
  guideImage: string;
  guideExperience: string;
}

const courses: Course[] = [
  {
    title: 'Explora Montañas',
    description: 'Aventúrate a conquistar las majestuosas montañas de México con expertos.',
    image: '/carouselimage.webp',
    link: '/courses/explora-montanas',
    guide: 'Carlos López',
    guideImage: '/guide-carlos.jpg',
    guideExperience: 'Carlos tiene más de 10 años de experiencia guiando a grupos en montañas de todo el mundo...',
  },
  {
    title: 'Senderismo Natural',
    description: 'Sumérgete en la diversidad de biomas y ecosistemas con nuestro equipo.',
    image: '/carouselimage.webp',
    link: '/courses/senderismo-natural',
    guide: 'Ana Martínez',
    guideImage: '/guide-ana.jpg',
    guideExperience: 'Ana es bióloga con especialización en ecoturismo, con más de 8 años liderando expediciones...',
  },
  {
    title: 'Cumbres Internacionales',
    description: 'Desafía las cumbres más impresionantes del mundo en una experiencia única.',
    image: '/carouselimage.webp',
    link: '/courses/cumbres-internacionales',
    guide: 'Roberto Díaz',
    guideImage: '/guide-roberto.jpg',
    guideExperience: 'Roberto es un alpinista profesional que ha escalado las cumbres más altas de los 7 continentes...',
  },
  // Otros cursos...
];

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  guide: string;
  guideImage: string;
  guideExperience: string;
  onOpenModal: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  image,
  guide,
  guideImage,
  guideExperience,
  onOpenModal,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const top = ref.current.getBoundingClientRect().top;
        const bottom = ref.current.getBoundingClientRect().bottom;
        const isVisible = top < window.innerHeight && bottom >= 0;

        if (isVisible) {
          controls.start({ opacity: 1, y: 0 });
        } else {
          controls.start({ opacity: 0, y: 20 });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <Box height={{ base: 'auto', md: '70vh' }} onClick={onOpenModal}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <Box
          width="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          borderColor="gray.200"
          shadow="md"
          backgroundColor="gray.300"
          _hover={{ boxShadow: '2xl' }}
          p={0}
        >
          <Center>
            <Image
              src={image}
              alt={title}
              width={1000}
              height={400}
              objectFit="cover"
              layout="responsive"
            />
          </Center>
          <Center>
            <Box p={4}>
              <Heading size="md" as="h3" mb={2}>
                {title}
              </Heading>
              <Text fontSize="sm" mb={2}>{description}</Text>
              <Text fontSize="xs" color="gray.600">{guide}</Text>
            </Box>
          </Center>
        </Box>
      </motion.div>
    </Box>
  );
};

const About: React.FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 325px)');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<Course | null>(null);
  const bg = useColorModeValue('gray.100', 'gray.800');

  const handleOpenModal = (course: Course) => {
    setSelectedGuide(course);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedGuide(null);
  };

  return (
    <Box bg={bg} p={4} w="100%">
      <Flex direction="column" alignItems="center">
        <Center>
          <Heading as="h1" size="2xl" mb={4}>
            Acerca de Nosotros
          </Heading>
        </Center>
        <Text mb={8} textAlign="center">
          DreamPeak conecta a las personas con la naturaleza a través de aventuras que inspiran respeto y crecimiento.
        </Text>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={4}
          style={{
            flexDirection: 'row',
          }}
        >
          {courses.map((course, index) => (
            <Box
              key={index}
              width={{ base: '100%', sm: '100%', md: '45%', lg: '30%' }}
              p={2}
            >
              <CourseCard
                {...course}
                onOpenModal={() => handleOpenModal(course)}
              />
            </Box>
          ))}
        </Flex>
      </Flex>

      {selectedGuide && (
        <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
          <ModalOverlay />
          <ModalContent bg="gray.900" color="white">
            <ModalHeader>{selectedGuide.guide}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                {/* Imagen del guía en el lado izquierdo */}
                <ChakraImage
                  src={selectedGuide.guideImage}
                  alt={selectedGuide.guide}
                  borderRadius="full"
                  boxSize={{ base: '100px', md: '150px', lg: '200px' }}
                  objectFit="cover"
                  mr={6}
                />
                {/* Información del guía en el lado derecho */}
                <Box>
                  <Heading size="lg" mb={4}>
                    {selectedGuide.guide}
                  </Heading>
                  <Text>{selectedGuide.guideExperience}</Text>
                  {/* Aquí puedes agregar más detalles si lo deseas */}
                </Box>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={handleCloseModal}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default About;
