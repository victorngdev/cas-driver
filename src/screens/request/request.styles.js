import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        backgroundColor: "#fff",
        position: "relative",
        backgroundColor: "#fff",
        position: "relative"
    },
    transportationContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        height: "auto",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    transportation: {
        width: "95%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    groupContact: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default styles;
