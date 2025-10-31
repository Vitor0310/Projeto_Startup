import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { getReservasByUser } from "../services/reservaService";
import { getCurrentUserAuth } from "../services/userService";
import { colors } from "../styles/colors";
import { Ionicons } from '@expo/vector-icons'; // <-- IMPORT DOS ÍCONES

export default function HistoricoScreen() {
    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistorico = async () => {
            const user = getCurrentUserAuth();
            if (!user) {
                Alert.alert("Atenção", "Faça login para ver seu histórico.");
                setIsLoading(false);
                return;
            }

            try {
                const historico = await getReservasByUser(user.uid);
                setReservas(historico);
            } catch (error) {
                Alert.alert("Erro", "Falha ao carregar histórico.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistorico();
    }, []);

    const renderItem = ({ item }) => {
        const formatarData = (dataObj) => {
            if (!dataObj) return 'Data não definida';
            if (dataObj.toDate) {
                return dataObj.toDate().toLocaleDateString('pt-BR', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });
            }
            return new Date(dataObj).toLocaleDateString('pt-BR');
        };

        const getStatusStyle = (status) => {
            if (status === 'Concluída') return styles.statusConcluida;
            if (status === 'Cancelada') return styles.statusCancelada;
            return styles.statusPendente;
        };

        return (
            <View style={styles.reservaCard}>
                <Text style={styles.vagaNome}>{item.vagaNome}</Text>
                
                <View style={styles.infoRow}>
                    <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
                    <Text style={styles.dataInfo}>
                        {formatarData(item.dataReserva)}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="ellipse" size={12} style={getStatusStyle(item.status)} />
                    <Text style={[styles.statusText, getStatusStyle(item.status)]}>
                        {item.status || 'Pendente'}
                    </Text>
                </View>
            </View>
        );
    };

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
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    vagaNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    dataInfo: {
        color: colors.textSecondary,
        fontSize: 14,
        marginLeft: 8,
    },
    statusText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    statusPendente: { color: '#FFD700' },
    statusConcluida: { color: '#4CAF50' },
    statusCancelada: { color: '#DC3545' },
    emptyText: {
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    }
});