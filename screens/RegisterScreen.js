import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { registerUser } from "../services/authService";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    await registerUser(email, password);
    Alert.alert("Sucesso", "Conta criada com sucesso!");
    navigation.replace("Login");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Cadastro</Text>

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

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={globalStyles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
