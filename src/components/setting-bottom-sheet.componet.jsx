import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import Slider from "@react-native-community/slider";

import CustomOption from "./option.component";

const options = [
    { itemId: 6, value: "Tất cả" },
    { itemId: 2, value: "Cấp cứu" },
    { itemId: 3, value: "Đi về nhà" }
];

const SettingBottomSheet = ({ settingRef, onValueChange, onSubmit }) => {
    const [setting, setSetting] = useState({
        distance: 150,
        typeRequest: 6
    });

    const renderContent = () => (
        <View style={styles.setting}>
            <Text style={styles.title}>Thiết lập nhận yêu cầu</Text>
            <View style={styles.option}>
                <Text style={styles.label}>Loại yêu cầu</Text>
                <RadioButton.Group
                    onValueChange={value => setSetting({ ...setting, typeRequest: value })}
                    value={setting.typeRequest}
                >
                    {options.map(({ itemId, value }) => (
                        <CustomOption key={itemId} value={itemId} label={value} />
                    ))}
                </RadioButton.Group>
            </View>
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <Text style={styles.label}>Khoảng cách nhận yêu cầu</Text>
                <Text style={styles.distance}>{setting.distance} km</Text>
                <Slider
                    style={{ width: "100%" }}
                    minimumValue={10}
                    maximumValue={500}
                    minimumTrackTintColor="#102eef"
                    maximumTrackTintColor="#ff0000"
                    thumbTintColor="#102eef"
                    step={5}
                    value={setting.distance}
                    onSlidingComplete={value => setSetting({ ...setting, distance: value })}
                />
            </View>
            <TouchableOpacity onPress={onSubmit}>
                <Text style={styles.action}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <BottomSheet
            enabledContentGestureInteraction={false}
            ref={settingRef}
            snapPoints={["54%", "20%", 0]}
            initialSnap={2}
            borderRadius={30}
            renderContent={renderContent}
        />
    );
};

export default SettingBottomSheet;

const styles = StyleSheet.create({
    setting: {
        backgroundColor: "#fff",
        height: "auto",
        padding: 20,
        paddingTop: 10
    },
    title: {
        width: "100%",
        textAlign: "center",
        fontFamily: "Texgyreadventor-bold",
        fontSize: 16
    },
    label: {
        fontFamily: "Texgyreadventor-bold",
        color: "#666",
        marginTop: 10
    },
    action: {
        width: "95%",
        textAlign: "center",
        marginTop: 30,
        paddingVertical: 10,
        backgroundColor: "#e7ecf9",
        borderRadius: 20,
        fontFamily: "Texgyreadventor-bold",
        color: "#333",
        fontSize: 13
    },
    distance: {
        width: "100%",
        marginTop: 10,
        textAlign: "center",
        fontFamily: "Texgyreadventor-regular",
        fontSize: 15
    }
});
