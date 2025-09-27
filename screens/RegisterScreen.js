import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { registerUser } from "../services/authService";
import { updateProfile } from "../services/userService"; // <--- NOVO IMPORT

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState(""); // Novo estado para o nome (para ter um campo a mais)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState(""); // <--- NOVO ESTADO

  const handleRegister = async () => {
    if (!email || !password || !nome || !telefone) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
        // 1. Registro do usuário no Firebase Auth
        const user = await registerUser(email, password); 
        
        if (user) {
            // 2. CRIAÇÃO DO PERFIL NO FIRESTORE USANDO O UID REAL DO FIREBASE
            const userId = user.uid; // <-- AGORA É O UID REAL
            
            await updateProfile(userId, { 
                nome,
                telefone,
            });
            
            Alert.alert("Sucesso", "Conta criada com sucesso!");
            navigation.replace("Login");
        }
    } catch (error) {
        // Captura erros de autenticação e os exibe
        Alert.alert("Erro de Cadastro", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro</Text>
    
      <TextInput
        style={globalStyles.input}
        placeholder="Nome Completo"
        placeholderTextColor={colors.textSecondary}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="E-mail"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Telefone"
        placeholderTextColor={colors.textSecondary}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Senha"
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={globalStyles.link}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}