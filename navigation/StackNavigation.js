import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";

import Cadastro from "../components/cadastro";
import Login from "../components/login";
import BV from "../components/telabv";
import Instrucoes from "../components/instrucoes";
import QRcode from "../components/QRcode";
import chat from "../components/chat";
import Mensagem from "../components/mensagem";
import BottomTab from './BottomTab';
import Inicial from '../components/inicial';
import Informativa from '../components/informativa';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />

        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />

        <Stack.Screen
          name="Home"
          component={BottomTab}
          options={{
            title: "",
            headerTransparent: false,
            headerLeft: null,
            headerTintColor: "#fff",
            headerFontSize: "300px",
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#114D9D", height: 0 },
            headerTitleStyle: { backgroundColor: "#114D9D", fontSize: 30 },
          }}
        />

        <Stack.Screen
          name="Bem Vindo"
          component={BV}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />

        <Stack.Screen
          name="Informativa"
          component={Informativa}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />

        <Stack.Screen
          name="Instruções"
          component={Instrucoes}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />

        <Stack.Screen
          name="QRcode"
          component={QRcode}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />
        <Stack.Screen
          name="inicial"
          component={Inicial}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />
         <Stack.Screen
          name="Chat"
          component={chat}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />
        <Stack.Screen
          name="mensagem"
          component={Mensagem}
          options={{ title: "", headerTransparent: true, headerLeft: null }}
        />

        
      </Stack.Navigator>
  );
}

export default StackNavigator;