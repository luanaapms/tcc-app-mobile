import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Chat({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.subConteinerChat}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={"white"}
          onPress={() => navigation.navigate("Inicial")}
        />
        <Text style={styles.text}>Chat</Text>
        <MaterialCommunityIcons name="dots-vertical" size={30} color={"white"} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("mensagem")}>
      <View style={styles.subContainer}>
        <View style={styles.img}>
          <MaterialCommunityIcons
            name="account-circle"
            size={70}
            alignItems="center"
            justifyContent="center"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.txtnome}> Pai </Text>
        </View>
      </View>
      </TouchableOpacity>

      <View style={styles.margin}></View>

      <TouchableOpacity onPress={() => navigation.navigate("mensagem")}>
      <View style={styles.subContainer}>
        <View style={styles.img}>
          <MaterialCommunityIcons
            name="account-circle"
            size={70}
            alignItems="center"
            justifyContent="center"
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.txtnome}> Mãe </Text>
        </View>
      </View>
      </TouchableOpacity>

      <View style={styles.margin}></View>

      <TouchableOpacity onPress={() => navigation.navigate("mensagem")}>
        <View style={styles.subContainer}>
          <View style={styles.img}>
            <MaterialCommunityIcons
              name="account-circle"
              size={70}
              alignItems="center"
              justifyContent="center"
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.txtnome}> Irmã </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.margin}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    gap: 2,
    backgroundColor: "#fff",
  },
  subContainer: {
    /*flexDirection: 'column',   */
    width: "100%" /* horinzontal */,
    height: 150 /* vertical */,
    flexDirection: "row",
  },
  subConteinerChat: {
    backgroundColor: "#FEB74E",
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 130,
  },
  margin: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%" /* horinzontal */,
    marginTop: -80,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  img: {
    /*flexDirection: 'column',   */
  },

  font: {
    color: "black",
    fontSize: 35,
    marginTop: 20,
  },
  txtnome: {
    flexDirection: "row",
    display: "flex",
    fontSize: 30,
  },
  txtnumero: {
    flexDirection: "row",
    display: "flex",
    fontSize: 20,
  },
  subContainerbutton: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    margin: 30,
  },
  button: {
    backgroundColor: "#114D9D",
    width: 55,
    height: 55,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});
