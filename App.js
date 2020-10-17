import React from "react";
import * as Font from "expo-font";

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
import RequestInfoScreen from "./src/screens/get-request/request-info";
import RegisterCarScreen from "./src/screens/register-car/register-car";
import RegisterCarImageScreen from "./src/screens/register-car-image/register-car-image";
import HistoryScreen from "./src/screens/history/history";
import HistoryDetailScreen from "./src/screens/history-detail/history-detail";
import AcceptRequestScreen from "./src/screens/accept-request/accept-request";
import PatientArrivedScreen from "./src/screens/patient-arrived/patient-arrived";
import RegisterScreen from "./src/screens/register-screen/register-screen";
import OtpScreen from "./src/screens/otp/otp.component";
import ResetPassScreen from "./src/screens/reset-password-screen/reset-password-screen";
import GoogleMapScreen from "./src/screens/google-map/google-map";

const Drawer = createDrawerNavigator();

class App extends React.Component {
    state = {
        assetsLoaded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            "Texgyreadventor-bold": require("./assets/fonts/texgyreadventor-bold.otf"),
            "Texgyreadventor-regular": require("./assets/fonts/texgyreadventor-regular.otf")
        });
        this.setState({ assetsLoaded: true });
    }

    render() {
        return this.state.assetsLoaded ? (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Login" drawerContent={props => <DrawerContent {...props} />}>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Login" component={LoginScreen} />
                    <Drawer.Screen name="AccountInfo" component={AccountScreen} />
                    <Drawer.Screen name="RequestInfo" component={RequestInfoScreen} />
                    <Drawer.Screen name="AcceptRequest" component={AcceptRequestScreen} />
                    <Drawer.Screen name="History" component={HistoryScreen} />
                    <Drawer.Screen name="RegisterCar" component={RegisterCarScreen} />
                    <Drawer.Screen name="Register" component={RegisterScreen} />
                    <Drawer.Screen name="Otp" component={OtpScreen} />
                    <Drawer.Screen name="ResetPass" component={ResetPassScreen} />
                    <Drawer.Screen name="RegisterCarImage" component={RegisterCarImageScreen} />
                    <Drawer.Screen name="HistoryDetail" component={HistoryDetailScreen} />
                    <Drawer.Screen name="PatientArrived" component={PatientArrivedScreen} />
                    <Drawer.Screen name="GoogleMap" component={GoogleMapScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        ) : (
            <AppLoading />
        );
    }
}

export default App;
