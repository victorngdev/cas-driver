import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import BackgroundImage from "../../components/background-screen.component";
import ButtonText from "../../components/button-text.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";
import Header from "../../components/header.component";

function RegisterCarScreen(props) {
    return (
        <BackgroundImage>
            <KeyboardAvoiding style={styles.container}>
            <Header
                        title="Đăng kí xe"
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
                <View style={styles.header}>
                   
                    <Text style={styles.securityText}>
                        Thông tin cá nhân sẽ được bảo mật theo chính sách, quy định của nhà nước
                    </Text>
                </View>
                <View style={styles.registerTextInfo}>
                    <View style={styles.name}>
                        <Text style={styles.titleInfo}>Họ và tên</Text>
                        <TextInput defaultValue="Lê Quang Huy" style={styles.titleInput} placeholder="" />
                    </View>
                    <View style={styles.phone}>
                        <Text style={styles.titleInfo}>Số điện thoại</Text>
                        <TextInput
                            defaultValue="0931738872"
                            keyboardType="numeric"
                            style={styles.titleInput}
                            placeholder=""
                        />
                    </View>
                    <View style={styles.licensePlate}>
                        <Text style={styles.titleInfo}>Biển số xe</Text>
                        <TextInput defaultValue="71 - C1 825.23" style={styles.titleInput} placeholder="" />
                    </View>
                </View>

                <ButtonText
                    textContent="Tiếp tục"
                    styleText={styles.text}
                    styleButton={styles.button}
                    gotoScreen={() => props.navigation.navigate("RegisterCarImage")}
                />
            </KeyboardAvoiding>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "90%",
        height: "100%",
        flexDirection: "column"
    },
    header: {
        marginTop: 30,
        alignContent: "center"
    },
    headerTitle: {
        textAlign: "center",
        color: "#000",
        fontSize: 30,
        fontFamily: "Texgyreadventor-regular"
    },
    securityText: {
        marginTop: 10,
        marginHorizontal: 8,
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Texgyreadventor-regular",
        color: "#777"
    },
    registerTextInfo: {
        marginTop: 25,
        marginHorizontal: 10
    },
    titleInfo: {
        marginTop: 10,
        fontSize: 14,
        color: "#000",
        fontFamily: "Texgyreadventor-regular",
        color: "#4F5C77"
    },
    titleInput: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: "Texgyreadventor-regular",
        backgroundColor: "#fff",
        opacity: 0.75,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 25,
        color: "#4F5C77"
    },
    button: {
        marginTop: 30,
        backgroundColor: "#FFAB2E",
        borderRadius: 25
    },
    text: {
        textAlign: "center",
        marginVertical: 5,
        color: "#FFF",
        fontSize: 17,
        fontFamily: "Texgyreadventor-regular",
        justifyContent: "center"
    }
});

export default RegisterCarScreen;
