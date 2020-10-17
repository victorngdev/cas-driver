import React from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, Alert } from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import 'react-native';



function RegisterCarImageScreen(props) {
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}> Đăng kí xe</Text>
                    <Text style={styles.securityText}>Thông tin cá nhân sẽ được bảo mật theo chính sách, quy định của nhà nước</Text>
                </View>
                <Text style={styles.textIntro}>Tải các hình ảnh của xe lên hệ thống</Text>
                <View style={styles.registerImageInfo} >

                    <View style={styles.line} >
                        <View style={styles.ImageInfo}>
                            <Image style={styles.image}
                                source={require("../../../assets/images/chung-minh.jpg")} />
                            <Text style={styles.imgDescription}>Chứng minh nhân dân</Text>
                        </View>
                        <View style={styles.ImageInfo}>
                            <Image style={styles.image}
                                source={require("../../../assets/images/giaydangkyxe.jpg")} />
                            <Text style={styles.imgDescription}>Giấy đăng ký xe</Text>
                        </View>
                    </View>

                    <View style={styles.line} >
                        <View style={styles.ImageInfo}>
                            <Image style={styles.image}
                                source={require("../../../assets/images/giayphep.jpg")} />
                            <Text style={styles.imgDescription}>Giấy phép lái xe</Text>
                        </View>
                        <View style={styles.ImageInfo}>
                            <Image style={styles.image}
                                source={require("../../../assets/images/giaydangkiem.jpg")} />
                            <Text style={styles.imgDescription}>Giấy đăng kiểm</Text>
                        </View>
                    </View>
                </View>
                {/* //  <Button title='Đăng kí' color='#FFAB2E' borderRadius= '15' width='5'/> */}
                <TouchableOpacity style={styles.button} onPress={() => {
                    Alert.alert(
                        "Đăng kí xong", "Hệ thống sẽ thông báo cho bạn sau khi kiểm duyệt"
                    );
                }}
                >
                    <View>
                        <Text style={styles.text}>Đăng kí</Text>
                    </View>

                </TouchableOpacity >

            </BackgroundImage>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    header: {
        marginTop: 50,
        alignContent: 'center',
    },
    headerTitle: {
        textAlign: "center",
        color: '#000',
        // fontWeight: 'bold',
        fontSize: 30
    },
    securityText: {
        marginTop: 10,
        marginHorizontal: 8,
        fontSize: 17,
        textAlign: 'center',
        color: 'gray'
    },
    registerImageInfo: {
        marginTop: 8,
        marginHorizontal: 10,
    },
    textIntro: {
        marginTop: 10,
        marginHorizontal: 8,
        fontSize: 18,
        textAlign: 'center',
        color: 'black'
    },
    line: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        height: 180,
        marginVertical: 180
    },
    ImageInfo: {
        width: 160,
        height: 180,
        marginHorizontal: 5,
        backgroundColor: "#fff",
        borderRadius: 20
    },
    image: {
        marginTop: 10,
        marginLeft: 5,
        width: 150,
        height: 150,
        borderRadius: 20
    },
    imgDescription: {
        textAlign: 'center',
        color: 'gray'
    },
    button: {
        marginTop: 30,
        backgroundColor: "#FFAB2E",
        borderRadius: 15,
        width: 100,
        height: 35,
        alignSelf: 'center'
    },
    text: {
        textAlign: "center",
        marginVertical: 5,
        color: "#FFF",
        fontSize: 17,
        fontFamily: "Roboto_500Medium",
        justifyContent: 'center'
    }
})
export default RegisterCarImageScreen
// const showToast = () => {
//     ToastAndroid.show('Đăng kí hoàn tất. Hệ thống sẽ thông báo kết quả sau khi kiểm duyệt', ToastAndroid.SHORT, ToastAndroid.CENTER );
// }