import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { deleteUserProfile } from "../services/userService";
import { deleteCurrentUserWithReauth } from "../services/authService";

export default function DeleteConfirmationScreen({ navigation, route }) {
    // Recebe os dados de autenticação do usuário
    const { authData } = route.params; 
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmDelete = async () => {
        if (!password) {
            Alert.alert("Atenção", "A senha é obrigatória para a exclusão.");
            return;
        }

        setIsLoading(true);
        try {
            const userId = authData.uid;

            // 1. Excluir o documento de perfil (Firestore)
            await deleteUserProfile(userId);

            // 2. Excluir o usuário do Auth, usando a senha para reautenticar
            await deleteCurrentUserWithReauth(password); 

            Alert.alert("Sucesso", "Conta excluída permanentemente.");
            navigation.replace("Login");
        } catch (error) {
            // Exibe o erro específico do serviço (ex: senha incorreta)
            Alert.alert("Erro", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Confirmação Final</Text>
            <Text style={[globalStyles.link, { color: colors.textSecondary, marginBottom: 20 }]}>
                Por segurança, digite sua senha para confirmar a exclusão.
            </Text>

            <TextInput
                style={globalStyles.input}
                placeholder="Sua Senha Atual"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
            />

            <TouchableOpacity 
                style={[globalStyles.button, { backgroundColor: '#DC3545', marginTop: 20 }]}
                onPress={handleConfirmDelete}
                disabled={isLoading}
            >
                <Text style={globalStyles.buttonText}>Excluir Minha Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={globalStyles.link}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}