'use client'

import { ReactNode } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Link,
  useColorModeValue,
  VStack,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Logo = (props: any) => {
  return (
    <svg
      height={32}
      viewBox="0 0 120 28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      aria-label="Company Logo"
    >
      {/* Aquí iría el contenido SVG del logo */}
      <path
        d="M34.87 8.07H37.87V20.2H34.87V8.07Z"
        fill="currentColor"
      />
      {/* Otros paths aquí */}
    </svg>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      as="footer"
      role="contentinfo"
      aria-label="Main Footer"
      padding="4"
    >
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue('gray.700', 'white')} />
            </Box>
            <Text fontSize="sm">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </Text>
          </Stack>

          <Stack align="flex-start">
            <Text fontWeight="bold" fontSize="lg">Company</Text>
            <Link href="#about" aria-label="About Us">About Us</Link>
            <Link href="#services" aria-label="Our Services">Our Services</Link>
            <Link href="#contact" aria-label="Contact Us">Contact</Link>
            <Link href="#privacy" aria-label="Privacy Policy">Privacy Policy</Link>
          </Stack>

          <Stack align="flex-start">
            <Text fontWeight="bold" fontSize="lg">Follow Us</Text>
            <HStack spacing={6}>
              <IconButton
                as="a"
                href="https://www.facebook.com"
                aria-label="Facebook"
                icon={<FaFacebook />}
                variant="ghost"
                size="lg"
                isRound
              />
              <IconButton
                as="a"
                href="https://www.twitter.com"
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                size="lg"
                isRound
              />
              <IconButton
                as="a"
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                variant="ghost"
                size="lg"
                isRound
              />
            </HStack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
