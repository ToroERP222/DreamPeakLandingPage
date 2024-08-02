// components/ProfileEditForm.tsx

import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createClient } from '@/utils/supabase/component'; // Use client-side Supabase creation

interface ProfileEditFormProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    birthdate: string;
    primer: string;
    segundo: string;
    activities: string[];
    estado: string;
    userid: string;
  };
  onClose: () => void; // Function to close the modal
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ profile, onClose }) => {
  const supabase = createClient(); // Create the Supabase client here
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: profile.name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      birthdate: profile.birthdate || '',
      primer: profile.primer || '',
      segundo: profile.segundo || '',
      activities: JSON.stringify(profile.activities) || '',
      estado: profile.estado || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      birthdate: Yup.string().required('Birthdate is required'),
      primer: Yup.string().required('First name is required'),
      segundo: Yup.string().required('Second name is required'),
      activities: Yup.string().required('Activities are required'),
      estado: Yup.string().required('Estado is required'),
    }),
    onSubmit: async (values) => {
      const { error } = await supabase
        .from('profile')
        .update({
          name: values.name,
          email: values.email,
          phone: values.phone,
          birthdate: values.birthdate,
          primer: values.primer,
          segundo: values.segundo,
          activities: JSON.parse(values.activities),
          estado: values.estado,
        })
        .eq('userid', profile.userid);

      if (error) {
        toast({
          title: 'Error updating profile.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Profile updated.',
          description: "Your profile has been updated successfully.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        onClose(); // Close the modal on successful submission
      }
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              {...formik.getFieldProps('name')}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...formik.getFieldProps('email')}
            />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              {...formik.getFieldProps('phone')}
            />
          </FormControl>
          <FormControl id="birthdate" isRequired>
            <FormLabel>Birthdate</FormLabel>
            <Input
              type="date"
              {...formik.getFieldProps('birthdate')}
            />
          </FormControl>
          <FormControl id="primer" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              {...formik.getFieldProps('primer')}
            />
          </FormControl>
          <FormControl id="segundo" isRequired>
            <FormLabel>Second Name</FormLabel>
            <Input
              type="text"
              {...formik.getFieldProps('segundo')}
            />
          </FormControl>
          <FormControl id="activities" isRequired>
            <FormLabel>Activities</FormLabel>
            <Textarea
              {...formik.getFieldProps('activities')}
            />
          </FormControl>
          <FormControl id="estado" isRequired>
            <FormLabel>Estado</FormLabel>
            <Input
              type="text"
              {...formik.getFieldProps('estado')}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={formik.isSubmitting}
          >
            Update Profile
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileEditForm;
