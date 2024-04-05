import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
  Platform,
  Linking,
} from "react-native";

export default function Noticias({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.subConteinerChat}>
        <Text style={styles.text}> Notícias </Text>
      </View>

      <TouchableOpacity onPress={() =>Linking.openURL('http://www.corpodebombeiros.sp.gov.br/')}>
      <View style={styles.subContainer}>
        <View style={styles.img}>
          <MaterialCommunityIcons
            name="fire-truck"
            size={60}
            alignItems="center"
            justifyContent="center"
            paddingLeft={10}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.txtnome}> Corpo de Bombeiros </Text>
        </View>
      </View>
      </TouchableOpacity>

      <View style={styles.margin}></View>

      <TouchableOpacity onPress={() =>Linking.openURL('https://www.policiacivil.sp.gov.br/')}>
      <View style={styles.subContainer}>
        <View style={styles.img}>
          <MaterialCommunityIcons
            name="police-station"
            size={60}
            alignItems="center"
            justifyContent="center"
            paddingLeft={10}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.txtnome}> Polícia Civil </Text>
        </View>
      </View>
      </TouchableOpacity>

      <View style={styles.margin}></View>

      <TouchableOpacity onPress={() =>Linking.openURL('https://samues.com.br/')}>
        <View style={styles.subContainer}>
          <View style={styles.img}>
            <MaterialCommunityIcons
              name="ambulance"
              size={60}
              alignItems="center"
              justifyContent="center"
              paddingLeft={10}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.txtnome}> SAMU </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.margin}></View>
      <TouchableOpacity onPress={() =>Linking.openURL('https://cvv.org.br/')}>
        <View style={styles.subContainer}>
          <View style={styles.img}>
            <MaterialCommunityIcons
              name="phone-in-talk"
              size={60}
              alignItems="center"
              justifyContent="center"
              paddingLeft={10}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.txtnome}> CVV </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.margin}></View>

      <TouchableOpacity onPress={() =>Linking.openURL('https://conectesus-paciente.saude.gov.br/login')}>
        <View style={styles.subContainer}>
          <View style={styles.img}>
            <MaterialCommunityIcons
              name="hospital-box"
              size={60}
              alignItems="center"
              justifyContent="center"
              paddingLeft={10}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.txtnome}> SUS </Text>
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
    height: 180 /* vertical */,
    flexDirection: "row",
  },
  subConteinerChat: {
    backgroundColor: "#114D9D",
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
    marginTop: -70,
  },
  text: {
    color: "#fff",
    fontSize: 32,
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
    fontSize: 32,
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
