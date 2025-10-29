import React from "react";
// ADICIONE Image e StyleSheet aos imports
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { logoutUser } from "../services/authService";
import { colors } from "../styles/colors";

// Importa a imagem do logo (confirme se o caminho está correto)
const LogoImage = require('../assets/images/logo-vagaja.png');

export default function HomeScreen({ navigation }) {
    const handleLogout = async () => {
        await logoutUser();
        navigation.replace("Login");
    };

    return (
        // Usamos um SafeAreaView aqui para garantir que a logo não fique sob a barra de status
        <SafeAreaView style={styles.safeArea}>
            <View style={[globalStyles.container, styles.homeContainer]}>
                {/* LOGO VAGAJÁ NO TOPO DA TELA */}
                <View style={styles.headerPlaceholder}>
                    <Image
                        source={LogoImage}
                        style={styles.logo}
                    />
                </View>

                {/* BOTÕES DE NAVEGAÇÃO ABAIXO DA LOGO */}
                <View style={styles.buttonGroup}>

                    {/* Minha Conta (Perfil) */}
                    <TouchableOpacity
                        style={[styles.menuButton, { backgroundColor: colors.primary }]}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Text style={styles.buttonTextBlack}>Minha Conta (Perfil)</Text>
                    </TouchableOpacity>

                    {/* Histórico de Reservas */}
                    <TouchableOpacity
                        style={[styles.menuButton, { backgroundColor: '#3498db' }]}
                        onPress={() => navigation.navigate("Historico")}
                    >
                        <Text style={styles.buttonText}>Histórico de Reservas</Text>
                    </TouchableOpacity>

                    {/* Buscar Vagas */}
                    <TouchableOpacity
                        style={[styles.menuButton, { backgroundColor: '#4CAF50' }]}
                        onPress={() => navigation.navigate("Search")}
                    >
                        <Text style={styles.buttonText}>Buscar Vagas</Text>
                    </TouchableOpacity>

                    {/* Cadastrar Vaga */}
                    <TouchableOpacity
                        style={[styles.menuButton, { backgroundColor: colors.primary }]}
                        onPress={() => navigation.navigate("CreateVaga")}
                    >
                        <Text style={styles.buttonTextBlack}>Cadastrar Vaga</Text>
                    </TouchableOpacity>

                    {/* Minhas Vagas */}
                    <TouchableOpacity
                        style={[styles.menuButton, { backgroundColor: '#4CAF50' }]}
                        onPress={() => navigation.navigate("MyVagas")}
                    >
                        <Text style={styles.buttonText}>Minhas Vagas</Text>
                    </TouchableOpacity>

                    {/* Gerenciamento (Dashboard) */}
                    <TouchableOpacity
                        style={[styles.menuButton, { backgroundColor: '#FF8C00' }]}
                        onPress={() => navigation.navigate('Dashboard')}
                    >
                        <Text style={styles.buttonText}>Gerenciamento (Dashboard)</Text>
                    </TouchableOpacity>

                    {/* Botão de Sair */}
                    <TouchableOpacity
                        style={[styles.menuButton, { backgroundColor: '#DC3545' }]}
                        onPress={handleLogout}
                    >
                        <Text style={styles.buttonText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000', // Fundo preto para a área segura
    },
    homeContainer: {
        flex: 1, // Garante que o container ocupe o espaço
        justifyContent: 'flex-start', // Alinha conteúdo ao topo
        alignItems: 'center', // Centraliza itens horizontalmente
        paddingTop: 20, // Espaço no topo, dentro da área segura
    },
    headerPlaceholder: { // View que simula o cabeçalho
        width: '100%',
        height: 60, // Altura similar a um cabeçalho padrão
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30, // Espaço abaixo da logo
    },
    logo: {
        width: 150, // Ajuste a largura conforme desejado
        height: 40, // Ajuste a altura
        resizeMode: 'contain',
    },
    buttonGroup: {
        width: '90%',
        alignItems: 'center',
    },
    menuButton: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextBlack: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});