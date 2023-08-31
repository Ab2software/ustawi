import React from "react";
import { TouchableOpacity, View, Text ,StyleSheet} from "react-native";
import { ColorsConstant } from "../../constants/Colors.constant";
import { fontFamily } from "../../constants/font";
import { screenWidth } from "../../constants/Sizes.constant";
import { StyleConstants } from "../../constants/Style.constant";

function SmailFillBtn(props) {
    const { label, onPress,backgroundColor } = props
    return (
        <View style={{marginTop:16,alignItems:'center'}} >
             <TouchableOpacity style={[StyleConstants.bottunth,{width:screenWidth/2-40,alignItems:'center',backgroundColor:backgroundColor,height:40}]} onPress={onPress}>
             <Text style={[StyleConstants.textsigup,{fontFamily:fontFamily.semiBold}]}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
 
})
export default SmailFillBtn;