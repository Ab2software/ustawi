import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';
import { FlatList } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { CustomButton } from '../../component/CustomButton';
import LargeButton from '../../component/Button/LargeButton';

export default function FinanceGoalTerm(props) { 
    return (
        <SafeAreaView style={{ backgroundColor: currentTheme().homebutton, flex: 1 }}>
            <View style={{ padding: 10  }}>
                <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50, }} size={30} color={currentTheme().text} />
                <Text style={[styles.textstyle, { color: currentTheme().text, fontWeight: 'bold', marginTop: 10, fontSize: 20 }]}>Setup Financial Goal</Text>
            </View>
            <View style={{flex:1,justifyContent:'center'}}>
              {/* <Image source={require('./../../assets/financeterm.png')} style={{ height:screenWidth-100,width:screenWidth-100 ,alignSelf:'center'}}></Image> */}
            </View>
            <View style={{ padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: currentTheme().background, height: screenHeight / 2 - 20, justifyContent: 'center', alignItems: 'center' ,flex:1}}>
                <Text style={{ flex: 4,color:currentTheme().placeholdercolor }}>tconsectetur suspendisse vel cursus. Elit ultricies faucibus integer aenean et venenatis mi justo nisi. Sapien diam feugiat velit magna ipsum leo pharetra quis nulla. Amet purus massa mauris sit elementum egestas ornare ridiculus. Nulla in vitae erat magna aliquet libero non. Scelerisque eu massa aliquam dictumst quis nisi eget ultricies. Mauris elementum dictum facilisis ullamcorper nibh risus duis neque arcu. Nec sit dictum in et. </Text>
                <LargeButton label="Yes, I Agree" onPress={()=>{props.navigation.navigate("CreateYourGoal")}} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})