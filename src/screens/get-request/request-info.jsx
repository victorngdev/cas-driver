import React from 'react';

import { StyleSheet, Text, View, Linking } from 'react-native';
import BackgroundImage from '../../components/background-screen.component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CountDown from 'react-native-countdown-component';
import Header from '../../components/header.component';
import { Button } from 'react-native-paper';

function RequestInfoScreen(props) {
    return (
        <View style={styles.container}>
            <BackgroundImage>
                <Header
                    title='Yêu cầu mới từ bệnh nhân'
                    passedIcon={() =>
                        <MaterialCommunityIcons name='chevron-left' size={50} color='#a2a2db' style={{}}

                            onPress={() => props.navigation.openDrawer()}
                        />}
                    styleText={{
                    fontSize: 18,
                    color: "#522289",
                    marginLeft: 20,
                }}
                />
                {/* Điểm đến */}
                <View
                    style={{
                        flex: 2,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        backgroundColor: "rgba(211, 219, 240, 0.5)",
                        borderRadius: 10,
                    }}
                >
                    <View style={{}}>
                        <MaterialCommunityIcons
                            name="map-marker-radius"
                            size={30}
                            color="#a2a2db"
                            style={{
                                width: 30,
                            }}
                        />
                        <Text>18km</Text>
                    </View>

                    <View
                        style={{
                            paddingHorizontal: 20,
                        }}
                    >
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            Điểm đến
                        </Text>
                        <Text>Bệnh viện Quân Y</Text>
                        <Text>365 Lê Văn Việt, Quận 9, TP.HCM</Text>
                    </View>
                </View>

                {/* Vị trí bạn & bệnh nhân */}
                <View
                    style={{
                        flex: 4,
                        flexDirection: "column",
                        backgroundColor: "rgba(211, 219, 240, 0.5)",
                        marginTop: 10,
                        borderRadius: 10,
                    }}
                >
                     {/* Khoảng cách giữa tài xế và bệnh nhân  */}
                     <Text style={{marginLeft:14, marginTop: 10}}>5 km</Text>
                    {/* Vị trí của bạn */}
                    <View style={styles.placeYouAndPatient}>
                        <View style={{}}>
                            <MaterialIcons
                                name="my-location"
                                size={30}
                                color="green"
                                style={{
                                    width: 30,
                                }}
                            />
                        </View>
                        
                        <View
                            style={{
                                paddingHorizontal: 20,
                            }}
                        >  
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                Vị trí của bạn
                            </Text>
                            <Text>12 Tân Chánh Hiệp, Quận 12, TP.HCM</Text>
                        </View>
                    </View>
                    {/* Vị trí bệnh nhân */}
                    <View style={styles.placeYouAndPatient}>
                        <View style={{}}>
                            <MaterialIcons
                                name="location-on"
                                size={30}
                                color="red"
                                style={{
                                    width: 30,
                                }}
                            />
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                            }}
                        >
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                                Vị trí bệnh nhân
                            </Text>
                            <Text>302 Nguyễn Ảnh Thủ, Quận 12, TP.HCM</Text>
                        </View>
                    </View>
                    <CountDown
                        until={10}
                        digitStyle={styles.timeCountdown}
                        onFinish={() => { }}
                        size={20}
                        timeToShow={["S"]}
                        timeLabels={{ s: "giây" }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingVertical: 20
                    }}>

                        <Button mode="contained" color='#1c942c' labelStyle={{ fontSize: 17, fontWeight: 'bold' }} compact={true}
                            onPress={() => { props.navigation.navigate('AcceptRequest') }}
                            style={{ marginRight: 5 }}
                        >
                            CHẤP NHẬN
                            </Button>
                        <Button mode="contained" color='red'
                            labelStyle={{ fontSize: 17, fontWeight: 'bold' }} compact={true}
                            style={{ marginLeft: 5 }}
                        >
                            HỦY
                        </Button>
                    </View>
                </View>
            </BackgroundImage>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },

    placeYouAndPatient: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginTop: 20,
    },

    timeCountdown: {
        borderRadius: 96,
        backgroundColor: "white",
        marginTop: 20,
    }
});

export default RequestInfoScreen;
