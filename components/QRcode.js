import React, { useState } from 'react';
import { Image } from "expo-image";
import QRCode from 'react-qr-code';
import * as Clipboard from 'expo-clipboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function QRcode({ navigation }) {
  /typedText: variável que será usada para armazenar o texto digitado pelo usuário./
  /*copiedText: variável que será usada para armazenar o texto recuperado da área de transferência.
https://developerplus.com.br/como-copiar-para-area-de-transferencia-no-react-nativeclipboard/
*/
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(8);
  const [clickCount, setClickCount] = useState(0);


  function generatePass() {

    if (clickCount == 0) {
      let pass = '';
      for (let i = 0, n = charset.length; i < size; i++) {
        pass += charset.charAt(Math.floor(Math.random() * n));
      }
      setPassword(pass);
      setClickCount(1)
    }

  };

  /* FUNÇÃO DE CÓPIA */

  /* -- a função password armazena o código criado -- */
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = () => {
    Clipboard.setString(password);
    alert("Texto Copiado!");
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  }

  return (

    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        {" "}
        Compartilhe sua localização com seus amigos e família através do código{" "}
      </Text>

      <StatusBar style="auto" />

      <QRCode
       value={password}
       size={200}
       style={{ height: "auto", maxWidth: "100%", width: "100%", marginBottom:"20",}}
      />
         
    

      <TouchableOpacity style={styles.formButton1}
        onChangeText={password => setPassword(password)}
        defaultValue={password}
        onPress={copyToClipboard} >



        <MaterialCommunityIcons
          name="content-copy"
          size={20}
        />

        <Text style={styles.txtButton1}  >
          {password}
        </Text>

      </TouchableOpacity>

      <MaterialCommunityIcons
        name="key-variant"
        size={30}
        onPress={generatePass}
      />


      <Text style={styles.txt}>
        {" "}
        Clique na chave para gerar um código {" "}
      </Text>

      <Text style={styles.txt1}>
      Você conseguirá compartilhar esse código através de e-mail, mensagem,
      pessoalmente ou até QR Code{" "}
      </Text>

      <TouchableOpacity style={styles.formButton}

        onPress={() => navigation.navigate('Home')} >
        <Text
          style={styles.txtButton}
        >
          {" "}
          Próximo{" "}
        </Text>
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "30%",
    margin: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
  },
  formButton: {
    backgroundColor: "#114D9D",
    width: "80%",
    margin: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  formButton1: {
    backgroundColor: "#FEB74E",
    width: "50%",
    margin: 20,
    padding: 15,
    borderRadius: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 9.11,
    elevation: 14,
    flexDirection: 'row',
  },

  txtButton: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  txtButton1: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  subButton: {
    padding: 0,
  },
  subTxtButton: {
    color: "#FEB74E",
    marginLeft: 120,
    fontSize: 17,
    alignItems: "center",
  },
  txt: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center',
    margin: 10,
    color: "#FEB74E",
  },

  txt1: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
    margin: 15,
    color: "#FEB74E",
  },

});

/*  https://github.com/vespidhook/geradorDeSenha/blob/main/App.js 
    https://www.google.com/search?q=gerador+automatico+de+qrcode+react+native&sca_esv=561038293&ei=ayruZLjdH-nU1sQPkpKCiAo&oq=gerador+autode+qrcode+react+native&gs_lp=Egxnd3Mtd2l6LXNlcnAiImdlcmFkb3IgYXV0b2RlIHFyY29kZSByZWFjdCBuYXRpdmUqAggAMgoQIRigARjDBBgKMgoQIRigARjDBBgKSPEiUK0PWOsTcAF4AZABAJgBiwGgAYQEqgEDMC40uAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICBRAAGKIE4gMEGAAgQYgGAZAGCA&sclient=gws-wiz-serp#fpstate=ive&vld=cid:607565ee,vid:cFaihdXLy5A
*/

/* npm i react-qr-code */