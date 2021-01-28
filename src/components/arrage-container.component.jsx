import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";

const mapKey = {
    createdTime: "Thời gian",
    distance: "Khoảng cách",
    requestType: "Loại yêu cầu",
    asc: "Tăng dần",
    desc: "Giảm dần",
    6: "Tất cả",
    2: "Đến bệnh viện",
    3: "Đi về nhà"
};

const ArrageContainer = ({ title, options, current, onValueChange }) => {
    return (
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
                    <Text
                        style={[styles.option, { color: current === item ? "#00ff08" : "#c7c8d6" }]}
                    >
                        {mapKey[item]}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ArrageContainer;

const styles = StyleSheet.create({
    container: {
        marginRight: 20
    },
    title: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 11,
        color: "#c7c8d6",
        marginBottom: 10
    },
    option: {
        fontFamily: "Texgyreadventor-regular",
        marginBottom: 7,
        fontSize: 12
    }
});
