import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  useColorModeValue,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Image
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/component';
import NavLink from './NavLink'; // Importing the updated NavLink component

const Links = [
  { label: 'Acerca', id: 'about' },
  { label: 'Contacto', id: 'contact' },
  { label: 'Cuestionario', id: 'calendar' },
];

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const supabase = createClient();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthPage = router.pathname === '/login' || router.pathname === '/register';

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleLogoClick = () => {
    router.push('/'); // Redirect to homepage when logo is clicked
  };
  return (
    <>
      <Box
        bg={scrolled ? 'black' : 'transparent'}
        px={4}
        position="fixed"
        width="100%"
        zIndex="3"
        css={{
          backdropFilter: 'blur(10px)',
        }}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
          <Box onClick={handleLogoClick} cursor="pointer">
              <Image src="/Logo2.png" alt="Logo" boxSize="80px" />
            </Box>
            {!isAuthPage && !user && (
              <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink
                    key={link.id}
                    onClick={() => handleScrollToSection(link.id)}
                    color={scrolled ? 'white' : 'black'}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </HStack>
            )}
          </HStack>
          {!isAuthPage && (
            <Flex alignItems={'center'}>
              {user ? (
                <Menu>
                  <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                    <Avatar size={'sm'} src={user.user_metadata.avatar_url || ''} />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar size={'2xl'} src={user.user_metadata.avatar_url || ''} />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Button as={Link} href="/login" variant={'link'} mr={4} color={scrolled ? 'white' : 'gray.100'}>
                    Login
                  </Button>
                  <Button as={Link} href="/register" bgColor={'black'} textColor={'gray.200'}>
                    Register
                  </Button>
                </>
              )}
            </Flex>
          )}
        </Flex>

        {isOpen && !isAuthPage && !user ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.id}
                  onClick={() => handleScrollToSection(link.id)}
                  color={scrolled ? 'white' : 'black'}
                >
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
