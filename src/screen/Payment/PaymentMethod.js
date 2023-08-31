import { StyleSheet, Image, Text, View, SafeAreaView, Animated, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
import Dropdown from '../../component/Dropdown/Dropdown';
export default function PaymentMethod(props) {
    const {amount, period} =props.route.params
    const [selectType, setSelectType] = useState("mpessa")
    return (

        <SafeAreaView>
            <View style={{ height: screenHeight, width: screenWidth, backgroundColor: currentTheme().background }}>
                <View style={{ height: 100, width: screenWidth - 40, alignSelf: 'center', backgroundColor: currentTheme().cardcolor, }}>
                    <Icon onPress={() => props.navigation.goBack()}
                        name="ios-arrow-back-outline"
                        style={{ marginTop: 10, width: 50, }}
                        size={30} color={currentTheme().text} />
                    <Text style={{ color: currentTheme().text, fontSize: 20, marginTop: 30, fontWeight: 'bold' }}>PAYMENT METHOD</Text>

                </View>
                {selectType == "mpessa" ?

                    <View style={{ alignSelf: 'center', flex: 4 }}>
                        <ImageBackground
                            source={require('./../../assets/images/border.png')}
                            style={{ width: screenWidth - 60, marginTop: 30, padding: 1 }}
                            resizeMode={'stretch'}

                        >
                            <TouchableOpacity onPress={() => { setSelectType("mpessa")}}
                                style={{ borderRadius: 5, flexDirection: 'row', width: '100%', justifyContent: 'center', padding: 10 }}
                            >
                                <Image
                                    source={require('../../assets/images/ovelcheck.png')}
                                    style={{ height: 20, width: 20, alignSelf: 'center', }}
                                />
                                <Text style={{ color: currentTheme().text, marginLeft: 10, fontSize: 20, alignSelf: 'center' }}>M-PESA</Text>
                            </TouchableOpacity>
                        </ImageBackground>


                        <ImageBackground
                            source={require('./../../assets/images/border.png')}
                            style={{ width: screenWidth - 60, marginTop: 30, padding: 1 }}
                            resizeMode={'stretch'}

                        >

                            <TouchableOpacity onPress={() => { setSelectType("debit")}}
                                style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding: 10 }}
                            >
                                <Image
                                    source={require('../../assets/images/oveluncheck.png')}
                                    style={{ height: 20, width: 20, alignSelf: 'center', }}
                                />
                                <Text style={{ color: currentTheme().text, marginLeft: 10, fontSize: 20, alignSelf: 'center', }}>DEBIT CARD</Text>
                            </TouchableOpacity>
                        </ImageBackground>

                    </View>
                    :
                    <View style={{ alignSelf: 'center', flex: 4 }}>
                        <ImageBackground
                            source={require('./../../assets/images/border.png')}
                            style={{ width: screenWidth - 60, marginTop: 30, padding: 1 }}
                            resizeMode={'stretch'}

                        >
                            <TouchableOpacity onPress={() => { setSelectType("mpessa")}}
                                style={{ borderRadius: 5, flexDirection: 'row', width: '100%', justifyContent: 'center', padding: 10 }}
                            >
                                <Image
                                    source={require('../../assets/images/oveluncheck.png')}
                                    style={{ height: 20, width: 20, alignSelf: 'center', }}
                                />
                                <Text style={{ color: currentTheme().text, marginLeft: 10, fontSize: 20, alignSelf: 'center' }}>M-PESA</Text>
                            </TouchableOpacity>
                        </ImageBackground>


                        <ImageBackground
                            source={require('./../../assets/images/border.png')}
                            style={{ width: screenWidth - 60, marginTop: 30, padding: 1 }}
                            resizeMode={'stretch'}

                        >

                            <TouchableOpacity onPress={() => {setSelectType("debit") }}
                                style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', padding: 10 }}
                            >
                                <Image
                                    source={require('../../assets/images/ovelcheck.png')}
                                    style={{ height: 20, width: 20, alignSelf: 'center', }}
                                />
                                <Text style={{ color: currentTheme().text, marginLeft: 10, fontSize: 20, alignSelf: 'center', }}>DEBIT CARD</Text>
                            </TouchableOpacity>
                        </ImageBackground>

                    </View>



                }
                <View style={{ width: screenWidth, marginTop: 30, bottom: 30, justifyContent: 'center', flex: 3 }}>
                    <Text style={{ color: currentTheme().text, fontSize: 15, alignSelf: 'center', alignContent: 'center', textAlign: 'center' }}>
                        256-bit encryption with bank-level security. All partners are vetted and approved by regulatory authorities in Kenya.Terms and Conditions </Text>
                    <Text style={{ color: currentTheme().btnbackground, marginLeft: 10, fontSize: 20, alignSelf: 'center' }}>Term and condition </Text>
                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <LargeButton
                            onPress={() => { 
                                // {selectType == "mpessa"?
                                props.navigation.navigate("ConfirmPayment",{amount:amount,period:period,type:selectType}) 
                                // props.navigation.navigate("PaymentDetails") 
                            // }
                            
                            }}
                            label={"Confirm"} backgroundColor={currentTheme().btnbackground} />
                    </View>
                </View>


            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({})