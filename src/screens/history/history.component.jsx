import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Header from "../../components/header.component";
import BackgroundImage from "../../components/background-screen.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HistoryComponent from "../../components/history-row.component";

const screen = Dimensions.get("screen");
const widthDevice = screen.width;
const heightDevice = screen.height;

function HistoryScreen(props) {
    return (
        <BackgroundImage>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Header
                        title="Lịch Sử"
                        passedIcon={() => (
                            <Icon
                                name="menu"
                                size={30}
                                color="#a2a2db"
                                style={{ width: 20 }}
                                onPress={() => props.navigation.openDrawer()}
                            />
                        )}
                    />
                </View>
                <View style={{ flex: 9, flexDirection: "column", justifyContent: "flex-start" }}>
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1
                        }}
                    >
                        <HistoryComponent
                            image_url="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/83012519_1497814183728497_1901903877645533184_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=l92aofIVAloAX99oBIy&_nc_ht=scontent.fdad3-1.fna&oh=ac2b60cb37775a47a9c2ccc98f38fd2d&oe=5FA585D7"
                            title="Bệnh Viện A"
                            address="321 Lê Văn Việt, Quận 9"
                            goToDetails={() => props.navigation.navigate("HistoryDetail")}
                        />
                        <HistoryComponent
                            image_url="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/83012519_1497814183728497_1901903877645533184_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=l92aofIVAloAX99oBIy&_nc_ht=scontent.fdad3-1.fna&oh=ac2b60cb37775a47a9c2ccc98f38fd2d&oe=5FA585D7"
                            title="Bệnh Viện Quân Y"
                            address="321 Lê Văn Việt, Quận 9"
                            goToDetails={() => props.navigation.navigate("HistoryDetail")}
                        />
                        <HistoryComponent
                            image_url="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/83012519_1497814183728497_1901903877645533184_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=l92aofIVAloAX99oBIy&_nc_ht=scontent.fdad3-1.fna&oh=ac2b60cb37775a47a9c2ccc98f38fd2d&oe=5FA585D7"
                            title="Bệnh Viện Chợ Rẫy"
                            address="321 Lê Văn Việt, Quận 9"
                            goToDetails={() => props.navigation.navigate("HistoryDetail")}
                        />
                    </ScrollView>
                </View>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    listHistory: {
        marginTop: 10
    },
    history: {
        flexDirection: "row",
        height: 70,
        marginHorizontal: 10,
        marginVertical: 8,
        margin: 10
    },
    logo: {},
    statusLogo: {
        width: 25,
        height: 25,
        marginTop: 10,
        marginLeft: 5
    },
    app_logo: {
        width: 50,
        height: 50,
        borderRadius: 18,
        marginVertical: 10,
        marginLeft: 10
    },
    textTitle: {
        width: 150,
        color: "#000",
        fontSize: 15,
        fontFamily: "Texgyreadventor-regular",
        marginVertical: 2,
        marginLeft: 15,
        marginTop: 8
    },
    textAdd: {
        width: 150,
        color: "#4d4d4d",
        fontSize: 12,
        fontFamily: "Texgyreadventor-regular",
        marginLeft: 15
    },
    textDate: {
        width: 50,
        color: "#4d4d4d",
        fontSize: 15,
        fontFamily: "Texgyreadventor-regular",
        marginVertical: 8,
        marginLeft: 30
    },
    date: {
        color: "#5c7682",
        fontSize: 17,
        fontFamily: "Texgyreadventor-regular"
    },

    historyView: {
        width: widthDevice,
        height: heightDevice * 0.2,
        backgroundColor: "red",
        borderBottomColor: "black",
        borderBottomWidth: 1
    }
});

export default HistoryScreen;
