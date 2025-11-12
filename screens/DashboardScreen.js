import React, { useState, useCallback } from 'react';
import { 
    View, Text, StyleSheet, Dimensions, ActivityIndicator, 
    FlatList, 
    TouchableOpacity, Alert 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { PieChart } from 'react-native-chart-kit'; 

// Importa todos os serviços necessários
import { getAllVagas, getVagasByOwner } from '../services/vagaService';
import { getAllReservas, getReservasByOwner, updateReservaStatus } from '../services/reservaService';
import { getCurrentUserAuth } from '../services/userService';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }) {
    // Estados para Métricas GERAIS
    const [totalVagasPlataforma, setTotalVagasPlataforma] = useState(0);
    const [totalReservasPlataforma, setTotalReservasPlataforma] = useState(0);
    
    // Estados para Métricas do LOCADOR
    const [minhasVagasCount, setMinhasVagasCount] = useState(0);
    const [minhasReservasCount, setMinhasReservasCount] = useState(0);
    const [minhaReceitaTotal, setMinhaReceitaTotal] = useState(0);
    
    const [reservasPendentes, setReservasPendentes] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    // Função para buscar todos os dados (agora chamada pelo useFocusEffect)
    const fetchDashboardData = async () => {
        const user = getCurrentUserAuth();
        if (!user) {
            setIsLoading(false);
            return; 
        }

        try {
            // 1. Métricas da Plataforma (Geral)
            const vagasPlataforma = await getAllVagas();
            const reservasPlataforma = await getAllReservas(); 
            setTotalVagasPlataforma(vagasPlataforma.length);
            setTotalReservasPlataforma(reservasPlataforma.length);

            // 2. Métricas do Locador (Específicas)
            const minhasVagas = await getVagasByOwner(user.uid);
            const minhasReservas = await getReservasByOwner(user.uid);

            // 3. Cálculos
            let receita = 0;
            let pendentes = [];
            minhasReservas.forEach(reserva => {
                // Soma receita APENAS se o status for 'Concluída'
                if (reserva.status === 'Concluída') { 
                    receita += (reserva.valorTotal || 0);
                }
                // Adiciona à lista de pendentes se o status for 'Pendente'
                if (reserva.status === 'Pendente') {
                    pendentes.push(reserva);
                }
            });

            setMinhasVagasCount(minhasVagas.length);
            setMinhasReservasCount(minhasReservas.length);
            setMinhaReceitaTotal(receita);
            setReservasPendentes(pendentes);

        } catch (error) {
            console.error("Erro ao carregar dados do Dashboard:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Roda a busca quando a tela entra em foco
    useFocusEffect(
        useCallback(() => {
            fetchDashboardData();
        }, [])
    );

    // FUNÇÃO MANUAL PARA CONCLUIR A RESERVA (COM A CORREÇÃO DE TIMING)
    const handleConcluirReserva = async (reservaId) => {
        Alert.alert(
            "Confirmar Ação", "Deseja marcar esta reserva como 'Concluída'?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Concluir",
                    onPress: async () => {
                        try {
                            // 1. Atualiza o status no Firebase
                            await updateReservaStatus(reservaId, "Concluída");
                            
                            // 2. Mostra o alerta de sucesso
                            Alert.alert(
                                "Sucesso", 
                                "Reserva atualizada!",
                                [
                                    // 3. O recálculo SÓ acontece DEPOIS que o usuário clica em "OK"
                                    { 
                                        text: "OK", 
                                        onPress: () => fetchDashboardData() // <-- Recarrega os dados
                                    }
                                ]
                            );
                        } catch (error) {
                            Alert.alert("Erro ao Atualizar", error.message);
                        }
                    },
                },
            ]
        );
    };

    // Função para gerar o Data Set do gráfico
    const getChartData = () => {
        const vagas = Number(totalVagasPlataforma) || 0;
        const reservas = Number(totalReservasPlataforma) || 0;
        if (vagas === 0 && reservas === 0) {
            return [{ name: "Sem Dados", population: 1, color: colors.border, legendFontColor: colors.textSecondary, legendFontSize: 14 }];
        }
        return [
            { name: "Total Vagas", population: vagas, color: "#4CAF50", legendFontColor: colors.text, legendFontSize: 14 },
            { name: "Total Reservas", population: reservas, color: "#3498db", legendFontColor: colors.text, legendFontSize: 14 }
        ];
    };
    
    // Componente de Card
    const InfoCard = ({ title, value, color }) => (
        <View style={[styles.card, { backgroundColor: color }]}>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
    );

    // Componente que renderiza o Cabeçalho da Lista
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={globalStyles.title}>📊 Dashboard</Text>
            
            <Text style={styles.sectionTitle}>Meu Desempenho (Locador)</Text>
            <View style={styles.statsContainer}>
                <InfoCard 
                    title="Minhas Vagas Ativas" 
                    value={minhasVagasCount} 
                    color={colors.primary} 
                />
                <InfoCard 
                    title="Reservas Recebidas" 
                    value={minhasReservasCount} 
                    color="#3498db"
                />
                 <InfoCard 
                    title="Receita (R$)" 
                    value={minhaReceitaTotal.toFixed(2)} 
                    color="#4CAF50"
                />
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Métricas da Plataforma (Geral)</Text>
            <View style={styles.chartContainer}>
                <PieChart
                    data={getChartData()}
                    width={screenWidth * 0.9} 
                    height={220}
                    chartConfig={{
                        backgroundColor: 'transparent',
                        backgroundGradientFrom: colors.background,
                        backgroundGradientTo: colors.background,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                />
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Reservas Pendentes (Ação Manual)</Text>
        </View>
    );

    // Componente que renderiza o Item da Lista
    const renderReservaItem = ({ item }) => (
        <View style={styles.reservaCard}>
            <View>
                <Text style={styles.vagaNome}>{item.vagaNome}</Text>
                <Text style={styles.dataInfo}>
                    {item.dataReserva.toDate ? item.dataReserva.toDate().toLocaleDateString('pt-BR') : 'Data...'}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.concluirButton}
                onPress={() => handleConcluirReserva(item.id)}
            >
                <Ionicons name="checkmark-circle" size={30} color={colors.success} />
            </TouchableOpacity>
        </View>
    );

    // Renderização do Loading
    if (isLoading) {
        return (
            <View style={globalStyles.container}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ color: colors.text, marginTop: 10 }}>Carregando Dashboard...</Text>
            </View>
        );
    }

    // Renderização Principal (FlatList)
    return (
        <FlatList
            style={styles.scrollView}
            contentContainerStyle={styles.listContentContainer}
            data={reservasPendentes}
            renderItem={renderReservaItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhuma reserva pendente.</Text>
            }
        />
    );
}

// Estilos
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContentContainer: {
        padding: 20, 
    },
    headerContainer: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        alignSelf: 'flex-start',
        width: '100%',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    card: {
        width: '48%', 
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    cardValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardTitle: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
        textAlign: 'center',
    },
    chartContainer: {
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.inputBackground, 
        paddingVertical: 10,
        marginBottom: 30,
    },
    reservaCard: {
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    vagaNome: {
        color: colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    dataInfo: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    concluirButton: {
        padding: 5,
    },
    emptyText: {
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30, 
    }
});