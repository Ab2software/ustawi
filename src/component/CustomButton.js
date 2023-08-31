import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { fontFamily } from "../constants/font";
 
import Images from "../constants/image";
import { currentTheme } from "../constants/ThemeProvider";

export const CustomButton = ({ style, titleStyle, title, onPress, imageType }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.item_btn_container, style]}>
            {imageType == "image" ?
                <Image source={Images['right']} style={{ height: 15, width: 15 }} /> :
                <Text style={[styles.item_btn_text, titleStyle]}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item_btn_container: {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: currentTheme().btnbackground
    },
    item_btn_text: {
        fontFamily: fontFamily.medium,
        fontSize: 12,
        color: '#fff'
    },
})