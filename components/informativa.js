import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Informativa({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.txtTitle}> Informações </Text>
            <Text style={styles.txt}>No smartphone, abra o app Configurações e siga os seguintes passos:</Text>
            <Text style={styles.txt1}> 
            <Text style={styles.txt2}>  1. </Text>
            <Text style={styles.txt1}> Toque em Segurança e emergência SOS de emergência. {'\n'} </Text>
            <Text style={styles.txt2}>  2. </Text> 
            <Text style={styles.txt1}>No canto inferior direito, toque em Iniciar configuração. {'\n'} </Text>
            <Text style={styles.txt2}>  3. </Text> Se você precisar de ajuda, o smartphone poderá iniciar ações de emergência. {'\n'} </Text>

            <StatusBar style="auto" />

            <Image
                style={styles.image}
                source={require('../assets/lista.png')}
            />

            <TouchableOpacity style={styles.formButton}
            onPress={() => navigation.navigate('Instruções')}>
                <Text style={styles.txtButton} > Continuar </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
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
        fontSize: 20,
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
        fontSize: 17,
        fontWeight: 'bold',
        margin: 20,
        color: 'black'
    },
    txt1: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 17,
    },
    txt2: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 17,
        color: '#FEB74E'
    },
});