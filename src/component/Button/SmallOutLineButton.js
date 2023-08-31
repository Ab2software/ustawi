import React from "react";
import { TouchableOpacity, View, Text, ImageBackground } from "react-native";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";
import { currentTheme, useTheme } from "../../constants/ThemeProvider"; 
export default function SmallOutLineButton(props) {
    const { label, onPress,backgroundColor } = props
    return (
        <View style={{marginLeft:10,alignItems:'center'}} >
            <ImageBackground source={
                require('./../../assets/images/base.png')
            }
            style={{ padding:1,height:40,marginTop:15}}
            borderRadius={10}
            >
             <TouchableOpacity style={[StyleConstants.buttonOuterLine,{width:screenWidth/2-40,alignItems:'center',borderColor:backgroundColor,backgroundColor:backgroundColor}]} onPress={onPress}>
             <Text style={[StyleConstants.textsigup,{fontFamily:fontFamily.semiBold,color:currentTheme().text}]}>{label}</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}
 
 