import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const Product = () => {
  const { id } = useLocalSearchParams();

  const produto = {
    id: 1,
    nome: 'Banana',
    quantidade: '320g',
    armazenamento: 'geladeira',
    dataValidade: '12/02/25',
    status: 'vencido',
    modoDescarte: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of.`,
  };

  const handleConsumido = () => {
    console.log('Produto consumido:', produto.nome);
  };

  const handleDescartado = () => {
    console.log('Produto descartado:', produto.nome);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{produto.nome}</Text>

      <Text style={styles.detalhes}>
        {produto.quantidade} • {produto.armazenamento}
      </Text>


      <Text style={styles.detalhes}>
        Validade: {produto.dataValidade} • {produto.status}
      </Text>

      <Text style={styles.tituloSecao}>Modo de Descarte</Text>
      <Text style={styles.modoDescarte}>{produto.modoDescarte}</Text>

      <View style={styles.acoesContainer}>
        <Pressable style={styles.botaoConsumido} onPress={handleConsumido}>
          <Text style={styles.botaoTexto}>Consumido</Text>
        </Pressable>
        <Pressable style={styles.botaoDescartado} onPress={handleDescartado}>
          <Text style={styles.botaoTexto}>Descartado</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detalhes: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  modoDescarte: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  botaoConsumido: {
    backgroundColor: '#2E8B57',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  botaoDescartado: {
    backgroundColor: '#FF6347',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Product;
