import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { getCurrentUserAuth, getUserProfile, updateProfile } from "../services/userService";
import { deleteUserProfile } from "../services/userService";
import { deleteCurrentUserWithReauth } from "../services/authService";

export default function ProfileScreen({ navigation }) {
    const [authData, setAuthData] = useState(null); 
    const [profile, setProfile] = useState({ nome: '', telefone: '', fotoUrl: '' });
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
        setProfile({
            nome: data.nome || '', 
            telefone: data.telefone || '', 
            fotoUrl: data.fotoUrl || ''
        });
        setIsLoading(false);
    };

    const handleUpdate = async () => {
        if (!authData || !authData.uid) {
            Alert.alert("Erro", "Usuário não autenticado ou carregando.");
            return;
        }

        setIsLoading(true);
        try {
            await updateProfile(authData.uid, profile);
            Alert.alert("Sucesso", "Dados atualizados!");
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            Alert.alert("Erro", "Falha ao atualizar dados.");
        } finally {
            setIsLoading(false);
        }
    };

    // A FUNÇÃO FOI MODIFICADA PARA APENAS NAVEGAR PARA A TELA DE CONFIRMAÇÃO
    const handleDeleteAccount = () => {
        if (!authData || !authData.uid) {
            Alert.alert("Erro", "Sessão inválida. Por favor, faça login novamente.");
            return;
        }

        // NAVEGA PARA A TELA DE CONFIRMAÇÃO QUE VAI PEDIR A SENHA
        navigation.navigate('DeleteConfirmation', { authData: authData });
    };

    // <--- O CÓDIGO DA LÓGICA DO COMPONENTE ENCERRA AQUI.
    // O RESTANTE É A ESTRUTURA VISUAL:

    if (isLoading) {
        return (
            <View style={globalStyles.container}>
                <Text style={{ color: '#fff' }}>Carregando Perfil...</Text>
            </View>
        );
    }
    
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>👤 Minha Conta</Text>

            <Text style={styles.infoText}>E-mail: {authData ? authData.email : 'N/A'}</Text>
            <Text style={styles.sectionTitle}>Atualizar Dados</Text>

            {/* Campo para Atualizar NOME */}
            <TextInput
                style={globalStyles.input}
                placeholder="Nome Completo (Atualizar)"
                placeholderTextColor={colors.textSecondary}
                value={profile.nome}
                onChangeText={(text) => setProfile({ ...profile, nome: text })}
            />
            
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
            
            {/* LINK PARA TROCA DE SENHA */}
            <TouchableOpacity 
                style={{ width: '100%', paddingVertical: 10 }}
                onPress={() => navigation.navigate('UpdatePassword')}
            >
                <Text style={globalStyles.link}>Trocar Senha</Text>
            </TouchableOpacity>

            {/* NOVO LINK PARA AJUDA E SUPORTE */}
            <TouchableOpacity 
                style={{ width: '100%', paddingVertical: 10 }}
                onPress={() => navigation.navigate('Support')}
            >
                <Text style={globalStyles.link}>Ajuda e Suporte</Text>
            </TouchableOpacity>
            
            {/* BOTÃO DE EXCLUIR CONTA */}
            <TouchableOpacity 
                onPress={handleDeleteAccount} // <-- CHAMA A FUNÇÃO DE NAVEGAÇÃO
                disabled={isLoading}
                style={{ width: '100%', paddingVertical: 10, marginTop: 40 }}
            >
                <Text style={[globalStyles.link, { color: '#DC3545' }]}>
                    Excluir Minha Conta
                </Text>
            </TouchableOpacity>
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