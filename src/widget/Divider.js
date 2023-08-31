import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { currentTheme } from '../constants/ThemeProvider'
import { screenWidth } from '../constants/Sizes.constant'

export default function Divider() {
  return (
    <View style={{height:1,backgroundColor:currentTheme().placeholdercolor,width:screenWidth-30,alignSelf:'center'}}>
    </View>
  )
}

const styles = StyleSheet.create({})