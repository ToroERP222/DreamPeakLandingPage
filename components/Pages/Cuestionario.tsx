import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  Stack,
  Text,
  Radio,
  RadioGroup,
  Center,
  useToast,
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
import { motion } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: { label: string; value: number }[];
}

interface CarouselQuestionnaireProps {
  questions: Question[];
}

const getDifficultyLevel = (totalScore: number) => {
  if (totalScore >= 5 && totalScore <= 9) return 'Nivel 1 (Iniciación)';
  if (totalScore >= 10 && totalScore <= 14) return 'Nivel 2 (Bajo)';
  if (totalScore >= 15 && totalScore <= 19) return 'Nivel 3 (Medio-Bajo)';
  if (totalScore >= 20 && totalScore <= 22) return 'Nivel 4 (Medio-Alto)';
  if (totalScore >= 23 && totalScore <= 25) return 'Nivel 5 (Avanzado)';
  return 'Puntaje fuera de rango';
};

const CarouselQuestionnaire: React.FC<CarouselQuestionnaireProps> = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const toast = useToast();

  const handleAnswerChange = useCallback(
    (answer: number) => {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentIndex] = answer;
        return newAnswers;
      });

      if (currentIndex === questions.length - 1) {
        setIsFinished(true);
        const score = answers.reduce((acc, cur) => acc + cur, 0) + answer;
        setTotalScore(score);
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    },
    [currentIndex, questions.length, answers]
  );

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(0));
    setCurrentIndex(0);
    setIsFinished(false);
    setTotalScore(null);
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
          {isFinished && totalScore !== null ? (
            <>
              <Heading size="lg" textAlign="center">
                {getDifficultyLevel(totalScore)}
              </Heading>
              <Button onClick={handleReset} size={buttonSize} colorScheme="teal">
                Reiniciar
              </Button>
            </>
          ) : (
            <>
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold">
                {currentQuestion.text}
              </Text>
              <RadioGroup onChange={(value) => handleAnswerChange(parseInt(value))} value={answers[currentIndex].toString()}>
                <Stack spacing={spacing}>
                  {currentQuestion.options.map((option, index) => (
                    <Radio key={index} value={option.value.toString()} colorScheme="teal">
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </>
          )}
        </Stack>
      </MotionBox>
    </Center>
  );
};

interface ResponsiveSEOButtonModalProps {
  buttonText: string;
  questions: Question[];
}

const ResponsiveSEOButtonModal: React.FC<ResponsiveSEOButtonModalProps> = ({ buttonText, questions }) => {
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
        w={isMobile ? '160%' : '120%'}
        position="relative"
        bgImage="url('/fondo4.jpg')"
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
              <CarouselQuestionnaire questions={questions} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Center>
  );
};

const Cuestionario: React.FC = () => {
  const questions: Question[] = [
    {
      id: 1,
      text: "¿Con qué frecuencia participas en caminatas o senderismo?",
      options: [
        { label: "Nunca he participado.", value: 1 },
        { label: "Rara vez, menos de una vez al año.", value: 2 },
        { label: "Ocasionalmente, unas pocas veces al año.", value: 3 },
        { label: "Regularmente, al menos una vez al mes.", value: 4 },
        { label: "Frecuentemente, varias veces al mes.", value: 5 },
      ],
    },
    {
      id: 2,
      text: "¿Cuál es tu experiencia caminando en terrenos técnicos (roca, nieve, hielo)?",
      options: [
        { label: "Ninguna experiencia.", value: 1 },
        { label: "Muy poca, he caminado por senderos sencillos.", value: 2 },
        { label: "Alguna experiencia en senderos con pequeñas dificultades técnicas.", value: 3 },
        { label: "Experiencia moderada en terrenos más exigentes.", value: 4 },
        { label: "Amplia experiencia, incluyendo alta montaña y terrenos difíciles.", value: 5 },
      ],
    },
    {
      id: 3,
      text: "Evalúa tu condición física:",
      options: [
        { label: "No realizo actividad física regularmente.", value: 1 },
        { label: "Realizo ejercicio de forma esporádica.", value: 2 },
        { label: "Realizo ejercicio moderado de forma regular.", value: 3 },
        { label: "Tengo buena condición física y entreno regularmente.", value: 4 },
        { label: "Estoy en excelente condición física y entreno intensamente.", value: 5 },
      ],
    },
    {
      id: 4,
      text: "¿Cuál es la duración promedio de tus caminatas o rutas?",
      options: [
        { label: "Menos de 2 horas.", value: 1 },
        { label: "Entre 2 y 4 horas.", value: 2 },
        { label: "Entre 4 y 6 horas.", value: 3 },
        { label: "Entre 6 y 8 horas.", value: 4 },
        { label: "Más de 8 horas.", value: 5 },
      ],
    },
    {
      id: 5,
      text: "¿Cuál es el nivel máximo de altitud que has alcanzado en tus caminatas?",
      options: [
        { label: "Menos de 500 metros sobre el nivel del mar.", value: 1 },
        { label: "500 - 1000 metros sobre el nivel del mar.", value: 2 },
        { label: "1000 - 2000 metros sobre el nivel del mar.", value: 3 },
        { label: "2000 - 3000 metros sobre el nivel del mar.", value: 4 },
        { label: "Más de 3000 metros sobre el nivel del mar.", value: 5 },
      ],
    },
  ];

  return <ResponsiveSEOButtonModal buttonText="Empezar" questions={questions} />;
};

export default Cuestionario;
