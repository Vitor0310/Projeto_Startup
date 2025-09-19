import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { globalStyles } from '../styles/globalStyles';

export default function MapScreen({ route }) {
  const { localizacao, nome } = route.params;

  // Verificação de segurança: se as coordenadas não forem passadas, exibe uma mensagem
  if (!localizacao || !localizacao.latitude || !localizacao.longitude) {
    return (
      <View style={globalStyles.container}>
        <Text style={styles.errorText}>Localização da vaga não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: localizacao.latitude,
          longitude: localizacao.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: localizacao.latitude,
            longitude: localizacao.longitude,
          }}
          title={nome}
          description="Sua vaga de garagem"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});