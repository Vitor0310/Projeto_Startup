import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { colors } from "../styles/colors";

// Dados mock da aplicação
const APP_INFO = {
    nome: "VagaJá App",
    fabricante: "Startup VagaJá Tech",
    versao: "1.0.0 (Build 54.x)",
    distribuicao: "Expo Go / EAS Build"
};

export default function SupportScreen() {
    
    const handleContact = (type) => {
        // Simula links de comunicação
        switch (type) {
            case 'email':
                Linking.openURL('mailto:suporte@vagaja.com.br');
                break;
            case 'whatsapp':
                Linking.openURL('https://wa.me/5511987654321');
                break;
            default:
                Alert.alert("Suporte", "Opção de contato em breve!");
        }
    };

    return (
        <ScrollView style={{ backgroundColor: colors.background }}>
            <View style={[globalStyles.container, styles.container]}>
                <Text style={globalStyles.title}>Ajuda e Suporte</Text>

                {/* FALE CONOSCO */}
                <Text style={styles.sectionTitle}>Fale Conosco</Text>
                <TouchableOpacity style={styles.linkButton} onPress={() => handleContact('chat')}>
                    <Text style={styles.linkText}>Chat de Suporte (Dentro do App)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton} onPress={() => handleContact('email')}>
                    <Text style={styles.linkText}>E-mail: suporte@vagaja.com.br</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton} onPress={() => handleContact('whatsapp')}>
                    <Text style={styles.linkText}>WhatsApp (11) 98765-4321</Text>
                </TouchableOpacity>

                {/* PERGUNTAS FREQUENTES (FAQ) */}
                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Perguntas Frequentes (FAQ)</Text>
                <TouchableOpacity style={styles.linkButton} onPress={() => Alert.alert('FAQ', 'Aqui você colocará um Webview ou lista de perguntas frequentes.')}>
                    <Text style={styles.linkText}>Acessar Base de Conhecimento</Text>
                </TouchableOpacity>
                
                {/* SOBRE O APP */}
                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Sobre</Text>
                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Nome da Aplicação:</Text>
                    <Text style={styles.infoValue}>{APP_INFO.nome}</Text>
                    <Text style={styles.infoLabel}>Fabricante:</Text>
                    <Text style={styles.infoValue}>{APP_INFO.fabricante}</Text>
                    <Text style={styles.infoLabel}>Versão:</Text>
                    <Text style={styles.infoValue}>{APP_INFO.versao}</Text>
                </View>

                {/* AVALIAÇÃO (Simulando Link para a Store) */}
                 <TouchableOpacity style={[globalStyles.button, { marginTop: 30 }]} onPress={() => Alert.alert('Avaliação', 'Redirecionando para a loja de aplicativos...')}>
                    <Text style={globalStyles.buttonText}>Avalie o App (⭐⭐⭐⭐⭐)</Text>
                </TouchableOpacity>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
        marginTop: 10,
    },
    linkButton: {
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    linkText: {
        color: colors.link,
        fontSize: 16,
    },
    infoBox: {
        width: '100%',
        padding: 15,
        backgroundColor: colors.inputBackground,
        borderRadius: 8,
    },
    infoLabel: {
        color: colors.textSecondary,
        fontSize: 14,
        marginTop: 5,
    },
    infoValue: {
        color: colors.text,
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    }
});