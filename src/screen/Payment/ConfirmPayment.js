import { StyleSheet, Image, Text, View, SafeAreaView, ImageBackground, TouchableOpacity,Modal } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
import Dropdown from '../../component/Dropdown/Dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { getApiCall, postApiCall, postApiCallPayment } from '../../services/appSetting';
import { StyleConstants } from '../../constants/Style.constant';
export default function ConfirmPayment(props) {
    const {amount,period,type} =props.route.params

    const [userDetail,setUserDetail]= useState({})
    const [animating,setAnimating]= useState(false)
    const [success,setSuccess]= useState(false)
    const [failure,setFailure]= useState(false)
    useEffect(() => {
        get_profile()
    }, [props])


    const get_profile = async () => {
        let UserId = await AsyncStorage.getItem('UserId');
        let token = await AsyncStorage.getItem('logintokan');
        // alert(UserId)
        let url = `user_detail`;

        try {
            // setAnimating(true)

            let result = await getApiCall(url, token);
            console.log('----result---', result)
            setUserDetail(result.data)
            // setAnimating(false)

            // setName(result.first_name)
            // setMobile(result.data.mobile)
        } catch (error) {

            Toast.show({ type: 'error', text1: error.message });
            // setAnimating(false);
        }
    }
    const initPayment=async()=>{
        setAnimating(true)
        // let userData=await AsyncStorage.getItem("UserData");
        console.log("yyyyyyyyyyy",userDetail)
        let url="initiate_payment/";
        let body={
            "amount":amount,
            "mobile": userDetail.mobile,
            "autopay":0,
             "email":userDetail.email == null ? "test2@gmail.com" : userDetail.email , 
             "notifications":0
    }
    console.log(body)
        let result=await postApiCallPayment(url,body)
        console.log(result)
        if(result.status_code == 200){
            setAnimating(false)
            setSuccess(true) 
            // Toast.show({ type: 'success', text1: "Successfully sended" });
            // // props.navigation.navigate("Tabs",{screen:"Home"})
            // props.navigation.navigate('BottomTab')

        }else{
            setFailure(true)
            setAnimating(false)
        }
    }
    const payment_success=async()=>{
        // let userData=await AsyncStorage.getItem("UserData");
        console.log("yyyyyyyyyyy",userDetail)
        let url="initiate_payment/";
        let body={
            "amount":100,
            "mobile": userDetail.mobile,
            "autopay":0,
             "email":userDetail.email == null ? "test2@gmail.com" : userDetail.email , 
             "notifications":0
    }
    console.log(body)
        let result=await postApiCallPayment(url,body)
        console.log(result)
    }
    return (

        <SafeAreaView>

            <View style={{ height: screenHeight, width: screenWidth,justifyContent:'center', backgroundColor: currentTheme().background ,padding:20}}>
                <View style={{ height: 100, width: screenWidth, backgroundColor: currentTheme().background, }}>
                    <Icon onPress={() => props.navigation.goBack()}
                        name="ios-arrow-back-outline"
                        style={{ marginTop: 10, width: 50, }}
                        size={30} color={currentTheme().text} />
                    <Text style={{ color: currentTheme().text, fontSize: 20, marginTop: 30,fontWeight:'bold' }}>CONFIRM PAYMENT</Text>

                </View>
                 
                <View style={{ padding:20, width: screenWidth-40, backgroundColor: currentTheme().btnbackground, marginTop: 30, alignSelf: 'center', borderRadius: 20, flexDirection: 'row' ,justifyContent:'space-between'}}>
                       <View style={{  }}>
                            <Text style={{ color: currentTheme().background,   }}>Deposit Amount:</Text>
                            <Text style={{ color: currentTheme().background, marginTop: 30, }}>Duration</Text>
                            <Text style={{ color: currentTheme().background, marginTop: 30, }}>Funding Source</Text>
                        </View>
                        <View style={{  }}>
                            <Text style={{ color: currentTheme().background,   alignSelf: 'flex-end' }}>{amount}</Text>
                            <Text style={{ color: currentTheme().background, marginTop: 30, alignSelf: 'flex-end' }}>{period}</Text>
                            <Text style={{ color: currentTheme().background, marginTop: 30, alignSelf: 'flex-end', }}>{type == "mpessa" ? "M-PESA" : "DEBIT CARD"}</Text>
                        </View>


                    </View>

                <View style={{ width: screenWidth-40, marginTop: 30,   justifyContent: 'center', flex: 3 }}>
                    <Text style={{width:screenWidth-20, color: currentTheme().text, fontSize: 15, alignSelf: 'center', alignContent: 'center', textAlign: 'center' }}>
                        256-bit encryption with bank-level security. All partners are vetted and approved by regulatory authorities in Kenya.
                        </Text>
                    <Text style={{ color: currentTheme().btnbackground, fontSize: 20, alignSelf: 'center' }}>Terms and Conditions</Text>
                    <View style={{ width: screenWidth-40, alignItems: 'center', marginTop: 20 }}>
                        <LargeButton 
                        onPress={()=>{
                            // props.navigation.navigate("PaymentDetails")
                            initPayment()
                        }}
                        label={"Confirm"} backgroundColor={currentTheme().btnbackground} />
                    </View>
                </View>

                
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={animating}
                // onRequestClose={() => {
                //     setTranscationLoading(!animating);
                // }}
            >
                <View style={{ flex: 1, backgroundColor: '#c6c6c699', justifyContent: 'center' }}>
                    {/* <TouchableOpacity onPress={() => {}} style={StyleConstants.modalLhare}></TouchableOpacity> */}
                    <View style={{ width: screenWidth - 20, height: screenWidth - 100, backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', }}>
                        <Image source={require("./../../assets/images/loader.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 30, color: currentTheme().text, alignSelf: 'center' }}>Please Wait</Text>
                        <Text style={{ fontSize: 16, color: currentTheme().text, alignSelf: 'center' }}>Performing Transaction</Text>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={failure}
                onRequestClose={() => {
                    setFailure(!failure);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#c6c6c699', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {setFailure(false)}} style={StyleConstants.modalLhare}></TouchableOpacity>
                    <View style={{ width: screenWidth - 20, height: screenWidth - 100, backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', }}>
                        <Image source={require("./../../assets/images/failure.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 30, color: currentTheme().text, alignSelf: 'center' }}>Failure</Text>
                        <Text style={{ fontSize: 16, color: currentTheme().text, alignSelf: 'center' }}>Sorry Payment was Unsuccessful</Text>
                        <TouchableOpacity
                        onPress={() => {props.navigation.navigate("Save")}} >
                        <ImageBackground style={{
                            padding: 15,
                            width: screenWidth - 60, 
                            margin: 10,
                            marginTop:20,
                            borderRadius: 120,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf:'center'
                        }}
                            imageStyle={{ borderRadius: 0 }}
                            source={require('./../../assets/images/btnbg.png')}
                        >
                            <Text style={{ color: currentTheme().text, alignSelf: 'center', fontSize: 12, }}>CONTINUE</Text>
                            {/* <Image source={require("./../../assets/images/arrow_right.png")} style={{ height: 20, width: 20 }} /> */}
                        </ImageBackground>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={success}
                onRequestClose={() => {
                    setSuccess(!success);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#c6c6c699', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {setSuccess(false)}} style={StyleConstants.modalLhare}></TouchableOpacity>
                    <View style={{ width: screenWidth - 20, height: screenWidth - 100, backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', }}>
                        <Image source={require("./../../assets/images/success.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 30, color: currentTheme().text, alignSelf: 'center' }}>Success</Text>
                        <Text style={{ fontSize: 16, color: currentTheme().text, alignSelf: 'center' }}>Payment was Successful</Text>
                        <TouchableOpacity
                        onPress={() => {props.navigation.navigate("Save")}} >
                        <ImageBackground style={{
                            padding: 15,
                            width: screenWidth - 60, 
                            margin: 10,
                            marginTop:20,
                            borderRadius: 120,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf:'center'
                        }}
                            imageStyle={{ borderRadius: 0 }}
                            source={require('./../../assets/images/btnbg.png')}
                        >
                            <Text style={{ color: currentTheme().text, alignSelf: 'center', fontSize: 12, }}>CONTINUE</Text>
                            {/* <Image source={require("./../../assets/images/arrow_right.png")} style={{ height: 20, width: 20 }} /> */}
                        </ImageBackground>
                    </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({})