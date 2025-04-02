import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

const ScannerScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');
  const router = useRouter();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (!cameraRef.current) {
      Alert.alert('Erro', 'Câmera não disponível.');
      return;
    }

    setIsLoading(true);
    try {
      const photo = await cameraRef.current.takePictureAsync();

      if (!photo || !photo.uri) {
        Alert.alert('Erro', 'Falha ao capturar a imagem.');
        return;
      }

      // Mock do OCR (simula o resultado real do backend)
      const extractedData = processImageWithOCR(photo.uri);

      // Converte o objeto em uma query string
      const queryParams = new URLSearchParams(extractedData).toString();

      // Redireciona para o formulário com os dados extraídos
      router.push(`/product/form/addProduct?${queryParams}`);
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Falha ao processar a imagem.');
    } finally {
      setIsLoading(false);
    }
  };

  const processImageWithOCR = (imageUri: string) => {
    console.log('Mockando OCR para a imagem:', imageUri);

    return {
      nome: 'Banana',
      quantidade: '320g',
      fabricacao: '12/01/2025',
      validade: '12/02/2025',
      armazenamento: 'Geladeira',
      tipo: 'fruta'
    };
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permissão...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Permissão para acessar a câmera negada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={cameraType}
        ref={(ref) => (cameraRef.current = ref)}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Ajuste a etiqueta do produto no quadrado</Text>
          <View style={styles.focusFrame} />
        </View>
      </CameraView>

      {isLoading ? (
        <ActivityIndicator size="large" color="#D9534F" />
      ) : (
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.captureButtonText}>Capturar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  focusFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#D9534F',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  captureButton: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    backgroundColor: '#D9534F',
    padding: 16,
    borderRadius: 8,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScannerScreen;
