import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const Add = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha como deseja adicionar um produto</Text>

      <Pressable
        style={styles.option}
        onPress={() => router.push('/(tabs)/product/scanner')}
      >
        <Text style={styles.optionText}>Scanner</Text>
      </Pressable>

      <Pressable
        style={styles.option}
        onPress={() => router.push('/(tabs)/product/form/addProduct')}
      >
        <Text style={styles.optionText}>Manual</Text>
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
  },
  option: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Add;
