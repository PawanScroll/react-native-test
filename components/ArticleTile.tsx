import { Share, StatusBar, View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'timeago.js';
import {
    useFonts,
    Poppins_700Bold,
    Poppins_300Light,
    Poppins_500Medium
} from '@expo-google-fonts/poppins'

import { Article } from '../models/Article';

const { width, height } = Dimensions.get('window');

interface ArticleTileProps {
    article: Article;
    onPress: () => void;
}

export default function ArticleTile(props: ArticleTileProps) {
    let [fontsLoaded] = useFonts({ Poppins_700Bold, Poppins_300Light, Poppins_500Medium });

    const bgc = props.article.background_color;
    const backgroundColor = `rgb(${bgc.join(',')})`;
    const AuthorText = `${props.article.authors[0].name} . ${format(props.article.authors[0].created, 'en-IN')}`;
    return (
        fontsLoaded ?
            <View style={[styles.slide, { backgroundColor }]}>
                <Pressable onPress={props.onPress} style={{ display: 'flex' }} >
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: props.article.cover.large }} style={styles.image} />
                        <LinearGradient
                            colors={[
                                `rgba(${bgc.join(',')}, 0)`,
                                `rgba(${bgc.join(',')}, 0)`,
                                `rgba(${bgc.join(',')}, 0)`,
                                `rgba(${bgc.join(',')}, 0.5)`,
                                `rgba(${bgc.join(',')}, 1)`,
                            ]}
                            style={styles.gradient}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.topicTitle}>{props.article.topic.title}</Text>
                        <Text style={styles.title}>{props.article.title}</Text>
                        <Text style={styles.subtitle}>{props.article.summary}</Text>
                        <Text style={styles.authorText}>{AuthorText}</Text>
                    </View>
                    <View style={styles.shareButtonContainer}>
                        <Pressable
                            style={styles.shareButton}
                            onPress={() => {
                                Share.share({
                                    message: `${props.article.title}. Link: ${props.article.permalink}`
                                })
                            }}
                        >
                            <Text style={styles.shareText}>Share this story</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </View>
            : <Text>Loading</Text>
    );
}

const trueHeight = height + (StatusBar.currentHeight ?? 0);

const styles = StyleSheet.create({
    slide: {
        width: width,
        height: trueHeight
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    imageContainer: {
        height: (trueHeight * 2) / 5,
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 20,
        height: (trueHeight) / 2,
        justifyContent: 'flex-start',
    },
    topicTitle: {
        fontSize: 16,
        color: '#f8f7ff',
        fontFamily: 'Poppins_700Bold',
        paddingBottom: 10,
        textTransform: 'uppercase',
        textDecorationLine: 'underline'
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins_700Bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Poppins_500Medium',
        color: '#f8f7ff',
        marginBottom: 25,
    },
    authorText: {
        fontSize: 14,
        fontFamily: 'Poppins_300Light',
        color: '#f8f7ff',
        marginBottom: 20
    },
    shareButton: {
        backgroundColor: 'hsla(0,0%,100%,.1)',
        padding: 20,

        position: 'absolute',
        bottom: 20,
        left: width / 3,
        borderRadius: 30,
    },
    shareText: {
        fontSize: 14,
        fontFamily: 'Poppins_300Light',
        color: '#fff',
    },
    shareButtonContainer: {
        height: (trueHeight) / 10,
    }
});
