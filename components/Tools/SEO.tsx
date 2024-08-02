import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Add structured data markup using JSON-LD */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org/",
          "@type": "VideoObject",
          "name": "${title}",
          "description": "${description}",
          "thumbnailUrl": "Thumbnail URL",
          "uploadDate": "Upload Date",
          "contentUrl": "Video URL",
          "embedUrl": "Embed URL"
        }
      `}</script>
    
        
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    </Head>
  );
};

export default SEO;
