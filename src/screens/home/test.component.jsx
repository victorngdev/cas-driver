import React, { useState, useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const place = {
    name: "Benh vien Tu Du",
    address: "Dien Bien Phu, P. Ba Bon, Q.1, Ho Chi Minh"
};

const Test = () => {
    const [height, setHeight] = useState(150);
    const sheetRef = useRef(null);
    const animation = new Animated.Value(100);

    const renderContent = () => (
        <ScrollView
            style={styles.sheet}
            showsVerticalScrollIndicator={false}
            directionalLockEnabled={true}
        >
            <View style={{ width: "90%", height: animation._value, backgroundColor: "#333" }}>
                <Text>Hello</Text>
            </View>
            <TouchableOpacity style={{ marginTop: 20 }}>
                <Text>Toggle</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    const renderHeader = () => (
        <TouchableOpacity
            style={{
                backgroundColor: "white",
                padding: 10,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                alignItems: "center"
            }}
            onPress={() => sheetRef.current.snapTo(2)}
        >
            <Text>Close</Text>
        </TouchableOpacity>
    );

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={["95%", "45%", 0]}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={0}
        />
    );
};

export default Test;

const styles = StyleSheet.create({
    sheet: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        paddingHorizontal: 15
    }
});
