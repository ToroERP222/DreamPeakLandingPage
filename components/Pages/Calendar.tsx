import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Text,
  IconButton,
  useColorModeValue,
  Spinner,
  useToast,
  useMediaQuery
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import axios from 'axios';
import dayjs from 'dayjs';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface CalendarProps {
  apiEndpoint: string;
}

const Calendar: React.FC<CalendarProps> = ({ apiEndpoint }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  // Media query to detect if the device is a mobile
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const fetchMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiEndpoint);
      setMeetings(response.data);
    } catch (error) {
      toast({
        title: "Error fetching meetings.",
        description: "There was an error fetching meetings. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, toast]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const daysInMonth = useMemo(() => {
    const startOfMonth = currentMonth.startOf('month').day();
    const daysInCurrentMonth = currentMonth.daysInMonth();
    const daysArray = Array.from({ length: startOfMonth + daysInCurrentMonth }, (_, i) => {
      if (i < startOfMonth) return null;
      return i - startOfMonth + 1;
    });
    return daysArray;
  }, [currentMonth]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.subtract(1, 'month'));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.add(1, 'month'));
  }, []);

  return (
    <Box p={4} maxW={isMobile ? "95%" : "100%"} mx="auto">
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <IconButton
          aria-label="Previous Month"
          icon={<ChevronLeftIcon />}
          onClick={handlePrevMonth}
          size="lg"
          colorScheme={useColorModeValue('gray', 'whiteAlpha')}
        />
        <Text fontSize="2xl" fontWeight="bold">
          {currentMonth.format('MMMM YYYY')}
        </Text>
        <IconButton
          aria-label="Next Month"
          icon={<ChevronRightIcon />}
          onClick={handleNextMonth}
          size="lg"
          colorScheme={useColorModeValue('gray', 'whiteAlpha')}
        />
      </Box>
      <Grid templateColumns="repeat(7, 1fr)" gap={4}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <GridItem key={day}>
            <Text fontSize={isMobile ? "sm" : "lg"} fontWeight="bold" textAlign="center">
              {day}
            </Text>
          </GridItem>
        ))}
        {daysInMonth.map((day, index) => (
          <GridItem key={index} minH={isMobile ? "50px" : "100px"} bg={day ? 'gray.100' : 'transparent'}>
            {day && (
              <Box p={2}>
                <Text fontWeight="bold">{day}</Text>
                {meetings
                  .filter((meeting) => dayjs(meeting.date).isSame(currentMonth.date(day), 'day'))
                  .map((meeting) => (
                    <Box key={meeting.id} mt={2} p={2} bg="teal.100" borderRadius="md">
                      <Text fontSize="sm" fontWeight="bold">
                        {meeting.title}
                      </Text>
                      <Text fontSize="xs">{meeting.time}</Text>
                    </Box>
                  ))}
              </Box>
            )}
          </GridItem>
        ))}
      </Grid>
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Spinner size="lg" />
        </Box>
      )}
    </Box>
  );
};

export default Calendar;
