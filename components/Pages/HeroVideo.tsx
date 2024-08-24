import { Box, Text, Button, useStyleConfig, BoxProps, useMediaQuery, Image } from '@chakra-ui/react';
import { useRef, useEffect, useState } from 'react';

interface VideoHeroProps {
  logoSrc: string;
  description: string;
  videoSrc: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({ logoSrc, description, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoStyle = useStyleConfig("VideoHero");

  const [opacity, setOpacity] = useState<number>(0);

  const [isMobile] = useMediaQuery('(max-width: 320px)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
      width={isMobile ? "160%" : "100%"}
      height="100vh"
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
        px={[4, 8]}
        py={[4, 6]}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        color="white"
        maxW="90vw"
      >
        <Box
          mb={[2, 4]}
          shadow={'sm'}
        
          p={4}
          display="inline-block"
        >
          <Image src={logoSrc} alt="Logo" maxH="250px" width={"250px"}  rounded={10} />
        </Box>
        
      </Box>
    </Box>
  );
};

export default VideoHero;
