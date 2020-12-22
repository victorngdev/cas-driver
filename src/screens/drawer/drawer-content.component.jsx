import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import { logout } from "../../redux/user/user.actions";

const DrawerContent = props => {
    const [isAction, setIsAction] = React.useState(false);

    const toggleAction = () => {
        setIsAction(!isAction);
    };

    const handleLogout = () => {
        props.navigation.navigate("Login");
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        {props.currentUser && (
                            <View style={{ flexDirection: "row", marginTop: 15 }}>
                                <Avatar.Image
                                    source={{
                                        uri: props.currentUser.imageUrl
                                    }}
                                    size={60}
                                />
                                <View
                                    style={{
                                        flexDirection: "column",
                                        marginLeft: 15
                                    }}
                                >
                                    <Title style={styles.title}>
                                        {props.currentUser.displayName}
                                    </Title>
                                    <Caption style={{ fontFamily: "Texgyreadventor-regular" }}>
                                        {props.currentUser.phone}
                                    </Caption>
                                </View>
                            </View>
                        )}
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            labelStyle={styles.caption}
                            icon={({ color, size }) => (
                                <Icon name="home-outline" color={color} size={size} />
                            )}
                            label="Trang chủ"
                            onPress={() => {
                                props.navigation.navigate("Home");
                            }}
                        />
                        <DrawerItem
                            labelStyle={styles.caption}
                            icon={({ color, size }) => (
                                <Icon name="car-estate" color={color} size={size} />
                            )}
                            label="Đăng ký xe"
                            onPress={() => {
                                props.navigation.navigate("RegisterAmbulance");
                            }}
                        />

                        <DrawerItem
                            labelStyle={styles.caption}
                            icon={({ color, size }) => (
                                <Icon name="history" color={color} size={size} />
                            )}
                            label="Lịch sử"
                            onPress={() => {
                                props.navigation.navigate("History");
                            }}
                        />
                        <DrawerItem
                            labelStyle={styles.caption}
                            icon={({ color, size }) => (
                                <Icon name="account-check-outline" color={color} size={size} />
                            )}
                            label="Tài khoản"
                            onPress={() => {
                                props.navigation.navigate("AccountInfo");
                            }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    labelStyle={styles.caption}
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app" color={color} size={size} />
                    )}
                    label="Đăng xuất"
                    onPress={handleLogout}
                />
            </Drawer.Section>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontFamily: "Texgyreadventor-bold"
    },
    caption: {
        fontSize: 14,
        fontFamily: "Texgyreadventor-regular"
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
});
