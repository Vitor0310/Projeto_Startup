import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getAllVagas } from "../services/vagaService";
import { colors } from "../styles/colors";

export default function SearchScreen({ navigation }) {
  const [allVagas, setAllVagas] = useState([]); // A lista completa de vagas
  const [filteredVagas, setFilteredVagas] = useState([]); // A lista filtrada para exibição
  const [searchQuery, setSearchQuery] = useState(""); // O texto do campo de busca

  useEffect(() => {
    // Carrega as vagas do nosso serviço mock apenas uma vez
    const vagasDisponiveis = getAllVagas();
    setAllVagas(vagasDisponiveis);
    setFilteredVagas(vagasDisponiveis);
  }, []);

  useEffect(() => {
    // Filtra as vagas sempre que o texto de busca mudar
    if (searchQuery === "") {
      setFilteredVagas(allVagas);
    } else {
      const filtered = allVagas.filter(vaga => 
        vaga.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
        vaga.endereco.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVagas(filtered);
    }
  }, [searchQuery, allVagas]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.vagaCard} 
      onPress={() => navigation.navigate("Details", { vagaId: item.id })}
    >
      <Text style={styles.vagaNome}>{item.nome}</Text>
      <Text style={styles.vagaEndereco}>{item.endereco}</Text>
      <Text style={styles.vagaPreco}>R$ {item.precoPorHora.toFixed(2)} / hora</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[globalStyles.container, styles.container]}>
      <TextInput
        style={globalStyles.input}
        placeholder="Buscar vagas por nome ou endereço..."
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={globalStyles.title}>Vagas Disponíveis</Text>
      <FlatList
        data={filteredVagas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={() => (
          <Text style={styles.noResultsText}>Nenhuma vaga encontrada.</Text>
        )}
      />
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
  },
  vagaPreco: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 10,
  },
  noResultsText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});