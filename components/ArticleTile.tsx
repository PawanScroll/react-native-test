import { View, StatusBar, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Article } from '../models/Article';

const { width, height } = Dimensions.get('window');

interface ArticleTileProps {
    article: Article;
    onPress: () => void;
}

export default function ArticleTile(props: ArticleTileProps) {
    const bgc = props.article.background_color;
    const backgroundColor = `rgb(${bgc.join(',')})`;
    return (
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
                <Text style={styles.title}>{props.article.title}</Text>
                <Text style={styles.subtitle}>{props.article.summary}</Text>
                <Text style={styles.author}>{props.article.authors[0].name}</Text>
                <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareText}>Share this story</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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
        marginTop: -200,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    author: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    shareText: {
        color: '#fff',
    },
});
