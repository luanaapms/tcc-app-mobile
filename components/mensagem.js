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

export default function Mensagem({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.subConteinerChat}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Chat")}
        />
        <View style={styles.icon}>
          <MaterialCommunityIcons name="account-circle" size={60} />
          <Text style={styles.text}>Mãe</Text>
        </View>
      </View>
      <View style={styles.subContainer}>


        <View style={styles.box1}></View>
        <View style={styles.box2}></View>
        <View style={styles.box3}></View>
        
        <View style={styles.containerBoxTxt}>
       
          <TextInput style={styles.boxTxt}
            placeholder='Mensagem'
          >
          </TextInput>
          <View style={styles.iconSend}>
        <MaterialCommunityIcons
              
              name="send"
              size={30}
              color={"#114D9D"}
             right= {30}

              
            />
        </View>
        
        </View>
      </View>
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
    flex: 1,
   
  },
  icon: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 20,
  },
  iconSend: {
    width: "10%",
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 8,
    right: 12,
  },
  subConteinerChat: {
    backgroundColor: "#ADABAA",
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 40,
    paddingTop: 20,
    paddingHorizontal: 20, /* espaçamento horizontal */
  },
  margin: {
    borderColor: "black",
    borderWidth: 1,
    width: "100%" /* horinzontal */,
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  containerBoxTxt: {
    position: 'relative',
    top: '65%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxTxt: {
    backgroundColor: '#11ffee00',
    borderColor: '#99A694',
    borderWidth: 2,
    borderRadius: 70,
    width: '85%',
    height: 65,
    padding: 10,
    margin: 10,
    alignItems: 'flex-end',
  },
  box1: {
    width: '70%',
    height: 60,
    top: '10%',
    backgroundColor: '#11ffee00',
    borderColor: '#99A694',
    borderWidth: 2,
    borderRadius: 70,
  },
  box2: {
    backgroundColor: '#11ffee00',
    borderColor: '#99A694',
    borderWidth: 2,
    borderRadius: 70,
    width: '70%',
    height: 60,
    position: 'absolute',
    top: '25%',
    right: 0,
  },
  box3:{
    width: '70%',
    height: 60,
    top: '30%',
    backgroundColor: '#11ffee00',
    borderColor: '#99A694',
    borderWidth: 2,
    borderRadius: 70,
  }
});
