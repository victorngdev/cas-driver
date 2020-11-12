import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { RadioButton } from "react-native-paper";

import CustomModal from "./custom-modal.componet";
import GroupButton from "./group-button.component";
import CustomOption from "./option.component";
import KeyboardAvoiding from "../components/keyboard-avoding.component";

const problems = [
    { itemId: 1, value: "first", label: "Phương tiện vận chuyển gặp sự cố" },
    { itemId: 2, value: "second", label: "Bệnh nhân không thể cứu chữa" },
    { itemId: 3, value: "third", label: "Bệnh nhân yêu cầu xuống xe" }
];

const ProblemModal = ({ isVisible, setIsProblem, handleReport, setProblemOption, problemOption }) => (
    <CustomModal title="Báo cáo sự cố" visible={isVisible} contentSize={{ height: "50%" }}>
        <KeyboardAvoiding style={styles.content}>
            <View style={styles.optionContainer}>
                <RadioButton.Group value={problemOption} onValueChange={value => setProblemOption(value)}>
                    {problems.map(({ itemId, ...otherProps }) => (
                        <CustomOption key={itemId} {...otherProps} />
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
                        action: () => setIsProblem(false),
                        style: { paddingHorizontal: 30 }
                    },
                    {
                        itemId: 2,
                        label: "Xác nhận",
                        action: handleReport,
                        style: { paddingHorizontal: 30 }
                    }
                ]}
            />
        </KeyboardAvoiding>
    </CustomModal>
);

export default ProblemModal;

const styles = StyleSheet.create({
    content: {
        width: "90%"
    },
    optionContainer: {
        flex: 1,
        paddingVertical: 20
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
