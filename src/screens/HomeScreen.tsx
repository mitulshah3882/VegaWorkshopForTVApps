import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  findNodeHandle,
  ScrollView,
} from 'react-native';
import {FocusManager, TVFocusGuideView} from '@amazon-devices/react-native-kepler';
import type {NativeStackScreenProps} from '@amazon-devices/react-navigation__native-stack';
import type {RootStackParamList} from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface MovieItem {
  id: string;
  title: string;
  description: string;
  category: string;
  trending: boolean;
  images: {
    thumbnail_450x253: string;
    poster_16x9: string;
  };
  sources: Array<{
    type: string;
    url: string;
  }>;
}

interface ContentRow {
  title: string;
  items: MovieItem[];
}

const ITEM_WIDTH = 400;
const ITEM_HEIGHT = 225; // 16:9 aspect ratio
const FOCUS_BORDER_WIDTH = 4;
const ITEM_SPACING = 16;

const HomeScreen = ({navigation}: Props) => {
  const [contentRows, setContentRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const firstItemRef = useRef(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    // Set focus to first item after content loads
    if (contentRows.length > 0 && firstItemRef.current) {
      const handle = findNodeHandle(firstItemRef.current);
      if (handle) {
        FocusManager.focus(handle);
      }
    }
  }, [contentRows]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/efahsl/scrap-tv-feed/refs/heads/main/catalog-fullUrls-720p.json',
      );
      const data = await response.json();
      const movies: MovieItem[] = data.items || [];

      // Organize content into rows
      const rows: ContentRow[] = [];

      // First row: Trending Now
      const trendingItems = movies.filter(item => item.trending === true);
      if (trendingItems.length > 0) {
        rows.push({
          title: 'Trending Now',
          items: trendingItems,
        });
      }

      // Group by category
      const categoryMap = new Map<string, MovieItem[]>();
      movies.forEach(item => {
        if (!categoryMap.has(item.category)) {
          categoryMap.set(item.category, []);
        }
        categoryMap.get(item.category)!.push(item);
      });

      // Add category rows
      categoryMap.forEach((items, category) => {
        rows.push({
          title: category,
          items: items,
        });
      });

      setContentRows(rows);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {contentRows.map((row, rowIndex) => (
        <ContentRowComponent
          key={row.title}
          row={row}
          isFirstRow={rowIndex === 0}
          firstItemRef={rowIndex === 0 ? firstItemRef : null}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

interface ContentRowProps {
  row: ContentRow;
  isFirstRow: boolean;
  firstItemRef: React.RefObject<any> | null;
  navigation: any;
}

const ContentRowComponent = ({row, isFirstRow, firstItemRef, navigation}: ContentRowProps) => {
  const renderItem = ({item, index}: {item: MovieItem; index: number}) => {
    return (
      <MovieCard
        item={item}
        ref={isFirstRow && index === 0 ? firstItemRef : null}
        onPress={() => {
          navigation.navigate('Details', {
            banner: item.images.poster_16x9,
            title: item.title,
            description: item.description,
            videoUrl: item.sources[0]?.url || '',
          });
        }}
      />
    );
  };

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.rowHeader}>{row.title}</Text>
      <TVFocusGuideView trapFocusLeft={true} trapFocusRight={true}>
        <FlatList
          data={row.items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </TVFocusGuideView>
    </View>
  );
};

const MovieCard = React.forwardRef<View, {item: MovieItem; onPress: () => void}>(
  ({item, onPress}, ref) => {
    const [focused, setFocused] = useState(false);

    return (
      <Pressable
        ref={ref}
        style={[styles.card, focused && styles.cardFocused]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onPress={onPress}>
        <Image
          source={{uri: item.images.thumbnail_450x253}}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
  },
  rowContainer: {
    marginBottom: 40,
    paddingLeft: 60,
  },
  rowHeader: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
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
