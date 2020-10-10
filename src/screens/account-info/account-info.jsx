import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackgroundImage from '../../components/background-screen.component';

function AccountScreen(props) {
  return (
    <View style={styles.container}>
      <BackgroundImage>
        <Text>Account Screen</Text>
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

export default AccountScreen;