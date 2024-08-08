import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Textarea, Select, useToast } from '@chakra-ui/react';
import { createClient } from '@/utils/supabase/component';

export const activities = [
  'Senderismo', 'Media Montaña', 'Alta Montaña', 'Cañonismo', 
  'Rafting', 'Rappel', 'Escalada', 'Kayak'
];

const UploadFormWithDetails: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [actividad, setActividad] = useState('');
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
          titulo,
          descripcion,
          fecha,
          actividad,
          imagenName: fileName,
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

      // Limpiar el formulario después de enviar
      setTitulo('');
      setDescripcion('');
      setFecha('');
      setActividad('');
      setFile(null);
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
        <FormControl id="titulo" mb={4}>
          <FormLabel>Título</FormLabel>
          <Input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </FormControl>
        <FormControl id="descripcion" mb={4}>
          <FormLabel>Descripción</FormLabel>
          <Textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </FormControl>
        <FormControl id="fecha" mb={4}>
          <FormLabel>Fecha</FormLabel>
          <Input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </FormControl>
        <FormControl id="actividad" mb={4}>
          <FormLabel>Actividad</FormLabel>
          <Select
            placeholder="Selecciona una actividad"
            value={actividad}
            onChange={(e) => setActividad(e.target.value)}
          >
            {activities.map((activity, index) => (
              <option key={index} value={activity}>
                {activity}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Crear Viaje
        </Button>
      </form>
    </Box>
  );
};

export default UploadFormWithDetails;
