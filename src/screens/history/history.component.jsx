import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser, selectToken } from "../../redux/user/user.selectors";
import { fetchHistory } from "../../apis/core.apis";
import { updateStatusCode } from "../../redux/message/message.action";
import { selectStatusCode } from "../../redux/message/message.selectors";
import messages from "../../uitls/message.data";

import Header from "../../components/header.component";
import HistoryComponent from "../../components/history-row.component";
import Spinner from "../../components/spinner.component";
import Message from "../../components/message.component";

const HistoryScreen = ({
    currentUser,
    token,
    navigation,
    viewHistory,
    statusCode,
    updateStatusCode
}) => {
    const [history, setHistory] = useState({ data: [], totalPage: 0, currentPage: 1 });
    const [currentHistory, setCurrentHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistories(1);
    }, []);

    const fetchHistories = pageIndex => {
        setLoading(true);
        fetchHistory(token, currentUser.id, pageIndex)
            .then(response =>
                setTimeout(() => {
                    setHistory(response.data);
                    setCurrentHistory(currentHistory.concat(response.data.data));
                    setLoading(false);
                }, 500)
            )
            .catch(error => {
                setLoading(false);
                updateStatusCode(700);
            });
    };

    return (
        <View style={styles.container}>
            {loading && <Spinner />}
            <Header title="Lịch sử" />
            {statusCode && <Message message={messages[700]} isMessag={statusCode < 400} />}
            <ScrollView
                style={{ width: "90%" }}
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}
            >
                {currentHistory.length ? (
                    currentHistory.map(({ id, ...otherProps }) => (
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
                {history.currentPage < history.totalPage && (
                    <TouchableOpacity
                        onPress={() => fetchHistories(Number.parseInt(history.currentPage) + 1)}
                    >
                        <Text style={styles.loadMore}>Xem thêm</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    token: selectToken,
    statusCode: selectStatusCode
});

const mapDispatchToProps = dispatch => ({
    updateStatusCode: statusCode => dispatch(updateStatusCode(statusCode))
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);

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
    },
    loadMore: {
        width: "100%",
        textAlign: "center",
        marginVertical: 10,
        fontFamily: "Texgyreadventor-bold",
        fontSize: 13,
        color: "#6c7fa6"
    }
});
