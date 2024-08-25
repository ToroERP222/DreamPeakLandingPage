import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  useMediaQuery,
  Center,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { motion } from 'framer-motion';


interface Trip {
  fecha: string;
  titulo: string;
  actividad: string;
  descripcion: string;
  imagenName: string;
}

interface CaptionCarouselProps {
  cards: Trip[];
}

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const mobileSettings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const MobileCaptionCarousel: React.FC<{ cards: Trip[], width: string }> = ({ cards, width }) => {
  console.log("trips mobile",cards)
  return (
    <Box position="relative" height="930px" width={width} overflow="hidden">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <Slider {...mobileSettings}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height="930px"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.imagenName})`}
          >
            <Container size="container.sm" height="100%" position="relative">
              <Stack
                spacing={6}
                w="full"
                maxW="sm"
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
                bg="rgba(0, 0, 0, 0.5)"
                p={4}
                borderRadius="md"
              >
                <Heading fontSize="2xl" color="black">
                  {card.titulo}
                </Heading>
                <Text fontSize="sm" color="white">
                  {card.descripcion}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

const CaptionCarouselDesktop: React.FC<{ cards: Trip[] }> = ({ cards }) => {
  console.log("trips desktop",cards)
  const [slider, setSlider] = useState<Slider | null>(null);
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '10%', md: '40px' });

  return (
    <>
  
    <Box position="relative" backgroundColor={'black'} height={{ base: '400px', md: '600px' }} width="full" overflow="hidden">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        color={'white'}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        color={'white'}
        transform="translate(0%, -50%)"
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={{ base: '400px', md: '800px' }}
            position="relative"
            
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize={{ base: 'contain', md: 'contain' }}
            backgroundImage={`/uploads/${card.imagenName}`}
          >
            <Container size="container.lg" height="100%" position="relative">
              <Stack
                spacing={6}
                w="full"
                maxW="lg"
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
                bg="rgba(0, 0, 0, 0.0)"
                p={4}
                borderRadius="md"
              >
                
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
    </>
  );
};

const CaptionCarousel: React.FC<CaptionCarouselProps> = ({ cards }) => {
  const [isMobile] = useMediaQuery('(max-width: 320px)');
  const [isTablet2] = useMediaQuery('(max-width: 540px)');
  const [isTablet3] = useMediaQuery('(min-width: 280px)');
  const [isTablet] = useMediaQuery('(min-width: 430px) ');

  return (
    <>
      {isMobile ? (
        <MobileCaptionCarousel cards={cards} width="100%" />
      ) : (
        <CaptionCarouselDesktop cards={cards} />
      )}
    </>
  );
};

export default CaptionCarousel;
