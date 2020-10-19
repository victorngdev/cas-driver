import React from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, Alert } from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/header.component';

function RegisterCarImageScreen(props) {
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={styles.header}>
                    <Header
                        title='Đăng kí xe' 
                        passedIcon={() =>
                            <MaterialCommunityIcons name='chevron-left' size={50}  color='#a2a2db' style={{ }}
                                onPress={() => props.navigation.navigate("RegisterCar")}
                            />}
                    />
                    <Text style={styles.securityText}>Thông tin cá nhân sẽ được bảo mật theo chính sách, quy định của nhà nước</Text>
                    <Text style={styles.textIntro}>Tải các hình ảnh của xe lên hệ thống</Text>
                </View>


                <View style={styles.registerImageInfo} >
                    <View style={styles.line} >
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
                {/* //  <Button title='Đăng kí' color='#FFAB2E' borderRadius= '15' width='5'/> */}

                <View style={styles.foot}>
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
    header: {
        marginTop: 20,
        flex: 1
    },
    headerTitle: {
        textAlign: "center",
        color: "#000",
        // fontWeight: 'bold',
        fontSize: 30
    },
    securityText: {
        marginTop: 10,
        marginHorizontal: '5%',
        textAlign: 'center',
        fontSize: 17,
        textAlign: "center",
        color: "gray"
    },
    registerImageInfo: {
        marginHorizontal: '2.5%',
        flex: 2,
        flexDirection: 'column'
    },
    textIntro: {
        marginTop: 10,
        fontSize: 18,
        textAlign: "center",
        color: "black"
    },
    line: {
        marginTop: 15,
        flex: 1,
        flexDirection: 'row',
        height: 180,
        marginVertical: 180,
        flexDirection: 'row'
    },
    ImageInfo: {
        width: 160,
        height: 180,
        marginHorizontal: 5,
        backgroundColor: "#fff",
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
        color: "gray"
    },
    button: {
        marginTop: '25%',
        backgroundColor: "#FFAB2E",
        borderRadius: 15,
        width: 100,
        height: 35,
        alignSelf: 'center',
    },
    foot: {
        flex: 1
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
