import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getAllVagas } from "../services/vagaService"; // Importe o serviço de vagas

export default function MyVagasScreen({ navigation }) {
  const [myVagas, setMyVagas] = useState([]);

  useEffect(() => {
    // Em um app real, você buscaria apenas as vagas do usuário logado.
    // Por enquanto, vamos simular buscando todas as vagas.
    const vagasDoLocador = getAllVagas();
    setMyVagas(vagasDoLocador);
  }, []);

  const handleDeleteVaga = (vagaId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta vaga?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            // Lógica de exclusão simulada. Em um app real, você chamaria o Firebase.
            setMyVagas(myVagas.filter(vaga => vaga.id !== vagaId));
            Alert.alert("Sucesso", "Vaga excluída com sucesso.");
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.vagaCard}>
      <Text style={styles.vagaNome}>{item.nome}</Text>
      <Text style={styles.vagaEndereco}>{item.endereco}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[globalStyles.button, styles.actionButton]}
          onPress={() => Alert.alert("Editar", "Funcionalidade de edição em desenvolvimento.")}
        >
          <Text style={globalStyles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[globalStyles.button, styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteVaga(item.id)}
        >
          <Text style={globalStyles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={globalStyles.title}>Minhas Vagas</Text>
      {myVagas.length > 0 ? (
        <FlatList
          data={myVagas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      ) : (
        <Text style={styles.noVagasText}>Você não tem vagas cadastradas.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  list: {
    width: "100%",
  },
  vagaCard: {
    backgroundColor: "#1C1C1C",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333333",
  },
  vagaNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
  },
  vagaEndereco: {
    color: "#AAAAAA",
    marginTop: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#007BFF',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  noVagasText: {
    color: "#AAAAAA",
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});