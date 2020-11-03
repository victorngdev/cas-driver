import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Place = ({ place: { name, address, date, time }, icon, title, distance, isEditable }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newAddress, setNewAddress] = useState(address);

    return (
        <View style={date ? styles.place_history : styles.place}>
            {!date ? (
                <View style={styles.icon}>
                    <Image style={{ width: 25, height: 25, marginRight: 10 }} source={{ uri: icon }} />
                    {title ? <Text style={styles.title}>{title}</Text> : null}
                </View>
            ) : (
                <Image style={{ width: 25, height: 25, marginRight: 10 }} source={{ uri: icon }} />
            )}
            <View style={styles.location}>
                <View style={styles.group}>
                    {isEdit ? (
                        <TextInput
                            defaultValue={newAddress}
                            onChangeText={value => setNewAddress(value)}
                            style={styles.name}
                            autoFocus={isEdit}
                        />
                    ) : (
                        <Text style={styles.name}>{name}</Text>
                    )}
                    {isEditable ? (
                        isEdit ? (
                            <Icon
                                onPress={() => setIsEdit(false)}
                                style={{ marginLeft: 10 }}
                                name="check"
                                size={18}
                                color="#460084"
                            />
                        ) : (
                            <Icon
                                onPress={() => setIsEdit(true)}
                                style={{ marginLeft: 10 }}
                                name="edit"
                                size={18}
                                color="#460084"
                            />
                        )
                    ) : null}
                </View>
                {distance ? <Text style={styles.distance}>{distance} km</Text> : null}
                <Text style={styles.address}>{address}</Text>
                {date ? (
                    <View style={styles.dateTime}>
                        <View style={styles.item_history}>
                            <Image style={styles.iconDateTime} source={require("../../assets/icons/date-icon.png")} />
                            <Text style={styles.value_history}>{date}</Text>
                        </View>
                        <View style={styles.item_history}>
                            <Image style={styles.iconDateTime} source={require("../../assets/icons/time-icon.png")} />
                            <Text style={styles.value_history}>{time}</Text>
                        </View>
                    </View>
                ) : null}
            </View>
        </View>
    );
};

export default Place;

const styles = StyleSheet.create({
    place: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 0.5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 2
    },
    group: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    distance: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 10,
        color: "#460084",
        borderColor: "#460084"
    },
    place_history: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        opacity: 0.75,
        borderRadius: 10,
        paddingVertical: 10,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5
    },
    icon: {
        flexBasis: "25%",
        alignItems: "center"
    },
    iconDateTime: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    title: {
        color: "#26324A",
        fontFamily: "Texgyreadventor-regular",
        fontSize: 12
    },
    location: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 5
    },
    name: {
        fontSize: 14,
        color: "#26324A",
        fontFamily: "Texgyreadventor-bold"
    },
    address: {
        fontSize: 12,
        color: "#4F5C77",
        marginBottom: 5,
        fontFamily: "Texgyreadventor-regular"
    },
    dateTime: {
        width: "80%",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center"
    },
    item_history: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    value_history: {
        color: "#26324A",
        fontSize: 13,
        fontFamily: "Texgyreadventor-regular"
    }
});
