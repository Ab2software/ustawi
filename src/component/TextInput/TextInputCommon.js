import React, { useRef } from "react";
import { View, TextInput, StyleSheet, Text, Image } from 'react-native';

// import { fontFamily } from "../../constants/font"; 
import { screenWidth } from "../../constants/Sizes.constant";
import { currentTheme } from "../../constants/ThemeProvider";

export default function TextInputCommon(props) {
    const { placeholder, onChangeText, editable, maxLength, value, label, keyboardType, returnKeyType, onSubmitEditing, ref, setRef, showError = true, error, icon } = props
    return <View>
        <Text style={{ color: currentTheme().text, marginBottom: 5 }}>{label}</Text>
        <View style={[styles.Textinput, { borderColor: currentTheme().btnbackground }]}>
            <TextInput style={{ flex: 1, }}
                placeholder={placeholder}
                color={currentTheme().text}
                keyboardType={keyboardType}
                placeholderTextColor={currentTheme().placeholdercolor}
                onChangeText={(e) => onChangeText(e)}
                returnKeyType={returnKeyType}
                defaultValue={value}
                autoCapitalize="none"
                maxLength={maxLength}
                editable={editable}
            />
            {icon &&
                <Image source={require('../../../assets/editpans.png')} style={{ height: 20, width: 20, tintColor: currentTheme().text }} />
            }
        </View>

        {
            error != "" &&
            <Text style={styles.errText}>{error}</Text>
        }
    </View>
}
const styles = StyleSheet.create({
    Textinput: {
        width: screenWidth - 32,
        height: 45,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errText: {
        color: currentTheme().red,
        fontSize: 12,
        // fontFamily: fontFamily.Regular,
        marginTop: -10,
        height: 30,
        marginLeft: 10,
        width: screenWidth - 32
    },
})
