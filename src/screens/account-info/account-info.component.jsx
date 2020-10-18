import React from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import BackgroundImage from "../../components/background-screen.component";
import Header from "../../components/header.component";

const colors = {
    themeColor: "#4263ec",
    white: "#fff",
    background: "f4f6fc",
    greyish: "#a4a4a4",
    tint: "#2b49c3"
};

function AccountScreen(props) {
    return (
        <View style={styles.container}>
            <BackgroundImage>
                {/* Header */}
                <View style={{ flex: 1, marginTop: 10 }}>
                    <Header
                        title="Thông tin cá nhân"
                        passedIcon={() => (
                            <Icon
                                name="menu"
                                size={30}
                                color="#a2a2db"
                                style={{ width: 20 }}
                                onPress={() => props.navigation.openDrawer()}
                            />
                        )}
                    />
                </View>
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Texgyreadventor-regular",
                            paddingHorizontal: 10,
                            fontSize: 15,
                            color: "#a2a2db",
                            textAlign: "center"
                        }}
                    >
                        Những thông tin cá nhân sẽ được bảo mật theo chính sách quy định của Nhà Nước
                    </Text>
                </View>
                <View style={{ flex: 4.5 }}>
                    <View>
                        <Text
                            style={{
                                flexDirection: "row",
                                marginHorizontal: 16,
                                marginVertical: 4,
                                borderRadius: 20,
                                fontSize: 15
                            }}
                        >
                            Họ và tên:
                        </Text>
                        <TextInput placeholder="Lê Quang Huy" style={styles.textInputInfo} />
                    </View>
                    <View>
                        <Text
                            style={{
                                flexDirection: "row",
                                marginHorizontal: 16,
                                marginVertical: 4,
                                borderRadius: 20,
                                fontSize: 15
                            }}
                        >
                            Số điện thoại:
                        </Text>
                        <TextInput placeholder="0359680538" style={styles.textInputInfo} />
                    </View>
                    <View>
                        <Text
                            style={{
                                flexDirection: "row",
                                marginHorizontal: 16,
                                marginVertical: 4,
                                borderRadius: 20,
                                fontSize: 15
                            }}
                        >
                            Biển số xe:
                        </Text>
                        <TextInput placeholder="71 - B1 963.32" style={styles.textInputInfo} />
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: "Texgyreadventor-bold",
                            color: "#522289"
                        }}
                    >
                        Hình ảnh xác thực
                    </Text>
                </View>
                <View style={{ flex: 4 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -28 }}>
                        <View
                            style={{
                                backgroundColor: "#FEFEFE",
                                height: 170,
                                width: 190,
                                borderRadius: 15,
                                padding: 5
                            }}
                        >
                            <Image
                                source={require("../../../assets/images/chung-minh.jpg")}
                                style={{
                                    width: 180,
                                    borderRadius: 10,
                                    height: 130
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    width: 180,
                                    textAlign: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: "#a2a2db",
                                        textAlign: "center"
                                    }}
                                >
                                    CMND/Thẻ căn cước hoặc hộ chiếu
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor: "#FEFEFE",
                                height: 170,
                                width: 190,
                                borderRadius: 15,
                                padding: 5
                            }}
                        >
                            <Image
                                source={require("../../../assets/images/giayphep.jpg")}
                                style={{
                                    width: 180,
                                    borderRadius: 10,
                                    height: 130
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    width: 180,
                                    textAlign: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: "#a2a2db",
                                        textAlign: "center"
                                    }}
                                >
                                    Giấy phép lái xe
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor: "#FEFEFE",
                                height: 170,
                                width: 190,
                                borderRadius: 15,
                                padding: 5
                            }}
                        >
                            <Image
                                source={require("../../../assets/images/giaydangkyxe.jpg")}
                                style={{
                                    width: 180,
                                    borderRadius: 10,
                                    height: 130
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    width: 180,
                                    textAlign: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: "#a2a2db",
                                        textAlign: "center"
                                    }}
                                >
                                    Giấy đăng ký xe
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor: "#FEFEFE",
                                height: 170,
                                width: 190,
                                borderRadius: 15,
                                padding: 5
                            }}
                        >
                            <Image
                                source={require("../../../assets/images/xecuuthuong.jpg")}
                                style={{
                                    width: 180,
                                    borderRadius: 10,
                                    height: 130
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    width: 180,
                                    textAlign: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: "#a2a2db",
                                        textAlign: "center"
                                    }}
                                >
                                    Xe cứu thương
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Button mode="contained" color="green" labelStyle={{ fontSize: 17, fontWeight: "bold" }}>
                        CẬP NHẬP
                    </Button>
                </View>
            </BackgroundImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    textInputInfo: {
        paddingLeft: 10,
        backgroundColor: colors.white,
        flexDirection: "row",
        marginHorizontal: 16,
        borderRadius: 20,
        paddingVertical: 10,
        fontSize: 15
    },
    policy: {
        flex: 1,
        paddingHorizontal: 40,
        marginTop: 18
    },
    editInfo: {
        flex: 2
    },
    imageConfirm: {
        flexDirection: "column",
        marginTop: 10,
        paddingHorizontal: 20,
        textAlign: "center"
    }
});

export default AccountScreen;
