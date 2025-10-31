import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { getCurrentUserAuth, getUserProfile } from '../services/userService';

export default function HomeScreen({ navigation }) { // Navigation agora vem do Drawer
    const [userName, setUserName] = useState('');
    // const [userPhotoUrl, setUserPhotoUrl] = useState(null); // Para a foto real no futuro

    useEffect(() => {
        const fetchUserData = async () => {
            const user = getCurrentUserAuth();
            if (user) {
                try {
                    const profileData = await getUserProfile(user.uid);
                    setUserName(profileData.nome || user.email || 'Usuário');
                } catch (error) {
                     setUserName(user.email || 'Usuário'); 
                }
            }
        };
        fetchUserData();
    }, []); 

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Cabeçalho Fixo Simulado */}
            <View style={styles.customHeader}>
                {/* Ícone/Foto do Perfil - GATILHO PARA ABRIR O DRAWER */}
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.avatarButton}>
                    <Ionicons name="person-circle-outline" size={40} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Olá, {userName}!</Text>
            </View>

            {/* Conteúdo Principal da Home */}
            <View style={styles.contentContainer}>
                <Text style={styles.mainTitle}>Bem-vindo ao VagaJá!</Text>
                <Text style={styles.subTitle}>Encontre ou ofereça sua vaga rapidamente.</Text>
                
                 <TouchableOpacity
                    style={[globalStyles.button, styles.mainActionButton]}
                    onPress={() => navigation.navigate("SearchDrawer")} // <-- Navega para a rota do Drawer
                >
                    <Text style={globalStyles.buttonText}>Encontrar Vaga Agora</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Estilos
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background, 
    },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 60, 
        backgroundColor: colors.inputBackground, 
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    avatarButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: 40,
    },
    mainActionButton: {
        marginTop: 20,
        backgroundColor: colors.primary, 
        width: '80%',
    },
});