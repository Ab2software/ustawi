import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import Images from "../../constants/image";
import { screenWidth } from "../../constants/Sizes.constant";
import { c, StyleConstants } from "../../constants/Style.constant";

function PasswordTextInput({ placeholder, error, onChangeText, value, keyboardType, returnKeyType, removeVisibility,
    rightElement,
    onSubmitEditing, onBlur, onPressIn, showError = true, label, containerStyle, inputWidth = screenWidth * .8 }) {
    const [toggle, setToggle] = useState(false)

    const [secure, setSecure] = useState(true)
    const onclick = () => {
        setSecure(!secure)
        setToggle(!toggle)
    }
    return (
        <View style={[{ marginBottom: 16, margin: 1 }, containerStyle]}>
            <Text style={[styles.textlabe, {}]}>{label}</Text>
            <View style={[StyleConstants.textinputsty, {
                height: 50, flexDirection: 'row', width: inputWidth,
                alignItems: 'center', justifyContent: 'space-between', marginTop: 0, paddingHorizontal: 10
            }]}>
                <TextInput
                    style={{ flex: 1, fontFamily: fontFamily.regular }}
                    placeholder={placeholder}
                    color={c.white}
                    keyboardType={keyboardType}
                    placeholderTextColor={ColorsConstant.labelColor}
                    onChangeText={(e) => onChangeText(e)}
                    onSubmitEditing={() => onSubmitEditing}
                    returnKeyType={returnKeyType}
                    secureTextEntry={secure}
                    value={value}
                    maxLength={16}
                    onBlur={onBlur}
                    onPressIn={onPressIn}
                />
                {!removeVisibility &&
                    <TouchableOpacity onPress={() => onclick()}>
                        <Image source={toggle ? Images.eyeon : Images.eyeoff} resizeMode='contain' style={{ height: 20, width: 20, tintColor: ColorsConstant.white }} />
                    </TouchableOpacity>
                }
                {rightElement}
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
        color: ColorsConstant.white,
        fontFamily: fontFamily.bold,
        fontSize: 16,
        marginBottom: 1,
        marginLeft: 1
    },
    errText: {
        color: ColorsConstant.errors,
        fontSize: 12,
        fontFamily: fontFamily.fontPoppinsRegular,
        // height:25,
        marginLeft: 8,
    },
})
export default PasswordTextInput;