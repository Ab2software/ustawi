import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';
import TextInputCommon from '../../component/TextInput/TextInputCommon';
import LargeButton from '../../component/Button/LargeButton';

export default function EditCategory(props) {
  return (
    <SafeAreaView>
      <View style={{ width: '100%', flexDirection: 'column', height: '100%', backgroundColor: currentTheme().cardColor }}>
        <View style={{ flex: 1, }}>
          <View style={{ paddingHorizontal: 20, flex: 7 }}>
            <Icon onPress={() => props.navigation.goBack()}
              name="ios-arrow-back-outline"
              style={{ marginTop: 10, width: 50, }}
              size={30} color={currentTheme().text} />
          </View>
          <View style={{ flex: 2, margin:20}}>
            <Text style={{
              color: currentTheme().text,
              fontSize: 20,
              marginTop: 30,
              fontWeight:'bold'
            }}>Create a Custom Category </Text>
            <Text style={{
              color: currentTheme().text,
              fontSize: 15,
              marginTop: 10
            }}>Create a customized category for your transactions  </Text>

          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: currentTheme().background,padding:20,marginTop:30,borderRadius:20,borderTopLeftRadius:20,borderTopRightRadius:20, }}>
          <TextInputCommon
            label="Category Name"
          />
           <TextInputCommon
            label="Category Name"
          />
          <LargeButton label="Create Category" onPress={()=>{props.navigation.navigate("CategorySuccess")}}/>
        </View>
      </View>
    </SafeAreaView>
  )
}




const styles = StyleSheet.create({})