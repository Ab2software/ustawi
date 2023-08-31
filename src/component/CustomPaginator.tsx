import React from "react";
import { Animated, ColorValue, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ColorsConstant } from "../constants/Colors.constant";

interface PaginatorProps {
    data: any[];
    scrollX: any;
    itemWidth: number;
    dotStyle: StyleProp<ViewStyle>;
    activeDotColor: ColorValue;
    activeOpacity: number;
}

export default function Paginator({ data, scrollX, itemWidth, dotStyle, activeDotColor, activeOpacity }: PaginatorProps) {
    return (
        <View style={styles.containerStyle}>
            {data.map((_, index) => {
                const inputRange = [
                    (index - 1) * (itemWidth),
                    index * (itemWidth),
                    (index + 1) * (itemWidth),
                ];

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [
                        ColorsConstant.white,
                        activeDotColor,
                        ColorsConstant.white,
                    ],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [
                        activeOpacity ?? .8,
                        1,
                        activeOpacity ?? .8,
                    ],
                    extrapolate: 'clamp',
                });
                const scale = scrollX.interpolate({
                    inputRange: inputRange,
                    outputRange: [1, .9, 1],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={`dot-${index}`}
                        style={[
                            styles.dotStyle,
                            { opacity },
                            { transform: [{ scale }] },
                            dotStyle,
                            { backgroundColor },
                        ]}
                    />
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
})