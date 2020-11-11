import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { clearRequest } from "../redux/request/request.actions";
import { selectCurrentRequest } from "../redux/request/request.selectors";

import CustomModal from "./custom-modal.componet";
import GroupButton from "./group-button.component";
import Place from "./place.component";
import RequestInfo from "./request-info.component";

const RequestModal = ({ isVisible, currentRequest, clearRequest, handleAccept }) => {
    return (
        <CustomModal visible={isVisible}>
            <View style={styles.groupTitle}>
                <Text style={styles.modalTitle}>Yêu cầu mới</Text>
                <Text style={styles.requestType}>Đặt giúp</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}
                style={styles.requestDetails}
            >
                <Place
                    title="Điểm đón"
                    place={currentRequest.pickUp}
                    distance={`Cách bạn ${5}`}
                    icon="https://i.ibb.co/D8HPk12/placeholder.png"
                />
                <Place
                    title="Điểm đến"
                    place={currentRequest.destination}
                    distance={`Cách điểm đón ${20}`}
                    icon="https://i.ibb.co/gWdQ69d/radar.png"
                />
                {currentRequest.patientName && (
                    <RequestInfo
                        title="Thông tin người gọi"
                        items={[
                            {
                                id: 1,
                                label: "Tên",
                                content: currentRequest.requesterName
                            },
                            {
                                id: 2,
                                label: "Số điện thoại",
                                content: currentRequest.requesterPhone
                            }
                        ]}
                    />
                )}
                <RequestInfo
                    title="Thông tin người bệnh"
                    items={[
                        {
                            label: "Tên",
                            content: currentRequest.patientName || currentRequest.requesterName
                        },
                        {
                            label: "Số điện thoại",
                            content: currentRequest.patientPhone || currentRequest.requesterPhone
                        },
                        {
                            label: "Tình trạng cấp cứu",
                            content: currentRequest.morbidity
                        },
                        {
                            label: "Hồ sơ sức khỏe",
                            content: currentRequest.healthInformation
                        }
                    ]}
                />
                {currentRequest.note && (
                    <RequestInfo title="Ghi chú" items={[{ content: currentRequest.note }]} />
                )}
            </ScrollView>
            <GroupButton
                items={[
                    {
                        itemId: 1,
                        label: "Từ chối",
                        type: "reject",
                        action: () => clearRequest()
                    },
                    {
                        itemId: 2,
                        label: "Chấp nhận ",
                        action: handleAccept,
                        counter: "4:56"
                    }
                ]}
            />
        </CustomModal>
    );
};

const mapStateToProps = createStructuredSelector({
    currentRequest: selectCurrentRequest
});

const mapDispatchToProps = dispatch => ({
    clearRequest: () => dispatch(clearRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestModal);

const styles = StyleSheet.create({
    groupTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    modalTitle: {
        fontFamily: "Texgyreadventor-bold",
        color: "#000",
        fontSize: 16,
        textTransform: "uppercase"
    },
    requestType: {
        fontFamily: "Texgyreadventor-bold",
        color: "#00960F",
        borderColor: "#00960F",
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 15,
        fontSize: 10,
        textTransform: "uppercase",
        marginLeft: 10
    },
    range: {
        fontFamily: "Texgyreadventor-regular",
        color: "#000",
        fontSize: 10,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 2,
        paddingHorizontal: 5
    },
    requestDetails: {
        width: "100%",
        marginVertical: 5,
        marginHorizontal: 10
    }
});
