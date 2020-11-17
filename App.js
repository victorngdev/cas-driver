import React from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import store from "./src/redux/store";

import DrawerContent from "./src/screens/drawer/drawer-content.component";
import LoginScreen from "./src/screens/login/login.component";
import HomeScreen from "./src/screens/home/home.component";
import AccountScreen from "./src/screens/account-info/account-info.component";
import RegisterAmbulanceScreen from "./src/screens/register-ambulance/register-ambulance.component";
import HistoryScreen from "./src/screens/history/history.component";
import HistoryDetailScreen from "./src/screens/history-detail/history-detail.component";
import RegisterScreen from "./src/screens/register/register.component";
import OtpScreen from "./src/screens/otp/otp.component";
import ResetPassScreen from "./src/screens/reset-password/reset-password.component";

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
            <Provider store={store}>
                <NavigationContainer>
                    <Drawer.Navigator
                        initialRouteName="Login"
                        drawerContent={props => <DrawerContent {...props} />}
                    >
                        <Drawer.Screen name="Home" component={HomeScreen} />
                        <Drawer.Screen name="Login" component={LoginScreen} />
                        <Drawer.Screen name="AccountInfo" component={AccountScreen} />
                        <Drawer.Screen name="History" component={HistoryScreen} />
                        <Drawer.Screen
                            name="RegisterAmbulance"
                            component={RegisterAmbulanceScreen}
                        />
                        <Drawer.Screen name="Register" component={RegisterScreen} />
                        <Drawer.Screen name="Otp" component={OtpScreen} />
                        <Drawer.Screen name="ResetPass" component={ResetPassScreen} />
                        <Drawer.Screen name="HistoryDetail" component={HistoryDetailScreen} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </Provider>
        ) : (
            <AppLoading />
        );
    }
}

export default App;
