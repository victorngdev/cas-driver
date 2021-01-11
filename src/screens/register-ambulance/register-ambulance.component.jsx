import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import {
    clearAmbulanceNote,
    registerAmbulance,
    unregisterAmbulance,
    updateAmbulance
} from "../../redux/ambulance/ambulance.actions";
import { selectCurrentAmbulance } from "../../redux/ambulance/ambulance.selectors";
import { checkIsRegisteredAmbulance, uploadImage } from "../../apis/core.apis";
import messages from "../../uitls/message.data";

import BackgroundImage from "../../components/background-screen.component";
import ButtonText from "../../components/button-text.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";
import CustomInputLabel from "../../components/custom-input-label.component";
import ImageCapture from "../../components/image-capture.component";
import MessageModal from "../../components/message-modal.component";
import Spinner from "../../components/spinner.component";
import ReasonModal from "../../components/reason-modal.component";
import Header from "../../components/header.component";

const RegisterAmbulanceScreen = ({
    navigation,
    currentUser,
    currentAmbulance,
    token,
    registerAmbulance,
    updateAmbulance,
    unregisterAmbulance
}) => {
    const [displayName, setDisplayName] = useState(currentUser.displayName || "");
    const [messageModal, setMessageModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [phone, setPhone] = useState(currentUser.phone || "");
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(null);
    const [licensePlate, setLicensePlate] = useState(
        currentAmbulance && currentAmbulance.licensePlate
    );
    const [identityCard, setIdentityCard] = useState({
        uri:
            (currentAmbulance && currentAmbulance.identityCard) ||
            "https://i.ibb.co/ypNxXzD/cap-picture.png"
    });
    const [driverLicense, setDriverLicense] = useState({
        uri:
            (currentAmbulance && currentAmbulance.driverLicense) ||
            "https://i.ibb.co/mv2t1Gz/giayphep.jpg"
    });
    const [registerLicense, setRegisterLicense] = useState({
        uri:
            (currentAmbulance && currentAmbulance.registerLicense) ||
            "https://i.ibb.co/L59LBBJ/giaydangkyxe.jpg"
    });
    const [registryCertificate, setRegistryCertificate] = useState({
        uri:
            (currentAmbulance && currentAmbulance.registryCertificate) ||
            "https://i.ibb.co/Yb8CyJJ/giaydangkiem.jpg"
    });

    const handleRegister = async () => {
        if (isRegistered) {
            setMessageModal(false);
            return;
        }
        setMessageModal(false);
        setLoading(true);
        await uploadImage(identityCard.base64).then(response => {
            console.log(response.data.data.display_url);
            const ambulance = {
                displayName,
                phone,
                licensePlate,
                identityCard: response.data.data.display_url,
                driverLicense: driverLicense.uri,
                registerLicense: registerLicense.uri,
                registryCertificate: registryCertificate.uri
            };
            registerAmbulance(token, currentUser.id, ambulance);
            setLoading(false);
        });
    };

    const handleUpdate = async () => {
        if (isRegistered) {
            setUpdateModal(false);
            return;
        }
        if (identityCard.base64) {
            setLoading(true);
            await uploadImage(identityCard.base64).then(response => {
                const ambulance = {
                    ambulanceId: currentAmbulance.id,
                    displayName,
                    phone,
                    licensePlate,
                    identityCard: response.data.data.display_url,
                    driverLicense: driverLicense.uri,
                    registerLicense: registerLicense.uri,
                    registryCertificate: registryCertificate.uri
                };

                updateAmbulance(token, currentUser.id, ambulance);
                setLoading(false);
            });
        } else {
            updateAmbulance(token, currentUser.id, {
                ambulanceId: currentAmbulance.id,
                displayName,
                phone,
                licensePlate,
                identityCard: identityCard.uri,
                driverLicense: driverLicense.uri,
                registerLicense: registerLicense.uri,
                registryCertificate: registryCertificate.uri
            });
        }
        setUpdateModal(false);
    };

    const handleUnregister = () => {
        setIdentityCard({ uri: null });
        unregisterAmbulance(token, currentAmbulance.ambulanceId);
        setCancel(false);
    };

    const checkIsRegistered = () => {
        checkIsRegisteredAmbulance(token, licensePlate).then(
            response => response.data && setIsRegistered("Xe đã được đang ký bởi người khác")
        );
    };

    return (
        <View style={styles._container}>
            <BackgroundImage>
                {messageModal && (
                    <MessageModal
                        onClose={() => setMessageModal(false)}
                        content={messages.registered}
                        action={handleRegister}
                    />
                )}
                {updateModal && (
                    <MessageModal
                        onClose={() => setUpdateModal(false)}
                        content={messages.update}
                        action={handleUpdate}
                    />
                )}
                {cancel && (
                    <MessageModal
                        content={messages.cancel}
                        action={handleUnregister}
                        onClose={() => setCancel(false)}
                    />
                )}
                {loading && <Spinner />}
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
                            editable={false}
                        />
                        <CustomInputLabel
                            label="Số điện thoại"
                            onChangeText={value => setPhone(value)}
                            isRequire
                            defaultValue={phone}
                            keyboardType="numeric"
                            editable={false}
                        />
                        {isRegistered && <Text style={styles.warning}>{isRegistered}</Text>}
                        <CustomInputLabel
                            label="Biển số xe"
                            isRequire
                            defaultValue={currentAmbulance && currentAmbulance.licensePlate}
                            onChangeText={value => setLicensePlate(value)}
                            onBlur={checkIsRegistered}
                            onFocus={() => setIsRegistered(null)}
                        />
                    </View>
                    <View style={styles.imagePicker}>
                        <ImageCapture
                            source={identityCard.uri}
                            label="Chứng minh nhân dân"
                            action={setIdentityCard}
                        />
                        <ImageCapture
                            source={driverLicense.uri}
                            label="Giấy đăng ký xe"
                            action={setDriverLicense}
                        />
                        <ImageCapture
                            source={registerLicense.uri}
                            label="Giấy phép lái xe"
                            action={setRegisterLicense}
                        />
                        <ImageCapture
                            source={registryCertificate.uri}
                            label="Giấy đăng kiểm"
                            action={setRegistryCertificate}
                        />
                    </View>
                </KeyboardAvoiding>
                {currentAmbulance ? (
                    <View style={styles.groupAction}>
                        <ButtonText
                            textContent="Hủy đăng ký"
                            styleText={styles.text}
                            styleButton={styles.cancel}
                            gotoScreen={() => setCancel(true)}
                        />
                        <ButtonText
                            textContent="Cập nhật"
                            styleText={styles.text}
                            styleButton={styles.button}
                            gotoScreen={() => setUpdateModal(true)}
                        />
                    </View>
                ) : (
                    <ButtonText
                        textContent="Đăng ký"
                        styleText={styles.text}
                        styleButton={styles.button}
                        gotoScreen={() => setMessageModal(true)}
                    />
                )}
            </BackgroundImage>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentAmbulance: selectCurrentAmbulance,
    token: selectToken
});

const mapDispatchToProps = dispatch => ({
    registerAmbulance: (token, userId, ambulance) =>
        dispatch(registerAmbulance(token, userId, ambulance)),
    updateAmbulance: (token, userId, ambulance) =>
        dispatch(updateAmbulance(token, userId, ambulance)),
    unregisterAmbulance: (token, ambulanceId) => dispatch(unregisterAmbulance(token, ambulanceId)),
    clearAmbulanceNote: () => dispatch(clearAmbulanceNote())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAmbulanceScreen);

const styles = StyleSheet.create({
    _container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        position: "relative"
    },
    container: {
        width: "90%",
        height: "78%",
        flexDirection: "column"
    },
    header: {
        marginTop: 10,
        marginHorizontal: 8,
        fontSize: 11,
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
        marginBottom: 10,
        backgroundColor: "#FFAB2E",
        borderRadius: 25,
        paddingVertical: 3
    },
    text: {
        textAlign: "center",
        marginVertical: 3,
        color: "#FFF",
        fontSize: 14,
        fontFamily: "Texgyreadventor-regular",
        justifyContent: "center"
    },
    cancel: {
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: "#000",
        borderRadius: 25,
        paddingVertical: 3
    },
    groupAction: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    warning: {
        fontFamily: "Texgyreadventor-regular",
        color: "#ff0000",
        fontSize: 12
    }
});
