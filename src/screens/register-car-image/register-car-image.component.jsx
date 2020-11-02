import React from "react";
import { StyleSheet, Text, View, Image, ToastAndroid, Alert } from "react-native";
import BackgroundImage from "../../components/background-screen.component";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/header.component";

function RegisterCarImageScreen(props) {
    return (
        <BackgroundImage>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Header
                        title="Đăng kí xe"
                        passedIcon={() => (
                            <MaterialCommunityIcons
                                name="chevron-left"
                                size={50}
                                color="#a2a2db"
                                style={{}}
                                onPress={() => props.navigation.navigate("RegisterCar")}
                            />
                        )}
                    />
                    <Text style={styles.textIntro}>Cung cấp các hình ảnh để xác thực danh tính và hình ảnh xe</Text>
                </View>

                <View style={styles.registerImageInfo}>
                    <View style={styles.line}>
                        <View style={styles.ImageInfo}>
                            <Image style={styles.image} source={require("../../../assets/images/chung-minh.jpg")} />
                            <Text style={styles.imgDescription}>Chứng minh nhân dân</Text>
                        </View>
                        <View style={styles.ImageInfo}>
                            <Image style={styles.image} source={require("../../../assets/images/giaydangkyxe.jpg")} />
                            <Text style={styles.imgDescription}>Giấy đăng ký xe</Text>
                        </View>
                    </View>

                    <View style={styles.line}>
                        <View style={styles.ImageInfo}>
                            <Image style={styles.image} source={require("../../../assets/images/giayphep.jpg")} />
                            <Text style={styles.imgDescription}>Giấy phép lái xe</Text>
                        </View>
                        <View style={styles.ImageInfo}>
                            <Image style={styles.image} source={require("../../../assets/images/giaydangkiem.jpg")} />
                            <Text style={styles.imgDescription}>Giấy đăng kiểm</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.foot}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            Alert.alert("Đăng kí xong", "Hệ thống sẽ thông báo cho bạn sau khi kiểm duyệt");
                        }}
                    >
                        <View>
                            <Text style={styles.text}>Đăng kí</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    header: {
        marginTop: 20
    },
    registerImageInfo: {
        marginHorizontal: 10,
        flex: 2,
        flexDirection: "column"
    },
    textIntro: {
        width: "100%",
        marginTop: 10,
        fontSize: 14,
        textAlign: "center",
        fontFamily: "Texgyreadventor-regular",
        color: "#4F5C77",
        paddingHorizontal: 20
    },
    line: {
        flexDirection: "row"
    },
    ImageInfo: {
        marginVertical: 15,
        marginHorizontal: 5,
        borderRadius: 20,
        flex: 1
    },
    image: {
        marginTop: 10,
        marginLeft: 5,
        width: 150,
        height: 150,
        borderRadius: 20
    },
    imgDescription: {
        textAlign: "center",
        color: "gray",
        fontFamily: "Texgyreadventor-regular",
        marginTop: 5
    },
    foot: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        alignItems: "center"
    },
    button: {
        marginVertical: 10,
        backgroundColor: "#FFAB2E",
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 40,
        elevation: 30,
        fontFamily: "Texgyreadventor-regular"
    },
    text: {
        textAlign: "center",
        marginVertical: 5,
        color: "#FFF",
        fontSize: 17,
        fontFamily: "Texgyreadventor-regular",
        justifyContent: "center"
    }
});
export default RegisterCarImageScreen;
// const showToast = () => {
//     ToastAndroid.show('Đăng kí hoàn tất. Hệ thống sẽ thông báo kết quả sau khi kiểm duyệt', ToastAndroid.SHORT, ToastAndroid.CENTER );
// }
