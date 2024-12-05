import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableRipple, Switch } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const HomeHeader = ({ title, toggleAction, isReady, navigation }) => (
    <View style={styles.header}>
        <MaterialIcons
            style={styles.hamburger}
            name="menu"
            size={20}
            color="#a2a2db"
            onPress={() => navigation.openDrawer()}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.status}>
            <TouchableRipple onPress={() => toggleAction()}>
                <View pointerEvents="none">
                    <Switch value={isReady} />
                </View>
            </TouchableRipple>
        </View>
    </View>
);

export default HomeHeader;

const styles = StyleSheet.create({
    header: {
        position: "relative",
        height: "auto",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    hamburger: {
        flex: 1,
        paddingLeft: 10
    },
    title: {
        flex: 2,
        textAlign: "center",
        fontFamily: "Texgyreadventor-bold",
        fontSize: 16,
        color: "#444444"
    },
    status: {
        flex: 1,
        justifyContent: "center"
    }
});
