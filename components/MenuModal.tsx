import {
    View,
    Image,
    Linking,
    Modal,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    Pressable
} from 'react-native';

interface MenuModalProps {
    closeModal: () => void
}

export default function MenuModal(props: MenuModalProps) {
    return (
        <Modal onRequestClose={props.closeModal} animationType='slide'>
            <ImageBackground
                source={require('../assets/menu-bg.png')}
                style={styles.header}
                imageStyle={styles.imageBG}
            >
                <Pressable
                    style={styles.closeBtn}
                    onPress={props.closeModal}>
                    <Text style={styles.closeIcon}>X</Text>
                </Pressable>
                <View style={styles.info}>
                    <Image
                        style={styles.menulogo}
                        source={{ uri: 'https://scroll.in/static/assets/favicon.5f31c86209ff21c26b68aabf47772769.003.png' }}>
                    </Image>
                    <Text style={styles.title}>Headlines</Text>
                    <Text style={styles.description}>
                        Swipe to prepare yourself for the day's conversations by tracking what's happening
                        in the world of politics, sports, entertainment and more.
                    </Text>
                </View>
            </ImageBackground>

            <View style={styles.links}>
                <TouchableOpacity onPress={() => Linking.openURL('https://scroll.in/privacy')}>
                    <Text style={styles.link}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://scroll.in/terms')}>
                    <Text style={styles.link}>Terms Of Use</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:support@scroll.in')}>
                    <Text style={styles.contact}>Contact Us</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: '#F0E6D6',
        overflow: 'hidden'
    },
    imageBG: {
        height: 800,
        width: 800,
        position: 'absolute',
        top: -400,
        left: 100
    },
    info: {
        alignItems: 'baseline',
        margin: 20,
        marginTop: 30
    },
    menulogo: {
        height: 60,
        width: 60,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10
    },
    title: {
        fontSize: 46,
        marginTop: 20,
        fontWeight: '900',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'left',
        color: '#6C6C6C',
    },
    links: {
        flex: 1,
        alignItems: 'center',
    },
    link: {
        fontSize: 18,
        color: '#007BFF',
        marginVertical: 10,
    },
    contact: {
        fontSize: 18,
        color: '#007BFF',
        marginVertical: 10,
    },
    closeBtn: {
        width: "100%",
        height: 50,
        alignItems: 'flex-end'
    },
    closeIcon: {
        borderColor: 'black',
        borderWidth: 2,
        margin: 20,
        height: 40,
        width: 40,
        borderRadius: 5,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    }

});
