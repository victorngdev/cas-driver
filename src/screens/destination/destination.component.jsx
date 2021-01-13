import React, { useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentRequest } from "../../redux/request/request.selectors";
import { cancelRequest, finishRequest } from "../../redux/request/request.actions";
import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import {
    initLocation,
    clearConfirmationRequest,
    rejectRequest,
    finishRequestFirestore
} from "../../firebase/firebase.utils";
import messages from "../../uitls/message.data";

import Map from "../../components/map.component";
import GroupButton from "../../components/group-button.component";
import Place from "../../components/place.component";
import ProblemModal from "../../components/problem-modal.component";
import MessageModal from "../../components/message-modal.component";

import styles from "./destination.styles";

const pickUp = {
    name: "500 Lê Văn Việt",
    address: "Tăng Nhơn Phú A, Quận 9, Hồ Chí Minh"
};

const DestinationScreen = ({
    token,
    currentRequest,
    currentUser,
    cancelRequest,
    finishRequest,
    navigation
}) => {
    const [location, setLocation] = useState({ latitude: 10.632563, longitude: 105.323652 });
    const [modal, setModal] = useState(false);
    const [finish, setFinish] = useState(false);

    const handleReport = () => {
        cancelRequest(token, currentRequest.requestId, problem);
        initLocation(currentUser.username, location.latitude, location.longitude);
        clearConfirmationRequest(currentUser.username);
        rejectRequest(currentRequest.requestId);
    };

    const handleFinish = () => {
        finishRequest(token, currentRequest.requestId);
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            {modal && (
                <ProblemModal
                    problemOption={"first"}
                    onClose={() => setModal(false)}
                    onSubmit={handleReport}
                />
            )}
            {finish && <MessageModal action={handleFinish} content={messages.finish} />}
            <View style={{ marginTop: 15 }}>
                <Map source={location} setLocation={setLocation} />
            </View>
            <View style={styles.transportationContainer}>
                <View style={styles.transportation}>
                    <Place
                        title="Điểm đến"
                        place={currentRequest.destination}
                        icon="https://i.ibb.co/gWdQ69d/radar.png"
                        isEditable
                    />
                    <GroupButton
                        items={[
                            {
                                itemId: 1,
                                label: "Báo cáo sự cố",
                                type: "reject",
                                action: () => setModal(true)
                            },
                            {
                                itemId: 2,
                                label: "Kết thúc",
                                type: "finish",
                                action: handleFinish
                            }
                        ]}
                    />
                </View>
            </View>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    currentRequest: selectCurrentRequest,
    token: selectToken,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    cancelRequest: (token, requestId, reason) => dispatch(cancelRequest(token, requestId, reason)),
    finishRequest: (token, requestId) => dispatch(finishRequest(token, requestId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DestinationScreen);
