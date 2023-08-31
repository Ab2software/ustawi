import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { fontFamily } from "../../constants/font";
import { StyleConstants } from "../../constants/Style.constant";
import { useTheme } from "../../constants/ThemeProvider"; 
function LargeOutLineButton(props) {
    const { theme, } = useTheme();
    const { label, onPress,textAlign } = props
    return (
        <View>
             <TouchableOpacity onPress={onPress} style={[StyleConstants.buttonOuterLine]} >
            <Text style={{ color: theme.text1, fontWeight: 'bold', fontSize: 16,alignSelf:'center' }}>{label}</Text>
          </TouchableOpacity> 
        </View>
    )
}
export default LargeOutLineButton;

