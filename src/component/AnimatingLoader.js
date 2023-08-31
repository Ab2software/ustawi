import React from "react";
import { View, Text, StyleSheet, Image,ActivityIndicator } from "react-native";
 
import { fontFamily } from "../constants/font";
import { screenWidth } from "../constants/Sizes.constant";
import { currentTheme } from "../constants/ThemeProvider";

function AnimatingLoader(props) { 
    return (
        <View style={[ls.activityIndicator]}>
            <View style={ls.rowViews}>
                <ActivityIndicator
                    animating={true}
                    color="red"
                    size='small'
                />
                {/* <Text style={ls.textitem}>Loading...</Text> */}
            </View>


        </View>
    )
}
const ls = StyleSheet.create({

    activityIndicator: {
        backgroundColor: currentTheme().darkLight,
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        zIndex: 9999,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    rowViews: {
        backgroundColor: currentTheme().white,
        padding:10
    },
    textitem: {
        color: currentTheme().black,
        marginLeft: 20,
        fontFamily: fontFamily.regular,
        letterSpacing: 1
    }
})
export default AnimatingLoader;