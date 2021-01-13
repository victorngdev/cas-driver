import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { selectCurrentRequest } from "../../redux/request/request.selectors";
import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { pickedPatient, cancelRequest } from "../../redux/request/request.actions";
import { initLocation, clearConfirmationRequest, firestore } from "../../firebase/firebase.utils";

import ContactItem from "../../components/contact-item.component";
import Map from "../../components/map.component";
import GroupButton from "../../components/group-button.component";
import Place from "../../components/place.component";
import RejectModal from "../../components/reject-modal.component";
import Header from "../../components/header.component";

import styles from "./pickup.styles";

const PickupScreen = ({
    token,
    currentRequest,
    currentUser,
    pickedPatient,
    cancelRequest,
    navigation
}) => {
    const [location, setLocation] = useState(null);
    const [rejectOption, setRejectOption] = useState("Bấm nhầm chấp nhận yêu cầu");
    const [modal, setModal] = useState(false);

    const documentRequestRef = firestore
        .collection("requests")
        .doc((currentRequest && `${currentRequest.requestId}`) || "0");

    const [requestStatus] = useDocumentData(documentRequestRef);

    useEffect(() => {
        if (!requestStatus) return;
        if (currentRequest && requestStatus.status === "canceled") {
            clearConfirmationRequest(currentUser.username);
            initLocation(currentUser.username, location.latitude, location.longitude);
            clearRequest();
            setIsCancelled(true);
        }
    }, [requestStatus, currentRequest]);

    const handleArrived = () => {
        pickedPatient(token, currentRequest.requestId);
        navigation.navigate("Destination");
    };

    const handleReject = () => {
        // cancelRequest(token, currentRequest.requestId, rejectOption);
        // initLocation(currentUser.username, location.latitude, location.longitude);
        // clearConfirmationRequest(currentUser.username);
        // rejectRequest(currentRequest.requestId);
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            {modal && (
                <RejectModal
                    rejectOption={rejectOption}
                    setRejectOption={setRejectOption}
                    onClose={setModal}
                    onSubmit={handleReject}
                />
            )}
            <Header title="Đang đón bệnh nhân" />
            <View style={{ marginTop: 5 }}>
                <Map source={location} setLocation={setLocation} />
            </View>
            <View style={styles.transportationContainer}>
                <View style={styles.transportation}>
                    <Place
                        title="Điểm đến"
                        place={currentRequest && currentRequest.pickUp}
                        icon="https://i.ibb.co/gWdQ69d/radar.png"
                    />
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
                    <GroupButton
                        items={[
                            {
                                itemId: 1,
                                label: "Hủy yêu cầu",
                                type: "reject",
                                action: handleReject
                            },
                            {
                                itemId: 2,
                                label: "Đón bệnh nhân",
                                action: handleArrived
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
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    pickedPatient: (token, requestId) => dispatch(pickedPatient(token, requestId)),
    cancelRequest: (token, requestId, reason) => dispatch(cancelRequest(token, requestId, reason))
});

export default connect(mapStateToProps, mapDispatchToProps)(PickupScreen);
