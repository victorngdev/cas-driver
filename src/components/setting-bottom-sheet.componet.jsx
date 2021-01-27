import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectSetting, selectUsername } from "../redux/user/user.selectors";
import { updateSetting } from "../redux/user/user.actions";
import { saveSetting } from "../firebase/firebase.utils";

import CustomOption from "./option.component";

const options = [
    { itemId: 6, value: "Tất cả" },
    { itemId: 2, value: "Đến bệnh viện" },
    { itemId: 3, value: "Đi về nhà" }
];

const SettingBottomSheet = ({ username, setting, settingRef, updateSetting }) => {
    const [currentsetting, setCurrentSetting] = useState(setting);

    const handleSaveSetting = () => {
        const { distance, typeRequest } = currentsetting;

        saveSetting(username, distance, typeRequest);
        updateSetting(currentsetting);
        settingRef.current.snapTo(2);
    };

    const renderContent = () => (
        <View style={styles.setting}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.title}>Thiết lập nhận yêu cầu</Text>
                <Icon onPress={() => settingRef.current.snapTo(2)} size={18} name="close" />
            </View>
            <View style={styles.option}>
                <Text style={styles.label}>Loại yêu cầu</Text>
                <RadioButton.Group
                    onValueChange={value =>
                        setCurrentSetting({ ...currentsetting, typeRequest: value })
                    }
                    value={currentsetting.typeRequest}
                >
                    {options.map(({ itemId, value }) => (
                        <CustomOption key={itemId} value={itemId} label={value} />
                    ))}
                </RadioButton.Group>
            </View>
            <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                <Text style={styles.label}>Khoảng cách nhận yêu cầu</Text>
                <Text style={styles.distance}>{currentsetting.distance} km</Text>
                <Slider
                    style={{ width: "100%" }}
                    minimumValue={1}
                    maximumValue={500}
                    minimumTrackTintColor="#102eef"
                    maximumTrackTintColor="#ff0000"
                    thumbTintColor="#102eef"
                    step={5}
                    value={currentsetting.distance}
                    onValueChange={value =>
                        setCurrentSetting({ ...currentsetting, distance: value })
                    }
                />
            </View>
            <TouchableOpacity onPress={handleSaveSetting}>
                <Text style={styles.action}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <BottomSheet
            enabledContentGestureInteraction={false}
            ref={settingRef}
            snapPoints={[350, 200, 0]}
            initialSnap={2}
            borderRadius={30}
            renderContent={renderContent}
        />
    );
};

const mapStateToProps = createStructuredSelector({
    username: selectUsername,
    setting: selectSetting
});

const mapDispatchToProps = dispatch => ({
    updateSetting: setting => dispatch(updateSetting(setting))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingBottomSheet);

const styles = StyleSheet.create({
    setting: {
        backgroundColor: "#fff",
        height: "auto",
        padding: 20,
        paddingTop: 10
    },
    title: {
        width: "95%",
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
