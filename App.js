import React from "react";

import { AppLoading } from "expo";
import { useFonts, Roboto_500Medium, Roboto_900Black, Roboto_700Bold } from "@expo-google-fonts/roboto";
import Roboto_Regular from "./assets/fonts/Roboto-Regular.ttf";

import { Nunito_400Regular, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "./src/screens/login/login-screen";

import DrawerContent from "./src/screens/drawer/drawer-content";
import HomeScreen from "./src/screens/home/home-screen";
import AccountScreen from "./src/screens/account-info/account-info";

const Drawer = createDrawerNavigator();

export function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Login" component={LoginScreen} />
                <Drawer.Screen name="AccountInfo" component={AccountScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
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
