import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  findNodeHandle,
} from 'react-native';
import {FocusManager} from '@amazon-devices/react-native-kepler';

interface MovieItem {
  id: string;
  title: string;
  images: {
    thumbnail_450x253: string;
  };
}

const ITEM_WIDTH = 400;
const ITEM_HEIGHT = 225; // 16:9 aspect ratio
const FOCUS_BORDER_WIDTH = 4;
const ITEM_SPACING = 16;

const HomeScreen = () => {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);
  const firstItemRef = useRef(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    // Set focus to first item after movies load
    if (movies.length > 0 && firstItemRef.current) {
      const handle = findNodeHandle(firstItemRef.current);
      if (handle) {
        FocusManager.focus(handle);
      }
    }
  }, [movies]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/efahsl/scrap-tv-feed/refs/heads/main/catalog-fullUrls-720p.json',
      );
      const data = await response.json();
      setMovies(data.items || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item, index}: {item: MovieItem; index: number}) => {
    return (
      <MovieCard
        item={item}
        ref={index === 0 ? firstItemRef : null}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Latest Releases</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const MovieCard = React.forwardRef<View, {item: MovieItem}>(({item}, ref) => {
  const [focused, setFocused] = useState(false);

  const handlePress = () => {
    console.log('Pressed:', item.title);
  };

  return (
    <Pressable
      ref={ref}
      style={[
        styles.card,
        focused && styles.cardFocused,
      ]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPress={handlePress}>
      <Image
        source={{uri: item.images.thumbnail_450x253}}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingLeft: 60,
  },
  header: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  listContainer: {
    height: ITEM_HEIGHT + (FOCUS_BORDER_WIDTH * 2) + (ITEM_SPACING * 2),
  },
  listContent: {
    paddingRight: 60,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: ITEM_SPACING,
    borderWidth: FOCUS_BORDER_WIDTH,
    borderColor: 'transparent',
  },
  cardFocused: {
    borderColor: '#fff',
    borderWidth: FOCUS_BORDER_WIDTH,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    color: '#fff',
    fontSize: 32,
  },
});

export default HomeScreen;
