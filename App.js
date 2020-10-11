import React from "react";

import { AppLoading } from "expo";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_900Black,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Roboto_Regular from './assets/fonts/Roboto-Regular.ttf';

import {
  Nunito_400Regular,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';


import LoginScreen from "./src/screens/login/login-screen";

import DrawerContent from './src/screens/drawer/drawer-content';
import HomeScreen from "./src/screens/home/home-screen";
import AccountScreen from "./src/screens/account-info/account-info";
import RequestInfoScreen from './src/screens/get-request/request-info';
import RegisterCarScreen from "./src/screens/register-car/register-car";
import RegisterCarImageScreen from "./src/screens/register-car-image/register-car-image";
import HistoryScreen from "./src/screens/history/history";
import HistoryDetailScreen from "./src/screens/history-detail/history-detail";

const Drawer = createDrawerNavigator();

export function App () {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Login" component={LoginScreen}/>
        <Drawer.Screen name="AccountInfo" component={AccountScreen}/>
        <Drawer.Screen name="RequestInfo" component={RequestInfoScreen}/>
        <Drawer.Screen name ="History" component={HistoryScreen}/>
        <Drawer.Screen name = "RegisterCar" component={RegisterCarScreen}/>
        <Drawer.Screen name = "RegisterCarImage" component={RegisterCarImageScreen}/>
        <Drawer.Screen name = "HistoryDetail" component={HistoryDetailScreen}/>
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
    Roboto_Regular
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // from the custom App we return the component we assigned to AppContainer.
  return <App />;
};
