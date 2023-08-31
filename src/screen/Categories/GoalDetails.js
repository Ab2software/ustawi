import { StyleSheet, Text, View, SafeAreaView, Image, Modal, TouchableOpacity } from 'react-native'

import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant'
import { currentTheme } from '../../constants/ThemeProvider'
import TextInputCommon from '../../component/TextInput/TextInputCommon';
import Dropdown from '../../component/Dropdown/Dropdown';
import { TextInput } from 'react-native-paper';
import LargeButton from '../../component/Button/LargeButton';
import { StyleConstants } from '../../constants/Style.constant';
export default function GoalDetails(props) {

  const [transcationLoading, setTranscationLoading] = useState(false)


  return (
    <SafeAreaView style={{ height: screenHeight, width: screenWidth, backgroundColor:currentTheme().homebutton}}>
      <View style={{ flex:1, backgroundColor:currentTheme }}>
        <View style={{   flex: 1, }}>

          <Icon onPress={() => props.navigation.goBack()}

            name="ios-arrow-back-outline"
            style={{ marginTop: 10, width: 50, }}
            size={30} color={currentTheme().text} />
          <Text style={{ color: currentTheme().text, fontSize: 20 }}> Goal Details </Text>


        </View>
        <View style={{ backgroundColor: currentTheme().cardcolor, 
          flex: 2, borderTopRightRadius: 20, borderTopLeftRadius:
           20, padding: 10, alignContent: 'center', alignItems: 'center'
            }}>
            

          <TextInputCommon
            placeholder="Enter value"
            onChangeText={(e) => { }}
            label={"Name of car"}
          />
          <TextInputCommon
            placeholder="KSH"
            onChangeText={(e) => { }}
            label={"Estimated price"}
             />
          <TextInputCommon
            placeholder="Enter value"
            onChangeText={(e) => { }}
            label={"Timeframe (optional)"} 
            />
          <Text style={{ color: currentTheme().text, marginRight:
           200 }}>KSH 5,000-KSH 50,000</Text>
          {/* <TextInput style={{ width: 360, height: 2, backgroundColor:
             currentTheme().placeholdercolor, marginTop: 10 }}>
          </TextInput> */}
          <View style={{ width: screenWidth-20, height: 2, backgroundColor:
             currentTheme().placeholdercolor, marginTop: 10 }}/>
          <View style={{marginTop:20}}>
          <LargeButton label="Confirm" 
          onPress={()=>{setTranscationLoading(true)
            props.navigation.navigate("FinancialBudget")}}
          />
          </View>
      </View>
      </View>
      <Modal
                animationType="fade"
                transparent={true}
                visible={transcationLoading}
                onRequestClose={() => {
                    setTranscationLoading(!transcationLoading);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#c6c6c699', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setTranscationLoading(!transcationLoading)} style={StyleConstants.modalLhare}></TouchableOpacity>
                    <View style={{ width: screenWidth - 20, height: screenWidth - 100, backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', }}>
                        <Image source={require("./../../assets/images/loader.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 30, color: currentTheme().text, alignSelf: 'center' }}>Please Wait</Text>
                        <Text style={{ fontSize: 16, color: currentTheme().text, alignSelf: 'center' }}>Performing Transaction</Text>
                    </View>
                </View>
            </Modal>
    </SafeAreaView>
    
  
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:currentTheme().background
  }
});