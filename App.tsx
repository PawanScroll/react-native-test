import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Pressable,
  Text,
  StatusBar,
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
  const slideAnim = useRef(new Animated.Value(height));
  const scrollRef = useRef<FlatList | null>(null);

  const articles = useArticleStore((state) => state.articles);
  const isLoading = useArticleStore((state) => state.isLoading);
  const fetch = useArticleStore((state) => state.fetchArticles);
  const udpate = useArticleStore((state) => state.updateArticles);

  useEffect(() => {
    fetch();
  }, [])

  const slideUp = () => {
    Animated.timing(slideAnim.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim.current, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedArticle(null));
  };

  const onLogoPress = () => {
    scrollRef.current?.scrollToIndex({
      index: 0,
      animated: true
    });
    fetch();
  }

  return (
    <View>
      {!isLoading ? <View>
        <FlatList
          data={articles}
          pagingEnabled={true}
          horizontal={true}
          ref={scrollRef}
          onEndReached={udpate}
          onEndReachedThreshold={5}
          keyExtractor={article => String(article.index)}
          renderItem={({ item }) => {
            return (
              <View style={{ width }}>
                <ArticleTile
                  article={item}
                  onPress={() => {
                    setSelectedArticle(item);
                    slideUp();
                  }} />
              </View>
            )
          }}
        />
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
            <Text style={styles.menuText}>☰</Text>
          </Pressable>
        </View>
      </View>
        : <Text style={styles.loadingText}>Loading</Text>}
      {selectedArticle &&
        <ReadArticle
          article={selectedArticle}
          animHeight={slideAnim.current}
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
    height: (StatusBar.currentHeight ?? 0) + 150,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logo: {
    flex: 1,
    height: 80,
    paddingVertical: 20
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  menu: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuText: {
    fontSize: 32
  },
  loadingText: {
    marginTop: 200,
    textAlign: 'center',
  }
});
