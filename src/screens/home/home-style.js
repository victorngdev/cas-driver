
import { StyleSheet } from "react-native";
import { Dimensions , StatusBar} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        marginTop: 20,
    },
    childHeader: {
        flexDirection: "row",
        flex: 1,
        marginTop: 10,
    },
    headerTitle: {
        flex: 5,
    },
    appName: {
        fontFamily: "Roboto_900Black",
        fontSize: 25,
        marginLeft: "10%",
        marginTop: 18,
        color: "#522289",
    },
    iconNotification: {
        borderRadius:
            Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
            ) / 2,
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        marginTop: 18,
        marginLeft: "20%",
        backgroundColor: "#fff",
    },
    icon: {
        flex: 1,
    },
    iconNoti: {
        borderRadius:
            Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
            ) / 2,
        width: 40,
        height: 40,
    },
    map: {
        marginVertical: 5,
        marginHorizontal: 10,
        flex: 5.5,
        width: 320,
        height: 380,
    },
    viewMap: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    rate: {
        flex: 1,
        width: "100%",
        marginTop: "5%",
        marginHorizontal: 10,
    },
    starList: {
        flexDirection: "row",
        width: "100%",
        height: 40,
    },
    iconStar: {
        marginHorizontal: 5,
        width: 30,
        height: 30,
    },
    text: {
        color: "#000",
        fontSize: 17,
        fontFamily: "Roboto_500Medium",
        marginTop: 10,
    },
    status: {
        flex: 1,
        width: "100%",
    },
    statusText: {
        flex: 1,
        alignSelf: "center",
        color: "#000",
        fontSize: 17,
        fontFamily: "Roboto_500Medium",
    },
    preference: {
        flex: 0.5,
        alignSelf: "center",
    },
});

export default styles;
