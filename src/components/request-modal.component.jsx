import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import CustomModal from "./custom-modal.componet";
import GroupButton from "./group-button.component";
import Place from "./place.component";
import RequestInfo from "./request-info.component";

const RequestModal = ({ isVisible, pickUp, destination, setRequest, handleAccept }) => {
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
                    place={pickUp}
                    distance={`Cách bạn ${5}`}
                    icon="https://i.ibb.co/D8HPk12/placeholder.png"
                />
                <Place
                    title="Điểm đến"
                    place={destination}
                    distance={`Cách điểm đón ${20}`}
                    icon="https://i.ibb.co/gWdQ69d/radar.png"
                />
                <RequestInfo
                    title="Thông tin người gọi"
                    items={[
                        { id: 1, label: "Tên", content: "Hữu Công" },
                        { id: 2, label: "Số điện thoại", content: "0931738872" },
                    ]}
                />
                <RequestInfo
                    title="Thông tin người bệnh"
                    items={[
                        { label: "Tên", content: "Mai Thiên Toàn" },
                        { label: "Số điện thoại", content: "0327008005" },
                        {
                            label: "Tình trạng cấp cứu",
                            content: "Gãy xương chân do tai nạn giao thông",
                        },
                        {
                            label: "Hồ sơ sức khỏe",
                            content:
                                "Giới tính: Nam, 64 tuổi, huyết áp 134/85. Mắc bệnh huyết áp cao. Mẫn cảm với carbamazepine, phenobarbital và phenytoin.",
                        },
                    ]}
                />
                <RequestInfo title="Ghi chú" items={[{ content: "Cần dụng cụ sơ cứu tại chỗ" }]} />
            </ScrollView>
            <GroupButton
                items={[
                    {
                        itemId: 1,
                        label: "Từ chối",
                        type: "reject",
                        action: () => setRequest(null),
                    },
                    {
                        itemId: 2,
                        label: "Chấp nhận ",
                        action: () => handleAccept(),
                        counter: "4:56",
                    },
                ]}
            />
        </CustomModal>
    );
};

export default RequestModal;

const styles = StyleSheet.create({
    groupTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    modalTitle: {
        fontFamily: "Texgyreadventor-bold",
        color: "#000",
        fontSize: 16,
        textTransform: "uppercase",
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
        marginLeft: 10,
    },
    range: {
        fontFamily: "Texgyreadventor-regular",
        color: "#000",
        fontSize: 10,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    requestDetails: {
        width: "100%",
        marginVertical: 5,
        marginHorizontal: 10,
    },
});
