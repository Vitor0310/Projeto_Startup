import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

// Importa serviços necessários para contagem
import { getAllVagas } from '../services/vagaService';
import { getReservasByUser } from '../services/reservaService'; // Usaremos essa função para contagem (deve ser ajustada)

// Funções para contar dados do Firestore (Simulando a busca de todos os dados)
// NOTA: Em produção, o ideal é usar funções do Firebase para contar diretamente, 
// mas para o nosso protótipo, buscar e contar no app é mais fácil.

export default function DashboardScreen({ navigation }) {
    const [totalVagas, setTotalVagas] = useState(0);
    const [totalReservas, setTotalReservas] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // 1. Contagem de Vagas
                const vagas = await getAllVagas();
                setTotalVagas(vagas.length);

                // 2. Contagem de Reservas (Usando um ID mock, pois o dashboard deve contar TUDO)
                // Para uma contagem real de TODAS as reservas, a função getReservasByUser precisaria ser ajustada para ignorar o userId.
                // Por enquanto, vamos simular:
                const reservas = await getReservasByUser("qualquer_id_de_usuario"); 
                // Assumimos que a função getReservasByUser pode ser adaptada para buscar um subconjunto
                // Para simplificar, vamos usar um valor mock para total de reservas por enquanto
                setTotalReservas(reservas.length * 2); // Multiplica para simular mais dados
                
            } catch (error) {
                console.error("Erro ao carregar dados do Dashboard:", error);
                // Define valores 0 em caso de erro
                setTotalVagas(0);
                setTotalReservas(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

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
                        value={Math.floor(totalReservas / 4)} 
                        color="#FFD700" // Amarelo
                    />
                </View>

                {/* Área Futura para Gráficos */}
                <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Visão Geral (Gráficos Futuros)</Text>
                <View style={styles.chartPlaceholder}>
                    <Text style={styles.placeholderText}>
                        *Aqui será implementado o Gráfico de Ocupação e Receita*
                    </Text>
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
    chartPlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    placeholderText: {
        color: colors.textSecondary,
        fontStyle: 'italic',
    }
});