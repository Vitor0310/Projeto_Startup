// screens/PerfilScreen.js
import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function ProfileScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>👤 Meu Perfil</Text>
    </View>
  );
}
