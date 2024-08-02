import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/component';
import MainLayout from '@/components/Tools/MainLayout';

import { GetServerSidePropsContext } from 'next';
export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function logIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/');
  }

  return (
    <MainLayout  user={null}>
    <Flex align="center" justify="center" minH="100vh">
      <Flex direction="column" p={8} rounded="md" boxShadow="lg" bg="white" w="full" maxW="md">
        <Heading mb={4}>Log in</Heading>
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
    </MainLayout>
  );
}
