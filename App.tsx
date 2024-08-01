import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Pressable,
  Text,
} from 'react-native';

import { Article } from './models/Article';
import { useArticleStore } from './store/articleStore';

import ArticleTile from './components/ArticleTile'
import ReadArticle from './components/ReadArticle';
import MenuModal from './components/MenuModal';


export default function App() {
  const { width, height } = Dimensions.get('window');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showModal, setShowModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const articles = useArticleStore((state) => state.articles);
  const fetch = useArticleStore((state) => state.fetchArticles);

  useEffect(() => {
    fetch();
  }, [])

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

  const onLogoPress = () => {
    // Scroll to beginning
    // fetch latest
  }

  return (
    <View>
      <ScrollView horizontal pagingEnabled >
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
      <View style={styles.layout}>
        <Pressable style={styles.logo} onPress={onLogoPress}>
          <Image
            style={styles.logoImage}
            source={{ uri: 'https://scroll.in/static/assets/favicon.5f31c86209ff21c26b68aabf47772769.003.png' }}>
          </Image>
        </Pressable>
        <Pressable
          style={styles.menu}
          onPress={() => { setShowModal(true) }}>
          {/* TODO: Add icons */}
          <Text>Menu</Text>
        </Pressable>
      </View>
      {selectedArticle &&
        <ReadArticle
          article={selectedArticle}
          animHeight={slideAnim}
          slideDown={slideDown}
        />}
      {showModal &&
        <MenuModal
          closeModal={() => setShowModal(false)}
        />
      }
    </View>
  );
};


const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 170,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    flex: 1,
  },
  logoImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  menu: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
