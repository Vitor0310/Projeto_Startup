import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getAllVagas } from "../services/vagaService";
import { colors } from "../styles/colors";

export default function SearchScreen({ navigation }) {
    const [allVagas, setAllVagas] = useState([]);
    const [filteredVagas, setFilteredVagas] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchVagas = async () => {
            const vagasDisponiveis = await getAllVagas();
            setAllVagas(vagasDisponiveis);
            setFilteredVagas(vagasDisponiveis);
        };
        fetchVagas();
    }, []);

    useEffect(() => {
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
            style={styles.vagaCard} // Usaremos o novo estilo
            onPress={() => navigation.navigate("Details", { vagaId: item.id })}
        >
            {/* Adiciona a Imagem */}
            <Image
                // Usa a primeira foto do array 'fotos', ou uma imagem padrão se não houver fotos
                source={{ uri: (item.fotos && item.fotos.length > 0) ? item.fotos[0] : 'https://via.placeholder.com/100x80.png?text=Vaga' }}
                style={styles.vagaImage}
            />
            {/* View para organizar o texto */}
            <View style={styles.vagaInfoContainer}>
                <Text style={styles.vagaNome}>{item.nome}</Text>
                <Text style={styles.vagaEndereco}>{item.endereco}</Text>
                <Text style={styles.vagaPreco}>R$ {item.precoPorHora.toFixed(2)} / hora</Text>
            </View>
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

// screens/SearchScreen.js (NOVO BLOCO DE ESTILOS)

const styles = StyleSheet.create({
    container: {
        // paddingTop: 50, // Removido ou ajustado se necessário pelo SafeAreaView
    },
    list: {
        width: "100%",
        paddingTop: 10, // Espaço acima da lista
    },
    // ESTILOS DO CARTÃO ATUALIZADOS
    vagaCard: {
        flexDirection: 'row', // Imagem e texto lado a lado
        backgroundColor: colors.inputBackground, // Fundo mais escuro
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden', // Garante que a imagem não ultrapasse as bordas arredondadas
        // Sombra (opcional, mais visível no iOS)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3, // Elevação para Android
    },
    vagaImage: {
        width: 100, // Largura fixa para a imagem
        height: 80, // Altura fixa
        resizeMode: 'cover', // Garante que a imagem cubra o espaço
    },
    vagaInfoContainer: {
        flex: 1, // Ocupa o espaço restante ao lado da imagem
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center', // Centraliza o texto verticalmente
    },
    vagaNome: {
        fontSize: 16, // Um pouco menor para caber melhor
        fontWeight: "bold",
        color: colors.primary, // Amarelo
        marginBottom: 4, // Espaço abaixo do nome
    },
    vagaEndereco: {
        fontSize: 13, // Menor para informações secundárias
        color: colors.textSecondary,
        marginBottom: 6, // Espaço abaixo do endereço
    },
    vagaPreco: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.text, // Branco
    },
    noResultsText: {
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});