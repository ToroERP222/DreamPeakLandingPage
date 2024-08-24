import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  Stack,
  Text,
  useToast,
  Radio,
  RadioGroup,
  Center,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useMediaQuery,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface CarouselQuestionnaireProps {
  questions: Question[];
  apiEndpoint: string;
}

const CarouselQuestionnaire: React.FC<CarouselQuestionnaireProps> = ({ questions, apiEndpoint }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [isFinished, setIsFinished] = useState(false);
  const toast = useToast();

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? questions.length - 1 : prevIndex - 1));
  }, [questions.length]);

  const handleNext = useCallback(() => {
    if (currentIndex === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex === questions.length - 1 ? 0 : prevIndex + 1));
    }
  }, [currentIndex, questions.length]);

  const handleAnswerChange = useCallback(async (answer: string) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentIndex] = answer;
      return newAnswers;
    });

    if (currentIndex === questions.length - 1) {
      try {
        await axios.post(apiEndpoint, { answers });
        toast({
          title: "Answers submitted.",
          description: "Your answers have been submitted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error submitting answers.",
          description: "There was an error submitting your answers. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setIsFinished(true);
    } else {
      handleNext();
    }
  }, [currentIndex, questions.length, apiEndpoint, answers, toast, handleNext]);

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(''));
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const handleGetResults = () => {
    toast({
      title: "Get Results",
      description: "Fetching results...",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const currentQuestion = useMemo(() => questions[currentIndex], [currentIndex, questions]);

  const [isMobile] = useMediaQuery('(max-width: 320px)');
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const spacing = useBreakpointValue({ base: 2, md: 4 });

  const MotionBox = motion(Box);
  const animationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 2,
      transition: { duration: 1 },
    },
  };

  return (
    <Center>
      <MotionBox
        display="flex"
        alignItems="center"
        shadow="xl"
        p={10}
        borderRadius="md"
        justifyContent="center"
        position="relative"
        border="1px solid"
        borderColor="gray.200"
        w={isMobile ? "100%" : "100%"}
        initial="hidden"
        animate="visible"
        variants={animationVariants}
      >
        <Stack spacing={spacing} w="100%">
          <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
            {currentQuestion.text}
          </Text>
          <RadioGroup onChange={handleAnswerChange} value={answers[currentIndex]}>
            <Stack spacing={spacing}>
              {currentQuestion.options.map((option, index) => (
                <Radio key={index} value={option} colorScheme="teal">
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Stack>
      </MotionBox>
    </Center>
  );
};

interface ResponsiveSEOButtonModalProps {
  buttonText: string;
  questions: Question[];
  apiEndpoint: string;
}

const ResponsiveSEOButtonModal: React.FC<ResponsiveSEOButtonModalProps> = ({ buttonText, questions, apiEndpoint }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobile] = useMediaQuery('(max-width: 315px)');

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const MotionCenter = motion(Center);
  const animationVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15 },
    },
  };

  return (
    <Center>
      <Box
        w={isMobile ? '160%' : '100%'}
        position="relative"
        bgImage="url('/carouselimage.webp')"
        bgSize="cover"
        bgPosition="center"
        p={10}
      >
        <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="blackAlpha.600" zIndex={0} />
        <Box position="relative" zIndex={1}>
          <Heading as="h1" p={4} textAlign="center" mb={4} color="white">
            ¿En qué grado te encuentras?
          </Heading>
          <Box m={10} p={10} rounded="lg">
            <Text as="article" fontSize="xl" lineHeight="tall" textAlign="center" color="white">
              El grado de hiking se refiere al nivel de dificultad o exigencia de una ruta o sendero.
            </Text>
          </Box>
          <MotionCenter
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            transition={{ duration: 2 }}
          >
            <Button
              color="white"
              bgColor="black"
              onClick={handleButtonClick}
              size={isMobile ? 'md' : 'xl'}
              fontSize={isMobile ? 'md' : 'xl'}
              py={isMobile ? 1 : 6}
              px={isMobile ? 6 : 8}
              borderRadius="lg"
              mb={4}
              mt={10}
              shadow="2xl"
              _hover={{
                shadow: 'md',
                transform: 'scale(1.05)',
                transition: 'all 0.3s',
              }}
            >
              {buttonText}
            </Button>
          </MotionCenter>
        </Box>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Test Hiking</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CarouselQuestionnaire questions={questions} apiEndpoint={apiEndpoint} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
};

const Cuestionario: React.FC = () => {
  const questions = [
    { id: 1, text: "What is your favorite color?", options: ["Red", "Blue", "Green", "Yellow"] },
    { id: 2, text: "What is your preferred mode of transport?", options: ["Car", "Bike", "Bus", "Walk"] },
    { id: 3, text: "What type of cuisine do you prefer?", options: ["Italian", "Chinese", "Mexican", "Indian"] }
  ];

  const apiEndpoint = 'https://example.com/api/submit'; // Replace with your actual API endpoint

  return (
    <Box>
      <ResponsiveSEOButtonModal buttonText="Abrir Test" questions={questions} apiEndpoint={apiEndpoint} />
    </Box>
  );
};

export default Cuestionario;
