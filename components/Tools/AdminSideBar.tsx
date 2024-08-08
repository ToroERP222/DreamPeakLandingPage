// components/Tools/AdminSidebar.tsx
import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, IconButton, Tooltip, Text, useBreakpointValue } from '@chakra-ui/react';
import { FaHome, FaUsers, FaSuitcase } from 'react-icons/fa';

const menuItems = [
  { icon: FaHome, label: 'Home', route: '/admin' },
  { icon: FaUsers, label: 'Clientes', route: '/admin/clientes' },
  { icon: FaSuitcase, label: 'Viajes', route: '/admin/viajes' },
];

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <Box
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
      bg="gray.800"
      color="white"
      width={isOpen ? '200px' : { base: '60px', md: '60px' }}
      transition="width 0.2s"
      height="100vh"
      position="fixed"
    >
      <VStack spacing={4} mt={4} alignItems={isOpen ? 'flex-start' : 'center'}>
        {menuItems.map((item, index) => (
          <Tooltip key={index} label={item.label} placement="right" isDisabled={isOpen || isMobile}>
            <HStack
              w="100%"
              p={2}
              _hover={{ bg: 'gray.700', cursor: 'pointer' }}
              onClick={() => window.location.href = item.route}
              justifyContent={isOpen ? 'flex-start' : 'center'}
            >
              <IconButton
                aria-label={item.label}
                icon={<item.icon />}
                size="lg"
                variant="ghost"
                colorScheme="whiteAlpha"
              />
              {isOpen && <Text ml={2}>{item.label}</Text>}
            </HStack>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
};

export default AdminSidebar;
