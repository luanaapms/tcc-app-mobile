import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage_ID from "@react-native-async-storage/async-storage"; // instalar

export default function Login({ navigation }) {
  const [input, setImput] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const [cd_usuario, setCdUsuario] = useState(0);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [timeOut, setTimeOut] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [acess, setAcess] = useState(false);
  const [msg, setMsg] = useState("");

  /* login */

  const SalvarIdUsuario = (key, value) => {
    AsyncStorage_ID.setItem(key, value);
  };
  async function logar() {
    setLoading(true);
    var url = "https://tccspa.000webhostapp.com/login.php";

    var wasServerTimeout = false;
    var timeout = setTimeout(() => {
      wasServerTimeout = true;
      alert("Tempo de espera para busca de informações excedido");
    }, timeOut);

    const resposta = await fetch(url, {
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
        if (email !== "" && senha !== "") {
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
                navigation.navigate("Home");
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
      //se ocorrer erro na requisição ou conversão
      .catch((error) => {
        timeout && clearTimeout(timeout);
        if (!wasServerTimeout) {
          //Error logic here
        }

        //  alert('erro'+error)
      });

    setLoading(false);

    /*     alert('ook')
     */
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}> Conecte-se </Text>
      <StatusBar style="auto" />

      <Text style={{ fontSize: 25 }}>E-mail:</Text>
      <TextInput
        style={styles.formInput}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        maxLength={40}
        placeholder="Digite seu e-mail..."
        onChangeText={(texto) => setEmail(texto)}
        value={email}
      />
      <Text style={{ fontSize: 25 }}>Senha:</Text>

      <View style={styles.AreaInput}>
        <TextInput
          style={styles.formInput}
          secureTextEntry={hidePass}
          placeholder="Digite sua senha..."
          value={senha}
          maxLength={20}
          onChangeText={(texto) => setSenha(texto)}
        />

        <TouchableOpacity
          style={styles.Icon}
          onPress={() => setHidePass(!hidePass)}
        >
          {hidePass ? (
            <Ionicons name="eye" color="black" size={25} />
          ) : (
            <Ionicons name="eye-off" color="black" size={25} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.formButton} onPress={() => logar()}>
        <Text style={styles.txtButton}> Entrar </Text>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}>
          <Text style={styles.subTxtButton}> Esqueceu sua senha? </Text>
        </Pressable>
      </View>

      <View style={styles.subContainer}>
        <Pressable
          style={styles.subButton}
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.subTxtButton}> Inscrever-se </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  txtTitle: {
    fontSize: 50,
    fontWeight: "bold",
    margin: 40,
  },
  AreaInput: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 22,
    width: "85%",
    padding: 10,
    margin: 10,
    height: 50,
  },
  formButton: {
    backgroundColor: "#114D9D",
    width: "80%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  txtButton: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  subButton: {
    padding: 10,
  },
  subTxtButton: {
    color: "#FEB74E",
    marginLeft: 50,
    fontSize: 20,
    alignItems: "center",
    fontWeight: "bold",
  },
  Icon: {
    width: "15%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 2,
    right: 30,
  },
});
