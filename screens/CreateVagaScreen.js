import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { createVaga } from "../services/vagaService"; // <--- NOVO IMPORT

export default function CreateVagaScreen({ navigation }) {
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [preco, setPreco] = useState("");
    const [tipo, setTipo] = useState(""); // 'coberta' ou 'descoberta'
    const [descricao, setDescricao] = useState("");

    const handleCreateVaga = async () => { // <-- Função agora é assíncrona
        if (!nome || !endereco || !preco || !tipo || !descricao) {
            Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
            return;
        }

        // Objeto com os dados a serem salvos no Firebase
        const novaVaga = {
            nome,
            endereco,
            precoPorHora: parseFloat(preco),
            tipo,
            descricao,
            locadorId: "mock-user-id",
            dataCriacao: new Date().toISOString(),
            localizacao: { latitude: -23.551, longitude: -46.634 }, // Coordenada padrão de SP
            fotos: ["https://via.placeholder.com/150/007BFF/FFFFFF?text=Nova+Vaga"],
        };

        try {
            // Chamada real para salvar no Firebase
            await createVaga(novaVaga);
            Alert.alert("Sucesso", "Vaga cadastrada com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", error.message);
        }
    };

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>Cadastrar Nova Vaga</Text>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Nome da vaga (ex: Vaga no Centro)"
                    placeholderTextColor={colors.textSecondary}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Endereço (ex: Rua das Flores, 123)"
                    placeholderTextColor={colors.textSecondary}
                    value={endereco}
                    onChangeText={setEndereco}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Preço por hora (ex: 15.00)"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={preco}
                    onChangeText={setPreco}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Tipo (ex: coberta ou descoberta)"
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

                <TouchableOpacity style={globalStyles.button} onPress={handleCreateVaga}>
                    <Text style={globalStyles.buttonText}>Cadastrar Vaga</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}