import FloatingActionButton from '@/components/ui/floatingActionButton';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';

type Produto = {
  id: number;
  nome: string;
  quantidade: string;
  dataValidade: string;
};

const HomeScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const mockProdutos: Produto[] = [
      { id: 1, nome: 'Banana', quantidade: '320 g', dataValidade: '12/02/25' },
      { id: 2, nome: 'Arroz', quantidade: '500 g', dataValidade: '18/12/26' },
      { id: 3, nome: 'Limpol', quantidade: '500 ml', dataValidade: '04/03/25' },
      { id: 4, nome: 'Miojo', quantidade: '300g', dataValidade: '12/03/28' },
    ];
    setProdutos(mockProdutos);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerBody}>
        <Text style={styles.title}>Minha Dispensa</Text>

        <FlatList
          data={produtos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
              <Pressable onPress={() => router.push(`/(tabs)/product/${item.id}`)}>
            <View style={styles.item}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.detalhes}>{item.quantidade} • Validade: {item.dataValidade}</Text>
            </View>
            </Pressable>
          )}
        />
      </View>

      <FloatingActionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerBody: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: '500',
  },
  detalhes: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
