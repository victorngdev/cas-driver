import React, { useState, useRef } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { updateStatusCode } from "../../redux/message/message.action";
import { selectStatusCode } from "../../redux/message/message.selectors";
import messages from "../../uitls/message.data";
import { checkExistedPhoneNumber, registerAccount } from "../../apis/core.apis";

import TextInputIcon from "../../components/text-input-with-icon.component";
import ButtonText from "../../components/button-text.component";
import TextLinking from "../../components/text-linking.component";
import LogoName from "../../components/logo-name.component";
import BackgroundLogin from "../../components/background-screen-login.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";
import Modal from "../../components/modal.component";
import Spinner from "../../components/spinner.component";
import Message from "../../components/message.component";

import styles from "./register.styles";

const firebaseConfig = {
    apiKey: "AIzaSyA1akYjqm5cVgCJvcgAFVguS0sw70hv4ds",
    authDomain: "charitym-ambulance.firebaseapp.com",
    databaseURL: "https://charitym-ambulance.firebaseio.com",
    projectId: "charitym-ambulance",
    storageBucket: "charitym-ambulance.appspot.com",
    messagingSenderId: "801731513492",
    appId: "1:801731513492:web:30978d836981cb9b6d3881"
};

const RegisterScreen = ({ statusCode, navigation, updateStatusCode }) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState(null);
    const [otp, setOtp] = useState(null);
    const [invalidOTP, setInvalidOTP] = useState(null);
    const [validation, setValidation] = useState({
        invalidPhone: null,
        invalidPassword: null,
        invalidConfirmPassword: null,
        phoneExisted: null,
        invalidName: null
    });

    const handleRegister = () => {
        const {
            invalidPhone,
            invalidPassword,
            invalidConfirmPassword,
            invalidName,
            phoneExisted
        } = validation;
        if (!(username && password && confirmPassword && name)) {
            return;
        }
        if (
            invalidPhone ||
            invalidPassword ||
            invalidConfirmPassword ||
            invalidName ||
            phoneExisted
        ) {
            return;
        }
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            phoneProvider
                .verifyPhoneNumber(`+84${username.slice(1)}`, recaptchaVerifier.current)
                .then(setVerificationId);
        } catch (error) {
            console.log(error);
        }
        // setLoading(true);
        // registerAccount({ username, password, displayName: name, phone: username }).then(
        //     response => {
        //         updateStatusCode(208);
        //         setTimeout(() => {
        //             navigation.replace("Login");
        //         }, 2000);
        //     }
        // );
    };

    const confirmCode = async () => {
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
            await firebase.auth().signInWithCredential(credential);
            setVerificationId(null);
            setLoading(true);
            await registerAccount({ username, password, displayName: name, phone: username }).then(
                response => {
                    updateStatusCode(208);
                    setTimeout(() => {
                        navigation.replace("Login");
                    }, 2000);
                }
            );
        } catch (error) {
            setInvalidOTP("Mã OTP không hợp lệ");
        }
    };

    const checkPhone = async () => {
        const valid = username.match(/^[0][0-9]{9}$/);
        if (valid) {
            await checkExistedPhoneNumber(username).then(
                response =>
                    response.data &&
                    setValidation({ ...validation, phoneExisted: messages["phoneExisted"] })
            );
        } else {
            setValidation({ ...validation, invalidPhone: messages["invalidPhone"] });
        }
    };

    const checkPassword = () => {
        const valid = password.length < 6;
        valid && setValidation({ ...validation, invalidPassword: messages["invalidPassword"] });
    };

    const checkConfirmPassword = () => {
        const valid = password !== confirmPassword;
        valid &&
            setValidation({
                ...validation,
                invalidConfirmPassword: messages["invalidConfirmPassword"]
            });
    };

    const checkName = () => {
        const valid = name.match(/[a-zA-Z ]+$/);
        !valid && setValidation({ ...validation, invalidName: messages["invalidName"] });
    };

    return (
        <BackgroundLogin>
            {loading && <Spinner />}
            {statusCode && <Message message={messages[208]} isMessage />}
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Modal title="Xác thực OTP" visible={!!verificationId}>
                <Text style={styles.title}>Mã OTP *</Text>
                {invalidOTP && <Text style={styles.invalid}>{invalidOTP}</Text>}
                <TextInput style={styles.otp} onChangeText={value => setOtp(value)} />
                <View style={styles.groupAction}>
                    <TouchableOpacity onPress={() => setVerificationId(null)}>
                        <Text style={styles.action}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={confirmCode}>
                        <Text style={styles.action}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <KeyboardAvoiding style={styles.container}>
                <View style={styles.block_logo_name}>
                    <LogoName />
                </View>
                <View style={styles.block_button}>
                    {validation["invalidPhone"] && (
                        <Text style={styles.warning}>{validation["invalidPhone"]}</Text>
                    )}
                    {validation["phoneExisted"] && (
                        <Text style={styles.warning}>{validation["phoneExisted"]}</Text>
                    )}
                    <TextInputIcon
                        onChangeText={value => setUsername(value)}
                        onTouchStart={() =>
                            setValidation({ ...validation, invalidPhone: null, phoneExisted: null })
                        }
                        name="username"
                        imgSrc={require("../../../assets/icons/phone.png")}
                        placeholder="Số điện thoại"
                        keyboardType="numeric"
                        defaultValue={username}
                        onBlur={checkPhone}
                    />
                    {validation["invalidPassword"] && (
                        <Text style={styles.warning}>{validation["invalidPassword"]}</Text>
                    )}
                    <TextInputIcon
                        onChangeText={value => setPassword(value)}
                        onTouchStart={() =>
                            setValidation({
                                ...validation,
                                invalidPassword: null,
                                invalidConfirmPassword: null
                            })
                        }
                        name="password"
                        imgSrc={require("../../../assets/icons/key.png")}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        defaultValue={password}
                        onBlur={checkPassword}
                    />
                    {validation["invalidConfirmPassword"] && (
                        <Text style={styles.warning}>{validation["invalidConfirmPassword"]}</Text>
                    )}
                    <TextInputIcon
                        onChangeText={value => setConfirmPassword(value)}
                        onTouchStart={() =>
                            setValidation({ ...validation, invalidConfirmPassword: null })
                        }
                        name="confirmPassword"
                        imgSrc={require("../../../assets/icons/key.png")}
                        placeholder="Xác nhận mật khẩu"
                        secureTextEntry={true}
                        defaultValue={confirmPassword}
                        onBlur={checkConfirmPassword}
                    />
                    {validation["invalidName"] && (
                        <Text style={styles.warning}>{validation["invalidName"]}</Text>
                    )}
                    <TextInputIcon
                        onChangeText={value => setName(value)}
                        onTouchStart={() => setValidation({ ...validation, invalidName: null })}
                        name="name"
                        imgSrc={require("../../../assets/icons/user.png")}
                        placeholder="Tên"
                        defaultValue={name}
                        onBlur={checkName}
                    />
                    <ButtonText textContent="TẠO TÀI KHOẢN" gotoScreen={handleRegister} />
                    <TextLinking
                        contentText="Đã có tài khoản?"
                        contentLink="Đăng nhập"
                        link={() => navigation.navigate("Login")}
                    />
                </View>
            </KeyboardAvoiding>
        </BackgroundLogin>
    );
};

const mapStateToProps = createStructuredSelector({
    statusCode: selectStatusCode
});

const mapDispatchToProps = dispatch => ({
    updateStatusCode: statusCode => dispatch(updateStatusCode(statusCode))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
