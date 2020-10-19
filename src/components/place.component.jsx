import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

const Place = ({ place: { name, address, date, time }, icon, title }) => (

    <View style={
        date ? stylesRequest.place_history :
        stylesRequest.place}
    >
        {!date  ?
            <View style={stylesRequest.icon}>
                <Image style={{ width: 25, height: 25, marginRight: 10 }} source={{ uri: icon }} />
                {title ? <Text style={stylesRequest.title}>{title}</Text> : null}
            </View>
            :
            <Image style={{ width: 25, height: 25, marginRight: 10 }} source={{ uri: icon }} />
        }
        <View style={stylesRequest.location}>
            <Text style={stylesRequest.name}>{name}</Text>
            <Text style={stylesRequest.address}>{address}</Text>
            {
                date ?
                    <View style={stylesRequest.dateTime}>
                        <View style={stylesRequest.item_history}>
                            <Image style={stylesRequest.iconDateTime} source={require("../../assets/icons/date-icon.png")} />
                            <Text style={stylesRequest.value_history}>{date}</Text>
                        </View>
                        <View style={stylesRequest.item_history}>
                            <Image style={stylesRequest.iconDateTime} source={require("../../assets/icons/time-icon.png")} />
                            <Text style={stylesRequest.value_history}>{time}</Text>
                        </View>
                    </View> : null
            }
        </View>
    </View>




);

export default Place;

const stylesRequest = StyleSheet.create({
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
