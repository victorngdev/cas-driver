import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withNavigation } from "react-navigation";

import { selectToken } from "../../redux/user/user.selectors";

import Place from "../../components/place.component";
import FeedbackShow from "../../components/feedback-show.component";
import { fetchHistoryDetails } from "../../apis/core.apis";
import { selectHistory } from "../../redux/request/request.selectors";
import Header from "../../components/header.component";

const pickUp = {
    name: "Vị trí bệnh nhân",
    address: "1141/15/7, Lê Công, Gò Vấp",
    date: "20/07/2020",
    time: "10:20"
};

const destination = {
    name: "Bệnh viện Quân Y",
    address: "365 Lê Văn Việt, Q.9, Tp. HCM",
    date: "20/07/2020",
    time: "12:20"
};

const HistoryDetailScreen = ({ navigation, token, history }) => {
    const [request, setRequest] = useState(null);

    useEffect(() => {
        fetchHistoryDetails(token, history).then(response => setRequest(response.data));
    }, [token, history]);

    return (
        <View style={styles.container}>
            <Header title="Chi tiết" gotoScreen={() => navigation.goBack()} />
            {request && (
                <View style={styles.driverInfo}>
                    <Image
                        style={styles.background}
                        source={require("../../../assets/images/request-details-bg.png")}
                    />
                    <View style={styles.content}>
                        <Image style={styles.image} source={{ uri: request.user.imageUrl }} />
                        <Text style={styles.name}>{request.user.displayName}</Text>
                        <Text style={styles.phone}>{request.user.phone}</Text>
                    </View>
                    <Text style={styles.status}>Thành công</Text>
                </View>
            )}
            {request && (
                <View style={styles.details}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Place
                            title="Điếm đón"
                            place={request.pickUp}
                            icon="https://i.ibb.co/D8HPk12/placeholder.png"
                        />
                        <Place
                            title="Điếm nhận"
                            place={request.destination}
                            icon="https://i.ibb.co/gWdQ69d/radar.png"
                        />
                        {request.feedbackDriver && (
                            <FeedbackShow
                                title="Góp ý về bạn"
                                content={request.feedbackDriver}
                                level={Number.parseInt(request.ratingDriver)}
                                size={12}
                            />
                        )}
                        {request.morbidity && (
                            <FeedbackShow title="Tình trạng bệnh" content={request.morbidity} />
                        )}
                        {request.morbidityNote && (
                            <FeedbackShow title="Ghi chú" content={request.morbidityNote} />
                        )}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    token: selectToken,
    history: selectHistory
});

export default withNavigation(connect(mapStateToProps)(HistoryDetailScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: "relative",
        alignItems: "center"
    },
    driverInfo: {
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    content: {
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    background: {
        flex: 1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginTop: 50
    },
    name: {
        fontSize: 20,
        marginTop: 10,
        color: "#26324A",
        fontFamily: "Texgyreadventor-bold"
    },
    licensePlate: {
        fontSize: 12,
        color: "#787881",
        fontFamily: "Texgyreadventor-regular"
    },
    phone: {
        fontSize: 16,
        color: "#494958",
        fontFamily: "Texgyreadventor-bold"
    },
    status: {
        position: "absolute",
        bottom: -16,
        backgroundColor: "#A147E4",
        color: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        fontFamily: "Texgyreadventor-regular",
        fontSize: 16
    },
    details: {
        width: "100%",
        height: "45%",
        display: "flex",
        flexDirection: "column",
        marginTop: 30,
        paddingHorizontal: 30
    },
    note: {
        fontSize: 16,
        backgroundColor: "#fff",
        color: "#4F5C77",
        opacity: 0.75,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
        minHeight: 80,
        fontFamily: "Texgyreadventor-regular"
    },
    action: {
        position: "absolute",
        bottom: 10,
        zIndex: 50,
        backgroundColor: "#FFAB2E",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        color: "#fff",
        fontSize: 16,
        fontFamily: "Texgyreadventor-regular",
        elevation: 10
    },
    profile: {
        backgroundColor: "#fff",
        opacity: 0.75,
        borderRadius: 10,
        marginBottom: 5,
        paddingVertical: 10,
        paddingHorizontal: 20
    }
});
