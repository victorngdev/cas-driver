import React from "react";
import { View } from "react-native";

import TextInputIcon from "../../components/text-input-with-icon.component";
import ButtonText from "../../components/button-text.component";
import TextLinking from "../../components/text-linking.component";
import LogoName from "../../components/logo-name.component";
import BackgroundLogin from "../../components/background-screen-login.component";

import styles from "./otp.styles";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";

const OtpScreen = ({ navigation }) => {
    return (
        <BackgroundLogin>
            <KeyboardAvoiding style={styles.container}>
                <View style={styles.block_logo_name}>
                    <LogoName />
                </View>
                <View style={styles.block_button}>
                    <TextInputIcon imgSrc={require("../../../assets/icons/otp-icon.png")} placeholder="Nhập mã OTP" />
                    <TextInputIcon imgSrc={require("../../../assets/icons/key.png")} placeholder="Nhập mật khẩu mới" />
                    <TextInputIcon imgSrc={require("../../../assets/icons/key.png")} placeholder="Nhập lại mật khẩu" />
                    <ButtonText textContent="XÁC NHẬN" gotoScreen={() => navigation.navigate("Home")} />
                    <TextLinking
                        contentText="Chưa nhận được mã OTP?"
                        contentLink="Gửi lại mã"
                        link={() => navigation.navigate("Otp")}
                    />
                </View>
            </KeyboardAvoiding>
        </BackgroundLogin>
    );
};

export default OtpScreen;
