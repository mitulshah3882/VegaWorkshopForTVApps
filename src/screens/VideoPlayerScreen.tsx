import React, {useRef, useEffect, useState, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {VideoPlayer, KeplerVideoView} from '@amazon-devices/react-native-w3cmedia';
import type {NativeStackScreenProps} from '@amazon-devices/react-navigation__native-stack';
import type {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

export const VideoPlayerScreen = ({route, navigation}: Props) => {
  const {videoUrl} = route.params;
  const video = useRef<VideoPlayer | null>(null);
  const [useKeplerVideoView, setUseKeplerVideoView] = useState(false);

  useEffect(() => {
    console.log('VideoPlayerScreen mounting with URL:', videoUrl);
    initializingPreBuffering();

    // Cleanup function - pause and cleanup video when navigating away
    return () => {
      console.log('VideoPlayerScreen unmounting, pausing video');
      if (video.current) {
        video.current.pause();
        video.current.currentTime = 0;
        video.current.removeEventListener('ended', handleVideoEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVideoEnded = () => {
    console.log('Video playback ended, navigating back');
    navigation.goBack();
  };

  const initializingPreBuffering = async () => {
    video.current = new VideoPlayer();
    await video.current.initialize();
    video.current!.autoplay = true;
    video.current.src = videoUrl;
    
    // Add event listener for video end
    video.current.addEventListener('ended', handleVideoEnded);
    
    setUseKeplerVideoView(true);
    console.log('VideoPlayerScreen init complete, setting kepler video view to true');
  };

  // Memoize the KeplerVideoView to prevent unnecessary re-renders
  const videoView = useMemo(() => {
    if (!useKeplerVideoView || !video.current) {
      return null;
    }
    return (
      <KeplerVideoView
        showControls={false}
        videoPlayer={video.current as VideoPlayer}
      />
    );
  }, [useKeplerVideoView]);

  return <View style={styles.container}>{videoView}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default VideoPlayerScreen;
