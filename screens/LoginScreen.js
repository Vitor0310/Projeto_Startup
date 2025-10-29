import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { loginUser, loginWithGoogle } from "../services/authService";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const user = await loginUser(email, password);
        if (user) {
            navigation.replace("Home");
        } else {
            Alert.alert("Erro", "E-mail ou senha inválidos");
        }
    };

    const handleGoogleLogin = async () => {
        const user = await loginWithGoogle();
        if (user) {
            Alert.alert("Sucesso", `Logado como ${user.email}`);
            navigation.replace("Home");
        }
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Login</Text>

            <TextInput
                style={globalStyles.input}
                placeholder="E-mail"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={globalStyles.input}
                placeholder="Senha"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
                <Text style={globalStyles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: "#DB4437" }]}
                onPress={handleGoogleLogin}
            >
                <Text style={[globalStyles.buttonText, { color: "#fff" }]}>
                    Entrar com Google
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("RecuperarSenha")}>
                <Text style={globalStyles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={globalStyles.link}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
}