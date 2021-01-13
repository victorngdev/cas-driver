import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Image, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const Place = ({ place: { name, address }, icon, isEditable }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newAddress, setNewAddress] = useState(address);

    return (
        <View style={styles.place}>
            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={{ uri: icon }} />
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
                <Text style={styles.address}>{address}</Text>
            </View>
        </View>
    );
};

export default Place;

const styles = StyleSheet.create({
    place: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        borderColor: "#000",
        borderWidth: 0.35,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 2
    },
    group: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        flexBasis: "25%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column"
    },
    location: {
        flex: 1,
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
        fontSize: 11,
        color: "#6c7fa6",
        marginBottom: 5,
        fontFamily: "Texgyreadventor-bold"
    }
});
