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

  const handleBarCodeScanned = ({ type, data /*O tipo de código e as informações sendo passadas como props*/}) => { //Lidar comk o códio qrcode escaneado, Essa constante muda estado de scanned para true e manda um alert para o usuário
    setScanned(true);
    alert(`QR Code do tipo de código: "${type}" e, a informação: "${data}" Foi escaneada!`);
  };

  if (hasPermission === null) { //Senão tiver permissão para usar a câmera, retorna uma mensagem para o usuário
    return <Text>Esta aplicação requer a permissão do usuo da câmera</Text>;
  }
  if (hasPermission === false) { //Se a permissão for negada, retorna uma mensagem para o usuário
    return <Text>Sem permissão para usar a câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned /*Se a camera já escaneou o qrcode então, pausa o scanner, mas senão tiver sido escaneado, então chama a contante handleBarCodeScanned para executar a função de escnear*/}
        style={StyleSheet.absoluteFillObject /*A câmera usa tela inteira*/}
      />
      {scanned && <Button title={'Clique aqui para escanear novamente'} onPress={() => setScanned(false)} /> /*Botão que se pressionado muda o estado de scanned para false e a câmera começa a scanear novamente*/}
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
