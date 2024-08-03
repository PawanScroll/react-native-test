import React, { useState } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    Animated,
    Pressable,
    Text,
    StatusBar
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Article } from "../models/Article";

const { height, width } = Dimensions.get('window');

interface ReadArticleProps {
    article: Article,
    animHeight: any,
    slideDown: () => void   
}

export default function ReadArticle(props: ReadArticleProps) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Animated.View
            style={[
                styles.detailView,
                {
                    transform: [{ translateY: props.animHeight }],
                },
            ]}
        >
            <Pressable style={styles.closeButton} onPress={props.slideDown}>
                <Text style={styles.closeText}>x</Text>
            </Pressable>
            <WebView
                onLoadEnd={() => setLoading(false)}
                source={{ uri: `https://amp.scroll.in/article/${props.article.id}/abc?source=headlines` }}>
            </WebView>
            {isLoading && <ActivityIndicator
                style={{ position: "absolute", top: height / 1.9, left: width / 2.1 }}
                size="large"
            />}
        </Animated.View>
    );
}

const trueHeight = height + (StatusBar.currentHeight ?? 0);

const styles = StyleSheet.create({
    detailView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: (StatusBar.currentHeight ?? 0),
        height: trueHeight,
        backgroundColor: 'white',
        zIndex: 10,
    },
    closeButton: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: '#403d35',
        padding: 5,
        position: 'absolute',
        bottom: 30,
        right: 30,
        zIndex: 100,
    },
    closeText: {
        fontSize: 42,
        lineHeight: 46,
        color: 'white'
    }
});
