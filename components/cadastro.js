import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text, TextInput, TouchableOpacity, View, Alert
} from 'react-native';
import AsyncStorage_ID from "@react-native-async-storage/async-storage"; // instalar


export default function Cadastro({ navigation }) {
  const [input, setImput] = useState('');
  const [hidePass, setHidePass] = useState(true);


  /* passagem de parametros 
   const FirstPage = ({ navigation }) => {
     const [nome, setNome] = useState('');
     const [sobrenome, setSobrenome] = useState('');
     const [idade, setidade] = useState('');
   } */



  /* BANCO DE DADOS */
  const [cd_usuario, setcd_usuario] = useState(0);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');



  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [acess, setAcess] = useState(false);
  const [msg, setMsg] = useState('');

  const SalvarIdUsuario = (key, value) => {
    AsyncStorage_ID.setItem(key, value);
  };

  async function cadastrar() {
    setLoading(true);
    var url = 'https://tccspa.000webhostapp.com/cadastro.php';

    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      alert('Tempo de espera para busca de informações excedido');
    }, timeOut);

    const resposta = await fetch(url, {
      method: 'POST', //tipo de requisição
      body: JSON.stringify({ nome: nome, senha: senha, email: email, telefone: telefone }),
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
        /* /* se houver informações */
        if (email !== '' && senha !== '' && email !== '' && telefone !== '' && nome !== '') {
          if (responseJson.informacoes[0].cd_usuario == 0) {
            alert("Informação não econtrada!");
            setCdUsuario(0);
          } else {
            var url = "https://tccspa.000webhostapp.com/informacoes.php";
            var wasServerTimeout = false;
            var timeout = setTimeout(() => {
              wasServerTimeout = true;
              alert("Tempo de espera para busca de informações excedido");
            }, timeOut);
            alert('Cadastro Concluido com Sucesso');
            navigation.navigate('Bem Vindo');
            const resposta = fetch(url, {
              method: "POST", //tipo de requisição
              body: JSON.stringify({ email: email, senha: senha }),
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
                /* se houver informações */
                var UsuarioInfos = (responseJson.usuarios[0].cd_usuario);
                SalvarIdUsuario('UsuariosInfo', UsuarioInfos);
                setCdUsuario(UsuarioInfos);

              })

              //se ocorrer erro na requisição ou conversão
              .catch((error) => {
                timeout && clearTimeout(timeout);
                if (!wasServerTimeout) {
                  //Error logic here
                }

                //  alert('erro'+error)
              });
          }
        } else {
          alert("Informações não inseridas!");
        }
      })
      //se ocorrer erro na requisição ou conversão */
      .catch((error) => {
        timeout && clearTimeout(timeout);
        if (!wasServerTimeout) {
          //Error logic here
        }

        alert('erro' + error)
      });

    setLoading(false);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}> Inscrever-se </Text>
      <StatusBar style="auto" />

      <Text style={styles.txtSubTitle}>
        E-mail:
      </Text>
      <TextInput style={styles.formInput}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder='Digite seu e-mail...'
        autoComplete="email"
        onChangeText={(texto) => setEmail(texto)}
        value={email}

      />
      <Text style={styles.txtSubTitle}>
        Senha:
      </Text>
      <View style={styles.AreaInput} >

        <TextInput
          style={styles.formInput}
          secureTextEntry={hidePass}
          placeholder='Digite sua senha...'
          maxLength={20}
          onChangeText={(texto) => setSenha(texto)}
          value={senha}
        />


        <TouchableOpacity style={styles.Icon}
          onPress={() => setHidePass(!hidePass)}>
          {hidePass ?
            <Ionicons name="eye" color="black" size={25} />
            :
            <Ionicons name="eye-off" color="black" size={25} />
          }
        </TouchableOpacity>



      </View>

      <Text style={styles.txtSubTitle}>
        Nome Completo:
      </Text>
      <TextInput style={styles.formInput}
        autoCapitalize="none"
        placeholder='Digite seu nome completo...'
        autoComplete="name"
        onChangeText={(texto) => setNome(texto)}
        value={nome}

      />

      <Text style={styles.txtSubTitle}>
        Telefone:
      </Text>
      <TextInput style={styles.formInput}
        autoCapitalize="none"
        placeholder='Digite seu número de telefone...'
        autoComplete="tel"
        dataDetectorTypes="phoneNumber"
        keyboardType="numeric"
        maxLength={16}
        onChangeText={(texto) => setTelefone(texto)}
        value={telefone}

      />

      <TouchableOpacity style={styles.formButton}
        onPress={() => cadastrar()}

      >
        <Text style={styles.txtButton}> Entrar </Text>
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.subTxtButton} > Já possui uma conta?</Text>
        </Pressable>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    margin: 40,
  },
  txtSubTitle: {
    fontSize: 20,
    left: 0,
  },
  formInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 22,
    width: '90%',
    height: 50,
    padding: 10,
    margin: 10,
  },
  AreaInput: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Icon: {
    width: "15%",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    right: 12,
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
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
  },
});