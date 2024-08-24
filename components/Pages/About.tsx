import React, { useEffect, useRef } from 'react';
import { Box, Center, Flex, Heading, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

// Define the type for the course data
interface Course {
  title: string;
  description: string;
  image: string;
  link: string;
  guide: string; // New field for guide
}

// Data for fitness courses
const courses: Course[] = [
  {
    title: 'Explora Montañas',
    description: 'Aventúrate a conquistar las majestuosas montañas de México con expertos.',
    image: '/carouselimage.webp',
    link: '/courses/explora-montanas',
    guide: 'Guía: Carlos López',
  },
  {
    title: 'Senderismo Natural',
    description: 'Sumérgete en la diversidad de biomas y ecosistemas con nuestro equipo.',
    image: '/carouselimage.webp',
    link: '/courses/senderismo-natural',
    guide: 'Guía: Ana Martínez',
  },
  {
    title: 'Cumbres Internacionales',
    description: 'Desafía las cumbres más impresionantes del mundo en una experiencia única.',
    image: '/carouselimage.webp',
    link: '/courses/cumbres-internacionales',
    guide: 'Guía: Roberto Díaz',
  },
  // Other course data...
];

// Define the props type for the CourseCard component
interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  guide: string; // New prop for guide
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, image, link, guide }) => {
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
    handleScroll(); // Initial check when the component mounts

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <Box
        width="auto"
        height="auto"
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
            <Text fontSize="xs" color="gray.600">{guide}</Text> {/* Display guide name */}
          </Box>
        </Center>
      </Box>
    </motion.div>
  );
};

const About: React.FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 325px)');
  const bg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box bg={bg} p={8} w={isMobile ? '160%' : '100%'}>
      <Flex direction="column" alignItems="center">
        <Center>
          <Heading as="h1" size="2xl" mb={4}>
            Acerca de Nosotros
          </Heading>
        </Center>
        <Text mb={8}>
          DreamPeak conecta a las personas con la naturaleza a través de aventuras que inspiran respeto y crecimiento.
        </Text>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={6}
          style={{
            flexDirection: 'row',
          }}
        >
          {courses.map((course, index) => (
            <Box
              key={index}
              width={{ base: '100%', sm: '50%', md: '33.33%', lg: '25%' }}
              p={2}
              sx={{
                '@media screen and (max-width: 315px)': {
                  width: '100%',
                },
              }}
            >
              <CourseCard {...course} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default About;
