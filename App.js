import React from "react";

// import { AppLoading } from "expo";
// import {
//   useFonts,
//   Roboto_500Medium,
//   Roboto_900Black,
//   Roboto_700Bold,
// } from "@expo-google-fonts/roboto";
// import {
//   Nunito_400Regular,
//   Nunito_800ExtraBold,
// } from "@expo-google-fonts/nunito";
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';


import LoginScreen from "./src/screens/login/login-screen";
import HomeScreen from "./src/screens/home/home-screen";
import DrawerContent from './src/screens/drawer/drawer-content';

const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}


// const MainNavigator = createStackNavigator(
//   {
//     Login: LoginScreen,
//     Home: HomeScreen
//   },
//   {
//     initialRouteName: "Login", //change this att to change initial screen
//     defaultNavigationOptions: {
//       headerShown: false,
//     },
//   }
// );

// const AppContainer = createAppContainer(MainNavigator);

// export default () => {
//   let [fontsLoaded] = useFonts({
//     Roboto_500Medium,
//     Roboto_900Black,
//     Roboto_700Bold,
//     Nunito_400Regular,
//     Nunito_800ExtraBold,
//   });
//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }
//   // from the custom App we return the component we assigned to AppContainer.
//   return <AppContainer />;
// };

export default App;
