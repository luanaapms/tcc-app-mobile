import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from "react-native";

import AsyncStorage_ID from "@react-native-async-storage/async-storage"; // instalar
/* termos e condições */
export default function Perfil({ navigation }) {
  function termos() {
    Alert.alert("Termos e Políticas de Segurança"," \n 1. Política de Acesso e Controle de Identidade: Apenas usuários autorizados devem ter acesso aos sistemas e dados, com revisões regulares. \n2. Política de Senhas: Usuários devem criar senhas fortes, trocá-las regularmente e ativar autenticação de dois fatores.\n 3. Política de Segurança de Redes: Implementar medidas como firewalls, detecção de intrusão e criptografia, além de manter o software atualizado. \n 4. Política de Gerenciamento de Dispositivos: Proteger todos os dispositivos com senhas ou autenticação biométrica e manter um inventário atualizado. \n 5. Política de Conscientização e Treinamento: Fornecer treinamento regular sobre segurança, incluindo reconhecimento de phishing e proteção de informações confidenciais.\n 6. Política de Backup e Recuperação de Dados: Realizar backups regulares e testar procedimentos de recuperação de dados. \n 7. Política de Uso Aceitável: Definir regras claras sobre o uso de recursos da organização, como internet e e-mail.");
  }

  const [cd_usuario, setCdUsuario] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [acess, setAcess] = useState(false);
  const [msg, setMsg] = useState("");


 


  useEffect(() => {
    async function recuperarId() {
      const value = await AsyncStorage_ID.getItem("UsuariosInfo");
      setCdUsuario(value);
    }
    recuperarId();
    getInformacoesBD();
  }, [cd_usuario]);

  async function getInformacoesBD() {
    setLoading(true);
    var url = "https://tccspa.000webhostapp.com/informacoesPerfil.php";
    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      alert("Tempo de espera para busca de informações excedido");
    }, timeOut);
    const resposta = fetch(url, {
      method: "POST", //tipo de requisição
      body: JSON.stringify({ cd_usuario: cd_usuario }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        timeout && clearTimeout(timeout);
        if (!wasServerTimeout) {
          return response.json();
        }
      })
      .then((responseJson) => {
        // Recolhendo as informações do banco de dados e salvando nas váriaveis
        setEmail(responseJson.usuarios[0].email);
        setNome(responseJson.usuarios[0].nome);
        setTelefone(responseJson.usuarios[0].telefone);
        setSenha(responseJson.usuarios[0].senha);
      })
      //se ocorrer erro na requisição ou conversão
      .catch((error) => {
        timeout && clearTimeout(timeout);
        if (!wasServerTimeout) {
          Alert.alert("Alerta!", "Tempo de espera do servidor excedido!");
        }
      });
    setLoading(false);
  }

  async function excluir() {
    if (cd_usuario > 0) {
      setLoading(true);
  
      var url = 'https://tccspa.000webhostapp.com/excluir.php';
  
      var wasServerTimeout = false;
      var timeout = setTimeout(() => {
        wasServerTimeout = true;
        alert('Tempo de espera para busca de informações excedido');
      }, timeOut);
  
      const resposta = await fetch(url, {
        method: 'POST', //tipo de requisição
        body: JSON.stringify({
          cd_usuario: cd_usuario,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          timeout && clearTimeout(timeout); 
          if (!wasServerTimeout) {
            return response.json();
          }
        })
        .then((responseJson) => {
          // limpa o formulário
          setCdUsuario(0);
          setNome('');
          setEmail('');
          setSenha('');
          setTelefone('');

          alert(JSON.stringify(responseJson.informacoes[0].msg));
          navigation.navigate("Cadastro");

        })
        //se ocorrer erro na requisição ou conversãok
        .catch((error) => {
          timeout && clearTimeout(timeout);
          if (!wasServerTimeout) {
            //Error logic here
          }
  
          //  alert('erro'+error) 
        });
  
      setLoading(false);
    } else alert('Realizar consulta');
    /* alert("teste som");*/
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <MaterialCommunityIcons
            name="account-circle"
            size={70}
            alignItems="center"
            justifyContent="center"
          />
          <Text style={styles.font}>{nome}</Text>
        </View>

        <View style={styles.formInput}>
          <Text style={styles.subTxtButton}>{nome}</Text>
        </View>

        {/* passagem de informações */}
        <View style={styles.formInput}>
          <Text style={styles.subTxtButton}>{email}</Text>
        </View>
        {/*
        <TextInput
          style={styles.formInput}
          secureTextEntry
          autoCapitalize="none"
          placeholder="Senha"
          autoComplete="password"
          value={senha}
        />
        */}
        <View style={styles.formInput}>
          <Text style={styles.subTxtButton}>{senha}</Text>
        </View>

        <View style={styles.formInput}>
          <Text style={styles.subTxtButton}>{telefone}</Text>
        </View>

        <Pressable style={styles.formInput}>
          <Text style={styles.subTxtButton} onPress={() => termos()}>
            <MaterialCommunityIcons name="police-badge" size={20}   />
            Termos e Condições
          </Text>
        </Pressable>
        <Pressable style={styles.formInput}>
          <Text style={styles.subTxtButton} onPress={() => termos()}>
            <MaterialCommunityIcons name="account-group-outline" size={25}   />
            Sobre
          </Text>
        </Pressable>

        <View style={styles.formInput}>
          <Pressable style={styles.subButton}>
            <Text
              style={styles.subTxtButton}
              /*onPress={() => navigation.navigate("Cadastro")}*/

              onPress={() => excluir()}
            >
              <MaterialCommunityIcons name="account-remove" size={20} /> Apagar
              Perfil{" "}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
/* roda pé: https://www.youtube.com/watch?v=AnjyzruZ36E */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  subContainer: {
    backgroundColor: "#114D9D",
    height: "19%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    borderColor: "black",
    backgroundColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    width: "90%",
    padding: 10,
    margin: 10,
   
  },

  subButton: {
    padding: 5,
  },
  subTxtButton: {
    color: "#424242",
    fontSize: 20,
    alignItems: "center",
    paddingLeft:7,
   },

  font: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});
