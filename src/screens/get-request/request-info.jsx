import React from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
} from "react-native";
import BackgroundImage from "../../components/background-screen.component";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CountDown from "react-native-countdown-component";
import Header from "../../components/header.component";
import ButtonText from "../../components/button-text.component";
import rem from "../../components/constant.unit";

function RequestInfoScreen(props) {
    return (
        <SafeAreaView style={styles.container}>
            <BackgroundImage>
                <Header
                    title="Yêu cầu mới từ bệnh nhân"
                    passedIcon={() => (
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={50}
                            color="#a2a2db"
                            style={{}}
                            onPress={() => props.navigation.openDrawer()}
                        />
                    )}
                    styleText={{
                        fontSize: 18,
                        color: "#522289",
                        marginLeft: 20,
                    }}
                />
                {/* Điểm đến */}
                <View
                    style={{
                        flex: 2,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        backgroundColor: "rgba(211, 219, 240, 0.5)",
                        borderRadius: 10,
                    }}
                >
                    <View style={{}}>
                        <MaterialCommunityIcons
                            name="map-marker-radius"
                            size={30}
                            color="#a2a2db"
                            style={{
                                width: 30,
                            }}
                        />
                        <Text>18km</Text>
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            Điểm đến
                        </Text>
                        <Text>Bệnh viện Quân Y</Text>
                        <Text>365 Lê Văn Việt, Quận 9, TP.HCM</Text>
                    </View>
                </View>

                {/* Vị trí bạn & bệnh nhân */}
                <View
                    style={{
                        flex: 4,
                        flexDirection: "column",
                        backgroundColor: "rgba(211, 219, 240, 0.5)",
                        marginTop: 10,
                        borderRadius: 10,
                    }}
                >
                    {/* Vị trí của bạn */}
                    <View style={styles.placeYouAndPatient}>
                        <View style={{}}>
                            <MaterialIcons
                                name="my-location"
                                size={30}
                                color="green"
                                style={{
                                    width: 30,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                            }}
                        >
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                Vị trí của bạn
                            </Text>
                            <Text>365 Lê Văn Việt, Quận 9, TP.HCM</Text>
                        </View>
                    </View>
                    {/* Vị trí bệnh nhân */}
                    <View style={styles.placeYouAndPatient}>
                        <View style={{}}>
                            <MaterialIcons
                                name="location-on"
                                size={30}
                                color="red"
                                style={{
                                    width: 30,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                            }}
                        >
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                Vị trí bệnh nhân
                            </Text>
                            <Text>302 Nguyễn Ảnh Thủ, Quận 12, TP.HCM</Text>
                        </View>
                    </View>
                    <CountDown
                        until={10}
                        digitStyle={styles.timeCountdown}
                        onFinish={() => {}}
                        size={20}
                        timeToShow={["S"]}
                        timeLabels={{ s: "giây" }}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginHorizontal: 20,
                            paddingVertical: 20,
                        }}
                    >
                        <ButtonText
                            textContent="Chấp nhận"
                            gotoScreen={() => {
                                props.navigation.navigate("AcceptRequest");
                            }}
                            styleButton={styles.button_accept}
                            styleText={styles.button_accept_content}
                        />
                        <ButtonText
                            textContent="Hủy"
                            gotoScreen={() => {
                                props.navigation.navigate("Home");
                            }}
                            styleButton={styles.button_cancel}
                            styleText={styles.button_cancel_content}
                        />
                    </View>
                </View>
            </BackgroundImage>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

    placeYouAndPatient: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 20,
    },

    timeCountdown: {
        borderRadius: 96,
        backgroundColor: "white",
        marginTop: 20,
    },
    button_accept: {
        backgroundColor: "green",
        width: 10 * rem,
    },
    button_accept_content: {
        color: "#FFF",
        fontFamily: "Nunito_400Regular",
    },
    button_cancel: {
        width: 10 * rem,
    },
    button_cancel_content: {
        color: "#000000",
        fontFamily: "Nunito_400Regular",
    },
});

export default RequestInfoScreen;
