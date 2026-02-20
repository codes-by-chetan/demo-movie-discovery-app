import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import UserReviewScreen from '../screens/UserReviewScreen';

type Route =
  | { name: 'Home' }
  | { name: 'MovieDetails'; movieId: number }
  | { name: 'PostReview'; movieId: number; movieTitle: string };

type HomeTabsProps = {
  activeTab: 'popular' | 'search';
  setActiveTab: (tab: 'popular' | 'search') => void;
  openMovie: (movieId: number) => void;
};

const HomeTabs = ({ activeTab, setActiveTab, openMovie }: HomeTabsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'popular' ? (
          <HomeScreen onMoviePress={openMovie} />
        ) : (
          <SearchScreen onMoviePress={openMovie} />
        )}
      </View>

      <View style={styles.tabBar}>
        <Pressable
          onPress={() => setActiveTab('popular')}
          style={[styles.tab, activeTab === 'popular' && styles.tabActive]}>
          <Text
            style={[styles.tabText, activeTab === 'popular' && styles.tabTextActive]}>
            Popular
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('search')}
          style={[styles.tab, activeTab === 'search' && styles.tabActive]}>
          <Text
            style={[styles.tabText, activeTab === 'search' && styles.tabTextActive]}>
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const AppNavigator = () => {
  const insets = useSafeAreaInsets();
  const [history, setHistory] = useState<Route[]>([{ name: 'Home' }]);
  const [activeTab, setActiveTab] = useState<'popular' | 'search'>('popular');

  const currentRoute = history[history.length - 1];
  const safeBottomInset = Math.max(insets.bottom, 12);

  const goBack = useCallback(() => {
    setHistory(current => (current.length > 1 ? current.slice(0, -1) : current));
  }, []);


  const handleHardwareBack = useCallback(() => {
    if (currentRoute.name !== 'Home') {
      goBack();
      return true;
    }

    if (activeTab !== 'popular') {
      setActiveTab('popular');
      return true;
    }

    return false;
  }, [activeTab, currentRoute.name, goBack]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleHardwareBack);

    return () => subscription.remove();
  }, [handleHardwareBack]);

  const openMovie = (movieId: number) => {
    setHistory(current => [...current, { name: 'MovieDetails', movieId }]);
  };

  const openPostReview = (movieId: number, movieTitle: string) => {
    setHistory(current => [...current, { name: 'PostReview', movieId, movieTitle }]);
  };

  const headerTitle = useMemo(() => {
    if (currentRoute.name === 'MovieDetails') {
      return 'Movie details';
    }
    if (currentRoute.name === 'PostReview') {
      return 'Write review';
    }
    return 'Movie Discovery';
  }, [currentRoute.name]);

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: insets.top,
          paddingBottom: safeBottomInset,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      {currentRoute.name !== 'Home' ? (
        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <View style={styles.headerSpacer} />
        </View>
      ) : null}

      <View style={styles.content}>
        {currentRoute.name === 'Home' ? (
          <HomeTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            openMovie={openMovie}
          />
        ) : null}

        {currentRoute.name === 'MovieDetails' ? (
          <MovieDetailsScreen
            movieId={currentRoute.movieId}
            onWriteReview={openPostReview}
          />
        ) : null}

        {currentRoute.name === 'PostReview' ? (
          <UserReviewScreen
            movieId={currentRoute.movieId}
            movieTitle={currentRoute.movieTitle}
            onDone={goBack}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#020617',
    borderBottomWidth: 1,
    borderColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#93c5fd',
    fontWeight: '700',
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 36,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#020617',
    borderTopWidth: 1,
    borderColor: '#1e293b',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 10,
  },
  tab: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabActive: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    color: '#94a3b8',
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#eff6ff',
  },
});

export default AppNavigator;
