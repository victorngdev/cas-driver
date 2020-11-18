import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { logout } from "../../redux/user/user.actions";

function DrawerContent(props) {
    const [isAction, setIsAction] = React.useState(false);

    const toggleAction = () => {
        setIsAction(!isAction);
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri:
                                        "https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/83012519_1497814183728497_1901903877645533184_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=l92aofIVAloAX99oBIy&_nc_ht=scontent.fdad3-1.fna&oh=ac2b60cb37775a47a9c2ccc98f38fd2d&oe=5FA585D7"
                                }}
                                size={60}
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    marginLeft: 15
                                }}
                            >
                                <Title style={styles.title}>Lê Quang Huy</Title>
                                <Caption style={{ fontFamily: "Texgyreadventor-regular" }}>
                                    0931738872
                                </Caption>
                            </View>
                        </View>
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
                    <Drawer.Section>
                        <TouchableRipple
                            onPress={() => {
                                toggleAction();
                            }}
                        >
                            <View style={styles.preference}>
                                <Text style={styles.caption}>Đang hoạt động</Text>
                                <View pointerEvents="none">
                                    <Switch value={isAction} />
                                </View>
                            </View>
                        </TouchableRipple>
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
                    onPress={props.logout}
                />
            </Drawer.Section>
        </View>
    );
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(DrawerContent);

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
