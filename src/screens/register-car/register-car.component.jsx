import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { registerAmbulance } from "../../redux/ambulance/ambulance.actions";

import BackgroundImage from "../../components/background-screen.component";
import ButtonText from "../../components/button-text.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";
import Header from "../../components/header.component";
import CustomInputLabel from "../../components/custom-input-label.component";
import ImageCapture from "../../components/image-capture.component";
import { uploadImage } from "../../apis/core.apis";

const RegisterCarScreen = ({ navigation, currentUser, token, registerAmbulance }) => {
    const [displayName, setDisplayName] = useState(currentUser.displayName || "");
    const [phone, setPhone] = useState(currentUser.phone || "");
    const [licensePlate, setLicensePlate] = useState("71 - B3 253.56");
    const [link, setLink] = useState(null);
    const [identityCard, setIdentityCard] = useState(null);
    const [driverLicense, setDriverLicense] = useState("https://i.ibb.co/mv2t1Gz/giayphep.jpg");
    const [registerLicense, setRegisterLicense] = useState(
        "https://i.ibb.co/L59LBBJ/giaydangkyxe.jpg"
    );
    const [registryCertificate, setRegistryCertificate] = useState(
        "https://i.ibb.co/Yb8CyJJ/giaydangkiem.jpg"
    );

    const handleRegister = async () => {
        await uploadImage(identityCard.image).then(response =>
            setLink(response.data.data.display_url)
        );
        const ambulance = {
            displayName,
            phone,
            licensePlate,
            identityCard: link,
            driverLicense,
            registerLicense,
            registryCertificate
        };

        registerAmbulance(token, currentUser.userId, ambulance);
    };

    return (
        <BackgroundImage>
            <Header title="Đăng kí xe" gotoScreen={() => navigation.goBack(null)} />
            <Text style={styles.header}>
                Cung cấp thông tin và hình ảnh để xác thực danh tính và phương tiện cứu thương
            </Text>
            <KeyboardAvoiding style={styles.container}>
                <View style={styles.basicInfo}>
                    <CustomInputLabel
                        label="Họ và tên"
                        isRequire
                        defaultValue={displayName}
                        onChangeText={value => setDisplayName(value)}
                    />
                    <CustomInputLabel
                        label="Số điện thoại"
                        onChangeText={value => setPhone(value)}
                        isRequire
                        defaultValue={phone}
                        keyboardType="numeric"
                    />
                    <CustomInputLabel
                        label="Biển số xe"
                        isRequire
                        defaultValue={licensePlate}
                        onChangeText={value => setLicensePlate(value)}
                    />
                </View>
                <View style={styles.imagePicker}>
                    <ImageCapture
                        source={(identityCard && identityCard.uri) || ""}
                        label="Chứng minh nhân dân"
                        action={setIdentityCard}
                    />
                    <ImageCapture
                        source={driverLicense}
                        label="Giấy đăng ký xe"
                        action={setDriverLicense}
                    />
                    <ImageCapture
                        source={registerLicense}
                        label="Giấy phép lái xe"
                        action={setRegisterLicense}
                    />
                    <ImageCapture
                        source={registryCertificate}
                        label="Giấy đăng kiểm"
                        action={setRegistryCertificate}
                    />
                </View>
            </KeyboardAvoiding>
            <ButtonText
                textContent="Đăng ký"
                styleText={styles.text}
                styleButton={styles.button}
                gotoScreen={handleRegister}
            />
        </BackgroundImage>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    token: selectToken
});

const mapDispatchToProps = dispatch => ({
    registerAmbulance: (token, userId, ambulance) =>
        dispatch(registerAmbulance(token, userId, ambulance))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCarScreen);

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: "75%",
        flexDirection: "column"
    },
    header: {
        marginTop: 10,
        marginHorizontal: 8,
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Texgyreadventor-regular",
        color: "#777"
    },
    basicInfo: {
        marginTop: 10,
        marginHorizontal: 10
    },
    imagePicker: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
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
        marginVertical: 10,
        backgroundColor: "#FFAB2E",
        borderRadius: 25
    },
    text: {
        textAlign: "center",
        marginVertical: 3,
        color: "#FFF",
        fontSize: 16,
        fontFamily: "Texgyreadventor-regular",
        justifyContent: "center"
    }
});
