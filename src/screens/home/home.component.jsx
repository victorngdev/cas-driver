import React, { useState } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import BackgroundImage from "../../components/background-screen.component";
import HomeHeader from "../../components/home-header.component";

import styles from "./home.style";
import HomeDriverInfo from "../../components/home-driver-info.component";
import RejectModal from "../../components/reject-modal.component";
import MessageModal from "../../components/message-modal.component";
import RequestModal from "../../components/request-modal.component";
import TransportationInfo from "../../components/transportation-info.component";
import ProblemModal from "../../components/problem-modal.component";
import KeyboardAvoiding from "../../components/keyboard-avoding.component";

const HomeScreen = ({ navigation }) => {
    const pickUp = {
        name: "Vị trí người bệnh",
        address: "632 Tô Ký, Q.12, HCM"
    };

    const destination = {
        name: "Bệnh viện Quân Y",
        address: "321 Lê Văn Việt, Q.9, HCM"
    };

    const m_request = {
        pickUp: pickUp,
        destination: destination
    };

    const [isReady, setIsReady] = useState(false);
    const [title, setTitle] = useState("Chưa sẵn sàng");
    const [isToggle, setIsToggle] = useState(false);
    const [request, setRequest] = useState(null);
    const [isArrived, setIsArrived] = useState(false);
    const [isReject, setIsReject] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [rejectOption, setRejectOption] = useState("first");
    const [isProblem, setIsProblem] = useState(false);
    const [problem, setProblem] = useState("first");

    const toggleAction = () => {
        setIsReady(!isReady);
        setTitle(!isReady ? "Đang sẵn sàng" : "Chưa sẵn sàng");
        if (!isReady) {
            setTimeout(() => {
                setIsToggle(true);
                setRequest(m_request);
            }, 2000);
        }
    };

    const handleFinish = () => {
        setIsArrived(false);
        setRequest(null);
        setIsReject(false);
        setIsFinish(false);
    };

    const handleAccept = () => {
        setIsToggle(false);
        setTitle("Đang đón bệnh nhân");
    };

    const handleArrived = () => {
        setIsArrived(true);
        setTitle("Đang chở bệnh nhân");
    };

    const handleReport = () => {
        setIsProblem(false);
        setRequest(null);
    };

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <View style={{ flex: 1 }}>
                    <HomeHeader title={title} isReady={isReady} toggleAction={toggleAction} navigation={navigation} />
                </View>
                <RejectModal
                    rejectOption={rejectOption}
                    setRejectOption={setRejectOption}
                    isReject={isReady}
                    isVisible={isReject}
                    setIsReject={setIsReject}
                    handleFinish={handleFinish}
                />
                {request ? (
                    <RequestModal
                        pickUp={pickUp}
                        destination={destination}
                        handleAccept={handleAccept}
                        setRequest={setRequest}
                        isVisible={isToggle}
                    />
                ) : null}
                <MessageModal action={handleFinish} isVisible={isFinish} />
                <ProblemModal
                    isVisible={isProblem}
                    setIsProblem={setIsProblem}
                    handleReport={handleReport}
                    problemOption={problem}
                    setProblemOption={setProblem}
                />
                {/* Map screen */}
                <View style={request ? (isArrived ? { flex: 6 } : { flex: 5 }) : { flex: 7 }}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        followsUserLocation={true}
                    />
                </View>
                {!request ? (
                    <View style={{ flex: 2 }}>
                        <HomeDriverInfo
                            ratingLevel={5}
                            addressName="Vị trí hiện tại"
                            addressValue="1141 Quang Trung, Gò Vấp, HCM"
                        />
                    </View>
                ) : (
                    <TransportationInfo
                        isArrived={isArrived}
                        request={request}
                        handleArrived={handleArrived}
                        setIsFinish={setIsFinish}
                        setIsReject={setIsReject}
                        setIsProblem={setIsProblem}
                    />
                )}
            </BackgroundImage>
        </View>
    );
};

export default HomeScreen;
