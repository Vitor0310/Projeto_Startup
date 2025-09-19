// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import das telas
import LoginScreen from "./screens/LoginScreen";
import RecuperarSenhaScreen from "./screens/RecuperarSenhaScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import BuscarVagasScreen from "./screens/BuscarVagasScreen";
import HistoricoScreen from "./screens/HistoricoScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import DetailsScreen from "./screens/DetailsScreen";
import CreateVagaScreen from "./screens/CreateVagaScreen";
import MyVagasScreen from "./screens/MyVagasScreen";
import BookingScreen from "./screens/BookingScreen";
import MapScreen from "./screens/MapScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BuscarVagas" component={BuscarVagasScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreateVaga" component={CreateVagaScreen} />
        <Stack.Screen name="MyVagas" component={MyVagasScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}