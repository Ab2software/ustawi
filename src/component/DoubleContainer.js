import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ColorsConstant } from "../constants/Colors.constant";
import { screenWidth } from "../constants/Sizes.constant";


const DoubleContainer = ({ children, type, onPress, height = 100, width = screenWidth * .9 }) => {
    if (type === "button") {
        return <TouchableOpacity onPress={onPress} style={[styles.border_view, { height, width }]}>{children}</TouchableOpacity>
    }
    else return <View style={[styles.border_view, { height, width }]}>{children}</View>
}

const styles = StyleSheet.create({
    border_view: {
        width: screenWidth * .9,
        flexDirection: 'row',
        borderWidth: 1,
        paddingVertical: 25,
        paddingHorizontal: 10,
        borderColor: ColorsConstant.btnBackground,
        backgroundColor: ColorsConstant.btnColor,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderRightWidth: 3,
        shadowColor: ColorsConstant.black,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    }
})

export default DoubleContainer;