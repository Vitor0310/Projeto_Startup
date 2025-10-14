import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // <--- IMPORT CRUCIAL
import { globalStyles } from "../styles/globalStyles";
import { getAllVagas } from "../services/vagaService"; 

export default function MyVagasScreen({ navigation }) {
  const [myVagas, setMyVagas] = useState([]);

  useFocusEffect(
        useCallback(() => {
            const fetchVagas = async () => {
                // Em um app real, você buscaria apenas as vagas do usuário logado.
                const vagasDoLocador = await getAllVagas(); // <- Agora é assíncrono
                setMyVagas(vagasDoLocador);
            };
            
            fetchVagas();
            
            // O código de cleanup (retorno) é opcional aqui, mas é uma boa prática
            return () => {}; 
        }, [])
    );

  const handleDeleteVaga = (vagaId) => {
    Alert.alert(
        "Confirmar Exclusão",
        "Tem certeza que deseja excluir esta vaga?",
        [
            // ...
            {
                text: "Excluir",
                style: "destructive",
                onPress: async () => { // <-- A função deve ser 'async'
                    try {
                        // 1. Excluir no Firebase (chamada assíncrona)
                        // await deleteVaga(vagaId); // <--- Você precisará criar esta função
                        
                        // Por enquanto, apenas o filtro do mock para que o app não quebre
                        setMyVagas(myVagas.filter(vaga => vaga.id !== vagaId));
                        
                        Alert.alert("Sucesso", "Vaga excluída com sucesso.");
                        
                        // 2. FORÇA O RECARREGAMENTO DE DADOS AQUI (opcional se usar useFocusEffect)
                        // A lista será recarregada automaticamente pelo useFocusEffect quando a tela voltar ao foco, mas...
                        // se a lógica de exclusão for feita aqui, o useFocusEffect já fará o trabalho!

                    } catch(error) {
                        Alert.alert("Erro", "Falha ao excluir vaga: " + error.message);
                    }
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
          onPress={() => navigation.navigate("EditVaga", { vagaId:item.id })}>
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