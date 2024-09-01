import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, FormControl, FormLabel, Input, Heading, Text, Box, useBreakpointValue, Center } from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/component';
import MainLayout from '@/components/Tools/MainLayout';
import { GetServerSidePropsContext } from 'next';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const marginTop = useBreakpointValue({ base: '20%', md: '10%' });

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/');
  }

  return (
    <MainLayout user={null}>
      <Box
        minH="100vh"
        bgImage="url('/fondo7.jpg')"
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        {/* Overlay to control opacity */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          
          bg="blackAlpha.600" // Change the opacity value as needed
          zIndex="1"
        />

        <Flex align="center" justify="center" minH="100vh" position="relative" zIndex="2">
          <Flex
            direction="column"
            p={10}
            rounded="md"
            bg="white"
            w="full"
            maxW="md"
            mt={100}
            mx={5}
          >
            <Center>
            <Heading mb={4}>Log in</Heading>
            </Center>
          
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            {error && <Text color="red.500" mb={4}>{error}</Text>}
            <Button colorScheme="teal" onClick={logIn}>Log in</Button>
          </Flex>
        </Flex>
      </Box>
    </MainLayout>
  );
}
