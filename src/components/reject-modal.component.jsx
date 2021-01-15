import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

import CustomModal from "./custom-modal.componet";
import GroupButton from "./group-button.component";
import CustomOption from "./option.component";

const options = {
    false: [
        { itemId: 1, value: "Bấm nhầm chấp nhận yêu cầu" },
        { itemId: 2, value: "Không thể đón bệnh nhân đúng giờ" },
        { itemId: 3, value: "Xe bị hỏng không thể đến nơi" },
        { itemId: 4, value: "Địa chỉ không thể lái xe vào" },
        { itemId: 5, value: "Bệnh nhân liên lạc đề nghị huỷ" }
    ],
    true: [
        { itemId: 1, value: "Phương tiện vận chuyển gặp sự cố" },
        { itemId: 2, value: "Bệnh nhân không thể cứu chữa" },
        { itemId: 3, value: "Bệnh nhân yêu cầu xuống xe" }
    ]
};

const RejectModal = ({ option, setOption, isArrived, onClose, onSubmit }) => (
    <CustomModal title="Lí do hủy yêu cầu">
        <View style={styles.optionContainer}>
            <RadioButton.Group value={option} onValueChange={value => setOption(value)}>
                {options[isArrived].map(({ itemId, value }) => (
                    <CustomOption key={itemId} value={value} label={value} />
                ))}
            </RadioButton.Group>
            <TextInput
                onChangeText={value => setOption(value)}
                style={styles.optionOther}
                placeholder="Khác"
            />
        </View>
        <GroupButton
            items={[
                {
                    itemId: 1,
                    label: "Đóng",
                    type: "reject",
                    action: () => onClose(false),
                    style: { paddingHorizontal: 50 }
                },
                {
                    itemId: 2,
                    label: "Xác nhận",
                    action: onSubmit,
                    style: { paddingHorizontal: 40 }
                }
            ]}
        />
    </CustomModal>
);

export default RejectModal;

const styles = StyleSheet.create({
    optionContainer: {
        width: "90%",
        paddingVertical: 10
    },
    optionOther: {
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 25,
        marginTop: 10,
        fontFamily: "Texgyreadventor-regular",
        fontSize: 14
    }
});
