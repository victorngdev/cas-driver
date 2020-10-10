import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackgroundImage from '../../components/background-screen.component';

function RegisterCarScreen(props) {
  return (
    <View style={styles.container}>
      <BackgroundImage>
        <Text>History Screen</Text>
      </BackgroundImage>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  }
}) 

export default RegisterCarScreen;