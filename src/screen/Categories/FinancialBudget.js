import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { currentTheme } from '../../constants/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleConstants } from '../../constants/Style.constant';


export default function FinancialBudget(props) {

    const [transcationLoading, setTranscationLoading] = useState(false)
    
    return (
        <SafeAreaView >
            <View style={{ height: screenHeight, width: screenWidth, backgroundColor: currentTheme().background }}>
                <Icon onPress={() => props.navigation.goBack()}
                    name="ios-arrow-back-outline"
                    style={{ marginTop: 10, width: 50, }}
                    size={30} color={currentTheme().text} />
                <Text style={{
                    color: currentTheme().text,
                    fontSize: 20,
                    marginTop: 30
                }}>FinancialBudget </Text>

                <View style={{
                    height: 160,
                    width: screenWidth - 20,
                    backgroundColor: currentTheme().otpback,
                    marginTop: 80,
                    alignSelf: 'center',
                    borderColor: currentTheme().background,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 15,

                }}>
                    <View style={{ width: screenWidth - 20, flexDirection: 'row' }}>
                        <View style={{ width: screenWidth / 2 - 10 }}>
                            <Text style={{ color: currentTheme().text, marginTop: 10, marginLeft: 10 }}>Car budget total</Text>
                            <Text style={{ color: currentTheme().text, marginTop: 10, fontSize: 25, marginLeft: 10 }}>KSH600</Text>
                        </View>
                        <View style={{ width: screenWidth / 2 - 10, justifyContent: 'center' }}>
                            <View style={{
                                padding: 10,
                                backgroundColor: currentTheme().cardColor,
                                alignSelf: 'center',
                                borderRadius: 5,
                            }}><Text style={{ color: '#000', alignSelf: 'center', fontSize: 10, }}>12 Months period</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{ color: currentTheme().text, marginTop: 20, fontSize: 10, marginLeft: 10, }}>KSH34 Every month</Text>

                    <View style={{ height: 10, width: screenWidth - 40, backgroundColor: currentTheme().cardColor, borderRadius: 5, alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>

                    </View>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', width: screenWidth - 20 }}>
                    <TouchableOpacity
                        onPress={() => {props.navigation.navigate("FinncailBudgetTabs")}}
                        style={{
                            padding: 15,
                            width: screenWidth / 2 - 20,
                            backgroundColor: currentTheme().cardColor,
                            marginTop: 40,
                            marginLeft: 10,
                            borderRadius: 10,
                            flexDirection: 'row',
                            justifyContent: 'center'

                        }}>
                        <Text style={{ color: currentTheme().primary, alignSelf: 'center', fontSize: 12, }}>Download Budget in PDF</Text>
                        <Image source={require("./../../assets/images/import.png")} style={{ height: 20, width: 20, marginLeft: 2 }} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTranscationLoading(true)} >
                        <ImageBackground style={{
                            padding: 15,
                            width: screenWidth / 2 - 20,
                            // backgroundColor: currentTheme().btnbackground,
                            marginTop: 40,
                            marginLeft: 10,
                            borderRadius: 20,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                            imageStyle={{ borderRadius: 10 }}
                            source={require('./../../assets/images/base.png')}
                        >
                            <Text style={{ color: currentTheme().text, alignSelf: 'center', fontSize: 12, }}>Put Budget in Play</Text>
                            <Image source={require("./../../assets/images/arrow_right.png")} style={{ height: 20, width: 20 }} />
                        </ImageBackground>
                    </TouchableOpacity>
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
                    <View style={{ width: screenWidth - 20, height: screenWidth - 100, backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Image source={require("./../../assets/images/play.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 25,marginTop:10,  color: currentTheme().text, alignSelf: 'center',alignContent:'center',textAlign:'center' }}>Your Budget has been set
                            to play and is ongoing</Text>
                        <Text style={{ fontSize: 15,marginTop:10, color: currentTheme().text, alignSelf: 'center' ,textAlign:'center'}}>If time frame isn’t achievable allow system calculates the nearest achievable time</Text>
                    </View>
                </View>
            </Modal>

        </SafeAreaView >


    );
} setInterval



const styles = StyleSheet.create({

})