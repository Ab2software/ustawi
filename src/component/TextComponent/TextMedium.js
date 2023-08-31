import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { StyleConstants } from "../../constants/Style.constant";

function TextMedium(props) {
    const { title, textAlign } = props
    // const { theme, updateTheme } = useTheme();
    return (
        <View>
            <Text style={[styles.textBold,{}]}>{title}</Text>
        </View>
    )
}
const s = StyleConstants, c = ColorsConstant, font = fontFamily, styles = StyleSheet.create({
    textBold: {
        fontSize: 16,
        color: c.white,
        fontFamily: font.medium
    }

})
export default TextMedium;