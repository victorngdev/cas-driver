import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { viewHistory } from "../../redux/request/request.actions";
import { fetchHistory } from "../../apis/core.apis";

import Header from "../../components/header.component";
import BackgroundImage from "../../components/background-screen.component";
import HistoryComponent from "../../components/history-row.component";

const screen = Dimensions.get("screen");
const widthDevice = screen.width;
const heightDevice = screen.height;

const HistoryScreen = ({ currentUser, token, navigation, viewHistory }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory(token, currentUser.userId).then(response => setHistory(response.data));
    }, [token]);

    return (
        <BackgroundImage>
            <View style={styles.container}>
                <Header title="Lịch sử" gotoScreen={() => navigation.goBack()} />
                <View
                    style={{
                        height: "auto",
                        flexDirection: "column",
                        justifyContent: "flex-start"
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        directionalLockEnabled={true}
                        contentContainerStyle={{
                            flexGrow: 1
                        }}
                    >
                        {history.length
                            ? history.map(({ requestId, ...otherProps }) => (
                                  <HistoryComponent
                                      key={requestId}
                                      requestId={requestId}
                                      {...otherProps}
                                      onPress={() => {
                                          viewHistory(requestId);
                                          navigation.navigate("HistoryDetail");
                                      }}
                                  />
                              ))
                            : null}
                    </ScrollView>
                </View>
            </View>
        </BackgroundImage>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    token: selectToken
});

const mapDispatchToProps = dispatch => ({
    viewHistory: history => dispatch(viewHistory(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    listHistory: {
        marginTop: 10
    },
    history: {
        flexDirection: "row",
        height: 70,
        marginHorizontal: 10,
        marginVertical: 8,
        margin: 10
    },
    logo: {},
    statusLogo: {
        width: 25,
        height: 25,
        marginTop: 10,
        marginLeft: 5
    },
    app_logo: {
        width: 50,
        height: 50,
        borderRadius: 18,
        marginVertical: 10,
        marginLeft: 10
    },
    textTitle: {
        width: 150,
        color: "#000",
        fontSize: 15,
        fontFamily: "Texgyreadventor-regular",
        marginVertical: 2,
        marginLeft: 15,
        marginTop: 8
    },
    textAdd: {
        width: 150,
        color: "#4d4d4d",
        fontSize: 12,
        fontFamily: "Texgyreadventor-regular",
        marginLeft: 15
    },
    textDate: {
        width: 50,
        color: "#4d4d4d",
        fontSize: 15,
        fontFamily: "Texgyreadventor-regular",
        marginVertical: 8,
        marginLeft: 30
    },
    date: {
        color: "#5c7682",
        fontSize: 17,
        fontFamily: "Texgyreadventor-regular"
    },

    historyView: {
        width: widthDevice,
        height: heightDevice * 0.2,
        backgroundColor: "red",
        borderBottomColor: "black",
        borderBottomWidth: 1
    }
});
