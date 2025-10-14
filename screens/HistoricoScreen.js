import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getReservasByUser } from "../services/reservaService";
import { getCurrentUserAuth } from "../services/userService"; 
import { colors } from "../styles/colors";

export default function HistoricoScreen() {
    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistorico = async () => {
            const user = getCurrentUserAuth(); 
            
            // Verifica se o usuário está logado
            if (!user) {
                Alert.alert("Atenção", "Faça login para ver seu histórico.");
                setIsLoading(false);
                return;
            }

            try {
                // Chama a função REAL do Firebase, usando o UID do usuário
                const historico = await getReservasByUser(user.uid); 
                setReservas(historico);
            } catch (error) {
                Alert.alert("Erro", "Falha ao carregar histórico.");
                console.error("Erro ao carregar histórico:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistorico();
    }, []); // Roda apenas na montagem da tela

    const renderItem = ({ item }) => (
        <View style={styles.reservaCard}>
            <Text style={styles.vagaNome}>{item.vagaNome}</Text>
            <Text style={styles.dataInfo}>Data: {item.data}</Text>
            <Text style={[styles.statusText, item.status === 'Concluída' ? styles.statusSuccess : styles.statusDanger]}>
                Status: {item.status}
            </Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={globalStyles.container}>
                <Text style={{ color: colors.text }}>Carregando Histórico...</Text>
            </View>
        );
    }
    
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>📖 Histórico de Reservas</Text>
            
            <FlatList
                data={reservas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.list}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>Nenhuma reserva encontrada.</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
        paddingTop: 10,
    },
    reservaCard: {
        backgroundColor: colors.inputBackground,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    vagaNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 5,
    },
    dataInfo: {
        color: colors.textSecondary,
        marginBottom: 5,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusSuccess: {
        color: '#4CAF50', // Verde
    },
    statusDanger: {
        color: '#DC3545', // Vermelho
    },
    emptyText: {
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 20,
    }
});