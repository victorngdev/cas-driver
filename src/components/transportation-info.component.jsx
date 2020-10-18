import React from "react";
import { View, StyleSheet } from "react-native";

import Place from "./place.component";
import ContactItem from "./contact-item.component";
import CustomButton from "./custom-button.comonent";
import GroupButton from "./group-button.component";

const TransportationInfo = ({ isArrived, setIsReject, setIsArrived, setIsFinish, request }) => (
    <View style={styles.transportationContainer}>
        <View style={styles.transportation}>
            <Place
                place={{ name: "Vị trí của bạn", address: "480 Xa lộ Hà Nội, Bình Thạnh, HCM" }}
                icon="https://i.ibb.co/D8HPk12/placeholder.png"
            />
            <Place
                title="Điểm đến"
                place={!isArrived ? request.pickUp : request.destination}
                icon="https://i.ibb.co/gWdQ69d/radar.png"
            />
            {!isArrived ? (
                <View style={styles.groupContact}>
                    <ContactItem
                        icon="https://i.ibb.co/z2krjnj/phone-contact.png"
                        label="Người gọi"
                        phone="0931738872"
                    />
                    <ContactItem
                        icon="https://i.ibb.co/fprdRyq/phone-contact-purple.png"
                        label="Bệnh nhân"
                        phone="0327008005"
                    />
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
                            action: () => setIsArrived(true)
                        }
                    ]}
                />
            ) : (
                <CustomButton action={() => setIsFinish(true)} label="Kết thúc" type="finish" />
            )}
        </View>
    </View>
);

export default TransportationInfo;

const styles = StyleSheet.create({
    transportationContainer: {
        flex: 4,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
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
        justifyContent: "space-between",
        marginVertical: 5
    }
});
