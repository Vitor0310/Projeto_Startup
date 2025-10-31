// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from 'react-native-safe-area-context';

// Import das telas de Autenticação
import LoginScreen from "./screens/LoginScreen";
import RecuperarSenhaScreen from "./screens/RecuperarSenhaScreen";
import RegisterScreen from "./screens/RegisterScreen";

// Import das telas SECUNDÁRIAS (aquelas fora do Drawer)
import DetailsScreen from "./screens/DetailsScreen";
import BookingScreen from "./screens/BookingScreen";
import MapScreen from "./screens/MapScreen";
import CreateVagaScreen from "./screens/CreateVagaScreen";
import EditVagaScreen from "./screens/EditVagaScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import DeleteConfirmationScreen from "./screens/DeleteConfirmationScreen";
import MyVagasScreen from "./screens/MyVagasScreen";
import SearchScreen from "./screens/SearchScreen";

// Import do NAVEGADOR DRAWER
import AppDrawer from "./navigation/AppDrawer"; // <-- Importa o menu lateral

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#FFD700',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}
        >
          {/* 1. PILHA DE AUTENTICAÇÃO */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} options={{ headerShown: false }} />

          {/* 2. NAVEGADOR PRINCIPAL (DRAWER) */}
          <Stack.Screen
            name="MainApp" // Rota que contém o Drawer
            component={AppDrawer} // Componente que define o Drawer
            options={{ headerShown: false }}
          />

          {/* 3. TELAS SECUNDÁRIAS (ACESSADAS DE DENTRO DO DRAWER/HOME) */}
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes da Vaga' }} />
          <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Reservar Vaga' }} />
          <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Localização' }} />
          <Stack.Screen name="CreateVaga" component={CreateVagaScreen} options={{ title: 'Cadastrar Vaga' }} />
          <Stack.Screen name="EditVaga" component={EditVagaScreen} options={{ title: 'Editar Vaga' }} />
          <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} options={{ title: 'Trocar Senha' }} />
          <Stack.Screen name="DeleteConfirmation" component={DeleteConfirmationScreen} options={{ title: 'Excluir Conta' }} />
          <Stack.Screen name="MyVagas" component={MyVagasScreen} options={{ title: 'Minhas Vagas' }} />

          {/* Rota antiga (se algum botão ainda usar) */}
          <Stack.Screen name="BuscarVagas" component={SearchScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}