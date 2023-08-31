import React from "react";
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";
import { currentTheme, useTheme } from "../../constants/ThemeProvider";
export default function OtherButton(props) {
    const { label, onPress, backgroundColor } = props
    return (
        <View style={{ marginLeft: 10, alignItems: 'center' }} >
            <TouchableOpacity  onPress={onPress}>
            <ImageBackground source={
                require('./../../assets/images/base.png')
            }
                style={{  width:screenWidth-80, padding: 15, marginTop: 15 ,alignItems: 'center'}}
                borderRadius={10}
            >
              
                    <Text style={[StyleConstants.textsigup, { fontFamily: fontFamily.semiBold, color:'#fff' }]}>{label}</Text>
            </ImageBackground>
            </TouchableOpacity>

        </View>
    )
}

