// components/TripRegistrationForm.tsx
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';

interface TripRegistrationFormProps {
  selectedDate: string;
}

const TripRegistrationForm: React.FC<TripRegistrationFormProps> = ({ selectedDate }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Registered for date:', selectedDate, 'with data:', formData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl id="name" mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Register for {selectedDate}
      </Button>
    </Box>
  );
};

export default TripRegistrationForm;
