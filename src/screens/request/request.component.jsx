import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useDocumentData } from "react-firebase-hooks/firestore";
import * as Location from "expo-location";

import { configureTask } from "../../uitls/background-task.services";

import { pickedPatient, finishRequest, cancelRequest } from "../../redux/request/request.actions";
import { updateStatusCode } from "../../redux/message/message.action";
import { selectCurrentRequest } from "../../redux/request/request.selectors";
import { selectToken, selectCurrentUser } from "../../redux/user/user.selectors";
import { selectStatusCode } from "../../redux/message/message.selectors";
import { firestore } from "../../firebase/firebase.utils";

import ContactItem from "../../components/contact-item.component";
import Map from "../../components/map.component";
import GroupButton from "../../components/group-button.component";
import Place from "../../components/place.component";
import RejectModal from "../../components/reject-modal.component";
import Header from "../../components/header.component";
import Spinner from "../../components/spinner.component";
import Message from "../../components/message.component";

import styles from "./request.styles";
import messages from "../../uitls/message.data";

const RequestScreen = ({
    token,
    currentUser,
    currentRequest,
    statusCode,
    pickedPatient,
    cancelRequest,
    finishRequest,
    updateStatusCode,
    navigation
}) => {
    const [arrived, setArrived] = useState(false);
    const [finished, setFinished] = useState(false);
    const [cancelOption, setCancelOption] = useState(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [destination, setDestination] = useState(null);

    const documentRequestRef = firestore
        .collection("requests")
        .doc((currentRequest && `${currentRequest.requestId}`) || "0");

    const [requestStatus] = useDocumentData(documentRequestRef);

    useEffect(() => {
        if (currentRequest) {
            setDestination({
                latitude: currentRequest.pickUp.latitude,
                longitude: currentRequest.pickUp.longitude
            });
            Location.startLocationUpdatesAsync("syncLocation", {
                distanceInterval: 10,
                deferredUpdatesDistance: 10
            });
            configureTask({ username: currentUser.username, inRequest: true });
        }
    }, []);

    useEffect(() => {
        if (statusCode) {
            if (statusCode === 200) {
                setArrived(true);
                setDestination({
                    latitude: currentRequest.destination.latitude,
                    longitude: currentRequest.destination.longitude
                });
            }
            setLoading(false);
            finished && navigation.replace("Home");
        }
    }, [statusCode]);

    useEffect(() => {
        if (requestStatus && requestStatus.status === "canceled") {
            updateStatusCode(403);
            setTimeout(() => {
                navigation.replace("Home");
            }, 2900);
        }
        if (
            requestStatus &&
            requestStatus.poolId &&
            requestStatus.poolId !== currentUser.username
        ) {
            updateStatusCode(404);
            setTimeout(() => {
                navigation.replace("Home");
            }, 2900);
        }
    }, [requestStatus]);

    const handleArrived = () => {
        setLoading(true);
        pickedPatient(token, currentRequest.requestId);
    };

    const handleCancelRequest = () => {
        setModal(false);
        setLoading(true);
        cancelRequest(token, currentUser.id, currentRequest.requestId, cancelOption);
        navigation.replace("Home");
    };

    const handleFinish = () => {
        setLoading(true);
        setFinished(true);
        finishRequest(token, currentRequest.requestId);
    };

    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            {modal && (
                <RejectModal
                    option={cancelOption}
                    setOption={setCancelOption}
                    onClose={setModal}
                    onSubmit={handleCancelRequest}
                    isArrived={arrived}
                />
            )}
            {statusCode && <Message message={messages[statusCode]} isMessage={statusCode < 400} />}
            <Header title="Đang đón bệnh nhân" />
            <View style={{ marginTop: 5 }}>
                <Map destination={destination} />
            </View>
            <View style={styles.transportationContainer}>
                <View style={styles.transportation}>
                    {currentRequest && (
                        <Place
                            title="Điểm đến"
                            place={arrived ? currentRequest.destination : currentRequest.pickUp}
                            icon="https://i.ibb.co/gWdQ69d/radar.png"
                        />
                    )}
                    {!arrived && (
                        <View style={styles.groupContact}>
                            <ContactItem
                                icon="https://i.ibb.co/z2krjnj/phone-contact.png"
                                label="Người gọi"
                                phone="0988635032"
                            />
                            <ContactItem
                                icon="https://i.ibb.co/fprdRyq/phone-contact-purple.png"
                                label="Bệnh nhân"
                                phone={"0931738872"}
                            />
                        </View>
                    )}
                    <GroupButton
                        items={[
                            {
                                itemId: 1,
                                label: !arrived ? "Hủy yêu cầu" : "Báo cáo sự cố",
                                type: "reject",
                                action: () => setModal(true)
                            },
                            {
                                itemId: 2,
                                label: !arrived ? "Đón bệnh nhân" : "Kết thúc",
                                action: !arrived ? handleArrived : handleFinish,
                                style: { paddingHorizontal: arrived ? 45 : 30 }
                            }
                        ]}
                    />
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    token: selectToken,
    currentRequest: selectCurrentRequest,
    statusCode: selectStatusCode,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    pickedPatient: (token, requestId) => dispatch(pickedPatient(token, requestId)),
    finishRequest: (token, requestId) => dispatch(finishRequest(token, requestId)),
    cancelRequest: (token, driverId, requestId, reason) =>
        dispatch(cancelRequest(token, driverId, requestId, reason)),
    updateStatusCode: statusCode => dispatch(updateStatusCode(statusCode))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);
