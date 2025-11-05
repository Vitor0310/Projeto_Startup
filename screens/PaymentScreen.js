import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { createReserva } from "../services/reservaService"; // Importamos a função de criar a reserva

export default function PaymentScreen({ navigation, route }) {
    // Recebe os dados da reserva vindos da BookingScreen
    const { reservaData } = route.params;

    const [isLoading, setIsLoading] = useState(false);

    // Estados mock para os inputs (não faremos nada com eles, é só visual)
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const handlePayment = async () => {
        setIsLoading(true);

        // Simula o tempo de processamento
        setTimeout(async () => {
            try {
                // 1. Tenta salvar a reserva no Firebase
                await createReserva(reservaData);

                // 2. Se salvar, mostra o alerta de sucesso
                Alert.alert(
                    "Pagamento Aprovado",
                    `Sua reserva para ${reservaData.vagaNome} foi confirmada!`,
                    [
                        {
                            text: "Ver Histórico",
                            // AÇÃO CORRETA: Redefine a navegação
                            onPress: () => {
                                navigation.reset({
                                    index: 0, // Começa no primeiro item da nova pilha
                                    routes: [
                                        {
                                            name: 'MainApp', // 1. Reseta para o Navegador do Menu Lateral (AppDrawer)
                                            state: {
                                                // 2. Diz ao Drawer para abrir na rota 'HistoricoDrawer'
                                                routes: [{ name: 'HistoricoDrawer' }]
                                            }
                                        }
                                    ],
                                });
                            }
                        },
                    ]
                );
            } catch (error) {
                Alert.alert("Erro", "Falha ao processar a reserva: " + error.message);
            } finally {
                setIsLoading(false);
            }
        }, 2000); // 2 segundos de atraso
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={globalStyles.container}>
                <Text style={globalStyles.title}>Pagamento</Text>
                <Text style={styles.infoText}>Vaga: {reservaData.vagaNome}</Text>
                <Text style={styles.infoText}>Valor: R$ {reservaData.valorTotal.toFixed(2)}</Text>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Número do Cartão"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="Validade (MM/AA)"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={expiry}
                    onChangeText={setExpiry}
                />
                <TextInput
                    style={globalStyles.input}
                    placeholder="CVV"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    secureTextEntry
                    value={cvv}
                    onChangeText={setCvv}
                />

                <TouchableOpacity
                    style={[globalStyles.button, { marginTop: 20 }]}
                    onPress={handlePayment}
                >
                    <Text style={globalStyles.buttonText}>Confirmar Pagamento</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.link}>Cancelar e Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    infoText: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 10,
    }
});