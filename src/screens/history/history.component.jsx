import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { viewHistory } from "../../redux/request/request.actions";
import { fetchHistory } from "../../apis/core.apis";

import Header from "../../components/header.component";
import HistoryComponent from "../../components/history-row.component";

const HistoryScreen = ({ currentUser, token, navigation, viewHistory }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory(token, currentUser.id).then(response => setHistory(response.data));
    }, [token]);

    return (
        <View style={styles.container}>
            <Header title="Lịch sử" gotoScreen={() => navigation.jumpTo("Home")} />
            <ScrollView
                style={{ width: "90%" }}
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}
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
        alignItems: "center",
        backgroundColor: "white"
    }
});
