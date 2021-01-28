import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectStatusCode } from "../../redux/message/message.selectors";
import { signIn } from "../../redux/user/user.actions";
import messages from "../../uitls/message.data";

import BackgroundLogin from "../../components/background-screen-login.component";
import LogoName from "../../components/logo-name.component";
import TextInputIcon from "../../components/text-input-with-icon.component";
import ButtonText from "../../components/button-text.component";
import TextLinking from "../../components/text-linking.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";
import Message from "../../components/message.component";
import Spinner from "../../components/spinner.component";

import styles from "./login.style";

const LoginScreen = ({ navigation, signIn, statusCode }) => {
    const [username, setUsername] = useState("0931738872");
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        statusCode && setLoading(false);
    }, [statusCode]);

    return (
        <BackgroundLogin>
            {loading && <Spinner />}
            {statusCode && <Message message={messages[401]} />}
            <KeyboardAvoiding style={styles.container}>
                <View style={styles.block_logo_name}>
                    <LogoName />
                </View>
                <View style={styles.block_button}>
                    <TextInputIcon
                        imgSrc={require("../../../assets/icons/phone.png")}
                        placeholder="Số điện thoại"
                        keyboardType="numeric"
                        defaultValue={username}
                        onChangeText={value => setUsername(value)}
                    />
                    <TextInputIcon
                        imgSrc={require("../../../assets/icons/key.png")}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        defaultValue={password}
                        onChangeText={value => setPassword(value)}
                    />
                    <ButtonText
                        textContent="ĐĂNG NHẬP"
                        gotoScreen={() => {
                            setLoading(true);
                            signIn(username, password);
                        }}
                    />
                    <TextLinking
                        contentText="Chưa có tài khoản?"
                        contentLink="Đăng ký"
                        link={() => navigation.navigate("Register")}
                    />
                    <TextLinking
                        contentLink="Quên mật khẩu?"
                        link={() => navigation.navigate("ResetPass")}
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
    signIn: (username, password) => dispatch(signIn({ username, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
