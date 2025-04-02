import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const AddProduct = () => {
  const params = useLocalSearchParams();

  // Converte os valores para string para evitar o erro do TextInput
  const [nome, setNome] = useState(String(params.nome || ''));
  const [dataFabricacao, setDataFabricacao] = useState(String(params.fabricacao || ''));
  const [dataValidade, setDataValidade] = useState(String(params.validade || ''));
  const [quantidade, setQuantidade] = useState(String(params.quantidade || ''));
  const [armazenamento, setArmazenamento] = useState(String(params.armazenamento || ''));
  const [tipo, setTipo] = useState(String(params.tipo || ''));

  const handleSalvar = () => {
    console.log('Produto salvo:', {
      nome,
      dataFabricacao,
      dataValidade,
      quantidade,
      armazenamento,
      tipo,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicione mais informações sobre o produto</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do produto"
      />

      <Text style={styles.label}>Data de Fabricação</Text>
      <TextInput
        style={styles.input}
        value={dataFabricacao}
        onChangeText={setDataFabricacao}
        placeholder="Digite a data de fabricação"
      />

      <Text style={styles.label}>Data de Validade</Text>
      <TextInput
        style={styles.input}
        value={dataValidade}
        onChangeText={setDataValidade}
        placeholder="Digite a data de validade"
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Armazenamento</Text>
      <TextInput
        style={styles.input}
        value={armazenamento}
        onChangeText={setArmazenamento}
        placeholder="Digite o local de armazenamento"
      />

      <Text style={styles.label}>Tipo</Text>
      <TextInput
        style={styles.input}
        value={tipo}
        onChangeText={setTipo}
        placeholder="Digite o tipo do produto"
      />

      <Pressable style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>SALVAR</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProduct;
