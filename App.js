//Importando elementos, React, API e Styles
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { styles } from "./src/Styles/StyleSheet";
import axios from "axios";

//Declarando as constantes
const App = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);

  //Função
  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress(null);
    }
  };

  //Renderizando
  return (
    <View style={styles.input}>
      {/* Caixa para entrada de texto, pedindo o CEP, apenas teclado numérico */}
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      {/* Botão para buscar as informações pela API atraves do numero do CEP */}
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {address && (
        <View>
          {/* mostrar o numero do cep */}
          <Text>CEP: {address.cep}</Text>
          {/* mostrar o "terreno" */}
          <Text>Rua: {address.logradouro}</Text>
          {/* mostrar o bairro */}
          <Text>Bairro: {address.bairro}</Text>
          {/* mostrar a localização */}
          <Text>Cidade: {address.localidade}</Text>
          {/* mostrar o estado federal*/}
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
