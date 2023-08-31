import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
export default function Categories(props) {

  const [category, setCategory] = useState([
    {
      "icon": require('./../../assets/foodandgrocires.png'),
      "name": "Food & Groceries",
      "status": ""
    },
    {
      "icon": require('./../../assets/transportation.png'),
      "name": "Transportation",
      "status": ""
    }, {
      "icon": require('./../../assets/utilities.png'),
      "name": "Utilities",
      "status": "new"
    }, {
      "icon": require('./../../assets/rent.png'),
      "name": "Rent",
      "status": ""
    }, {
      "icon": require('./../../assets/sherehe.png'),
      "name": "Sherehe",
      "status": ""
    }, {
      "icon": require('./../../assets/heart.png'),
      "name": "Health & Fitness",
      "status": "new"
    }, {
      "icon": require('./../../assets/education.png'),
      "name": "Education",
      "status": ""
    },
    {
      "icon": require('./../../assets/saving.png'),
      "name": "Savings",
      "status": ""
    }, {
      "icon": require('./../../assets/more.png'),
      "name": "Other",
      "status": ""
    }, {
      "icon": require('./../../assets/add.png'),
      "name": "Custom",
      "status": ""
    }
  ])
  const _render_item = ({ item, index }) => {
    console.log(item)
    return (
      <View style={{  marginTop: 20,  width:screenWidth/4.2, height: screenWidth / 4 , alignContent: 'center', alignItems: 'center' }}>

        <View style={{ marginTop: 10,   marginTop: -5, width: screenWidth / 5.6, height: screenWidth / 5.6, backgroundColor: currentTheme().homebutton, borderRadius: 5 }}>
          {item.status == 'new' &&
            <ImageBackground source={require('./../../assets/images/base.png')} style={{ marginTop: -5, backgroundColor: currentTheme().btnbackground, padding: 1, width: screenWidth / 10, alignSelf: 'flex-end' }}>
              <Text style={{ color: currentTheme().background, fontSize: 10, alignSelf: 'center' }}>New</Text>
            </ImageBackground>
          }
          <Image source={item.icon} style={{ height: 20, width: 20, alignSelf: 'center', margin: 20 ,tintColor:currentTheme().primary}} />
        </View>

        <Text style={{ color: currentTheme().text, fontSize: 12,marginTop:3 ,alignSelf:'center',textAlign:'center'}}>{item.name}</Text>
      </View>
    )
  }


  return (
    <SafeAreaView style={{ backgroundColor: currentTheme().background, flex: 1 }}>
      <View style={{ backgroundColor: currentTheme().btnbackground, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10, height: 50 }}>
        <Text style={[styles.textstyle, { color: currentTheme().background, fontWeight: 'bold' ,fontSize:20}]}>Categories</Text>
      </View>
      <View style={{ marginHorizontal: 5, paddingHorizontal: 5 }}>

        {/* <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50, }} size={30} color={currentTheme().text} /> */}
        <FlatList
          data={category}
          renderItem={_render_item}
          numColumns={4}
        >
        </FlatList>

        <View style={{ marginTop: 100, flexDirection: 'row', }}>
          <TouchableOpacity 
           onPress={()=>{props.navigation.navigate("FinanceGoal")}}
           style={{ height: screenWidth / 2 - 40, width: screenWidth / 2 - 40, backgroundColor: currentTheme().homebutton, borderLeftColor: currentTheme().btnbackground, borderLeftWidth: 2, borderStyle: 'solid', alignContent: 'center', justifyContent: 'center', padding: 5 }}>
            <Image source={require('./../../assets/financeicon.png')} style={{ height: 30, width: 30,tintColor:currentTheme().primary }} />
            <Text style={{ fontSize: 16, color: currentTheme().btnbackground }}>Finance Goal</Text>
            <Text style={{ fontSize: 12, color: currentTheme().text }}>Achieve your specific Financial goal</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Text style={{ fontSize: 18, color: currentTheme().text }}>KSH</Text>
              <Image source={require('./../../assets/images/lefticon.png')} style={{ height: 30, width: 30 }} />

            </View>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=>{props.navigation.navigate("Save")}}
            style={{ height: screenWidth / 2 - 40, width: screenWidth / 2 - 40, backgroundColor: currentTheme().homebutton, borderLeftColor: currentTheme().cyan, borderLeftWidth: 2, borderStyle: 'solid', alignContent: 'center', justifyContent: 'center', padding: 5, marginLeft: 10 }}>
            <Image source={require('./../../assets/savingmoneyicon.png')} style={{ height: 40, width: 40,tintColor:currentTheme().primary }} />
            <Text style={{ fontSize: 16, color: currentTheme().primary }}>Save Money</Text>
            <Text style={{ fontSize: 12, color: currentTheme().text }}>Achieve your specific Financial goal</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Text style={{ fontSize: 18, color: currentTheme().text }}>KSH</Text>
              <Image source={require('./../../assets/images/lefticon.png')} style={{ height: 30, width: 30 }} />
            </View>
          </TouchableOpacity>
        </View>




      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})