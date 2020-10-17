import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import BackgroundImage from "../../components/background-screen.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function HistoryDetailScreen(props) {
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "Texgyreadventor-bold",
                        color: "#522289",
                        marginTop: 60,
                        textAlign: "center"
                    }}
                >
                    11 Oct 2020, 6: 30 PM
                </Text>

                <View style={styles.body}>
                    <View style={styles.location}>
                        <View style={styles.addressReq}>
                            <Image source={require("../../../assets/icons/addressReq.png")} style={styles.imgAdd} />
                            <Text style={styles.textaddress}>11 Phước Long B, quận 9, TPHCM </Text>
                        </View>
                        <View style={styles.destination}>
                            <Image source={require("../../../assets/icons/destination.png")} style={styles.imgAdd} />
                            <Text style={styles.textaddress}> Bệnh viện Quận 9, quận 9, TPHCM</Text>
                        </View>
                    </View>
                    <View style={styles.note}>
                        <Text style={styles.noteTitle}>Ghi chú:</Text>
                        <Text style={styles.textNote}>Bệnh nhân đang cần cấp cứu gấp </Text>
                    </View>
                    <View style={styles.status}>
                        <Text style={styles.noteTitle}>Trạng thái:</Text>
                        <Text style={styles.textNote}>Thành công</Text>
                    </View>

                    <View style={styles.feedback}>
                        <Text style={styles.noteTitle}>Đánh giá:</Text>
                        <Text style={styles.textNote}> Bác tài rất nhiệt tình giúp đỡ tôi</Text>
                    </View>
                    <View style={styles.starList}>
                        <Image style={styles.iconStar} source={require("../../../assets/icons/goldStar.png")} />
                        <Image style={styles.iconStar} source={require("../../../assets/icons/goldStar.png")} />
                        <Image style={styles.iconStar} source={require("../../../assets/icons/goldStar.png")} />
                        <Image style={styles.iconStar} source={require("../../../assets/icons/goldStar.png")} />
                        <Image style={styles.iconStar} source={require("../../../assets/icons/goldStar.png")} />
                    </View>
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
    location: {
        height: 100,
        marginHorizontal: 10,
        marginTop: 15,
        backgroundColor: "#bed3f3"
    },
    addressReq: {
        flexDirection: "row",
        marginTop: 10
    },
    destination: {
        marginTop: 40,
        flexDirection: "row"
    },
    imgAdd: {
        marginLeft: 5
    },
    note: {
        flexDirection: "column",
        height: 50,
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: "#bed3f3"
    },
    status: {
        height: 50,
        marginHorizontal: 10,
        backgroundColor: "#bed3f3"
    },
    feedback: {
        height: 50,
        marginHorizontal: 10,
        backgroundColor: "#bed3f3",
        margin: 10
    },
    textaddress: {
        marginLeft: 20
    },
    textDestination: {},
    noteTitle: {
        marginLeft: 5,
        fontWeight: "bold"
    },
    textNote: {
        marginLeft: 10
    },
    body: {
        marginTop: 30
    },
    starList: {
        flexDirection: "row",
        width: 200,
        height: 40,
        marginLeft: 10
    },
    iconStar: {
        marginHorizontal: 5,
        width: 30,
        height: 30
    }
});
export default HistoryDetailScreen;
