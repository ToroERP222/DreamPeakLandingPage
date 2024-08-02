// components/PhotoGallery.tsx
import { Box, Image, SimpleGrid } from '@chakra-ui/react';

interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  return (
    <Box>
      <SimpleGrid columns={[2, null, 3]} spacing="40px">
        {photos.map((photo, index) => (
          <Box key={index} overflow="hidden" borderRadius="md">
            <Image src={photo} alt={`Trip photo ${index + 1}`} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PhotoGallery;
