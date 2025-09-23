import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BookingScreen({ navigation, route }) {
  const { vagaId, vagaNome, localizacao } = route.params;
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleConfirmBooking = () => {
    const formattedDate = date.toLocaleDateString('pt-BR');
    const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    Alert.alert(
      "Reserva Confirmada",
      `Vaga: ${vagaNome}\nData: ${formattedDate}\nHorário: ${formattedTime}\nSua reserva foi concluída com sucesso!`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Agendar Reserva</Text>
      <Text style={styles.vagaText}>Vaga: {vagaNome}</Text>

      {/* Botão para ver a vaga no mapa */}
      <TouchableOpacity
        style={[globalStyles.button, { backgroundColor: '#3498db' }]}
        onPress={() => navigation.navigate('Map', { localizacao, nome: vagaNome })}
      >
        <Text style={globalStyles.buttonText}>Ver no Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={globalStyles.button} 
        onPress={() => setShowPicker(true)}
      >
        <Text style={globalStyles.buttonText}>
          Selecionar Data e Horário
        </Text>
      </TouchableOpacity>

      <Text style={styles.selectedDateTime}>
        Horário Selecionado: {date.toLocaleString('pt-BR')}
      </Text>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity 
        style={[globalStyles.button, { backgroundColor: colors.primary }]}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedDateTime: {
    color: colors.text,
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
});