import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { updateUser } from "../../redux/user/user.actions";
import messages from "../../uitls/message.data";
import { selectStatusCode } from "../../redux/message/message.selectors";

import BackgroundImage from "../../components/background-screen.component";
import Header from "../../components/header.component";
import AvatarNameCol from "../../components/avatar-name-column.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";
import ButtonText from "../../components/button-text.component";
import Message from "../../components/message.component";

const AccountScreen = ({ navigation, currentUser, token, updateUser, statusCode }) => {
    const [linkImage, setLinkImage] = useState(currentUser.imageUrl);
    const [displayName, setDisplayName] = useState(currentUser.displayName);
    const [phone, setPhone] = useState(currentUser.phone);

    const handlerUploadImage = () => {
        const image = {
            uri: linkImage,
            name: linkImage.substring(linkImage.lastIndexOf("/") + 1),
            type: "image/png"
        };
        updateUser(currentUser.id, token, { displayName, phone, image });
    };

    return (
        <BackgroundImage>
            <Message
                visible={statusCode}
                message={messages[statusCode]}
                isMessage={statusCode < 400}
            />
            <Header title="Thông tin cá nhân" gotoScreen={() => navigation.goBack()} />
            <View style={styles.container_info}>
                <AvatarNameCol
                    linkImage={linkImage}
                    setLinkImage={setLinkImage}
                    textContent={currentUser.displayName}
                />
                <Text style={styles.joining_day_title}>Ngày tham gia</Text>
                <Text style={styles.joining_day}>{currentUser.dateCreated}</Text>
            </View>
            <KeyboardAvoiding style={styles.container_content}>
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
                    />
                </View>
            </KeyboardAvoiding>
            <View style={styles.container_button_save}>
                <ButtonText
                    textContent="Lưu"
                    styleText={styles.button_text}
                    styleButton={styles.button_size}
                    gotoScreen={handlerUploadImage}
                />
                <Text style={styles.text_policy}>
                    * Các thông tin cá nhân được bảo mật theo chính sách, qui định của Nhà nước
                </Text>
            </View>
        </BackgroundImage>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    token: selectToken,
    statusCode: selectStatusCode
});

const mapDispatchToProps = dispatch => ({
    updateUser: (userId, token, user) => dispatch(updateUser(userId, token, user))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    container_content: {
        width: "85%"
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
    container_button_save: {
        flexDirection: "column",
        marginTop: 10
    },
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
    //css button save:
    button_size: {
        width: Dimensions.get("screen").width * 0.85,
        marginVertical: 20,
        backgroundColor: "#e7ecf9",
        paddingVertical: 10,
        paddingHorizontal: 40
    },
    button_text: {
        color: "#26324A",
        fontFamily: "Texgyreadventor-bold",
        fontSize: 16
    },
    text_policy: {
        marginTop: 10,
        fontSize: 12,
        color: "#8B8B8B",
        textAlign: "center",
        fontFamily: "Texgyreadventor-regular"
    }
});
