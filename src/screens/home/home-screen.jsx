import React from 'react';
import { Text, View } from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import styles from './home-style';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeStack = createStackNavigator();

function HomeScreen(props) {
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
          }}>Trang chủ</Text>
        {/* ko hieu */}
        </View>
      </BackgroundImage>
    </View>
  )
}

export default HomeScreen;

