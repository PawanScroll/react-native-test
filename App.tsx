import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated
} from 'react-native';

import { Article } from './models/Article';
import { useArticleStore } from './store/articleStore';

import ArticleTile from './components/ArticleTile'
import ReadArticle from './components/ReadArticle';


const { width, height } = Dimensions.get('window');

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const articles = useArticleStore((state) => state.articles);
  const fetch = useArticleStore((state) => state.fetchArticles);
  fetch();

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedArticle(null));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal pagingEnabled style={styles.scrollContainer}>
        {articles.map((item, index) => {
          return (
            <View key={index} style={{ width }}>
              <ArticleTile
                article={item}
                onPress={() => {
                  setSelectedArticle(item);
                  slideUp();
                }} />
            </View>
          );
        })}
      </ScrollView>
      {selectedArticle && 
        <ReadArticle 
          article={selectedArticle} 
          animHeight={slideAnim}
          slideDown={slideDown}
        />}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
  },
  drawerButton: {
    padding: 10,
  },
  drawerText: {
    fontSize: 24,
  },
  scrollContainer: {
    flex: 1,
  },
});
