import React from "react";
import { View, TouchableOpacity, Image, Text, Linking, StyleSheet } from "react-native";

const ContactItem = ({ icon, label, phone }) => (
    <View style={styles.contactItem}>
        <TouchableOpacity onPress={() => Linking.openURL(`tel: ${phone}`)}>
            <Image style={{ width: 25, height: 25 }} source={{ uri: icon }} />
        </TouchableOpacity>
        <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>{label}</Text>
            <Text style={styles.phone}>{phone}</Text>
        </View>
    </View>
);

export default ContactItem;

const styles = StyleSheet.create({
    contactItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    contactInfo: {
        marginLeft: 10
    },
    contactLabel: {
        fontFamily: "Texgyreadventor-bold",
        color: "#555",
        fontSize: 11
    },
    phone: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 13
    }
});
