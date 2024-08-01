import { View, StatusBar, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
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
            <TouchableOpacity onPress={props.onPress} style={[styles.slide, { backgroundColor }]}>
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
                    <TouchableOpacity style={styles.shareButton}>
                        <Text style={styles.shareText}>Share this story</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            : <Text>Loading</Text>
    );
}

const styles = StyleSheet.create({
    slide: {
        width: width,
        height: height + (StatusBar.currentHeight ?? 0)
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    imageContainer: {
        flex: 1,
        paddingTop: 50,
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1.5,
        padding: 20,
        alignItems: 'baseline',
        justifyContent: 'flex-start',
    },
    topicTitle: {
        fontSize: 16,
        color: '#f8f7ff',
        fontFamily: 'Poppins_300Light',
        paddingBottom: 10,
        textTransform: 'uppercase',
        textDecorationLine: 'underline'
    },
    title: {
        fontSize: 30,
        fontFamily: 'Poppins_700Bold',
        // fontWeight: 'bold',
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
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: 'hsla(0,0%,100%,.1)',
        padding: 20,
        position: 'absolute',
        bottom: 40,
        left: width / 3,
        borderRadius: 30,
    },
    shareText: {
        fontSize: 14,
        fontFamily: 'Poppins_300Light',
        color: '#fff',
    },
});
