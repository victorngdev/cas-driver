import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import {
    Avatar,
    Title,
    Text,
    TouchableRipple,
    Switch,
} from "react-native-paper";
import BackgroundImage from "../../components/background-screen.component";
import styles from "./home-style";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../../components/header.component";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import CountDown from "react-native-countdown-component";

const HomeStack = createStackNavigator();

function HomeScreen(props) {
    const [isAction, setIsAction] = React.useState(false);
    const [text, setText] = useState("Chưa sẵn sàng");

    const toggleAction = () => {
        if (isAction) {
            setIsAction(!isAction);
            setText("Chưa sẵn sàng");
        }
        if (!isAction) {
            setIsAction(!isAction);
            setText("Sẵn sàng");

            Alert.alert(
                "Hệ thống sẽ thông báo cho bạn khi có yêu cầu từ bệnh nhân"
            );

            setTimeout(() => {
                props.navigation.navigate("RequestInfo");
            }, 3000);
        }
    };

    return (
        <View style={styles.container}>
            <BackgroundImage>
                <Header
                    title="Trang chủ"
                    passedIcon={() => (
                        <Icon
                            name="menu"
                            size={30}
                            color="#a2a2db"
                            style={{ width: 20 }}
                            onPress={() => props.navigation.openDrawer()}
                        />
                    )}
                >
                    <MaterialIcons
                        name="notifications"
                        size={30}
                        color="#a2a2db"
                        style={{ marginLeft: "auto", marginRight: 10 }}
                        onPress={() => props.navigation.openDrawer()}
                    />
                </Header>

                <View style={styles.viewMap}>
                    <MapView
                        style={styles.map}
                        mapType={Platform.OS == "android" ? "none" : "standard"}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        followsUserLocation={true}
                    ></MapView>
                </View>

                <View style={styles.rate}>
                    <Text style={styles.text}> Đánh giá hiện tại</Text>
                    <View style={styles.starList}>
                        <Image
                            style={styles.iconStar}
                            source={require("../../../assets/icons/goldStar.png")}
                        />
                        <Image
                            style={styles.iconStar}
                            source={require("../../../assets/icons/goldStar.png")}
                        />
                        <Image
                            style={styles.iconStar}
                            source={require("../../../assets/icons/goldStar.png")}
                        />
                        <Image
                            style={styles.iconStar}
                            source={require("../../../assets/icons/goldStar.png")}
                        />
                        <Image
                            style={styles.iconStar}
                            source={require("../../../assets/icons/emptyStar.png")}
                        />
                    </View>
                </View>

                <View style={styles.status}>
                    <View style={styles.preference}>
                        <TouchableRipple
                            onPress={() => {
                                toggleAction();
                            }}
                        >
                            <View pointerEvents="none">
                                <Switch value={isAction} />
                            </View>
                        </TouchableRipple>
                    </View>

                    <View style={styles.statusText}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </View>
            </BackgroundImage>
        </View>
    );
}

export default HomeScreen;
