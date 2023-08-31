import React from "react";
import CustomCard from "./CustomCard";
import { StyleSheet, Text } from "react-native";
import { ColorsConstant } from "../constants/Colors.constant";
import { fontFamily } from "../constants/font";

export default function CustomHeading({ title }) {
    let words = title.split(/(\s+)/).filter(function (e) { return e.trim().length > 0; })

    return (
        <CustomCard borderRadius={4} cardStyle={styles.header_style}>
            <Text>
                {words.map((char, idx) => (
                    <Text key={idx} style={styles.header_text}>{char.charAt(0)}<Text style={{ fontSize: 12 }}>{char.slice(1)}</Text> </Text>
                ))}
            </Text>
        </CustomCard>
    )
}

const styles = StyleSheet.create({
    header_style: {
        backgroundColor: ColorsConstant.btnColor,
        paddingVertical: 4,
        paddingHorizontal: 16
    },
    header_text: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: 'white',
        textTransform: 'uppercase'
    },
})