import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        position: "relative",
    },
    map: {
        // width: "100%",
        // height: "75%"
        flex: 1
    },
    modal: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        opacity: 0,
        zIndex: -1
    },
    modalContent: {
        width: "90%",
        height: "90%",
        backgroundColor: "#fff",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    groupTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    },
    modalTitle: {
        fontFamily: "Texgyreadventor-bold",
        color: "#000",
        fontSize: 16,
        textTransform: "uppercase"
    },
    requestType: {
        fontFamily: "Texgyreadventor-bold",
        color: "#00960F",
        borderColor: "#00960F",
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 15,
        fontSize: 10,
        textTransform: "uppercase",
        marginLeft: 10
    },
    range: {
        fontFamily: "Texgyreadventor-regular",
        color: "#000",
        fontSize: 10,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 2,
        paddingHorizontal: 5
    },
    requestDetails: {
        width: "100%",
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'green'
    },
    requesterInfo: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: "#444",
        borderWidth: 0.25,
        marginVertical: 2
    },
    itemInfo: {
        marginVertical: 2
    },
    itemLabel: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 12,
        color: "#000"
    },
    itemValue: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 13,
        color: "#000"
    },
    groupAction: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10
    },
    action: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 15,
        color: "#000",
        borderColor: "#00960F",
        borderWidth: 1,
        borderRadius: 25,
        color: "#00960F",
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    reject: {
        color: "#ff0000",
        borderColor: "#ff0000"
    },
    finish: {
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 30
    },
    counter: {
        fontFamily: "Texgyreadventor-bold"
    },
    transportationContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    transportation: {
        width: "85%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    groupContact: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    optionContainer: {
        flex: 1,
        paddingVertical: 20
    },
    option: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    optionValue: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 14,
        color: "#444"
    },
    optionOther: {
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 25,
        marginTop: 10,
        fontFamily: "Texgyreadventor-regular",
        fontSize: 14
    },
    requestStatus: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 18
    },
    message: {
        fontFamily: "Texgyreadventor-regular",
        fontSize: 14,
        color: "#444",
        marginVertical: 10
    }
});

export default styles;
