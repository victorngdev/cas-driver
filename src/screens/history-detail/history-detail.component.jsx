import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Platform } from "react-native";
import Header from '../../components/header.component';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Rating } from 'react-native-ratings';
import { Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoICon from 'react-native-vector-icons/Entypo';
import Place from '../../components/place.component';
import FeedbackShow from '../../components/feedback-show.component';


import BackgroundImage from "../../components/background-screen.component";

const screen = Dimensions.get('screen');
const widthDevice = screen.width;
const heightDevice = screen.height;

function HistoryDetailScreen(props) {

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={{
                    flex: 4,
                    marginBottom: 20,
                    backgroundColor: '#E5D7EE',
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30
                }}>
                    <View style={{ flex: 1 }}>
                        <Header
                            title='Lịch sử'
                            passedIcon={() => (
                                <Icon
                                    name='chevron-left'
                                    size={40}
                                    color='#a2a2db'
                                    onPress={() => props.navigation.navigate('History')}
                                />
                            )}
                            styleText={{ marginLeft: 10 }}
                        />

                        <Text style={{
                            position: 'absolute',
                            width: Platform.OS === 'ios' ? widthDevice * 0.35 : widthDevice * 0.26,
                            right: Platform.OS === 'ios' ? widthDevice * 0.34 : widthDevice * 0.37,
                            top: heightDevice * 0.33,
                            backgroundColor: 'green',
                            padding: 15,
                            textAlign: 'center',
                            borderRadius: 10
                        }}>Thành công</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar.Image
                                source={{
                                    uri:
                                        "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/83012519_1497814183728497_1901903877645533184_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=l92aofIVAloAX99oBIy&_nc_ht=scontent.fdad3-1.fna&oh=ac2b60cb37775a47a9c2ccc98f38fd2d&oe=5FA585D7",
                                }}
                                size={70}
                            />

                        </View>
                        <View style={{ flex: 1, marginBottom: 20, alignItems: 'center', flexDirection: 'column' }}>
                            <View style={{
                                flex: 1,
                                width: widthDevice * 0.5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                                <View style={{ flex: 2, alignItems: 'center' }}>
                                    <EntypoICon
                                        name='user'
                                        size={20}
                                    />
                                </View>
                                <View style={{ flex: 8, alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'Texgyreadventor-bold' }}>Lê Huy Huy</Text>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                width: widthDevice * 0.5,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                                <View style={{ flex: 2, alignItems: 'center' }}>
                                    <Icon
                                        name='phone'
                                        size={20}
                                    />
                                </View>
                                <View style={{ flex: 8, alignItems: 'center' }}>
                                    <Text style={{ fontFamily: 'Texgyreadventor-bold' }}>098012342</Text>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 6 }}>
                    <ScrollView contentContainerStyle={{
                        flexGrow: 1
                    }}>

                        <View style={{ flex: 9, flexDirection: 'column' }}>

                            <View style={styles.infoPatinentDetailView}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.detailTrip_Title}>Thông tin</Text>
                                </View>
                                <View style={{ flex: 6, flexDirection: 'column' }}>
                                    <FeedbackShow
                                        title="Đánh giá tài xế"
                                        content="Bác chạy rất có tâm, hỗ trợ sơ cứu dọc đường nữa"
                                        level={5}
                                        size={12}
                                    />
                                    <FeedbackShow
                                        title="Tình trạng bệnh"
                                        content="Chân bị phù nặng do nhiễm trùng máu, hôn mê sâu, khá nguy kịch"
                                    />
                                    <FeedbackShow title="Ghi chú" content="Bệnh nhân không có giấy tờ tùy thân" />
                                </View>
                            </View>
                            <View style={styles.detailTrip}>
                            <View style={{ flex: 1 }}>
                                    <Text style={styles.detailTrip_Title}>Hành Trình</Text>
                                </View>
                                <View style={{flex: 5}}>
                                    <View style={{ flex: 1 }}>
                                        <Place
                                            place={{
                                                name: "Vị trí bệnh nhân",
                                                address: "480 Xa lộ Hà Nội, Bình Thạnh, HCM",
                                                date: "20/07/2020",
                                                time: '10:00'
                                            }}
                                            icon="https://i.ibb.co/D8HPk12/placeholder.png"
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Place
                                            place={{
                                                name: "Bệnh viện Quân Y",
                                                address: "365 Lê Văn Việt, Quận 9, HCM",
                                                date: "20/07/2020",
                                                time: '10:00'
                                            }}
                                            icon="https://i.ibb.co/gWdQ69d/radar.png"
                                        />
                                    </View>
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
        height: heightDevice * 0.4,
        paddingHorizontal: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 0.5,
        flexDirection: 'column'
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
