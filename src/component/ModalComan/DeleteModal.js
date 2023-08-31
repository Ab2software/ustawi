import React from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import CustomBorderedButton from "../Button/CustomBorderedButton";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";

function DeleteModal({ setModalVisible, modalVisible, confirmDeletion, cancelDeletion }) {

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={s.modalLhare}></TouchableOpacity>
                    <View style={styles.body}>
                        <Text style={styles.sureTxt}>Are you sure?</Text>
                        <View style={s.RowView}>
                            <CustomBorderedButton
                                style={{ width: screenWidth / 3 }}
                                onPress={confirmDeletion}
                                title="Yes"
                            />
                            <CustomBorderedButton
                                style={{ width: screenWidth / 3 }}
                                onPress={cancelDeletion}
                                title="No"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const s = StyleConstants, styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    body: {
        backgroundColor: ColorsConstant.white,
        padding: 20,
        shadowColor: ColorsConstant.black,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderRadius: 15,
        width: screenWidth * .9,
    },
    sureTxt: {
        fontFamily: fontFamily.bold,
        marginBottom: 20,
        fontSize: 16,
        color: ColorsConstant.black
    }
})

export default DeleteModal;