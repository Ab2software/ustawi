import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { fontFamily } from "../../constants/font";
import { StyleConstants } from "../../constants/Style.constant";
import { currentTheme } from "../../constants/ThemeProvider";
import Loading from "../Loading";

function LargeButton(props) {

  const { label, onPress, textAlign,backgroundColor,loader } = props
  return (
    <View>
      {loader ?
     <Loading/>
      :
      <TouchableOpacity onPress={onPress} style={[StyleConstants.bottunth,{backgroundColor:backgroundColor == null ? currentTheme().btnbackground : backgroundColor}]} >
        <Text style={{ color: currentTheme().background, fontWeight: 'bold', fontSize: 16 }}>{label}</Text>
      </TouchableOpacity>

}
    </View>
  )
}
export default LargeButton;

