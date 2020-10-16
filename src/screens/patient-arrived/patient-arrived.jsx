import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Linking, StatusBar, Alert } from 'react-native'
import BackgroundImage from '../../components/background-screen.component'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function PatientArrivedScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'space-between'
                }}
            >
                <BackgroundImage>
                    {/* Header */}
                    <View style={styles.headerView}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'silver'
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'blue' }}>BỆNH NHÂN ĐẾN NƠI</Text>
                            <Text style={{ fontSize: 20, marginTop: 10 }}>Huy</Text>
                        </View>
                    </View>
                    {/* Info */}
                    <View style={styles.infoView}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row"
                        }}>
                            <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }}>
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}
                                    numberOfLines={1}>
                                    Bệnh viện Quân Y
                                </Text>
                                <Text
                                    style={{ fontWeight: 'bold', fontSize: 15, marginLeft: 10 }}
                                    numberOfLines={2}>
                                    365, Lê Văn Việt, Quận 9, TP.Hồ Chí Minh
                                </Text>
                            </View>

                        </View>
                        {/* Note */}
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            backgroundColor: 'white'
                        }}>
                            <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 18 }}>Ghi chú:</Text>
                            <Text style={{ marginLeft: 20, fontSize: 15 }}>Bệnh nhân cần người sơ cứu, vì đang bị gãy chân</Text>
                        </View>
                    </View>
                    {/* Map */}
                    <View style={styles.viewMap}>
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            followsUserLocation={true}
                        />
                    </View>
                    {/* Call, Exit... */}
                    <View style={styles.footerView}>
                        <View style={{ flex: 6, flexDirection: 'row' }}>
                            <View style={styles.layoutIconAndText}>
                                <MaterialIcons
                                    name='local-phone' size={50}
                                    onPress={() => Linking.openURL('tel: 0907766357')}
                                />
                                <Text>Gọi</Text>
                            </View>
                        </View>
                        <View style={{ flex: 4, marginBottom: 10 }}>
                            <TouchableOpacity style={styles.buttonConfirm} onPress={() => {
                                Alert.alert(
                                    "Chuyến đi hoàn thành","Cảm ơn bạn đã giúp đỡ bệnh nhân"
                                );
                            }} >
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    paddingLeft: 10,
                                    paddingRight: 10
                                }}>BỆNH NHÂN XUỐNG XE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BackgroundImage>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headerView: {
        flex: 2,
        flexDirection: 'row'
    },
    infoView: {
        flex: 3,
    },
    map: {
        marginVertical: 5,
        marginHorizontal: 10,
        flex: 5.5,
        width: "100%",
        height: 380,
    },
    viewMap: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
    },

    footerView: {
        flex: 4,
        alignItems: 'center'
    },
    buttonGetPatient: {
        borderRadius: 8,
        backgroundColor: 'green'
    },
    layoutIconAndText: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonConfirm: {
        flex: 1,
        backgroundColor: "green",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default PatientArrivedScreen;