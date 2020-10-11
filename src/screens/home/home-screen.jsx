import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableRipple, Switch} from 'react-native-paper';

const HomeStack = createStackNavigator();

function HomeScreen(props) {

  const [isAction, setIsAction] = React.useState(false);

  const toggleAction = () => {
    setIsAction(!isAction);
  }

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View>
          <View style={{
            flexDirection: 'row',
            marginTop: 40,
            alignItems: 'center',
            paddingHorizontal: 20
          }}>

            <Icon name='menu' size={30} color='#a2a2db' style={{
              width: 20
            }} onPress={() => props.navigation.openDrawer()} />

            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#522289',
              marginLeft: 50
            }}>Trang chủ</Text>

            <TouchableRipple onPress={() => {toggleAction()}}>
              <View style={styles.preference}>
                <View pointerEvents="none">
                  <Switch value={isAction} />
                </View>
              </View>
            </TouchableRipple>
          </View>
        </View>
        <Button
          title='Request Info'
          onPress={() => props.navigation.navigate('RequestInfo')}
        />
      </BackgroundImage>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  preference: {
    justifyContent: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  }
});

export default HomeScreen;

