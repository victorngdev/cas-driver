import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

import CustomModal from "./custom-modal.componet";
import GroupButton from "./group-button.component";
import CustomOption from "./option.component";

const options = [
    { itemId: 1, value: "Bấm nhầm chấp nhận yêu cầu" },
    { itemId: 2, value: "Không thể đón bệnh nhân đúng giờ" },
    { itemId: 3, value: "Xe bị hỏng không thể đến nơi" },
    { itemId: 4, value: "Địa chỉ không thể lái xe vào" },
    { itemId: 5, value: "Bệnh nhân liên lạc đề nghị huỷ" }
];

const RejectModal = ({ rejectOption, setRejectOption, isVisible, onClose, onSubmit }) => (
    <CustomModal title="Lí do hủy yêu cầu" visible={isVisible}>
        <View style={styles.optionContainer}>
            <RadioButton.Group value={rejectOption} onValueChange={value => setRejectOption(value)}>
                {options.map(({ itemId, value }) => (
                    <CustomOption key={itemId} value={value} label={value} />
                ))}
            </RadioButton.Group>
            <TextInput style={styles.optionOther} placeholder="Khác" />
        </View>
        <GroupButton
            items={[
                {
                    itemId: 1,
                    label: "Đóng",
                    type: "reject",
                    action: () => onClose(false),
                    style: { paddingHorizontal: 30 }
                },
                {
                    itemId: 2,
                    label: "Xác nhận",
                    action: onSubmit,
                    style: { paddingHorizontal: 30 }
                }
            ]}
        />
    </CustomModal>
);

export default RejectModal;

const styles = StyleSheet.create({
    optionContainer: {
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
