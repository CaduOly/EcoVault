import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import LogoWithPress from './ui/logoWithPres';

const Menu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(300))[0];

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleMenuPress = () => {
    if (modalVisible) {
      closeModal();
    } else {
      openModal();
    }
  };

  const handlePressGoTo = () => {
    closeModal();
    router.push('/(tabs)/product/add');
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer} >
        <LogoWithPress/>
      </View>

      <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton} >
        <Ionicons
          name='menu'
          size={32}
          color="white"
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={32} color="white" />
              </TouchableOpacity>
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackground}
            onPress={closeModal}
          >
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >

              {/* Conteúdo do modal */}
              <Pressable onPress={handlePressGoTo} style={styles.menuItem}>
                <Text style={styles.menuText}>Adicionar</Text>
              </Pressable>
              <Pressable onPress={closeModal} style={styles.menuItem}>
                <Text style={styles.menuText}>Descartes</Text>
              </Pressable>
              <Pressable onPress={closeModal} style={styles.menuItem}>
                <Text style={styles.menuText}>Relatórios</Text>
              </Pressable>
              <Pressable onPress={closeModal} style={styles.menuItem}>
                <Text style={styles.menuText}>SAIR</Text>
              </Pressable>
            </Animated.View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2E8B57',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 60,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#165933',
    paddingTop: 60,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Menu;
