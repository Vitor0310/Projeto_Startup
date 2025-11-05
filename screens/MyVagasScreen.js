import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Image } from "react-native";
import { getVagasByOwner } from "../services/vagaService";
import { useFocusEffect } from "@react-navigation/native";

import { globalStyles } from "../styles/globalStyles";
import { getAllVagas, deleteVaga } from "../services/vagaService";
import { colors } from "../styles/colors";
import { getCurrentUserAuth } from "../services/userService";


export default function MyVagasScreen({ navigation }) {
    const [myVagas, setMyVagas] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const fetchVagas = async () => {
                const user = getCurrentUserAuth();
                if (user) {
                    // MUDE AQUI: Chama a função que filtra pelo ID do dono
                    const vagasDoLocador = await getVagasByOwner(user.uid);
                    setMyVagas(vagasDoLocador);
                }
            };
            fetchVagas();
            return () => { };
        }, [])
    );

    const handleDeleteVaga = (vagaId) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir esta vaga permanentemente?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => { // <-- A função deve ser 'async'
                        try {
                            // CHAMA A FUNÇÃO REAL DE EXCLUSÃO DO FIREBASE
                            await deleteVaga(vagaId);

                            // 1. Atualiza a lista no estado (melhora a UX antes do useFocusEffect recarregar)
                            setMyVagas(myVagas.filter(vaga => vaga.id !== vagaId));

                            Alert.alert("Sucesso", "Vaga excluída com sucesso.");

                            // O useFocusEffect cuidará do recarregamento total se o usuário sair e voltar

                        } catch (error) {
                            Alert.alert("Erro", "Falha ao excluir vaga: " + error.message);
                        }
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.vagaCard}> {/* Usaremos o novo estilo */}
            {/* Adiciona a Imagem Placeholder */}
            <Image
                source={{ uri: 'https://via.placeholder.com/100x80.png?text=Vaga' }} // Placeholder
                style={styles.vagaImage}
            />
            {/* Container para informações e botões */}
            <View style={styles.vagaDetailsContainer}>
                {/* Informações da Vaga */}
                <View style={styles.vagaInfo}>
                    <Text style={styles.vagaNome}>{item.nome}</Text>
                    <Text style={styles.vagaEndereco}>{item.endereco}</Text>
                </View>
                {/* Botões de Ação */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => navigation.navigate("EditVaga", { vagaId: item.id })}
                    >
                        <Text style={styles.actionButtonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeleteVaga(item.id)}
                    >
                        <Text style={styles.actionButtonText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
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

// screens/MyVagasScreen.js (NOVO BLOCO DE ESTILOS)

const styles = StyleSheet.create({
    container: {
        // paddingTop: 50, // Removido ou ajustado
    },
    list: {
        width: "100%",
        paddingTop: 10,
    },
    // ESTILOS DO CARTÃO ATUALIZADOS
    vagaCard: {
        flexDirection: 'row', // Imagem e conteúdo lado a lado
        backgroundColor: colors.inputBackground,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
        // Sombra (opcional)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    vagaImage: {
        width: 80, // Imagem um pouco menor
        height: 80, // Altura igual à largura
        resizeMode: 'cover',
    },
    vagaDetailsContainer: {
        flex: 1, // Ocupa o espaço restante
        padding: 10,
        justifyContent: 'space-between', // Espaça infos e botões
    },
    vagaInfo: {
        marginBottom: 5, // Espaço entre texto e botões
    },
    vagaNome: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 3,
    },
    vagaEndereco: {
        fontSize: 13,
        color: colors.textSecondary,
    },
    buttonContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-between', // Não precisa mais, botões têm tamanho fixo
        // alignItems: 'center', // Desnecessário com padding/margin
    },
    actionButton: {
        paddingVertical: 6, // Botões menores
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 8, // Espaço entre botões
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#007BFF', // Azul para Editar
    },
    deleteButton: {
        backgroundColor: '#DC3545', // Vermelho para Excluir
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 12, // Texto menor nos botões
        fontWeight: 'bold',
    },
    noVagasText: {
        color: colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});