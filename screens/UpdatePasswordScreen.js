import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { changePassword } from "../services/authService";

export default function UpdatePasswordScreen({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
            return;
        }
        if (newPassword.length < 6) {
             Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setIsLoading(true);
        try {
            await changePassword(currentPassword, newPassword);
            Alert.alert("Sucesso", "Senha alterada com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>🔒 Trocar Senha</Text>

            <TextInput
                style={globalStyles.input}
                placeholder="Senha Atual"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                editable={!isLoading}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Nova Senha"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!isLoading}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Confirmar Nova Senha"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!isLoading}
            />

            <TouchableOpacity 
                style={globalStyles.button} 
                onPress={handleChangePassword} 
                disabled={isLoading}
            >
                <Text style={globalStyles.buttonText}>Trocar Senha</Text>
            </TouchableOpacity>
        </View>
    );
}