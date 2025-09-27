import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { getCurrentUserAuth, getUserProfile, updateProfile } from "../services/userService";

export default function ProfileScreen() {
    const [authData, setAuthData] = useState(null); // Dados do Firebase Auth
    const [profile, setProfile] = useState({ telefone: '', fotoUrl: '' }); // Dados do Firestore
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = getCurrentUserAuth();
        if (user) {
            setAuthData(user);
            fetchProfile(user.uid);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchProfile = async (userId) => {
        const data = await getUserProfile(userId);
        setProfile(data);
        setIsLoading(false);
    };

    const handleUpdate = async () => {
        // VERIFICA SE TEM DADOS DE AUTENTICAÇÃO ANTES DE CONTINUAR
        if (!authData || !authData.uid) {
            Alert.alert("Erro", "Usuário não autenticado ou carregando.");
            return;
        }

        setIsLoading(true);
        try {
            // Usa o UID real do usuário logado
            await updateProfile(authData.uid, profile);
            Alert.alert("Sucesso", "Dados atualizados!");
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error); // Adicionei um log para ajudar na depuração
            Alert.alert("Erro", "Falha ao atualizar dados.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={globalStyles.container}>
                <Text style={{ color: '#fff' }}>Carregando Perfil...</Text>
            </View>
        );
    }
    
    // Simula visualização de dados
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>👤 Minha Conta</Text>

            {/* Visualizar E-mail (dado fixo) */}
            <Text style={styles.infoText}>E-mail: {authData ? authData.email : 'N/A'}</Text>
            <Text style={styles.sectionTitle}>Atualizar Dados</Text>

            {/* Campo para Atualizar Telefone */}
            <TextInput
                style={globalStyles.input}
                placeholder="Telefone (Atualizar)"
                placeholderTextColor={colors.textSecondary}
                value={profile.telefone}
                onChangeText={(text) => setProfile({ ...profile, telefone: text })}
                keyboardType="phone-pad"
            />
            
            {/* Botão de Atualização */}
            <TouchableOpacity style={globalStyles.button} onPress={handleUpdate} disabled={isLoading}>
                <Text style={globalStyles.buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Outras Configurações</Text>
            {/* Aqui iriam os botões para Notificações, Senhas, etc. */}
        </View>
    );
}

const styles = StyleSheet.create({
    infoText: {
        color: colors.textSecondary,
        fontSize: 16,
        marginBottom: 10,
    },
    sectionTitle: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        alignSelf: 'flex-start',
        width: '100%',
    }
});