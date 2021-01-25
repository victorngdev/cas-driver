import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { fetchHistory } from "../../apis/core.apis";

import Header from "../../components/header.component";
import HistoryComponent from "../../components/history-row.component";
import Spinner from "../../components/spinner.component";

const HistoryScreen = ({ currentUser, token, navigation, viewHistory }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory(token, currentUser.id).then(response =>
            setTimeout(() => {
                setHistory(response.data);
                setLoading(false);
            }, 500)
        );
    }, []);

    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            <Header title="Lịch sử" />
            <ScrollView
                style={{ width: "90%" }}
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}
            >
                {history.length ? (
                    history.map(({ id, ...otherProps }) => (
                        <HistoryComponent
                            key={id}
                            {...otherProps}
                            onPress={() => {
                                viewHistory(requestId);
                                navigation.navigate("HistoryDetail");
                            }}
                        />
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>Không có yêu cầu nào được thực hiện</Text>
                )}
            </ScrollView>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    token: selectToken
});

export default connect(mapStateToProps)(HistoryScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white"
    },
    emptyMessage: {
        fontFamily: "Texgyreadventor-bold",
        fontSize: 13,
        color: "#555",
        width: "100%",
        marginTop: "50%",
        textAlign: "center"
    }
});
