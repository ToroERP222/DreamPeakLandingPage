import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Heading, Input, Button, Stack, Text, Container } from '@chakra-ui/react';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hikes, setHikes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchHikes(token);
    }
  }, []);

  const fetchHikes = async (token) => {
    try {
      const { data } = await axios.get('http://localhost:5000/hiking-routes', {
        headers: { Authorization: token },
      });
      setHikes(data);
    } catch (error) {
      console.error('Error fetching hikes:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      fetchHikes(data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  const renderLogin = () => (
    <Container maxW="md">
      <Stack spacing={4} mt={10}>
        <Heading as="h1" size="lg" textAlign="center">Admin Login</Heading>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
      </Stack>
    </Container>
  );
  const AddNewHike = ({ token, fetchHikes }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [grade, setGrade] = useState('');
    const [images, setImages] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleAddHike = async () => {
      setIsLoading(true);
      try {
        await axios.post(
          'http://localhost:5000/hiking-routes',
          { name, date, grade, images: images.split(',') },
          { headers: { Authorization: token } }
        );
        setName('');
        setDate('');
        setGrade('');
        setImages('');
        fetchHikes(token);
      } catch (error) {
        console.error('Error adding hike:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <Heading as="h2" size="md">Add New Hike</Heading>
        <Stack spacing={4} mt={4}>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <Input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
          <Input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Grade" />
          <Textarea
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder="Images (comma-separated)"
            rows={3}
          />
          <Button colorScheme="blue" onClick={handleAddHike} isLoading={isLoading}>Add Hike</Button>
        </Stack>
      </Box>
    );
  };
  const renderDashboard = () => (
    <Container maxW="xl">
      <Box mt={10}>
        <Button colorScheme="blue" onClick={handleLogout}>Logout</Button>
      </Box>
      <Stack spacing={4} mt={5}>
        <Heading as="h1" size="lg">Dashboard</Heading>
        {hikes.map((hike, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading as="h2" size="md">{hike.name}</Heading>
            <Text>Date: {hike.fecha}</Text>
            <Text>Grade: {hike.grado}</Text>
            <Text>Images: {hike.images.join(', ')}</Text>
          </Box>
        ))}
        {/* Add New Hike Component Goes Here */}
        <AddNewHike token={undefined} fetchHikes={undefined}/>
      </Stack>
    </Container>
  );

  return isLoggedIn ? renderDashboard() : renderLogin();
};

export default Admin;
