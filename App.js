import React from "react";

import { AppLoading } from "expo";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_900Black,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  Nunito_400Regular,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import RegisterCarScreen from "./src/screens/register-car/register-car";
import HomeScreen from "./src/screens/home/home-screen";
import LoginScreen from "./src/screens/login/login-screen";
import AccountScreen from "./src/screens/account-info/account-info";
import HistoryScreen from "./src/screens/history/history";

import DrawerContent from './src/screens/drawer/drawer-content';


const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();

//Header HomeScreen
const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name='Home' component={HomeScreen} options={{
      title: 'Trang chủ',
      headerLeft: () => (
        <Icon.Button name='ios-menu' size={25} backgroundColor='#009387' onPress={() => navigation.openDrawer()}>

        </Icon.Button>
      )
    }} />
  </HomeStack.Navigator>
)

const AccountStackScreen = ({navigation}) => (
  <AccountStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <AccountStack.Screen name='AccountInfo' component={AccountScreen} options={{
      title: 'Tài khoản',
      headerLeft: () => (
        <Icon.Button name='ios-menu' size={25} backgroundColor='#009387' onPress={() => navigation.openDrawer()}>

        </Icon.Button>
      )
    }} />
  </AccountStack.Navigator>
)

export function App () {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeStackScreen}/>
        <Drawer.Screen name="Login" component={LoginScreen}/>
        <Drawer.Screen name="AccountInfo" component={AccountStackScreen}/>
        <Drawer.Screen name="History" component={HistoryScreen}/>
        <Drawer.Screen name="RegisterCar" component={RegisterCarScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_900Black,
    Roboto_700Bold,
    Nunito_400Regular,
    Nunito_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // from the custom App we return the component we assigned to AppContainer.
  return <App />;
};
