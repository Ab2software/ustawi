import { SafeAreaView, StyleSheet, Text, View, TextInput, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant'
import TextInputCommon from '../../component/TextInput/TextInputCommon';
import SmailFillBtn from '../../component/Button/SmailFillBtn';
import SmallOutLineButton from '../../component/Button/SmallOutLineButton';
import { StyleConstants } from '../../constants/Style.constant';
import { postApiCall } from '../../services/appSetting';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaymentDetails(props) {

    const [transcationLoading, setTranscationLoading] = useState(false)

   
    return (
        <SafeAreaView>
            <View style={{ height: screenHeight - 30, width: screenWidth, backgroundColor: currentTheme().background }}>
            <Icon onPress={() => props.navigation.goBack()}
                        name="ios-arrow-back-outline"
                        style={{ marginTop: 10, width: 50, }}
                        size={30} color={currentTheme().text} />
                <View style={{ padding: 10, marginTop: 10, width: screenWidth }}>
                   
                    <Text style={{
                        color: currentTheme().text,
                        fontSize: 20,
                        marginTop: 30
                    }}>PAYMENT DETAILS </Text>

                    <View style={[styles.Textinput, { borderColor: currentTheme().btnbackground, width: screenWidth - 30, marginTop: 30 }]}>
                        <TextInput style={{ flex: 1, }}
                            placeholder="CARD NUMBER"
                            color={currentTheme().text}
                            keyboardType='number-pad'
                            placeholderTextColor={currentTheme().placeholdercolor} 
                            autoCapitalize="none" 
                        />

                        <Image
                            source={require('./../../assets/images/cardNum.png')}
                            style={{ height: 20, width: 30 }} />

                    </View>

                    <TextInputCommon
                        placeholder='CARDHOLDER NAME'
                        onChangeText={() => {

                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: 50, margin: 5 }}>
                            {/* <TextInputCommon
                               maxLength={2}
                               keyboardType='number-pad'
                                placeholder='MM'
                                onChangeText={(e) => {
                                    if(e >12){

                                    }
                                }}
                                style={{ width: 50}}
                            /> */}
                            <TextInput style={styles.Textinput}
                                placeholder={"MM"}
                                color={currentTheme().text}
                                keyboardType='number-pad'
                                placeholderTextColor={currentTheme().placeholdercolor}
                                // onChangeText={(e) => onChangeText(e)}
                                // returnKeyType={returnKeyType}
                                // defaultValue={value}
                                autoCapitalize="none"
                                maxLength={2}
                            // editable={editable}
                            />

                        </View>
                        <View style={{ width: screenWidth / 5, margin: 5 }}>

                            <TextInput style={styles.Textinput}
                                placeholder={"YY"}
                                color={currentTheme().text}
                                keyboardType='number-pad'
                                placeholderTextColor={currentTheme().placeholdercolor}
                                // onChangeText={(e) => onChangeText(e)}
                                // returnKeyType={returnKeyType}
                                // defaultValue={value}
                                autoCapitalize="none"
                                maxLength={2}
                            // editable={editable}
                            />
                        </View>
                        <View style={{ width: screenWidth / 3.5, margin: 5 }}>
                            <TextInput style={styles.Textinput}
                                placeholder={"CVV"}
                                color={currentTheme().text}
                                keyboardType='number-pad'
                                placeholderTextColor={currentTheme().placeholdercolor}
                                // onChangeText={(e) => onChangeText(e)}
                                // returnKeyType={returnKeyType}
                                // defaultValue={value}
                                autoCapitalize="none"
                                maxLength={3}
                            // editable={editable}
                            />
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                        <SmailFillBtn label="Pay Now" backgroundColor={currentTheme().btnbackground} onPress={() => { setTranscationLoading(true) }} />
                        <SmallOutLineButton label="Cancel" backgroundColor={currentTheme().btnbackground} />
                    </View>

                </View>


                <View style={{ width: screenWidth - 20, marginTop: 30, marginLeft: 20, justifyContent: 'center', flex: 3 }}>
                    <Text style={{ color: currentTheme().text, marginLeft: 10, fontSize: 15, alignSelf: 'center', alignContent: 'center', textAlign: 'center' }}>Term and condition Term and condition Term and condition Term and condition Term and condition </Text>
                    <Text style={{ color: currentTheme().btnbackground, marginLeft: 10, fontSize: 20, alignSelf: 'center' }}>Term and condition </Text>

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



    )
}

const styles = StyleSheet.create({
    Textinput: {
        width: 100,
        height: 45,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: currentTheme().btnbackground
    },
    errText: {
        color: currentTheme().red,
        fontSize: 12,
        // fontFamily: fontFamily.Regular,
        marginTop: -10,
        height: 30,
        marginLeft: 10,
        width: screenWidth - 32
    },
})
