import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native'; // Import Dimensions e ActivityIndicator
import { useFocusEffect } from '@react-navigation/native'; // Para recarregar os dados
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

// Importa a biblioteca de gráficos
import { PieChart } from 'react-native-chart-kit';

// Importa serviços
import { getAllVagas } from '../services/vagaService';
import { getAllReservas } from '../services/reservaService'; // <-- Precisamos desta função

// Obter a largura da tela para adaptar o gráfico
const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }) {
    const [totalVagas, setTotalVagas] = useState(0);
    const [totalReservas, setTotalReservas] = useState(0);
    const [reservasPendentes, setReservasPendentes] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Usamos useFocusEffect para que o dashboard sempre recarregue os dados
    useFocusEffect(
        React.useCallback(() => {
            const fetchDashboardData = async () => {
                setIsLoading(true);
                try {
                    // 1. Contagem de Vagas
                    const vagas = await getAllVagas();
                    setTotalVagas(vagas.length);

                    // 2. Contagem REAL de Reservas
                    const todasReservas = await getAllReservas();
                    setTotalReservas(todasReservas.length);

                    // 3. Reservas Pendentes
                    const pendentes = todasReservas.filter(r => r.status === 'Pendente');
                    setReservasPendentes(pendentes.length);

                } catch (error) {
                    console.error("Erro ao carregar dados do Dashboard:", error);
                    setTotalVagas(0);
                    setTotalReservas(0);
                    setReservasPendentes(0);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchDashboardData();
        }, [])
    );

    // Função para gerar o Data Set do gráfico
    const getChartData = () => {
        // Garante que os dados sejam números e evita divisão por zero se ambos forem 0
        const vagas = Number(totalVagas) || 0;
        const reservas = Number(totalReservas) || 0;

        // Se não houver dados, exibe um gráfico "vazio"
        if (vagas === 0 && reservas === 0) {
            return [
                {
                    name: "Sem Dados",
                    population: 1,
                    color: colors.border,
                    legendFontColor: colors.textSecondary,
                    legendFontSize: 14
                }
            ];
        }

        return [
            {
                name: "Vagas Ativas",
                population: vagas,
                color: "#4CAF50", // Verde
                legendFontColor: colors.text,
                legendFontSize: 14
            },
            {
                name: "Total de Reservas",
                population: reservas,
                color: "#3498db", // Azul
                legendFontColor: colors.text,
                legendFontSize: 14
            },
        ];
    };

    // Componente de Card
    const InfoCard = ({ title, value, color }) => (
        <View style={[styles.card, { backgroundColor: color }]}>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={globalStyles.container}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ color: colors.text, marginTop: 10 }}>Carregando Dashboard...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>📊 Dashboard de Gerenciamento</Text>

                <Text style={styles.sectionTitle}>Estatísticas Chave</Text>

                <View style={styles.statsContainer}>
                    <InfoCard
                        title="Vagas Cadastradas"
                        value={totalVagas}
                        color="#4CAF50"
                    />
                    <InfoCard
                        title="Total de Reservas"
                        value={totalReservas}
                        color="#3498db"
                    />
                    <InfoCard
                        title="Reservas Pendentes"
                        value={reservasPendentes}
                        color="#FFD700"
                    />
                </View>

                {/* ÁREA DO GRÁFICO */}
                <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Proporção Geral (Vagas vs Reservas)</Text>

                <View style={styles.chartContainer}>
                    <PieChart
                        data={getChartData()}
                        width={screenWidth * 0.9} // 90% da largura da tela
                        height={220}
                        chartConfig={{
                            backgroundColor: 'transparent',
                            backgroundGradientFrom: colors.background,
                            backgroundGradientTo: colors.background,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        absolute // Mostra os números absolutos
                    />
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
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
        minHeight: 100, // Altura mínima para os cards
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
        backgroundColor: colors.inputBackground, // Fundo para o gráfico
        paddingVertical: 10,
        marginBottom: 30,
    }
});