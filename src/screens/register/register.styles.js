import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column"
    },
    //css for block app_logo-name
    block_logo_name: {
        flex: 2,
        marginTop: 40
    },
    //css for block button
    block_button: {
        flex: 5,
        flexDirection: "column",
        marginTop: 20,
        alignItems: "center"
    }
});

export default styles;
