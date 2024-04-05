import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableHighlight, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';

export default function Inicial({ navigation }) {
  const [region, setRegion] = useState({
    longitude: -44.0,
    latitude: -22.0,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);

  const [markers, setMarkers] = useState([
    {
      coordinate: {
        latitude: -23.219621120946094,
        longitude: -45.90674904487926,
      },
      title: 'ETEC - Sede',
      description:
        'Av. Salmão, 570 - Parque Res. Aquarius, São José dos Campos - SP, 12246-260',
    },
  ]);

  const [favoriteContacts, setFavoriteContacts] = useState([
    { name: 'Nome do Favorito', phoneNumber: '123456789' },
    // Adicione mais contatos favoritos conforme necessário
  ]);

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        alert(
          'latitude: ' +
          position.coords.latitude +
          ', \nLongitude: ' +
          position.coords.longitude
        );

        setMarkers((prevMarkers) => [
          ...prevMarkers,
          {
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            title: 'localização 4',
            description: 'localização 3',
          },
        ]);
      });
    } else {
      alert('Geolocalização não suportada neste dispositivo.');
    }
  };

  const openSMS = (phoneNumber) => {
    // Função para enviar SMS ao número de telefone especificado
    const smsUrl = `sms:${phoneNumber}`;
    Linking.openURL(smsUrl);
  };

  useEffect(() => {
    // Verifique se a permissão de localização foi concedida
    Location.requestPermissionsAsync().then((status) => {
      if (status.status !== 'granted') {
        alert('Permissão de localização negada');
        return;
      }

      // Obtenha a localização atual
      Location.getCurrentPositionAsync({}).then((location) => {
        const { latitude, longitude } = location.coords;

        // Atualize a região e adicione um novo marcador
        setRegion({
          ...region,
          latitude: latitude,
          longitude: longitude,
        });

        setMarkers((prevMarkers) => [
          ...prevMarkers,
          {
            coordinate: {
              latitude: latitude,
              longitude: longitude,
            },
            title: 'Sua localização',
            description: 'Sua localização atual',
          },
        ]);
      });
    });
  }, []);

  const onClickMap = (coordenadas) => {
    alert('Coordenadas:' + JSON.stringify(coordenadas.nativeEvent.coordinate));
    const { latitude, longitude } = coordenadas.nativeEvent.coordinate;
    setRegion({
      ...region,
      latitude: latitude,
      longitude: longitude,
    });

    setMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        coordinate: {
          latitude,
          longitude,
        },
        title: 'Localização',
        description: 'Localização',
      },
    ]);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhotoUri(data.uri);
    }
  };

  const JustOpenSMS = () => {
    const smsUrl = `sms:${favoriteContacts[0].phoneNumber}`;
    Linking.openURL(smsUrl);
  };

const openSMSWithMessage = () => {
  const message = `SOCORRO! Estou em uma situação de emergência! Aqui está a minha Localização: Latitude ${region.latitude}, Longitude ${region.longitude}`;
  if (favoriteContacts.length > 0) {
    const phoneNumber = favoriteContacts[0].phoneNumber;
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(smsUrl);
  } else {
    alert('Nenhum contato favorito disponível.');
  }
};

const openSMSWithPhoto = () => {
  if (photoUri) {
    if (favoriteContacts.length > 0) {
      const phoneNumber = favoriteContacts[0].phoneNumber;
      openSMS(phoneNumber);
    } else {
      alert('Nenhum contato favorito disponível.');
    }
  } else {
    openSMSWithMessage();
  }
};

  
  

  return (
    <View style={styles.container}>
      {/* Mapa e outros componentes do mapa */}
      <MapView
        onPress={onClickMap}
        style={styles.map}
        initialRegion={region}
        ref={(map) => (this.map = map)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>

      {/* Barra de Ações na Parte Inferior */}
      <View style={styles.bottomBar}>
        <TouchableHighlight
          style={styles.alert}
          onPress={() => {
            takePicture();
            openSMSWithPhoto();
          }}
        >
          <MaterialCommunityIcons name="alert" size={35} />
        </TouchableHighlight>

        <View style={styles.margin}></View>

        <TouchableHighlight
          style={styles.chat}
          onPress={() => {
              JustOpenSMS();
          }}
        >
          <MaterialCommunityIcons name="chat" size={35} />
        </TouchableHighlight>
      </View>

      {/* Componente da câmera */}
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  bottomBar: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    bottom: 20,
    right: 20,
  },
  alert: {
    width: 65,
    height: 65,
    backgroundColor: 'red',
    borderRadius: 65 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  chat: {
    width: 65,
    height: 65,
    backgroundColor: '#114D9D',
    borderRadius: 65 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});
