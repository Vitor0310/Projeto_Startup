// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from 'react-native-safe-area-context';

// Import das telas (TODAS)
import LoginScreen from "./screens/LoginScreen";
import RecuperarSenhaScreen from "./screens/RecuperarSenhaScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
// import BuscarVagasScreen from "./screens/BuscarVagasScreen"; // Usa SearchScreen
import HistoricoScreen from "./screens/HistoricoScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import DetailsScreen from "./screens/DetailsScreen";
import CreateVagaScreen from "./screens/CreateVagaScreen";
import MyVagasScreen from "./screens/MyVagasScreen";
import BookingScreen from "./screens/BookingScreen";
import MapScreen from "./screens/MapScreen";
import UpdatePasswordScreen from "./screens/UpdatePasswordScreen";
import DeleteConfirmationScreen from "./screens/DeleteConfirmationScreen";
import EditVagaScreen from "./screens/EditVagaScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SupportScreen from "./screens/SupportScreen";

// REMOVIDO: import LogoHeader from "./components/LogoHeader";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ // Define o cabeçalho globalmente
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#FFD700',
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
          }}
        >
          {/* Pilha de Autenticação */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} options={{ headerShown: false }} />

          {/* Tela Home (SEM CABEÇALHO PADRÃO, pois a logo está DENTRO dela) */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} // <-- Garante que o header padrão não apareça
          />

          {/* Telas com Cabeçalho Padrão */}
          <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Buscar Vagas' }} />
          <Stack.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Meu Perfil' }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes da Vaga' }} />
          <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Reservar Vaga' }} />
          <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Localização' }} />
          <Stack.Screen name="CreateVaga" component={CreateVagaScreen} options={{ title: 'Cadastrar Vaga' }} />
          <Stack.Screen name="EditVaga" component={EditVagaScreen} options={{ title: 'Editar Vaga' }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
          <Stack.Screen name="Support" component={SupportScreen} options={{ title: 'Suporte' }} />
          <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} options={{ title: 'Trocar Senha' }} />
          <Stack.Screen name="DeleteConfirmation" component={DeleteConfirmationScreen} options={{ title: 'Excluir Conta' }} />
          <Stack.Screen name="MyVagas" component={MyVagasScreen} options={{ title: 'Minhas Vagas' }} />
          <Stack.Screen name="BuscarVagas" component={SearchScreen} options={{ title: 'Buscar Vagas' }} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}