import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { currentTheme } from '../../constants/ThemeProvider'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import ActiveFinancialGoal from './ActiveFinancialGoal'
import InActiveFinancialGoal from './InActiveFinancialGoal'

export default function FinncailBudgetTabs(props) {
    const [tabs, setTabs] = useState("Active")
    return (

        <View style={{ flex: 1, backgroundColor: currentTheme().background, height: screenHeight, width: screenWidth }}>
            <View style={{ padding: 10, }}>
                <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50, }} size={30} color={currentTheme().text} />
                <Text style={[styles.textstyle, { color: currentTheme().text, fontWeight: 'bold', marginTop: 10, fontSize: 20 }]}>Setup Financial Goal</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => { setTabs("Active") }}
                    style={{ backgroundColor: tabs == "Active" ? currentTheme().primary : currentTheme().cardColor, flex: 1, borderRadius: 10, margin: 10, justifyContent: 'center', height: 40 }}
                >
                    <Text style={{ color: tabs === "Active" ? '#fff' : currentTheme().primary, alignSelf: 'center' }}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setTabs("Inactive") }}
                    style={{ backgroundColor: tabs == "Inactive" ? currentTheme().primary : currentTheme().cardColor, flex: 1, borderRadius: 10, justifyContent: 'center', margin: 10, }}
                >
                    <Text style={{ color: tabs === "Inactive" ? '#fff' : currentTheme().primary, alignSelf: 'center' }}>Inactive</Text>

                    {/* <Text style={{ color: currentTheme().primary,alignSelf:'center'  }}>Inctive</Text> */}
                </TouchableOpacity>
            </View>

            <View style={{width:screenWidth,height:screenHeight}}>
                {tabs == "Active" ?
                    <ActiveFinancialGoal  navigation={props.navigation.navigate}/>
                    :
                    <InActiveFinancialGoal navigation={props.navigation.navigate}/>
                }
            </View>


        </View>

    )
}

const styles = StyleSheet.create({})