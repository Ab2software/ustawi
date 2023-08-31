import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";

function VerificaitonCode(props) {
    // const { theme, updateTheme } = useTheme();
    const { placeholder, error, resendCode, onChangeText, value, keyboardType, returnKeyType,
        onSubmitEditing, onBlur, onPressIn, editable, showError = true, defaultValue, label, backgroundColor, Getlabel, disabled, onPress } = props

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={[styles.textlabe, {}]}>{label}</Text>
            <View style={[StyleConstants.textinputsty, { paddingHorizontal: 0, paddingLeft: 16, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 0, }]}>
                <TextInput style={{ flex: 1, fontFamily: fontFamily.regular }}
                    placeholder={placeholder}
                    color={ColorsConstant.black}
                    keyboardType={keyboardType}
                    placeholderTextColor={ColorsConstant.gary}
                    onChangeText={(e) => onChangeText(e)}
                    onSubmitEditing={() => onSubmitEditing}
                    returnKeyType={returnKeyType}
                    value={value}
                    maxLength={16}
                    editable={editable}
                    onBlur={onBlur}
                    onPressIn={onPressIn}
                    defaultValue={defaultValue}
                />
                {!resendCode &&
                    <TouchableOpacity disabled={disabled} onPress={onPress}
                        style={[styles.verficode, { backgroundColor: backgroundColor }]}>
                        <Text style={{ color: ColorsConstant.white, fontFamily: fontFamily.regular }}>{Getlabel}</Text>
                    </TouchableOpacity>
                }

            </View>
            {
                error !== "" &&
                <Text style={styles.errText}>{error}</Text>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    textlabe: {
        color: ColorsConstant.black,
        fontFamily: fontFamily.medium,
        fontSize: 16,
        // marginBottom: 5
    },
    errText: {
        color: ColorsConstant.errors,
        fontSize: 12,
        fontFamily: fontFamily.regular,
        // height:25,
        marginLeft: 8,
    },
    verficode: {
        height: 47,
        padding: 12,
        borderRadius: 6,
        marginBottom: 1
    },
})
export default VerificaitonCode;