import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";

import RequestItem from "./request-item.component";
import ArrageContainer from "./arrage-container.component";

const RequestBottomSheet = ({ requestRef }) => {
    const [sortBy, setSortBy] = useState("Khoảng cách");
    const [arrage, setArrage] = useState("Giảm dần");
    const [opacity, setOpacity] = useState(0);

    const renderContent = () => (
        <ScrollView
            style={styles.sheet}
            showsVerticalScrollIndicator={false}
            directionalLockEnabled={true}
        >
            <RequestItem />
            <RequestItem />
        </ScrollView>
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity style={{ width: 80 }}>
                <Text style={styles.action}>Xóa tất cả</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center", position: "relative" }}>
                <Icon
                    style={{ position: "absolute", top: 32, elevation: 10, opacity: opacity }}
                    size={20}
                    color="#555990"
                    name="caretup"
                />
                <TouchableOpacity onPress={() => setOpacity(opacity ? 0 : 1)}>
                    <Text style={styles.arrage}>Sắp xếp</Text>
                </TouchableOpacity>
                <View style={[styles.arrangeOption, { opacity: opacity }]}>
                    <ArrageContainer
                        title="Sắp xếp theo"
                        current={sortBy}
                        onValueChange={setSortBy}
                        options={["Khoảng cách", "Loại yêu cầu", "Thời gian chờ"]}
                    />
                    <ArrageContainer
                        title="Thứ tự"
                        current={arrage}
                        onValueChange={setArrage}
                        options={["Tăng dần", "Giảm dần"]}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{ width: 80, alignItems: "flex-end" }}
                onPress={() => requestRef.current.snapTo(2)}
            >
                <Icon size={18} name="close" />
            </TouchableOpacity>
        </View>
    );

    return (
        <BottomSheet
            ref={requestRef}
            snapPoints={["90%", "45%", 0]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={2}
        />
    );
};

export default RequestBottomSheet;

const styles = StyleSheet.create({
    sheet: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 15
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingTop: 10
    },
    action: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        paddingTop: 10,
        paddingBottom: 5,
        flexBasis: "25%"
    },
    arrage: {
        fontFamily: "Texgyreadventor-regular",
        backgroundColor: "rgba(85, 89, 144, 0.25)",
        paddingVertical: 7,
        paddingHorizontal: 40,
        borderRadius: 20
    },
    arrangeOption: {
        flexDirection: "row",
        position: "absolute",
        top: 45,
        justifyContent: "space-between",
        backgroundColor: "#555990",
        elevation: 8,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    title: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 12,
        color: "#757f80"
    }
});
