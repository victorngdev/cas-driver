import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";

const ArrageContainer = ({ title, options, current, onValueChange }) => (
    <View style={[styles.container]}>
        <Text style={styles.title}>{title}</Text>
        {options.map((item, index) => (
            <TouchableOpacity
                key={index}
                style={{ flexDirection: "row" }}
                onPress={() => onValueChange(item)}
            >
                {current === item && (
                    <Icon style={{ marginRight: 5 }} size={16} color="#00ff08" name="check" />
                )}
                <Text style={[styles.option, { color: current === item ? "#00ff08" : "#c7c8d6" }]}>
                    {item}
                </Text>
            </TouchableOpacity>
        ))}
    </View>
);

export default ArrageContainer;

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    },
    title: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        color: "#c7c8d6",
        marginBottom: 10
    },
    option: {
        fontFamily: "Texgyreadventor-regular",
        marginBottom: 7
    }
});
