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
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
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

interface Card {
  title: string;
  text: string;
  image: string;
}

const cards: Card[] = [
  {
    title: 'Design Projects 1',
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: 'carouselimage.webp',
  },
  {
    title: 'Design Projects 2',
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: 'carouselimage.webp',
  },
  {
    title: 'Design Projects 3',
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: 'carouselimage.webp',
  },
];

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

const mobileCards = [
  {
    title: 'Design Projects 1',
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: 'carouselimage.webp',
  },
  {
    title: 'Design Projects 2',
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: 'carouselimage.webp',
  },
  {
    title: 'Design Projects 3',
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: 'carouselimage.webp',
  },
];


interface MobileCaptionCarouselProps {
  width: string;
}

const MobileCaptionCarousel: React.FC<MobileCaptionCarouselProps> = ({ width }) => {
  return (
    <Box
      position="relative"
      height="930px"
      width={width}
      overflow="hidden"
    >
      {/* CSS files for react-slick */}
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
        {mobileCards.map((card, index) => (
          <Box
            key={index}
            height="930px"
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
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
                <Heading
                  fontSize="2xl"
                  color="white"
                >
                  {card.title}
                </Heading>
                <Text
                  fontSize="sm"
                  color="white"
                >
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};



const CaptionCarouselDesktop: React.FC = () => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '10%', md: '40px' });

  return (
    <Box
      position="relative"
      height={{ base: '400px', md: '600px' }}
      width="full"
      overflow="hidden"
    >
      {/* CSS files for react-slick */}
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
            height={{ base: '400px', md: '600px' }}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
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
                <Heading
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  color="white"
                >
                  {card.title}
                </Heading>
                <Text
                  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
                  color="white"
                >
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
const CaptionCarousel: React.FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 320px)');
  const [isTablet2] = useMediaQuery('(max-width: 540px)');
  const [isTablet3] = useMediaQuery('(min-width: 280px)');
  const [isTablet] = useMediaQuery('(min-width: 430px) ');

  return (
    <>
      {isMobile ? (
        <MobileCaptionCarousel width="160%" />
      ) : (
        <CaptionCarouselDesktop />
      )}
    </>
  );
};

export default CaptionCarousel;
