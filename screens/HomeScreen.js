import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { logoutUser } from "../services/authService";

export default function HomeScreen({ navigation }) {
    const handleLogout = async () => {
        await logoutUser();
        navigation.replace("Login");
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Bem-vindo(a)!</Text>

            {/* O NOVO BOTÃO DE PERFIL/MINHA CONTA */}
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('Profile')} // 'Profile' é o nome que está no seu App.js
            >
                <Text style={globalStyles.buttonText}>Minha Conta (Perfil)</Text>
            </TouchableOpacity>

            {/* Botão para o Locatário: Histórico de Reservas */}
            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: '#3498db' }]} // Cor diferente para destaque
                onPress={() => navigation.navigate("Historico")} // Navega para a rota "Historico"
            >
                <Text style={globalStyles.buttonText}>Histórico de Reservas</Text>
            </TouchableOpacity>


            {/* Botão para o Locatário */}
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate("Search")}
            >
                <Text style={globalStyles.buttonText}>Buscar Vagas</Text>
            </TouchableOpacity>

            {/* Botão para o Locador - Cadastrar Vaga */}
            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: "#FFD700" }]}
                onPress={() => navigation.navigate("CreateVaga")}
            >
                <Text style={[globalStyles.buttonText, { color: "#000" }]}>
                    Cadastrar Vaga
                </Text>
            </TouchableOpacity>

            {/* Botão para o Locador - Gerenciar Minhas Vagas */}
            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: "#4CAF50" }]}
                onPress={() => navigation.navigate("MyVagas")}
            >
                <Text style={[globalStyles.buttonText, { color: "#fff" }]}>
                    Minhas Vagas
                </Text>
            </TouchableOpacity>

            {/* BOTÃO PARA ACESSAR O DASHBOARD DE GERENCIAMENTO */}
            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: '#FF8C00' }]} // Laranja
                onPress={() => navigation.navigate('Dashboard')}
            >
                <Text style={[globalStyles.buttonText, { color: '#fff' }]}>
                    Gerenciamento (Dashboard)
                </Text>
            </TouchableOpacity>

            {/* Botão de Sair */}
            <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
                <Text style={globalStyles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}