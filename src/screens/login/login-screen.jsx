import React from 'react'
import { View } from 'react-native';

import styles from './login-style';
import BackgroundLogin from '../../components/background-screen-login.component';
import LogoName from '../../components/logo-name.component';
import TextInputIcon from '../../components/text-input-with-icon.component';
import ButtonText from '../../components/button-text.component';
import TextLinking from '../../components/text-linking.component';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <BackgroundLogin>
        <View style={styles.block_logo_name}>
          <LogoName />
        </View>
        <View style={styles.block_button}>
          <TextInputIcon
            imgSrc={require("../../../assets/icons/phone.png")}
            placeholder="Số điện thoại"
          />
          <TextInputIcon
            imgSrc={require("../../../assets/icons/key.png")}
            placeholder="Mật khẩu"
          />
          <ButtonText
            textContent="ĐĂNG NHẬP"
            gotoScreen={() => navigation.navigate("Home")}
          />
          <TextLinking
            contentText="Chưa có tài khoản?"
            contentLink="Đăng ký"
            link={() => navigation.navigate("Register")}
          />
        </View>
      </BackgroundLogin>
    </View>
  );
}

export default LoginScreen;