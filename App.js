import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
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
import HomeScreen from "./src/Home-Screen/Home-Screen";

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: "Home", //change this att to change initial screen
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const AppContainer = createAppContainer(MainNavigator);

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
  return <AppContainer />;
};
