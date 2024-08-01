import React, { useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Article } from "../models/Article";

const { height } = Dimensions.get('window');

interface ReadArticleProps {
    article: Article,
    animHeight: any,
    slideDown: () => void
}

export default function ReadArticle(props: ReadArticleProps) {
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return gestureState.dy > 20;
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 50) props.slideDown();
            },
        })
    ).current;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.detailView,
                {
                    transform: [{ translateY: props.animHeight }],
                },
            ]}
        >
            <WebView source={{ uri: `https://amp.scroll.in/article/${props.article.id}/abc?source=headlines` }}></WebView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    detailView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height,
        backgroundColor: 'white',
        zIndex: 1000,
    }
});
