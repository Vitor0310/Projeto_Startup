// navigation/AppDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

// Importe as telas que estarão no menu lateral
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SupportScreen from '../screens/SupportScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="Home" // A tela principal agora é a Home
            screenOptions={{
                headerShown: false, // O header será customizado dentro de cada tela
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: colors.textSecondary,
                drawerStyle: {
                    backgroundColor: colors.inputBackground,
                    paddingTop: 20,
                },
                drawerLabelStyle: {
                    marginLeft: 15, // <--- O ajuste que você fez
                    fontSize: 16,
                },
            }}
        >
            {/* Telas que aparecerão no menu */}
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Início',
                    drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                }}
            />
             <Drawer.Screen
                name="SearchDrawer" // Rota para Busca
                component={SearchScreen}
                options={{
                    title: 'Buscar Vagas',
                    drawerIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="HistoricoDrawer" // Rota para Histórico
                component={HistoricoScreen}
                options={{
                    title: 'Histórico',
                    drawerIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
                }}
            />
             <Drawer.Screen
                name="ProfileDrawer" // Rota para Perfil
                component={ProfileScreen}
                options={{
                    title: 'Meu Perfil',
                    drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="DashboardDrawer" // Rota para Dashboard
                component={DashboardScreen}
                options={{
                    title: 'Dashboard',
                    drawerIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="SupportDrawer" // Rota para Suporte
                component={SupportScreen}
                options={{
                    title: 'Suporte',
                    drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
                }}
            />
        </Drawer.Navigator>
    );
}