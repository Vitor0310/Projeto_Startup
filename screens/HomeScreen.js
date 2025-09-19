import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { logoutUser } from "../services/authService";

// screens/HomeScreen.js
// ... (outros imports)

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    // ...
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem-vindo à Home!</Text>

      {/* Botão para o Locatário */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={globalStyles.buttonText}>Buscar Vagas</Text>
      </TouchableOpacity>

      {/* Botão para o Locador - Cadastrar Vaga */}
      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: "#FFD700" }]}
        onPress={() => navigation.navigate("CreateVaga")}
      >
        <Text style={[globalStyles.buttonText, { color: "#000" }]}>
          Cadastrar Vaga
        </Text>
      </TouchableOpacity>

      {/* Botão para o Locador - Gerenciar Minhas Vagas */}
      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: "#4CAF50" }]}
        onPress={() => navigation.navigate("MyVagas")}
      >
        <Text style={[globalStyles.buttonText, { color: "#fff" }]}>
          Minhas Vagas
        </Text>
      </TouchableOpacity>
      
      {/* Botão de Sair */}
      <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
        <Text style={globalStyles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}