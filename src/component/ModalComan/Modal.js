import React from "react";
import { View, Text, Modal, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { StyleConstants } from "../../constants/Style.constant";
import { screenWidth } from "../../constants/Sizes.constant";

function Modals(props) {
    const { setModalVisible, modalVisible, ViewDesing, padding, backgroundColor, width } = props
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={s.modalLhare}></TouchableOpacity>
                    <View style={[s.modalView, { padding: padding ? padding : 10, backgroundColor: backgroundColor ? backgroundColor : c.textThame, width: width ? width : screenWidth - 32, }]} >
                        {ViewDesing}
                    </View>
                </View>

            </Modal>
        </>
    )
}
const s = StyleConstants, c = ColorsConstant, styles = StyleSheet.create({
    rowViews: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textSelect: {
        color: ColorsConstant.white
    }
})
export default Modals;