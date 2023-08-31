import React, { PropsWithChildren } from 'react'
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Images from '../constants/image';
import { currentTheme } from '../constants/ThemeProvider';



function BackgroundContainer({ type }) {
    const { width, height } = Dimensions.get('screen')
    return (
        <View style={{backgroundColor:'#084765'}}
        />
        // <View  style={{ ...StyleSheet.absoluteFillObject, width, height ,backgroundColor:type === "dash" ?  "#fff":"#0D0D0D"}} />
    )
}

export { BackgroundContainer }