import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createStructuredSelector } from "reselect";

import { firestore, updateRequest } from "../firebase/firebase.utils";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { selectCurrentRequest } from "../redux/request/request.selectors";

import Place from "./place.component";
import ContactItem from "./contact-item.component";
import GroupButton from "./group-button.component";
import { connect } from "react-redux";

const TransportationInfo = ({
    isArrived,
    setIsReject,
    handleArrived,
    setIsFinish,
    request,
    setIsProblem,
    currentRequest
}) => {
    useEffect(() => {
        updateRequest(currentRequest.requestId, 10.06523, 106.90823);
    }, []);

    return (
        <View style={styles.transportationContainer}>
            <View style={styles.transportation}>
                <Place
                    title="Điểm đến"
                    place={!isArrived ? request.pickUp : request.destination}
                    icon="https://i.ibb.co/gWdQ69d/radar.png"
                    isEditable={isArrived}
                />
                {!isArrived ? (
                    <View style={styles.groupContact}>
                        <ContactItem
                            icon="https://i.ibb.co/z2krjnj/phone-contact.png"
                            label="Người gọi"
                            phone={request.requesterPhone}
                        />
                        {request.patientPhone && (
                            <ContactItem
                                icon="https://i.ibb.co/fprdRyq/phone-contact-purple.png"
                                label="Bệnh nhân"
                                phone={request.patientPhone}
                            />
                        )}
                    </View>
                ) : null}
                {!isArrived ? (
                    <GroupButton
                        items={[
                            {
                                itemId: 1,
                                label: "Hủy yêu cầu",
                                type: "reject",
                                action: () => setIsReject(true)
                            },
                            {
                                itemId: 2,
                                label: "Đón bệnh nhân",
                                action: () => handleArrived()
                            }
                        ]}
                    />
                ) : (
                    <GroupButton
                        items={[
                            {
                                itemId: 1,
                                label: "Báo cáo sự cố",
                                type: "reject",
                                action: () => setIsProblem(true)
                            },
                            {
                                itemId: 2,
                                label: "Kết thúc",
                                type: "finish",
                                action: () => setIsFinish(true)
                            }
                        ]}
                    />
                )}
            </View>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    currentRequest: selectCurrentRequest
});

export default connect(mapStateToProps)(TransportationInfo);

const styles = StyleSheet.create({
    transportationContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },
    transportation: {
        width: "85%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    groupContact: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
