import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { Article } from "../models/Article";


const { height } = Dimensions.get('window');

interface ReadArticleProps {
    article: Article,
    animHeight: any,
    slideDown: () => void
}

export default function ReadArticle(props: ReadArticleProps) {
    return (
        <Animated.View
            style={[
                styles.detailView,
                {
                    transform: [{ translateY: props.animHeight }],
                },
            ]}
        >
            <View style={styles.detailContent}>
                <Text style={styles.detailTitle}>{props.article.title}</Text>
                <Text style={styles.detailText}>{props.article.summary}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={props.slideDown}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
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
    },
    detailContent: {
        flex: 1,
        padding: 20,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});