import React from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { StyleConstants } from "../constants/Style.constant";
import CustomCard from "./CustomCard";
import { screenWidth } from "../constants/Sizes.constant";
import { CustomButton } from "./CustomButton";

function CustomModal({ setModalVisible, modalVisible, children }) {

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
                <View style={{ flex: 1, alignItems: "center", justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={s.modalLhare}></TouchableOpacity>
                    <CustomCard cardStyle={{ width: screenWidth -32, }}>
                        {children}
                    </CustomCard>
                </View>

            </Modal>
        </>
    )
}

const s = StyleConstants

export default CustomModal;