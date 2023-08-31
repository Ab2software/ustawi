import { Button, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { TextInput } from 'react-native-paper';
import jestConfig from '../../../jest.config';
import LargeButton from '../../component/Button/LargeButton';
import TextInputCommon from '../../component/TextInput/TextInputCommon';
import Dropdown from '../../component/Dropdown/Dropdown';

export default function Buying(props) {
    const [document, setDocument] = useState([
        { label: "1000", value: "1000" },
        { label: "5000", value: "5000" },
        { label: "10000", value: "10000" },
    ]);
    const [open,setOpen]= useState(false)
    return (
        <SafeAreaView style={{ height: screenHeight, width: screenWidth, backgroundColor: currentTheme().background, }}>
            <View style={{ flex: 1, backgroundColor: currentTheme().background }}>
                <View style={{ flex: 1, backgroundColor: currentTheme().background }}>
                    <Icon onPress={() => props.navigation.goBack()}
                        name="ios-arrow-back-outline"
                        style={{ marginTop: 10, width: 50, }}
                        size={30} color={currentTheme().text} />
                    <Text style={{ color: currentTheme().text, fontSize: 20 }}> Buying a Car </Text>

                </View>
                <View style={{ backgroundColor: currentTheme().cardcolor, flex: 2, borderTopRightRadius: 20, borderTopLeftRadius: 20, padding: 10, alignContent: 'center', alignItems: 'center' }}>
                    {/* <Text
                        style={{ color: currentTheme().text, fontSize: 17 }}>
                        Self Employed or Salaried
                    </Text> */}
                    <TextInputCommon
                        placeholder="Enter value"
                        onChangeText={(e) => { }}
                        label={"Self Employed or Salaried"}
                    />
                    <TextInputCommon
                        placeholder="35"
                        onChangeText={(e) => { }}
                        label={"Age"}
                    />
                    <Dropdown
                        label={"Monthly Income"}
                        placeholder="Enter value"
                        list={document}
                        setList={setDocument}
                        setOpen={setOpen}
                        open={open}
                    /> 

                    <TextInputCommon
                        placeholder="Enter value"
                        onChangeText={(e) => { }}
                        label={"Monthly EMIs (optional)"}
                    />

                    <LargeButton label="Select" onPress={()=>{props.navigation.navigate("GoalDetails")}} />
                </View>


            </View>

        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: currentTheme().background
    }
});