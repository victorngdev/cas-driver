import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

import HomeScreen from "../../screens/home/home.component";
import RegisterAmbulanceScreen from "../../screens/register-ambulance/register-ambulance.component";
import HistoryScreen from "../../screens/history/history.component";
import AccountScreen from "../../screens/account-info/account-info.component";

const Tab = createBottomTabNavigator();

const COLORS = {
    primary: "#fc6d3f",
    secondary: "#cdcdd2",
    white: "#fff"
};

const Tabs = () => (
    <Tab.Navigator
        tabBarOptions={{
            style: styles.navigator,
            activeTintColor: COLORS.primary,
            labelStyle: styles.label,
            keyboardHidesTabBar: true
        }}
        initialRouteName="Trang chủ"
    >
        <Tab.Screen
            name="Trang chủ"
            component={HomeScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon
                        size={18}
                        color={focused ? COLORS.primary : COLORS.secondary}
                        name="home"
                    />
                )
            }}
        />
        <Tab.Screen
            name="Lịch sử"
            component={HistoryScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon
                        size={18}
                        color={focused ? COLORS.primary : COLORS.secondary}
                        name="clock"
                    />
                ),
                unmountOnBlur: true
            }}
        />
        <Tab.Screen
            name="Đăng ký xe"
            component={RegisterAmbulanceScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon
                        size={18}
                        color={focused ? COLORS.primary : COLORS.secondary}
                        name="shipping-fast"
                    />
                )
            }}
        />
        <Tab.Screen
            name="Tài khoản"
            component={AccountScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Icon
                        size={18}
                        color={focused ? COLORS.primary : COLORS.secondary}
                        name="user-cog"
                    />
                )
            }}
        />
    </Tab.Navigator>
);

export default Tabs;

const styles = StyleSheet.create({
    navigator: {
        borderTopWidth: 0.25,
        backgroundColor: "white",
        elevation: 0,
        height: 45,
        paddingTop: 10
    },
    tabActive: {
        top: -16,
        justifyContent: "center",
        alignItems: "center",
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: COLORS.primary
    },
    label: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 11,
        marginBottom: 2
    }
});
