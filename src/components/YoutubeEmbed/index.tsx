import React from 'react';

type YouTubeEmbedProps = {
  title: string;
  description: string;
  videoId: string;
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = (
  { title, description, videoId }
) => {
  return (
    <div className="mx-auto w-1/1">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="w-full h-80">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
