import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
import { selectStatusCode } from "../../redux/message/message.selectors";
import { checkIsRegisteredAmbulance, uploadImage } from "../../apis/core.apis";
import messages from "../../uitls/message.data";

import BackgroundImage from "../../components/background-screen.component";
import ButtonText from "../../components/button-text.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";
import CustomInputLabel from "../../components/custom-input-label.component";
import ImageCapture from "../../components/image-capture.component";
import MessageModal from "../../components/message-modal.component";
import Spinner from "../../components/spinner.component";
import Header from "../../components/header.component";
import Message from "../../components/message.component";

const RegisterAmbulanceScreen = ({
    navigation,
    currentUser,
    currentAmbulance,
    token,
    registerAmbulance,
    updateAmbulance,
    unregisterAmbulance,
    statusCode
}) => {
    const [displayName, setDisplayName] = useState(currentUser.displayName || "");
    const [messageModal, setMessageModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
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
            const ambulance = {
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
        setLoading(true);
        if (isRegistered) {
            setUpdateModal(false);
            return;
        }
        if (identityCard.base64) {
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
            setLoading(false);
        }
        setUpdateModal(false);
    };

    const handleUnregister = () => {
        setIdentityCard({ uri: null });
        unregisterAmbulance(token, currentAmbulance.id);
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
                        message={messages.registered}
                        onSubmit={handleRegister}
                    />
                )}
                {updateModal && (
                    <MessageModal
                        onClose={() => setUpdateModal(false)}
                        message={messages[100]}
                        onSubmit={handleUpdate}
                    />
                )}
                {cancel && (
                    <MessageModal
                        message={messages[101]}
                        onSubmit={handleUnregister}
                        onClose={() => setCancel(false)}
                    />
                )}
                {loading && <Spinner />}
                {statusCode && (
                    <Message message={messages[statusCode]} isMessage={statusCode < 400} />
                )}
                {currentNote ? (
                    <MessageModal
                        onClose={() => setCurrentNote(null)}
                        message={currentNote}
                        isMessage
                        isConfirm
                    />
                ) : null}
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
                            isWarning={
                                currentAmbulance &&
                                currentAmbulance.note &&
                                !!currentAmbulance.note.identityCard
                            }
                            showWarning={() => setCurrentNote(currentAmbulance.note.identityCard)}
                        />
                        <ImageCapture
                            source={driverLicense.uri}
                            label="Giấy đăng ký xe"
                            action={setDriverLicense}
                            isWarning={
                                currentAmbulance &&
                                currentAmbulance.note &&
                                !!currentAmbulance.note.driverLicense
                            }
                            showWarning={() => setCurrentNote(currentAmbulance.note.driverLicense)}
                        />
                        <ImageCapture
                            source={registerLicense.uri}
                            label="Giấy phép lái xe"
                            action={setRegisterLicense}
                            isWarning={
                                currentAmbulance &&
                                currentAmbulance.note &&
                                !!currentAmbulance.note.registerLicense
                            }
                            showWarning={() =>
                                setCurrentNote(currentAmbulance.note.registerLicense)
                            }
                        />
                        <ImageCapture
                            source={registryCertificate.uri}
                            label="Giấy đăng kiểm"
                            action={setRegistryCertificate}
                            isWarning={
                                currentAmbulance &&
                                currentAmbulance.note &&
                                !!currentAmbulance.note.registryCertificate
                            }
                            showWarning={() =>
                                setCurrentNote(currentAmbulance.note.registryCertificate)
                            }
                        />
                    </View>
                </KeyboardAvoiding>
                {currentAmbulance ? (
                    <View style={styles.groupAction}>
                        <ButtonText
                            textContent="Hủy đăng ký"
                            styleText={styles.text}
                            styleButton={[
                                styles.button,
                                { marginRight: 10, paddingHorizontal: 40 }
                            ]}
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
                        styleButton={[styles.button, { paddingHorizontal: 55 }]}
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
    token: selectToken,
    statusCode: selectStatusCode
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
        width: "95%",
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
        backgroundColor: "#f3f3f4",
        borderRadius: 25,
        paddingVertical: 7,
        marginBottom: 20,
        paddingHorizontal: 50
    },
    text: {
        textAlign: "center",
        marginVertical: 3,
        color: "#222",
        fontSize: 12,
        fontFamily: "Texgyreadventor-bold",
        justifyContent: "center"
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
    },
    note: {
        position: "absolute",
        bottom: 0,
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        justifyContent: "center",
        alignItems: "center",
        left: 0
    },
    noteContent: {
        width: "95%",
        height: 150,
        backgroundColor: "#fff"
    }
});
