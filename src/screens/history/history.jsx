import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BackgroundImage from '../../components/background-screen.component';

function HistoryScreen(props) {
  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={{
          flexDirection: 'row',
          marginTop: 40,
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
          <Icon name='menu' size={30} color='#a2a2db' style={{
            width: 20
          }} onPress={() => props.navigation.openDrawer()}/>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#522289',
            marginLeft: 50
          }}>Lịch sử</Text>
        </View>
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

export default HistoryScreen;