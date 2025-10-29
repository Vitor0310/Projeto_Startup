// screens/DetailsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getVagaById } from "../services/vagaService";

export default function DetailsScreen({ route, navigation }) {
    const { vagaId } = route.params;
    const [vaga, setVaga] = useState(null);

    useEffect(() => {
        const fetchVaga = async () => {
            const vagaEncontrada = await getVagaById(vagaId);
            setVaga(vagaEncontrada);
        };
        fetchVaga();
    }, [vagaId]);

    const handleReserve = () => {
        if (!vaga) {
            Alert.alert("Aguarde", "Aguarde os detalhes da vaga carregarem.");
            return;
        }

        navigation.navigate("Booking", {
            vagaId: vaga.id,
            vagaNome: vaga.nome,
            localizacao: vaga.localizacao,
        });
    };

    if (!vaga) {
        return (
            <View style={globalStyles.container}>
                <Text style={{ color: "#fff" }}>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollView}>
            {vaga.fotos && vaga.fotos.length > 0 && (
                <Image
                    source={{ uri: vaga.fotos[0] }}
                    style={styles.image}
                />
            )}

            <View style={styles.detailsContainer}>
                <Text style={styles.vagaNome}>{vaga.nome}</Text>
                <Text style={styles.vagaPreco}>R$ {vaga.precoPorHora.toFixed(2)} / hora</Text>
                <Text style={styles.vagaInfo}>Endereço: {vaga.endereco}</Text>
                <Text style={styles.vagaInfo}>Tipo: {vaga.tipo}</Text>
                <Text style={styles.vagaDescricao}>{vaga.descricao}</Text>

                <TouchableOpacity style={globalStyles.button} onPress={handleReserve}>
                    <Text style={globalStyles.buttonText}>Reservar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "#000",
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "cover",
    },
    detailsContainer: {
        padding: 20,
    },
    vagaNome: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFD700",
        marginBottom: 10,
    },
    vagaPreco: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 15,
    },
    vagaInfo: {
        fontSize: 16,
        color: "#AAAAAA",
        marginBottom: 5,
    },
    vagaDescricao: {
        fontSize: 16,
        color: "#fff",
        marginTop: 15,
        lineHeight: 22,
        marginBottom: 20,
    },
});