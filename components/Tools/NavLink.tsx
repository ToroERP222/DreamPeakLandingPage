import React from 'react';
import { Link, useColorModeValue } from '@chakra-ui/react';

interface NavLinkProps {
  children: React.ReactNode;
  href?: string;
  color?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ children, href, onClick }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    color={'gray.100'}
    fontWeight="bold"
    fontSize="md"
    _hover={{
      textDecoration: 'none',
      fontWeight: 'bold',
      color: 'black',
      fontSize: 'sm',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default NavLink;
