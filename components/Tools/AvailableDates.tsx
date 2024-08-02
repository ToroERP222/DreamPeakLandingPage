// components/AvailableDates.tsx
import { Box, Button, Stack, Text } from '@chakra-ui/react';

interface AvailableDatesProps {
  dates: string[];
  onSelectDate: (date: string) => void;
}

const AvailableDates: React.FC<AvailableDatesProps> = ({ dates, onSelectDate }) => {
  return (
    <Box>
      <Text mb={4}>Select an available date:</Text>
      <Stack spacing={4}>
        {dates.map((date, index) => (
          <Button key={index} onClick={() => onSelectDate(date)}>
            {date}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default AvailableDates;
