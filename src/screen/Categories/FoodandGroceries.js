import { StyleSheet, View, FlatList, Image, Text, SafeAreaView, ScrollView,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../../component/Dropdown/Dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';

import TextInputCommon from '../../component/TextInput/TextInputCommon';
import LargeButton from '../../component/Button/LargeButton';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
 


export default function FoodandGroceries(props) {
  const [list, setList] = useState([

    {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,00",

    },
    {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    },
    {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    }, {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",

      // pertange: 60

    },
    {
      title: "Ajibola godwin",
      brand: "sent",
      period: "KSH10,000",
      // pertange: 60

    }
  ])

  const [timeArr, setTimeArr] = useState([
    {
      "label": "day",
      "value": "day"
    },
    {
      "label": "week",
      "value": "week"
    },
    {
      "label": "month",
      "value": "month"
    },
    {
      "label": "year",
      "value": "year"
    }
  ])
  const [open, setOpen] = useState(false)

  return (

    <SafeAreaView>

      <View style={{ width: '100%', flexDirection: 'column', height: '100%', backgroundColor: currentTheme().cardcolor }}>

        <View style={{  width: 400, backgroundColor: currentTheme().background,padding:10 }}>
          <Icon onPress={() => props.navigation.goBack()}
            name="ios-arrow-back-outline"
            style={{ marginTop: 10, width: 50, }}
            size={30} color={currentTheme().text} />
          <Text style={{
            color: currentTheme().text,
            fontSize: 30,
            marginTop: 10
          }}>
            Food And Groceries
          </Text>
          <Text style={{
            color: currentTheme().text,
            FontSize: 30,
            marginTop: 10
          }}>
            Your expenses made on food and groceries so far
          </Text>

        </View>
        <View style={{ height: 50, zIndex: 2, alignSelf: 'flex-end', marginRight: 10,backgroundColor:currentTheme().background1 }}>
          <Dropdown //drop 
            label={"Select"}
            // placeholder="Enter value"
            list={timeArr}
            setList={setTimeArr}
            setOpen={setOpen}
            open={open}
            type={"small"}
          />
        </View>
        <View style={{ height: screenHeight, width: screenWidth, flexDirection: 'row', backgroundColor: currentTheme().cardcolor, marginTop: 10 }}>



          <View style={{ height: screenHeight, width: screenWidth, flexDirection: 'row', backgroundColor: currentTheme().cardcolor, marginTop: 10 }}>
            <FlatList
              data={list}
              renderItem={({ item, index }) => {
                return <TouchableOpacity
                onPress={()=>{props.navigation.navigate("Others")}}
                style={{

                  width: screenWidth - 20,
                  backgroundColor: currentTheme().background,

                  alignSelf: 'center',
                  borderColor: currentTheme().otpback,
                  borderWidth: 2,
                  borderStyle: 'solid',

                }}>

                  <View style={{ width: screenWidth - 20, flexDirection: 'row', padding: 10 }}>
                    <View style={{   backgroundColor: currentTheme().background1, borderRadius: 45, justifyContent: 'center',width:45 ,height:45}}>
                      <Image source={require("./../../assets/images/send.png")} style={{ height: 20, width: 20,alignSelf:'center' }} />
                    </View>
                    <View style={{ width: screenWidth / 2 - 10 }}>

                      <Text style={{ color: currentTheme().text1, marginTop: 10, marginLeft: 10 }}>{item.title}</Text>
                      <Text style={{ color: currentTheme().text1, marginTop: 10, fontSize: 10, marginLeft: 10 }}>{item.brand}</Text>
                    </View>

                    <View style={{ width: screenWidth / 2 - 10, justifyContent: 'center' }}>
                      <View style={{
                        padding: 10,
                        backgroundColor: currentTheme().cardcolor,
                        alignSelf: 'center',
                        borderRadius: 5,
                      }}><Text style={{ color: currentTheme().text, alignSelf: 'center', fontSize: 10, }}>{item.period}</Text>

                      </View>
                    </View>
                  </View>


                </TouchableOpacity>
              }}
            />
          </View>
          <View style={{ flex: 15, alignItems: 'center' }}>
            {/* <Text style={{color :currentTheme().text,
                           FontSize: 20,
                           marginTop:10}}>
                             FoodandGroceries  
                   </Text> */}
          </View>
          {/* </View> */}
          {/* </View> */}

        </View>
      </View>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({})