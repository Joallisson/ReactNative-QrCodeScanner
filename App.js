import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null); //Armazena o estado da permissão para usar a câmera
  const [scanned, setScanned] = useState(false); //Guarda se foi ou não escaneado

  useEffect(() => { //Executa assim que a tela é carregada
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync(); //Retorna se a permissão é verdadeira ou falsa
      setHasPermission(status === 'granted'); //Alterando o estado da permissão de acordo com o que o usuário selecionou
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => { //
    setScanned(true);
    alert(`QR Code do tipo de código: "${type}" e, a informação: "${data}" Foi escaneada!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Clicque para escanear novamente'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
