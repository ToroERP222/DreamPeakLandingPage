import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  CheckboxGroup,
  Checkbox,
  Stack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { mexicanStates, activities } from '../data';
import Layout from '@/components/Tools/Layout';
import { createClient } from '@/utils/supabase/component';

interface FormData {
  email: string;
  password: string;
  name: string;
  primerApellido: string;
  segundoApellido: string;
  residency: string;
  activities: string[];
  phone: string;
  birthdate: string;
}

const Register: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    primerApellido: '',
    segundoApellido: '',
    residency: '',
    activities: [],
    phone: '',
    birthdate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (selected: string[]) => {
    setFormData({ ...formData, activities: selected });
  };
  const handleSubmit = async () => {
    try {
      // Sign up the user
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
  
      if (signUpError) {
        throw signUpError;
      }
  
      // Insert the user profile into the 'profiles' table
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
  
      if (signInError) {
        throw signInError;
      }
  
      if (!data || !data.user) {
        throw new Error("User not found after sign-in.");
      }
  
      const user = data.user;
  
      // Insert the user profile into the 'profiles' table
      const { error: insertError } = await supabase.from('profile').insert([{
        userid: user.id,
        name: formData.name,
        primer: formData.primerApellido,
        segundo: formData.segundoApellido,
        estado: formData.residency,
        activities: formData.activities,
        phone: formData.phone,
        birthdate: formData.birthdate,
        email: formData.email
      }]);
  
      if (insertError) {
        throw insertError;
      }
  
      // Display a success toast notification
      toast({
        title: "Registration successful.",
        description: "You've successfully registered.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
  
      // Redirect to the login page or another page after successful registration
      // For example, window.location.href = '/login';
      router.push('/')
    } catch (error) {
      console.error('Error registering user:', error);
      toast({
        title: "Registration failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleNext = () => {
    if (formData.email && formData.password) {
      setStep(2);
    } else {
      toast({
        title: "Error",
        description: "Please fill in the email and password fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout user={null}>
      <Container maxW="md" mt={1} mb={10} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Register
        </Heading>
        <Box as="form">
          {step === 1 && (
            <>
              <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Button
                colorScheme="teal"
                width="full"
                mt={4}
                onClick={handleNext}
              >
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <FormControl id="name" mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="primerApellido" mb={4}>
                <FormLabel>Primer Apellido</FormLabel>
                <Input
                  type="text"
                  name="primerApellido"
                  value={formData.primerApellido}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="segundoApellido" mb={4}>
                <FormLabel>Segundo Apellido</FormLabel>
                <Input
                  type="text"
                  name="segundoApellido"
                  value={formData.segundoApellido}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="birthdate" mb={4}>
                <FormLabel>Birthdate</FormLabel>
                <Input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="phone" mb={4}>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl id="estado" mb={4}>
                <FormLabel>Estado</FormLabel>
                <Select
                  placeholder="Select state"
                  name="residency"
                  value={formData.residency}
                  onChange={(e) => setFormData({ ...formData, residency: e.target.value })}
                >
                  {mexicanStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="activities" mb={4}>
                <FormLabel>
                Actividades</FormLabel>
    <CheckboxGroup
      colorScheme="teal"
      value={formData.activities}
      onChange={(selected) => setFormData({ ...formData, activities: selected as string[] })}
    >
  <Stack spacing={2}>
    {activities.map((activity) => (
      <Checkbox key={activity} value={activity}>
        {activity}
      </Checkbox>
    ))}
  </Stack>
</CheckboxGroup>
</FormControl>

<Button
  type="button"
  colorScheme="teal"
  width="full"
  mt={4}
  onClick={handleSubmit}
>
  Register
</Button>
</>
)}
</Box>
</Container>
</Layout>
);
};

export default Register;
