import React from 'react';
import {TextInput, View} from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import styles from './home-style';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <BackgroundImage></BackgroundImage>
    </View>
  )
}

export default HomeScreen;

