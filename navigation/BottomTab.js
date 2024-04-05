import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Inicial from "../components/inicial";
import Perfil from "../components/perfil";
import Serviços from "../components/servicos";
import Contatos from "../components/contatos";
import Noticias from "../components/noticias";


const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator 
        screenOptions={{ headerShown: false,
         tabBarActiveTintColor: '#FEB74E', }}>
            <Tab.Screen
                name="Inicial"
                component={Inicial}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home"
                            color={color}
                            size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Contatos"
                component={Contatos}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="contacts"
                            color={color}
                            size={26} />
                    ),
                }}

            />
         
            <Tab.Screen
                name="Serviços"
                component={Serviços}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="police-badge-outline"
                            color={color}
                            size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Notícias"
                component={Noticias}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="newspaper-variant"
                            color={color}
                            size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            color={color}
                            size={26} />
                    ),
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTab;