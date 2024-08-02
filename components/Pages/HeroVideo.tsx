import { Box, Heading, Text, Button, useStyleConfig, BoxProps, useMediaQuery } from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';

interface VideoHeroProps {
  title: string;
  description: string;
  videoSrc: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({ title, description, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoStyle = useStyleConfig("VideoHero");

  const [opacity, setOpacity] = useState<number>(0);

  // Media query to detect if the device is an iPhone or mobile
  const [isMobile] = useMediaQuery('(max-width: 320px)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []); // Run only once on component mount
  const handleButtonClick = () => {
    const videoElement = document.querySelector('video') as HTMLVideoElement;
  
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else {
        console.error('Fullscreen API is not supported');
      }
    }
  }

  return (
    <Box
      position="relative"
      width={isMobile ? "160%" : "100%"} // Adjust width based on device type
      height="100vh" // Ensure the Box takes the full height of the viewport
      overflow="hidden"
      sx={{
        ':hover .shadow-overlay': { opacity: 0 },
        ':hover .video-content': { opacity: 1 },
      }}
    >
      
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        className="shadow-overlay"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-b, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8))"
        opacity={1}
        transition="opacity 0.2s ease-in-out"
      />
      <Box
        className="video-content"
        sx={{
          ...videoStyle,
          opacity: opacity,
          transition: 'opacity 0.3s ease-in-out',
        } as BoxProps}
        px={[4, 8]} // Responsive padding: [base, md]
        py={[4, 6]} // Responsive padding: [base, md]
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="white"
        maxW="90vw" // Make sure the content fits within the viewport width
      >
       <Heading as="h1" size={["lg", "2xl"]} textColor={"gray.800"} mb={[2, 4]} shadow={'2xl'}  bgColor={'gray.100'} p={4} >{title}</Heading> 
        <Text fontSize={["md", "lg"]} mb={[2, 4]}>{description}</Text>
        <Button bgColor={'blue.400'} textColor={'whitesmoke'}size={["md", "lg"]} onClick={handleButtonClick}>Watch Now</Button>
      </Box>
    </Box>
  );
};

export default VideoHero;
