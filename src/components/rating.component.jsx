import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Rating = ({ level, size }) => (
    <View style={styles.rating}>
        <Image
            style={styles.star}
            style={{ width: size, height: size }}
            source={{ uri: "https://i.ibb.co/DR4mTc0/heart.png" }}
        />
        {level >= 2 ? (
            <Image
                style={styles.star}
                style={{ width: size, height: size, marginHorizontal: 2 }}
                source={{ uri: "https://i.ibb.co/DR4mTc0/heart.png" }}
            />
        ) : null}
        {level >= 3 ? (
            <Image
                style={styles.star}
                style={{ width: size, height: size, marginHorizontal: 2 }}
                source={{ uri: "https://i.ibb.co/DR4mTc0/heart.png" }}
            />
        ) : null}
        {level >= 4 ? (
            <Image
                style={styles.star}
                style={{ width: size, height: size, marginHorizontal: 2 }}
                source={{ uri: "https://i.ibb.co/DR4mTc0/heart.png" }}
            />
        ) : null}
        {level >= 5 ? (
            <Image
                style={styles.star}
                style={{ width: size, height: size, marginHorizontal: 2 }}
                source={{ uri: "https://i.ibb.co/DR4mTc0/heart.png" }}
            />
        ) : null}
    </View>
);

export default Rating;

const styles = StyleSheet.create({
    rating: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
});
