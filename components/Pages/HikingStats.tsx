import React from 'react';
import { Box, Flex, Text, useMediaQuery, Icon, BoxProps, FlexProps, Heading, Center } from '@chakra-ui/react';
import { FaMountain, FaHiking, FaMapSigns } from 'react-icons/fa';

interface StatsCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, description }) => (
  <Box
    bg="white"
    p={6}
    borderRadius="md"
    textAlign="center"
    boxShadow="lg"
    flex="1"
    m={2}
    maxW={{ base: "90%", md: "30%" }}
  >
    <Icon as={icon} w={12} h={12} color="blue.500" mb={4} />
    <Text fontSize="3xl" fontWeight="bold" color="black">
      {title}
    </Text>
    <Text color="gray.700">{description}</Text>
  </Box>
);

const HikingStats: React.FC = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
    <Box my={6}>
        <Center>
        <Heading>
            Somos Dream Peak, ven y aventurate
        </Heading>
        </Center>
    </Box>
    <Box bg="black" py={10} px={4} borderRadius={'xl'} boxShadow="xl">

      <Flex
        direction={isMobile ? "column" : "row"}
        align="center"
        justify="center"
        wrap="wrap"
      >
        <StatsCard
          icon={FaMountain}
          title="100+"
          description="Hiking trails explored in 2024"
        />
        <StatsCard
          icon={FaHiking}
          title="5,000+"
          description="Happy hikers guided this year"
        />
        <StatsCard
          icon={FaMapSigns}
          title="500km"
          description="Total distance covered"
        />
      </Flex>
    </Box>
    </>
  );
};

export default HikingStats;
