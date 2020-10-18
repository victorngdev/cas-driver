import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import Header from '../../components/header.component';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Rating } from 'react-native-ratings';
import { Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoICon from 'react-native-vector-icons/Entypo';

import BackgroundImage from "../../components/background-screen.component";

const screen = Dimensions.get('screen');
const widthDevice = screen.width;
const heightDevice = screen.height;

function HistoryDetailScreen(props) {

    let dotIcon = [];
    for (let i = 0; i < 2; i++) {
        dotIcon.push(
            <EntypoICon
                key={i}
                name='dots-three-vertical'
                color='silver'
                size={15}
            />
        )
    }

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <Header
                        title="Lịch Sử"
                        passedIcon={() => (
                            <Icon
                                name="chevron-left"
                                size={40}
                                color="#a2a2db"
                                width='30'
                                onPress={() => { props.navigation.navigate('History') }}
                            />
                        )}
                        styleText={{
                            marginLeft: 10,
                        }}
                    />
                </View>
                <View style={{ flex: 9, flexDirection: 'column' }}>
                    <ScrollView contentContainerStyle={{
                        flexGrow: 1
                    }}>
                        <View style={styles.dateFinishedView}>
                            <Text style={styles.dateFinishedView_Text}>Thứ 5, 08/12/2020 12:43</Text>
                        </View>
                        <View style={styles.ratingView}>
                            <Rating
                                style={{ paddingVertical: 10 }}
                                readonly={true}
                            />
                        </View>
                        <View style={styles.infoPatinent}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.detailTrip_Title}>Người gửi yêu cầu</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Avatar.Image
                                        source={{
                                            uri:
                                                "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/83012519_1497814183728497_1901903877645533184_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=l92aofIVAloAX99oBIy&_nc_ht=scontent.fdad3-1.fna&oh=ac2b60cb37775a47a9c2ccc98f38fd2d&oe=5FA585D7",
                                        }}
                                        size={50}
                                    />
                                </View>
                                <View style={{ flex: 8, flexDirection: 'column', justifyContent: 'center', marginLeft: 10 }}>
                                    <Text style={{
                                        fontFamily: "Texgyreadventor-bold",
                                        fontSize: 16,
                                        color: "#444444"
                                    }}>Lê Quang Huy</Text>
                                    <Text style={{ fontFamily: "Texgyreadventor-bold" }}>0907766123</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.detailTrip}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={styles.detailTrip_Title}>Chi Tiết Hành Trình</Text>
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row' }}>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <MaterialIcons
                                        name="place"
                                        size={30}
                                        color="red"
                                    />
                                    {dotIcon}
                                    <MaterialIcons
                                        name="my-location"
                                        size={30}
                                        color="yellow"
                                    />
                                </View>
                                <View style={{
                                    flex: 8

                                }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontStyle: 'italic' }}>Đón bệnh nhân</Text>
                                        <Text numberOfLines={1} style={styles.detailTrip_Text_Location}>Bệnh viện Quân Y 175, 786 Nguyễn Kiệm</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{ fontStyle: 'italic' }}>Đến</Text>
                                        <Text numberOfLines={1} style={styles.detailTrip_Text_Location}>65/2R Ấp Đông</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.infoPatinentDetailView}>
                            <View style={{flex: 1}}>
                                <Text style={styles.detailTrip_Title}>Thông tin về bệnh nhân</Text>
                            </View>
                            <View style={{flex: 6, flexDirection: 'column', marginLeft: 20}}>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Text style={{fontWeight: 'bold'}}>Họ và tên:</Text>
                                    <Text>Nguyễn Văn A</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Text style={{fontWeight: 'bold'}}>Thông tin liên hệ:</Text>
                                    <Text>098123123</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Text style={{fontWeight: 'bold'}}>Tình trạng bệnh:</Text>
                                    <Text>Bị ung thu giai đoạn cuối</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <Text style={{fontWeight: 'bold'}}>Yêu cầu thêm:</Text>
                                    <Text>Bệnh viện trả về, không thể chữa khỏi nên muốn được an táng ở quê nhà</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

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
    dateFinishedView: {
        width: widthDevice,
        height: heightDevice * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5
    },
    dateFinishedView_Text: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 16,
        color: "#444444"
    },
    ratingView: {
        width: widthDevice,
        height: heightDevice * 0.1,
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5
    },
    infoPatinent: {
        flexDirection: 'column',
        width: widthDevice,
        height: heightDevice * 0.15,
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5,
        paddingHorizontal: 10
    },
    detailTrip: {
        width: widthDevice,
        height: heightDevice * 0.3,
        paddingHorizontal: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5
    },
    detailTrip_Title: {
        fontFamily: "Texgyreadventor-bold",
        color: '#9ab5a1',
    },
    detailTrip_Text_Location: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 15
    },
    infoPatinentDetailView: {
        width: widthDevice,
        height: heightDevice * 0.5,
        paddingHorizontal: 10,
    }
});
export default HistoryDetailScreen;
