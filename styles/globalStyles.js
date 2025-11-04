// styles/globalStyles.js
import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fundo escuro padrão
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary, // Títulos em amarelo
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    // Corrigido para o protótipo (inputs cinza escuro)
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 15, // Mais padding interno
    marginBottom: 15,
    color: colors.text, // Texto digitado em branco
    borderWidth: 0, // Sem borda, como no protótipo
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary, // Botão principal em amarelo
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#000", // Texto do botão principal em preto
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: colors.link, // Links em amarelo
    marginTop: 10,
    textDecorationLine: "underline",
  },
});