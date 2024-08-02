import React, { useState } from 'react';
import { Box, Button, Input, Stack, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/component'

interface EditProfileFormProps {
  user: User;
  profile: Profile;
  onProfileUpdated: () => void;
}

interface Profile {
  id: number;
  name: string;
  primer: string;
  segundo: string;
  birthdate: string;
  email: string;
  phone: string;
  estado: string;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, profile, onProfileUpdated }) => {
  const [formData, setFormData] = useState(profile);
  const toast = useToast();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('profile')
      .update({
        name: formData.name,
        primer: formData.primer,
        segundo: formData.segundo,
        birthdate: formData.birthdate,
        email: formData.email,
        phone: formData.phone,
        estado: formData.estado,
      })
      .eq('id', profile.id);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onProfileUpdated();
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="name">
          <FormLabel>Nombre</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="primer">
          <FormLabel>Primer Apellido</FormLabel>
          <Input name="primer" value={formData.primer} onChange={handleChange} />
        </FormControl>
        <FormControl id="segundo">
          <FormLabel>Segundo Apellido</FormLabel>
          <Input name="segundo" value={formData.segundo} onChange={handleChange} />
        </FormControl>
        <FormControl id="birthdate">
          <FormLabel>Fecha de Nacimiento</FormLabel>
          <Input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="phone">
          <FormLabel>Telefono</FormLabel>
          <Input name="phone" value={formData.phone} onChange={handleChange} />
        </FormControl>
        <FormControl id="estado">
          <FormLabel>Estado</FormLabel>
          <Input name="estado" value={formData.estado} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

export default EditProfileForm;
