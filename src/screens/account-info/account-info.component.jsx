import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { updateUser, logout } from "../../redux/user/user.actions";
import messages from "../../uitls/message.data";
import { selectStatusCode } from "../../redux/message/message.selectors";

import BackgroundImage from "../../components/background-screen.component";
import Header from "../../components/header.component";
import AvatarNameCol from "../../components/avatar-name-column.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";
import Spinner from "../../components/spinner.component";
import CustomModal from "../../components/custom-modal.componet";
import MessageModal from "../../components/message-modal.component";

const firebaseConfig = {
    apiKey: "AIzaSyA1akYjqm5cVgCJvcgAFVguS0sw70hv4ds",
    authDomain: "charitym-ambulance.firebaseapp.com",
    databaseURL: "https://charitym-ambulance.firebaseio.com",
    projectId: "charitym-ambulance",
    storageBucket: "charitym-ambulance.appspot.com",
    messagingSenderId: "801731513492",
    appId: "1:801731513492:web:30978d836981cb9b6d3881"
};

const AccountScreen = ({ currentUser, token, updateUser, statusCode, logout }) => {
    const [linkImage, setLinkImage] = useState(currentUser.imageUrl);
    const [displayName, setDisplayName] = useState(currentUser.displayName);
    const [phone, setPhone] = useState(currentUser.phone);
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);
    const [otp, setOtp] = useState(null);
    const [invalidOTP, setInvalidOTP] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        statusCode && setLoading(false);
    }, [statusCode]);

    const handleUpdate = () => {
        if (phone !== currentUser.phone) {
            try {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                phoneProvider
                    .verifyPhoneNumber(`+84${phone.slice(1)}`, recaptchaVerifier.current)
                    .then(setVerificationId);
            } catch (error) {
                console.log(error);
            }
        } else {
            updateUserProfile();
        }
    };

    const confirmCode = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
            await firebase.auth().signInWithCredential(credential);
            updateUserProfile();
        } catch (error) {
            setInvalidOTP("Mã OTP không hợp lệ");
        }
    };

    const updateUserProfile = () => {
        setVerificationId(null);
        setLoading(true);
        const image =
            linkImage !== currentUser.imageUrl
                ? {
                      uri: linkImage,
                      name: linkImage.substring(linkImage.lastIndexOf("/") + 1),
                      type: "image/png"
                  }
                : linkImage;
        updateUser(currentUser.id, token, { displayName, phone, image });
    };

    return (
        <BackgroundImage>
            {loading && <Spinner />}
            {statusCode && (
                <MessageModal message={messages[statusCode]} isMessage={statusCode < 400} />
            )}
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            {!!verificationId && (
                <CustomModal title="Xác thực OTP">
                    <Text style={styles.title}>Mã OTP *</Text>
                    {invalidOTP && <Text style={styles.invalid}>{invalidOTP}</Text>}
                    <TextInput
                        keyboardType="numeric"
                        style={styles.otp}
                        onChangeText={value => setOtp(value)}
                    />
                    <View style={styles.groupAction}>
                        <TouchableOpacity onPress={() => setVerificationId(null)}>
                            <Text style={styles.button_otp}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={confirmCode}>
                            <Text style={styles.button_otp}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </CustomModal>
            )}
            <View>
                <Header title="Thông tin cá nhân" />
            </View>
            <KeyboardAvoiding style={styles.container}>
                <View style={styles.container_info}>
                    <AvatarNameCol
                        linkImage={linkImage}
                        setLinkImage={setLinkImage}
                        textContent={currentUser.displayName}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            logout();
                        }}
                    >
                        <Text style={styles.logout}>Đăng xuất</Text>
                    </TouchableOpacity>
                    <Text style={styles.joining_day_title}>Ngày tham gia</Text>
                    <Text style={styles.joining_day}>
                        {new Date(currentUser.dateCreated).toLocaleDateString("en-EN")}
                    </Text>
                </View>
                <View style={styles.container_text_input}>
                    <Text style={styles.label}>Tên *</Text>
                    <TextInput
                        style={styles.text_input}
                        defaultValue={displayName}
                        onChangeText={value => setDisplayName(value)}
                    />
                </View>
                <View style={styles.container_text_input}>
                    <Text style={styles.label}>Số điện thoại *</Text>
                    <TextInput
                        style={styles.text_input}
                        defaultValue={phone}
                        onChangeText={value => setPhone(value)}
                        keyboardType="numeric"
                    />
                </View>
            </KeyboardAvoiding>
            <TouchableOpacity onPress={handleUpdate}>
                <Text style={styles.action}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </BackgroundImage>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    token: selectToken,
    statusCode: selectStatusCode
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, token, user) => dispatch(updateUser(userId, token, user)),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

const styles = StyleSheet.create({
    //css container:
    container: {
        width: "85%",
        display: "flex",
        flexDirection: "column"
    },
    container_info: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    container_text_input: {
        marginTop: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "#B9C5E6",
        paddingBottom: 3
    },
    title: {
        fontFamily: "Texgyreadventor-regular",
        width: "90%",
        marginBottom: 10,
        fontSize: 13
    },
    invalid: {
        fontFamily: "Texgyreadventor-regular",
        width: "90%",
        marginBottom: 10,
        fontSize: 12,
        color: "#ff0000"
    },
    otp: {
        fontFamily: "Texgyreadventor-regular",
        width: "90%",
        fontSize: 16,
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: "rgba(0, 0, 0, 0.85)",
        borderRadius: 5
    },
    button_otp: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 15,
        marginVertical: 7
    },
    groupAction: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopWidth: 0.5,
        marginTop: 20
    },
    modal: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: -1,
        opacity: 0
    },
    modal__content: {
        width: "90%",
        height: "25%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: 10
    },
    status: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 18,
        marginTop: 30
    },
    action: {
        width: "85%",
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        fontFamily: "Texgyreadventor-bold",
        fontSize: 13,
        color: "#222",
        textAlign: "center",
        marginLeft: "7%",
        marginTop: 20
    },
    //css child:
    joining_day_title: {
        fontSize: 14,
        color: "#26324A",
        fontWeight: "400",
        fontFamily: "Texgyreadventor-regular"
    },
    joining_day: {
        fontSize: 16,
        color: "#26324A",
        fontWeight: "600",
        fontFamily: "Texgyreadventor-regular"
    },
    label: {
        fontSize: 12,
        fontFamily: "Texgyreadventor-regular",
        color: "#787881"
    },
    text_input: {
        width: "85%",
        marginTop: 3,
        fontSize: 16,
        fontFamily: "Texgyreadventor-regular",
        color: "#494958"
    },
    logout: {
        fontFamily: "Texgyreadventor-bold",
        color: "#494958",
        fontSize: 13,
        marginBottom: 10
    }
});
