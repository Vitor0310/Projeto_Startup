import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'; // Adicionado Dimensions
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

// Importa a biblioteca de gráficos
import { PieChart } from 'react-native-chart-kit'; 

// Importa serviços
import { getAllVagas } from '../services/vagaService';
import { getAllReservas } from '../services/reservaService';

// Obter a largura da tela para adaptar o gráfico
const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }) {
    const [totalVagas, setTotalVagas] = useState(0);
    const [totalReservas, setTotalReservas] = useState(0);
    const [reservasPendentes, setReservasPendentes] = useState(0); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    // Função para gerar o Data Set do gráfico
    const getChartData = () => {
        // Garantir que os dados sejam números
        const vagas = Number(totalVagas);
        const reservas = Number(totalReservas);

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
    
    const InfoCard = ({ title, value, color }) => (
        <View style={[styles.card, { backgroundColor: color }]}>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={globalStyles.container}>
                <Text style={{ color: colors.text }}>Carregando Dashboard...</Text>
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
                        color="#4CAF50" // Verde
                    />
                    <InfoCard 
                        title="Total de Reservas" 
                        value={totalReservas} 
                        color="#3498db" // Azul
                    />
                    <InfoCard 
                        title="Reservas Pendentes" 
                        value={reservasPendentes} 
                        color="#FFD700" // Amarelo
                    />
                </View>

                {/* ÁREA DO GRÁFICO (Substitui o Placeholder) */}
                <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Proporção Geral</Text>
                
                <View style={styles.chartContainer}>
                    <PieChart
                        data={getChartData()}
                        width={screenWidth * 0.9} // 90% da largura da tela
                        height={220}
                        chartConfig={{
                            backgroundColor: colors.background,
                            backgroundGradientFrom: colors.background,
                            backgroundGradientTo: colors.background,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => colors.text,
                        }}
                        accessor={"population"}
                        backgroundColor={colors.inputBackground}
                        paddingLeft={"15"}
                        center={[10, 50]} // Ajusta a posição do gráfico
                        absolute // Para mostrar o valor absoluto no tooltip
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
    container: {
        alignItems: 'center',
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
    // NOVO ESTILO PARA O CONTAINER DO GRÁFICO
    chartContainer: {
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    }
});