import React, { Component } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Linking,
    Modal,
    Dimensions,
    Button,
    ButtonGroup

} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ButtonText from "../../components/button-text.component";
import Icon from "react-native-vector-icons/FontAwesome";
import { RadioButton, TextInput } from 'react-native-paper';


var screen = Dimensions.get('window');



class AcceptRequestScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            show: false,
            value: 'first'
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                    }}
                >
                    <ImageBackground
                        source={require("../../../assets/icons/background.png")}
                        style={styles.image}
                    >
                        {/* Header */}
                        <View style={styles.headerView}>
                            <ImageBackground
                                source={require("../../../assets/icons/header-accept-request.png")}
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            color: "blue",
                                        }}
                                    >
                                        ĐÓN BỆNH NHÂN
                                </Text>
                                    <Text style={{ fontSize: 15, marginTop: 10 }}>
                                        Huy
                                </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            color: "green",
                                        }}
                                    >
                                        ĐẾN NƠI
                                </Text>
                                </View>
                            </ImageBackground>
                        </View>
                        {/* Info */}
                        <View style={styles.infoView}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                }}
                            >
                                <View
                                    style={{
                                        flex: 4,
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            marginLeft: 10,
                                        }}
                                        numberOfLines={1}
                                    >
                                        Bệnh viện Quân Y
                                </Text>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 15,
                                            marginLeft: 10,
                                        }}
                                        numberOfLines={2}
                                    >
                                        365, Lê Văn Việt, Quận 9, TP.Hồ Chí Minh
                                </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity onPress={() => { props.navigation.navigate("GoogleMap"); }}>
                                        <Icon name="location-arrow" size={35} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                            {/* Note */}
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    backgroundColor: "white",
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                        fontSize: 18,
                                    }}
                                >
                                    Ghi chú:
                            </Text>
                                <Text style={{ marginLeft: 20, fontSize: 15 }}>
                                    Bệnh nhân cần người sơ cứu, vì đang bị gãy chân
                            </Text>
                            </View>
                        </View>
                        {/* Map */}
                        <View style={{ flex: 4 }}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={{ flex: 1 }}
                                showsUserLocation={true}
                                showsMyLocationButton={true}
                            />

                        </View>
                        {/* Call, Exit... */}
                        <View style={styles.footerView}>
                            <View
                                style={{
                                    flex: 3,
                                    flexDirection: "row",
                                }}
                            >
                                <View style={styles.layoutIconAndText}>
                                    <MaterialIcons name="local-phone" size={50} onPress={() => Linking.openURL('tel: 0907766357')}
                                    />
                                    <Text>Gọi</Text>
                                </View>
                                <View style={styles.layoutIconAndText}>
                                    <TouchableOpacity onPress={() => { this.setState({ show: true }) }}>
                                        <MaterialIcons name="cancel" size={50} />
                                    </TouchableOpacity>
                                    <Text>Hủy</Text>

                                    <Modal transparent={true} visible={this.state.show}>
                                        <View style={{
                                            backgroundColor: "#e9eff8",
                                            marginTop: 100,
                                            marginLeft: 30,
                                            shadowRadius: 10,
                                            width: 300,
                                            height: 300,
                                            borderColor: 'red'
                                        }} >
                                            {/* Reason Cancel  */}
                                            <View style={styles.reasonCancel}>
                                                <View style={styles.popupTitle}>
                                                    <Text style={styles.text}>Lý do huỷ chuyến xe này</Text>
                                                </View>

                                                <View style={styles.rdReason}>
                                                    <RadioButton.Group onValueChange={value => this.setState({ value })}
                                                        value={this.state.value}>
                                                        <View style={styles.option}>

                                                            <RadioButton value="first" title='Hello' />
                                                            <Text style={{ marginTop: 7 }}>Bấm nhầm nhận chuyến</Text>
                                                        </View>
                                                        <View style={styles.option}>
                                                            <RadioButton value="second" />
                                                            <Text style={{ marginTop: 7 }}>Không thể đón bệnh nhân đúng giờ</Text>
                                                        </View>
                                                        <View style={styles.option}>
                                                            <RadioButton value="third" />
                                                            <Text style={{ marginTop: 7 }}>Không liên lạc được với bệnh nhân</Text>
                                                        </View>
                                                        <View style={styles.option}>
                                                            <RadioButton value="four" />
                                                            <Text style={{ marginTop: 7 }}>Bệnh nhân đề nghị huỷ</Text>
                                                        </View>
                                                    </RadioButton.Group>
                                                </View>
                                                <TextInput placeholder='Khác' style={styles.OtherReasonCancel} />



                                                <View style={styles.confirm}>
                                                    <TouchableOpacity onPress={() => { this.setState({ show: false }) }}>
                                                        <ButtonText textContent="Thoát"
                                                            styleButton={styles.buttonNotCancel}
                                                            styleText={{
                                                                fontWeight: "bold",
                                                                color: "blue",
                                                                fontSize: 15,

                                                            }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { this.setState({ show: false }) }}>
                                                        <ButtonText textContent="Huỷ"
                                                            styleButton={styles.buttonToCancel}
                                                            styleText={{
                                                                fontWeight: "bold",
                                                                color: "#fff",
                                                                fontSize: 15,
                                                            }} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>


                                        </View>
                                    </Modal>

                                </View>
                            </View>
                            <View style={{ flex: 2, flexDirection: "row" }}>
                                <ButtonText
                                    textContent="Đến điểm"
                                    styleButton={styles.buttonGoTo}
                                    styleText={{
                                        fontWeight: "bold",
                                        color: "blue",
                                        fontSize: 17,
                                    }}
                                />
                                <ButtonText
                                    textContent="Đón bệnh nhân"
                                    styleButton={styles.buttonGetPatient}
                                    gotoScreen={() =>
                                        this.props.navigation.navigate("PatientArrived")
                                    }
                                    styleText={{
                                        fontWeight: "bold",
                                        color: "white",
                                        fontSize: 17,
                                    }}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView >
            </View >
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    headerView: {
        flex: 2,
        flexDirection: "row",
    },
    infoView: {
        flex: 3,
    },
    mapView: {
        flex: 4,
    },
    footerView: {
        flex: 4,
        alignItems: "center",
    },
    layoutIconAndText: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonGetPatient: {
        borderRadius: 8,
        width: 150,
        backgroundColor: "green",
        marginLeft: 20,
    },
    buttonToCancel: {
        width: 80,
        backgroundColor: "green",
        marginLeft: 20,
    },
    buttonGoTo: {
        width: 100,
        borderRadius: 8,
    },
    buttonNotCancel: {
        width: 80,
        marginHorizontal: 40
    },
    text: {
        color: "#000",
        fontSize: 20,
        textAlign: 'center',
        fontFamily: "Roboto_500Medium",
    },
    option: {
        flexDirection: 'row'
    },
    rdReason: {
        marginTop: 10
    },
    confirm: {
        marginTop: 0,
        flexDirection: 'row'
    }
    , OtherReasonCancel: {

        backgroundColor: '#fff',
        height: 35,
        borderRadius: 10
    },
    popupTitle: {
        height: 35,
        backgroundColor: '#c4def6',
    }
});

export default AcceptRequestScreen;