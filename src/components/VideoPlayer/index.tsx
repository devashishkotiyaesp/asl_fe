import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/theme.css';

import { MediaPlayer, MediaProvider, Poster, Track } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { PlayerSrc } from '@vidstack/react/types/vidstack';
import { REACT_APP_BACKEND_URL } from 'config';
import { FC, useEffect, useState } from 'react';
import './index.css';

interface VideoPlayerProps {
  src?: string | PlayerSrc | null;
  title?: string;
  poster?: string | null;
  srt_file?: string | null;
  isFromDatabase?: boolean;
  trackLabel?: string;
  captionType?: 'srt' | 'vtt' | 'ssa' | 'ass';
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  srt_file,
  isFromDatabase = true,
  trackLabel = 'English',
  captionType = 'srt',
}) => {
  const [videoURL, setVideoURL] = useState<string | PlayerSrc>('');
  const [videoPoster, setVideoPoster] = useState<string>('');
  const [videoCaptions, setVideoCaptions] = useState<string>('');

  useEffect(() => {
    setVideoURL(src || '');
    setVideoPoster(poster || '');
    setVideoCaptions(srt_file || '');
  });

  return (
    <>
      <MediaPlayer
        src={
          isFromDatabase
            ? videoURL.toString().includes('https://')
              ? (videoURL as string)
              : `${(REACT_APP_BACKEND_URL as string) + videoURL}`
            : videoURL
        }
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        title={title ?? ''}
        poster={
          isFromDatabase
            ? videoPoster.toString().includes('https://')
              ? (videoPoster as string)
              : `${(REACT_APP_BACKEND_URL as string) + videoPoster}`
            : videoPoster
        }
      >
        <MediaProvider>
          <Poster className="vds-poster" />
          <Track
            src={
              isFromDatabase
                ? videoCaptions.toString().includes('https://')
                  ? (videoCaptions as string)
                  : `${(REACT_APP_BACKEND_URL as string) + videoCaptions}`
                : videoCaptions
            }
            kind="subtitles"
            label={trackLabel}
            type={captionType}
            language="en-US"
          />
        </MediaProvider>
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </>
  );
};

export default VideoPlayer;
