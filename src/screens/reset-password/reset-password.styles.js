import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column"
    },
    //css for block app_logo-name
    block_logo_name: {
        flex: 2,
        marginVertical: 40
    },
    //css for block button
    block_button: {
        flex: 4,
        flexDirection: "column",
        alignItems: "center"
    },
    warning: {
        width: "90%",
        color: "#ff0000",
        fontFamily: "Texgyreadventor-regular",
        fontSize: 13,
        marginBottom: 5
    },

    title: {
        fontFamily: "Texgyreadventor-regular",
        width: "90%",
        marginBottom: 10,
        fontSize: 13
    },
    invalid: {
        fontFamily: "Texgyreadventor-regular",
        width: "90%",
        marginBottom: 10,
        fontSize: 12,
        color: "#ff0000"
    },
    otp: {
        fontFamily: "Texgyreadventor-regular",
        width: "90%",
        fontSize: 16,
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: "rgba(0, 0, 0, 0.85)",
        borderRadius: 5
    },
    groupAction: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 0.5,
        marginTop: 20
    },
    action: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 15,
        marginVertical: 7
    }
});

export default styles;
