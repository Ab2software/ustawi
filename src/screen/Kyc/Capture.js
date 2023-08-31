import { StyleSheet, Text, View,SafeAreaView ,Image} from 'react-native'

import React, { useState } from 'react'
import LargeButton from '../../component/Button/LargeButton'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant'
import { currentTheme } from '../../constants/ThemeProvider'
import Icon from 'react-native-vector-icons/Ionicons';
// import Dropdown from '../../component/Dropdown/Dropdown';

export default function Capture() {
  return (
    
     <SafeAreaView>
    <View style={{height:screenHeight,width:screenWidth,backgroundColor:currentTheme().background}}>
    <Icon onPress={() => props.navigation.goBack()}
              name="ios-arrow-back-outline"
              style={{ marginTop: 10, width: 50, }}
              size={30} color={currentTheme().cardcolor} />
             <Text style={{alignSelf:'center',marginTop:20,fontSize:25}}>
             KYC VERIFICATION  
             </Text>
             <Text style={{alignSelf:'center',marginTop:20,fontSize:20}}>
             DOCUMENT CAPTURE
             </Text>
             <View style={{height:130,width:170,alignSelf:'center',borderRadius:20,marginTop:30,borderWidth:1}}>
             <Image source={require("./../../assets/images/card.png")}style={{height:130,width:170,}}/>  

             </View>
             <Text style={{alignSelf:'center',marginTop:50,fontSize:20}}>
             Please Prepare your

             </Text>
             <Text style={{alignSelf:'center',marginTop:10,fontSize:20}}>
             Document for Capture
             </Text>
             
            
             <View style={{ width: screenWidth, alignItems: 'center', marginTop: 50 }}> 
             <LargeButton 
             
             label="Capture"  backgroundColor={currentTheme().btnbackground}/> 
             </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})