import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { loginUser, loginWithGoogle } from "../services/authService";

// 1. Importa a logo (com textura interna e fundo transparente)
const LogoImage = require('../assets/images/logo_icon_textured.png');
// 2. Importa a textura de fundo (limpa)
const BackgroundImage = require('../assets/images/dark_texture_v2.png');

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // ... (suas funções handleLogin e handleGoogleLogin não mudam) ...
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha e-mail e senha.");
            return;
        }
        setIsLoading(true);
        try {
            const user = await loginUser(email, password);
            if (user) {
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
            const user = await loginWithGoogle();
            if (user) {
                navigation.replace("MainApp");
            }
        } catch (error) {
            Alert.alert("Erro Google Login", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ImageBackground
                source={BackgroundImage}
                style={localStyles.background}
                resizeMode="cover" // Garante que a textura cubra a tela
            >
                {/* Usamos o globalStyles.container para centralizar e adicionar padding */}
                <View style={[globalStyles.container, localStyles.contentContainer]}>

                    <Image
                        source={LogoImage} // Usa a logo correta
                        style={localStyles.logo}
                    />

                    <Text style={globalStyles.title}>Login</Text>

                    <TextInput
                        style={globalStyles.input} // Usa o input cinza escuro do globalStyles
                        placeholder="E-mail"
                        placeholderTextColor={colors.textSecondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isLoading}
                    />

                    <TextInput
                        style={globalStyles.input} // Usa o input cinza escuro do globalStyles
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
                        style={[globalStyles.button, { backgroundColor: colors.buttonGoogle }, isLoading && { opacity: 0.5 }]}
                        onPress={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        <Text style={[globalStyles.buttonText, { color: "#fff" }]}>
                            Entrar com Google
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("RecuperaSenha")} disabled={isLoading}>
                        <Text style={globalStyles.link}>Esqueci minha senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Register")} disabled={isLoading}>
                        <Text style={globalStyles.link}>Criar conta</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const localStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        backgroundColor: 'transparent', // Garante que o container não sobreponha a textura
        justifyContent: 'center',
    },
    logo: {
        width: 150, // Tamanho ideal para o ícone
        height: 150, // Proporção 1:1
        resizeMode: 'contain',
        marginBottom: 20,
    },
});