import { router, useRouter } from 'expo-router';
import React from 'react';
import {  Image, TouchableOpacity, StyleSheet } from 'react-native';

  const handlePressGoTo = () => {
    router.push('/(tabs)');
  };

const LogoWithPress = () => {
  return (
    <TouchableOpacity
      style={styles.logoContainer}
      onPress={() => handlePressGoTo()}
    >
      <Image
        source={require('../../assets/images/image.png')}
        style={styles.logo}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
});

export default LogoWithPress;
