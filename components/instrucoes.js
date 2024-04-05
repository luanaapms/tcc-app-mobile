import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Instrucoes({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>
        {" "}
        Adicione lugares que você visita regularmente{" "}
      </Text>
      <Text style={styles.txt}> Como trabalho, escola e casa </Text>
      <StatusBar style="auto" />
      <View style={styles.containerInput} >
      <Ionicons name="location" color="black" size={25} />
        <TextInput
          style={styles.formInput}
          keyboardType="web-search"
          autoCapitalize="none"
          autoComplete="street-address"
          placeholder="Pesquise por nome ou endereço..."
        />
        </View>
        <Image style={styles.image} source={require("../assets/instru.png")} />
    

      <TouchableOpacity
        style={styles.formButton}
        onPress={() => navigation.navigate("QRcode")}
      >
        <Text style={styles.txtButton}> Próximo </Text>
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}>
          <Text
            style={styles.subTxtButton}
            onPress={() => navigation.navigate("Home")}
          >
            {" "}
            Agora não{" "}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "80%",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txtTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 60,
    textAlign: "center",
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
    fontSize: 22,
    fontWeight: "bold",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  subButton: {
    padding: 10,
  },
  subTxtButton: {
    color: "#FEB74E",
    marginLeft: 50,
    fontSize: 17,
    textAlign: "center",
  },
  txt: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 25,
  },
  formInput: {
    fontSize: 20,
    
  },
  containerInput:{
    flexDirection: 'row',
  }
 
});
