import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Center, Spinner } from '@chakra-ui/react';

const Loader = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  

  return (
    <>
      <NextSeo
        title="Loading..."
        noindex={true} // Prevent indexing by search engines while loading
        nofollow={true} // Prevent following links while loading
      />
      
    <Center>
        <Spinner size="xl" color="blue.500" />
    </Center>
     
    </>
  );
};

export default Loader;
