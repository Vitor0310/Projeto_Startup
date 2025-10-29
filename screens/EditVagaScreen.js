import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
// Importa as funções para buscar e atualizar
import { getVagaById, updateVaga } from "../services/vagaService";

export default function EditVagaScreen({ navigation, route }) {
    const { vagaId } = route.params; // Recebe o ID da vaga a ser editada
    const [vaga, setVaga] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Estados para os campos de edição
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [preco, setPreco] = useState("");
    const [tipo, setTipo] = useState("");
    const [descricao, setDescricao] = useState("");

    // Efeito para carregar os dados da vaga
    useEffect(() => {
        const fetchVaga = async () => {
            try {
                const vagaData = await getVagaById(vagaId);
                if (vagaData) {
                    setVaga(vagaData);
                    // Preenche os campos com os dados existentes
                    setNome(vagaData.nome || '');
                    setEndereco(vagaData.endereco || '');
                    setPreco(String(vagaData.precoPorHora || '')); // Converte para string para o TextInput
                    setTipo(vagaData.tipo || '');
                    setDescricao(vagaData.descricao || '');
                } else {
                    Alert.alert("Erro", "Vaga não encontrada.");
                    navigation.goBack();
                }
            } catch (error) {
                Alert.alert("Erro", "Falha ao carregar a vaga.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchVaga();
    }, [vagaId, navigation]);

    const handleUpdateVaga = async () => {
        if (!nome || !endereco || !preco) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }

        const dataToUpdate = {
            nome,
            endereco,
            precoPorHora: parseFloat(preco),
            tipo,
            descricao,
            // Outros campos, como localização, seriam atualizados aqui
        };

        setIsLoading(true);
        try {
            await updateVaga(vagaId, dataToUpdate);
            Alert.alert("Sucesso", "Vaga atualizada com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading || !vaga) {
        return (
            <View style={globalStyles.container}>
                <Text style={{ color: colors.text }}>Carregando dados da vaga...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>Editar Vaga: {vaga.nome}</Text>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Nome da vaga"
                    placeholderTextColor={colors.textSecondary}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Endereço"
                    placeholderTextColor={colors.textSecondary}
                    value={endereco}
                    onChangeText={setEndereco}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Preço por hora"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={preco}
                    onChangeText={setPreco}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Tipo (coberta ou descoberta)"
                    placeholderTextColor={colors.textSecondary}
                    value={tipo}
                    onChangeText={setTipo}
                />
                <TextInput
                    style={[globalStyles.input, { height: 100 }]}
                    placeholder="Descrição da vaga"
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    value={descricao}
                    onChangeText={setDescricao}
                />

                <TouchableOpacity style={globalStyles.button} onPress={handleUpdateVaga}>
                    <Text style={globalStyles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}