import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createReserva } from "../services/reservaService";
import { getCurrentUserAuth } from "../services/userService";

export default function BookingScreen({ navigation, route }) {
    const { vagaId, vagaNome, localizacao } = route.params;
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState('date'); // 'date' ou 'time'

    const showMode = (currentMode) => {
        setShowPicker(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    // NOVA FUNÇÃO DE MUDANÇA DE DATA/HORA
    const onDateChange = (event, selectedValue) => {
        setShowPicker(false); // Sempre fecha o picker após a tentativa de seleção

        if (event.type === "dismissed") {
            return;
        }

        if (selectedValue) {
            // Se estiver no modo 'date', preservamos a hora atual
            if (mode === 'date') {
                const newDate = new Date(selectedValue);
                newDate.setHours(date.getHours());
                newDate.setMinutes(date.getMinutes());
                setDate(newDate);

            }
            // Se estiver no modo 'time', preservamos a data atual
            else if (mode === 'time') {
                const newTime = new Date(selectedValue);
                const newDate = new Date(date);
                newDate.setHours(newTime.getHours());
                newDate.setMinutes(newTime.getMinutes());
                setDate(newDate);
            }
        }
    };

    // FUNÇÃO DE CONFIRMAÇÃO DE RESERVA
    const handleConfirmBooking = async () => {
        const user = getCurrentUserAuth();
        if (!user) {
            Alert.alert("Erro", "É necessário estar logado para reservar.");
            return;
        }

        // 1. Prepara os dados da reserva
        const reservaData = {
            userId: user.uid,
            vagaId: vagaId,
            vagaNome: vagaNome,
            dataReserva: date, 
            status: 'Pendente', // O status será 'Confirmada' após o pagamento
            dataCriacao: new Date(),
            valorTotal: 25.00, // Valor mock (você pode calcular isso)
            duracaoHoras: 2,    // Duração mock
        };

        // 2. Navega para a tela de Pagamento, levando os dados
        navigation.navigate("Payment", { reservaData: reservaData });
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Agendar Reserva</Text>
            <Text style={styles.vagaText}>Vaga: {vagaNome}</Text>

            {/* Botão para ver a vaga no mapa */}
            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: '#3498db', marginBottom: 20 }]}
                onPress={() => navigation.navigate('Map', { localizacao, nome: vagaNome })}
            >
                <Text style={globalStyles.buttonText}>Ver no Mapa</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Selecione Data e Hora:</Text>

            {/* SELETORES SEPARADOS DE DATA E HORA */}
            <View style={styles.datePickerContainer}>
                <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
                    <Text style={styles.dateButtonText}>Data: {date.toLocaleDateString('pt-BR')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dateButton} onPress={showTimepicker}>
                    <Text style={styles.dateButtonText}>Hora: {date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>
            </View>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode={mode} // Usa o estado 'mode' (date ou time)
                    is24Hour={true}
                    display="default"
                    onChange={onDateChange}
                />
            )}

            <TouchableOpacity
                style={[globalStyles.button, { backgroundColor: colors.primary, marginTop: 20 }]}
                onPress={handleConfirmBooking}
            >
                <Text style={[globalStyles.buttonText, { color: "#000" }]}>
                    Confirmar Reserva
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={globalStyles.link}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    vagaText: {
        fontSize: 20,
        color: colors.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    // NOVOS ESTILOS
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    dateButton: {
        backgroundColor: colors.inputBackground,
        padding: 10,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateButtonText: {
        color: colors.text,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 16,
        marginBottom: 10,
        alignSelf: 'flex-start',
        width: '100%',
    },
    selectedDateTime: {
        color: colors.text,
        fontSize: 16,
        marginVertical: 20,
        textAlign: 'center',
    },
});