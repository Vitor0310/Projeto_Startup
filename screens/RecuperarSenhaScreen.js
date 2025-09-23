import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";

export default function RecuperarSenhaScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleRecover = () => {
    if (!email) {
      Alert.alert("Erro", "Digite um e-mail válido.");
      return;
    }
    Alert.alert("Sucesso", "Um link de recuperação foi enviado para seu e-mail.");
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Recuperar Senha</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleRecover}>
        <Text style={globalStyles.buttonText}>Enviar link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={globalStyles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}