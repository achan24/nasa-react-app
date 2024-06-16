import React from 'react';
import YouTube from 'react-youtube';
//import './YouTubeBackground.css'; // Import the CSS file for styling

const Main = (props) => {
  const { data } = props;

  const isYouTubeLink = data.url && data.url.includes('youtube.com');

  if (isYouTubeLink) {
    const videoId = extractVideoId(data.url);

    const onReady = (event) => {
      event.target.mute();
      event.target.playVideo();
    };

    return (
      <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId={videoId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                controls: 0,
                mute: 1,
                loop: 1,
                playlist: videoId,
              },
            }}
            onReady={onReady}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="imgContainer">
      <img
        src={data.hdurl}
        alt={data.title || 'mars demo picture'}
        className="bgImage"
      />
    </div>
  );
};

const extractVideoId = (url) => {
  const videoIdMatch = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return videoIdMatch ? videoIdMatch[1] : null;
};

export default Main;
