import React from "react";

import { View } from "react-native";

import TextInputIcon from "../../components/text-input-with-icon.component";
import ButtonText from "../../components/button-text.component";
import TextLinking from "../../components/text-linking.component";
import LogoName from "../../components/logo-name.component";
import BackgroundLogin from "../../components/background-screen-login.component";

import styles from "./reset-password.styles";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";

const ResetPassScreen = ({ navigation }) => {
    return (
        <BackgroundLogin>
            <KeyboardAvoiding style={styles.container}>
                <View style={styles.block_logo_name}>
                    <LogoName />
                </View>
                <View style={styles.block_button}>
                    <TextInputIcon imgSrc={require("../../../assets/icons/phone.png")} placeholder="Số điện thoại" />
                    <ButtonText textContent="Gửi mã OTP" gotoScreen={() => navigation.navigate("Otp")} />
                    <TextLinking
                        contentText="Chưa có tài khoản?"
                        contentLink="Đăng ký"
                        link={() => navigation.navigate("Register")}
                    />
                </View>
            </KeyboardAvoiding>
        </BackgroundLogin>
    );
};

export default ResetPassScreen;
