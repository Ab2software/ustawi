import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ColorsConstant } from "../constants/Colors.constant";

export default function CustomCard({ children, cardStyle, borderRadius }) {

    const [layout, setLayout] = useState({});

    return (
        <View>
            <View
                style={
                    [styles.card_border, {
                        borderRadius: borderRadius ? borderRadius + 1 : 9,
                        width: layout?.width ?? 0,
                        height: layout?.height ?? 0
                    }]}
            />
            <View
                onLayout={({ nativeEvent }) => {
                    const { width, height } = nativeEvent.layout
                    setLayout({ width, height })
                }}
                style={[cardStyle,
                    {
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: ColorsConstant.cardBorder,
                        borderRadius: borderRadius ?? 8,
                        borderBottomLeftRadius: 4,
                        borderTopRightRadius: 4,
                        backgroundColor: ColorsConstant.btnColor,
                    }]}
            >
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card_border: {
        backgroundColor: 'rgba(0,0,0,.4)',
        transform: [{ translateX: 4 }, { translateY: 4 }],
        position: 'absolute'
    },
})