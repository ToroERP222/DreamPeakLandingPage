import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Textarea, useToast } from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/component';

const UploadFormWithDetails: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [activity, setActivity] = useState('');
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const supabase = createClient();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: 'No file selected',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      const fileName = data.fileName;

      // Subir la información a Supabase
      const { error } = await supabase.from('Trips').insert([
        {
          title,
          description,
          date,
          activity,
          imageName: fileName,
        },
      ]);

      if (error) {
        throw error;
      }

      toast({
        title: 'Trip created successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating trip',
       
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <form onSubmit={handleSubmit}>
        <FormControl id="file" mb={4}>
          <FormLabel>Upload Image</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>
        <FormControl id="title" mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl id="description" mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl id="date" mb={4}>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="activity" mb={4}>
          <FormLabel>Activity</FormLabel>
          <Input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Create Trip
        </Button>
      </form>
    </Box>
  );
};

export default UploadFormWithDetails;
