// navigation/AppDrawer.js
import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
// Imports para o Drawer Personalizado
import {
    createDrawerNavigator,
    DrawerContentScrollView, // Permite rolagem no conteúdo do menu
    DrawerItemList,         // Renderiza os itens de tela padrão (Home, Perfil, etc.)
    DrawerItem              // Usado para criar botões customizados (Sair, Cadastrar Vaga)
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Imports de Estilos e Serviços
import { colors } from '../styles/colors';
import { logoutUser } from '../services/authService';

// Import das Telas que estarão no menu
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SupportScreen from '../screens/SupportScreen';
import MyVagasScreen from '../screens/MyVagasScreen';

const Drawer = createDrawerNavigator();

// --- 1. O COMPONENTE DE CONTEÚDO PERSONALIZADO ---
// Este componente define o visual e as ações do menu
function CustomDrawerContent(props) {
    const navigation = useNavigation(); // Hook para navegar

    // Função para Sair
    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await logoutUser();
                            // Reseta a navegação de volta para a tela de Login
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível sair.");
                        }
                    }
                }
            ]
        );
    };

    return (
        // Container rolável que preenche a tela
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, paddingTop: 0 }}>
            <View style={{ flex: 1 }}>
                {/* Renderiza os itens normais (Home, Perfil, etc.) definidos no AppDrawer abaixo */}
                <DrawerItemList {...props} />

                {/* BOTÃO "CADASTRAR VAGA" ADICIONADO MANUALMENTE */}
                <DrawerItem
                    label="Cadastrar Vaga"
                    labelStyle={styles.drawerLabel}
                    icon={({ color, size }) => (
                        <Ionicons name="add-circle-outline" size={size} color={colors.textSecondary} />
                    )}
                    onPress={() => navigation.navigate('CreateVaga')} // Navega para a tela da Stack principal
                />
            </View>

            {/* Seção de Logout (fixa no final) */}
            <View style={styles.logoutSection}>
                <DrawerItem
                    label="Sair"
                    labelStyle={styles.logoutLabel}
                    icon={({ color, size }) => (
                        <Ionicons name="log-out-outline" size={size} color={'#DC3545'} />
                    )}
                    onPress={handleLogout}
                />
            </View>
        </DrawerContentScrollView>
    );
}

// --- 2. O COMPONENTE AppDrawer PRINCIPAL ---
// Agora ele usa o 'drawerContent' personalizado
export default function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            // DIZ AO DRAWER PARA USAR NOSSO COMPONENTE PERSONALIZADO
            drawerContent={(props) => <CustomDrawerContent {...props} />}

            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: colors.textSecondary,
                drawerStyle: {
                    backgroundColor: colors.inputBackground,
                },
                drawerLabelStyle: {
                    marginLeft: 15, // Ajuste que você fez
                    fontSize: 16,
                },
            }}
        >
            {/* Lista de telas que o DrawerItemList vai renderizar */}
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Início', drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }}
            />
            <Drawer.Screen
                name="SearchDrawer"
                component={SearchScreen}
                options={{ title: 'Buscar Vagas', drawerIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} /> }}
            />
            <Drawer.Screen
                name="MyVagasDrawer"
                component={MyVagasScreen}
                options={{ title: 'Minhas Vagas', drawerIcon: ({ color, size }) => <Ionicons name="car-sport-outline" size={size} color={color} /> }}
            />
            <Drawer.Screen
                name="HistoricoDrawer"
                component={HistoricoScreen}
                options={{ title: 'Histórico', drawerIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} /> }}
            />
            <Drawer.Screen
                name="ProfileDrawer"
                component={ProfileScreen}
                options={{ title: 'Meu Perfil', drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }}
            />
            <Drawer.Screen
                name="DashboardDrawer"
                component={DashboardScreen}
                options={{ title: 'Dashboard', drawerIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" size={size} color={color} /> }}
            />
            <Drawer.Screen
                name="SupportDrawer"
                component={SupportScreen}
                options={{ title: 'Suporte', drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} /> }}
            />
            {/* A tela 'Cadastrar Vaga' não está mais aqui, pois foi movida para o CustomDrawerContent */}
        </Drawer.Navigator>
    );
}

// Estilos para o menu personalizado
const styles = StyleSheet.create({
    logoutSection: { // Estilo para o container do botão Sair
        borderTopWidth: 1,
        borderTopColor: colors.border,
        marginBottom: 10,
    },
    drawerLabel: { // Estilo para o botão Cadastrar Vaga
        color: colors.textSecondary,
        fontSize: 16,
        marginLeft: 15
    },
    logoutLabel: { // Estilo para o botão Sair
        color: '#DC3545',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 15
    }
});