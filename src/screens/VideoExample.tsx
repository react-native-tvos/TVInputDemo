/*
 * Demo of expo-video usage for Apple TV and Android TV
 */

import {useEvent, useEventListener} from 'expo';
import {useVideoPlayer, VideoView} from 'expo-video';
import React from 'react';
import {Platform, StyleSheet, View, useTVEventHandler} from 'react-native';

import {
  Button,
  ProgressBar,
  SectionContainer,
} from '../common/StyledComponents';
import useNavigationFocus from '../navigation/useNavigationFocus';

const videoSource = require('../../assets/bach-handel-corelli.mp4');

const VideoExample = ({navigation}: {navigation: any}) => {
  const videoViewRef = React.useRef<VideoView>(null);

  const player = useVideoPlayer(videoSource, p => {
    p.loop = true;
  });

  const {isPlaying} = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  useEventListener(player, 'timeUpdate', ({currentTime: ct}) => {
    setCurrentTime(ct);
  });

  useEventListener(player, 'statusChange', () => {
    if (player.duration > 0) {
      setDuration(player.duration);
    }
  });

  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const progress = duration > 0 ? currentTime / duration : 0;

  const [hasNavigationFocus, setHasNavigationFocus] = React.useState(false);

  useNavigationFocus(navigation, setHasNavigationFocus);

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
            style={isFullScreen ? {display: 'none'} : styles.video}
            player={player}
            contentFit="contain"
            nativeControls={false}
            onFullscreenEnter={() => setIsFullScreen(true)}
            onFullscreenExit={() => setIsFullScreen(false)}
          />
          <ProgressBar fractionComplete={progress} />
        </View>
        <View style={styles.generalControls}>
          <Button hasTVPreferredFocus={hasNavigationFocus} onPress={playPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button onPress={() => player.replay()}>Rewind</Button>
          <Button onPress={() => (player.volume = 0.0)}>No volume</Button>
          <Button onPress={() => (player.volume = 0.5)}>Half volume</Button>
          <Button onPress={() => (player.volume = 1.0)}>Full volume</Button>
          <Button
            onPress={() => videoViewRef.current?.enterFullscreen()}>
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
