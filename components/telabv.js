import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BV({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.txtTitle}> Seja bem-vindo(a)! </Text>
            <Text style={styles.txt}> Seja bem-vindo ao SPA, um aplicativo feito para garantir sua segurança e preservação pessoal. </Text>
            <StatusBar style="auto" />

            <Image
                style={styles.image}
                source={require('../assets/bv.png')}
            />

            <TouchableOpacity style={styles.formButton}
            onPress={() => navigation.navigate('Informativa')}>
                <Text style={styles.txtButton} > Começar </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 60,
        color: '#FEB74E',

    },
    formButton: {
        backgroundColor: '#114D9D',
        width: '80%',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    txtButton: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    subButton: {
        padding: 10,
    },
    subTxtButton: {
        color: '#FEB74E',
        marginLeft: 50,
        fontSize: 17,
        alignItems: 'center',
    },
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 25,
    },
});