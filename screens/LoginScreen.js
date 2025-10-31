import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { loginUser, loginWithGoogle } from "../services/authService";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Para feedback visual

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha e-mail e senha.");
            return;
        }
        setIsLoading(true);
        
        try {
            const user = await loginUser(email, password); 
            
            if (user) {
                // CORREÇÃO AQUI: Navega para "Home"
                navigation.replace("MainApp"); 
            }
        } catch (error) {
            Alert.alert("Erro de Login", error.message);
        } finally {
            setIsLoading(false); 
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const user = await loginWithGoogle(); // (Atualmente é mock)
            if (user) {
                // CORREÇÃO AQUI: Navega para "Home"
                navigation.replace("Home");
            }
        } catch (error) {
             Alert.alert("Erro Google Login", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // ... (Restante do código JSX, que já estava correto)
    
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Login</Text>

            <TextInput
                style={globalStyles.input}
                placeholder="E-mail"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
            />

            <TextInput
                style={globalStyles.input}
                placeholder="Senha"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
            />

            <TouchableOpacity
                style={[globalStyles.button, isLoading && { opacity: 0.5 }]}
                onPress={handleLogin}
                disabled={isLoading}
            >
                <Text style={globalStyles.buttonText}>{isLoading ? 'Entrando...' : 'Entrar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: "#DB4437" }, isLoading && { opacity: 0.5 }]}
                onPress={handleGoogleLogin}
                disabled={isLoading}
            >
                <Text style={[globalStyles.buttonText, { color: "#fff" }]}>
                    Entrar com Google
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("RecuperarSenha")} disabled={isLoading}>
                <Text style={globalStyles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")} disabled={isLoading}>
                <Text style={globalStyles.link}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
}