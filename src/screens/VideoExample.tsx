/*
 * Demo of expo-video usage for Apple TV and Android TV
 */

import {useVideoPlayer, VideoPlayerStatus, VideoView} from 'expo-video';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, View, useTVEventHandler} from 'react-native';

import {
  Button,
  ProgressBar,
  SectionContainer,
} from '../common/StyledComponents';
import useNavigationFocus from '../navigation/useNavigationFocus';
import {useEventListener} from 'expo';

const videoSource = require('../../assets/bach-handel-corelli.mp4');

const VideoExample = ({navigation}: {navigation: any}) => {
  const videoViewRef = React.useRef<VideoView>(null);

  const [fractionComplete, setFractionComplete] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoStatus, setVideoStatus] = useState<VideoPlayerStatus>('idle');

  const fractionCompleteFromPosition = (
    position: number | undefined,
    duration: number | undefined,
  ) => {
    return duration !== undefined ? (position ?? 0) / duration : 0;
  };

  const player = useVideoPlayer(videoSource, player => {
    setVideoStatus(player.status);
  });

  useEventListener(player, 'statusChange', payload => {
    setVideoStatus(payload.status);
    console.log(`video status = ${payload.status}`);
  });

  useEffect(() => {
    if (player.playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [player.playing]);

  const [hasNavigationFocus, setHasNavigationFocus] = React.useState(false);

  useNavigationFocus(navigation, focus => {
    console.log(`isFocused: ${focus}`);
    setHasNavigationFocus(focus);
  });

  useInterval(() => {
    setFractionComplete(
      fractionCompleteFromPosition(player.currentTime, player.duration),
    );
  }, 1000);

  useEffect(() => {
    if (videoStatus === 'readyToPlay') {
      // Autoplay on start
      //      player.play();
    }
  }, [videoStatus]);

  useTVEventHandler(evt => {
    if (evt && evt.eventType === 'playPause') {
      playPause();
    }
  });

  const playPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <SectionContainer title="Video example">
      <View style={styles.videoContainer}>
        <View>
          <VideoView
            ref={videoViewRef}
            style={styles.video}
            player={player}
            contentFit="contain"
            nativeControls
            fullscreenOptions={{
              enable: true,
            }}
          />
          <ProgressBar fractionComplete={fractionComplete} />
        </View>
        <View style={styles.generalControls}>
          <Button hasTVPreferredFocus={hasNavigationFocus} onPress={playPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button onPress={() => player.replay()}>Rewind</Button>
          <Button onPress={() => (player.volume = 0.0)}>No volume</Button>
          <Button onPress={() => (player.volume = 0.5)}>Half volume</Button>
          <Button onPress={() => (player.volume = 1.0)}>Full volume</Button>
          <Button onPress={() => videoViewRef.current.enterFullscreen()}>
            Full screen
          </Button>
        </View>
      </View>
    </SectionContainer>
  );
};

export default VideoExample;

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  video: {
    width: Platform.OS === 'android' ? 640 : 960,
    height: Platform.OS === 'android' ? 360 : 640,
  },
  generalControls: {},
});

const useInterval: (callback: () => void, interval: number) => void = (
  callback,
  interval,
) => {
  const callbackRef = useRef<typeof callback>(null);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function cb() {
      callbackRef.current && callbackRef.current();
    }
    const id = setInterval(cb, interval);
    return () => clearInterval(id);
  }, [interval]);
};
