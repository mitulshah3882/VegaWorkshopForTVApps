import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from 'react-native';
import type {NativeStackScreenProps} from '@amazon-devices/react-navigation__native-stack';
import type {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = ({route, navigation}: Props) => {
  const {banner, title, description, videoUrl} = route.params;
  const [playFocused, setPlayFocused] = useState(false);
  const [watchlistFocused, setWatchlistFocused] = useState(false);
  const [backFocused, setBackFocused] = useState(false);

  const handlePlay = () => {
    console.log('Play button pressed for:', title);
    console.log('Video URL:', videoUrl);
  };

  const handleAddToWatchlist = () => {
    console.log('Add to Watchlist pressed for:', title);
  };

  return (
    <ImageBackground
      source={{uri: banner}}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          
          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.playButton, playFocused && styles.buttonFocused]}
              onPress={handlePlay}
              onFocus={() => setPlayFocused(true)}
              onBlur={() => setPlayFocused(false)}
              hasTVPreferredFocus>
              <Text style={styles.buttonText}>Play</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.watchlistButton, watchlistFocused && styles.buttonFocused]}
              onPress={handleAddToWatchlist}
              onFocus={() => setWatchlistFocused(true)}
              onBlur={() => setWatchlistFocused(false)}>
              <Text style={styles.buttonText}>Add to Watchlist</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.backButton, backFocused && styles.buttonFocused]}
              onPress={() => navigation.goBack()}
              onFocus={() => setBackFocused(true)}
              onBlur={() => setBackFocused(false)}>
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    paddingHorizontal: 80,
  },
  content: {
    maxWidth: 1200,
  },
  title: {
    color: '#fff',
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
  description: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 48,
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  playButton: {
    backgroundColor: '#1DB954',
  },
  watchlistButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonFocused: {
    borderColor: '#fff',
    borderWidth: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
