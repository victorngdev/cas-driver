import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { clearAmbulanceNote } from "../redux/ambulance/ambulance.actions";

const ReasonModal = ({
    note: { identityCard, driverLicense, registerLicense, registryCertificate },
    visible,
    clearAmbulanceNote
}) => {
    return (
        <View style={[styles.modal, visible ? styles.visible : null]}>
            <View style={styles.modalContent}>
                {!!identityCard && (
                    <Text style={styles.note}>Chứng minh nhân dân: {identityCard}</Text>
                )}
                {!!driverLicense && (
                    <Text style={styles.note}>Giấy phép lái xe: {driverLicense}</Text>
                )}
                {!!registerLicense && (
                    <Text style={styles.note}>Giấy đăng kiểm: {registerLicense}</Text>
                )}
                {!!registryCertificate && (
                    <Text style={styles.note}>Cavet xe: {registryCertificate}</Text>
                )}
                <TouchableOpacity onPress={clearAmbulanceNote}>
                    <Text style={styles.action}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const mapDispatchToProps = dispatch => ({
    clearAmbulanceNote: () => dispatch(clearAmbulanceNote())
});

export default connect(null, mapDispatchToProps)(ReasonModal);

const styles = StyleSheet.create({
    modal: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: -1,
        opacity: 0
    },
    visible: {
        zIndex: 10,
        opacity: 1
    },
    modalContent: {
        width: "90%",
        height: "auto",
        maxHeight: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 5
    },
    note: {
        width: "90%",
        fontFamily: "Texgyreadventor-regular",
        marginHorizontal: 10
    },
    action: {
        width: "100%",
        textAlign: "center",
        borderTopWidth: 0.5,
        marginVertical: 10,
        paddingTop: 7,
        fontFamily: "Texgyreadventor-bold"
    }
});
