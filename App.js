import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

const App = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress(null);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {address && (
        <View>
          <Text>CEP: {address.cep}</Text>
          <Text>Rua: {address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};

export default App;