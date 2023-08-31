
import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, BackHandler, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { CountryPicker } from "react-native-country-codes-picker";

import Toast from 'react-native-toast-message';
import { apiImageUpload, postApiCall } from '../../services/appSetting';
import AnimatingLoader from '../../component/AnimatingLoader';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from './../../component/Button/LargeButton'
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenHeight } from '../../constants/Sizes.constant';
const Login = (props) => {
  const [animating, setAnimating] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+254');
  const [data, setdata] = useState({ "country_code": '', "mobile": '' })
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('+254')
  const { colors } = useTheme();
  const setcodedata = (dataa) => {
    console.log('-----dadada', dataa)
    setCountry(dataa)
    // setCountryCode(dataa),
    //   setdata({ ...data, country_code: dataa })
  }

  useEffect(() => {
    setdata({ ...data, country_code: '+254' })

  }, []);
  const SubmitLoginData = async () => {
    let isError = false, errorMsg = ''
    if (mobile == "" || mobile.length < 9) {
      errorMsg = ' Please enter valid mobile number'
      isError = true
    }
    let url = "login/"
    let body = {
      "country_code": country,
      "mobile": mobile
    }
    console.log(body)
    if (!isError) {
      try {
        setAnimating(true);
        let result = await postApiCall(url, body, false)
        console.log(result)
        if (result.status_code == 200) {
          Toast.show({ type: 'success', text1: result.message });
          props.navigation.navigate('OtpVerification', { mobilenum: mobile, countryCode: country, type: "login" })
          setAnimating(false);
        } else if (result.status_code == 400) {
          Toast.show({ type: 'error', text1: result.message });
          setAnimating(false);
        } else {
          Toast.show({ type: 'error', text1: result.message });
          setAnimating(false);
        }
      } catch (error) {
        Toast.show({ type: 'error', text1: error.message });

        setAnimating(false);
      }
    }
    else {
      Toast.show({ type: 'error', text1: errorMsg });
    }
  };

  //   const pickerStyle = {
  //     inputIOS: {
  //         color: 'white',
  //         paddingHorizontal: 10,
  //         backgroundColor: 'red',
  //         borderRadius: 5,
  //     },
  //     placeholder: {
  //         color: 'white',
  //       },
  //     inputAndroid: {
  //         color: 'white',
  //         paddingHorizontal: 10,
  //         backgroundColor: 'red',
  //         borderRadius: 5,
  //     },
  // };

  const backAction = () => {
    if (props.navigation.isFocused()) {
        Alert.alert("Hold on!", "Are you sure you want to exit app?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    }
};

useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
}, [props]);

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      {animating && <AnimatingLoader />}
      {/* <BackgroundContainer type={'splash'} /> */}
      <View style={{ marginHorizontal: 10, paddingHorizontal: 10 }}>
        <Icon onPress={() => backAction()} name="ios-arrow-back-outline"
          style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />

        <View style={{ marginTop: 100 }}>
          <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>Login</Text>
          <Text style={{ color: currentTheme().text, marginTop: 10 }}>Enter your registered phone number</Text>

          <View style={{ borderColor: currentTheme().btnbackground, borderWidth: 0.5, height: 45, borderRadius: 5, marginTop: 50, flexDirection: 'row' }}>
            <View style={{ flex: 0.2, borderColor: currentTheme().text, justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => setShow(true)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: currentTheme().text, fontSize: 17 }}>{country}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.8, borderColor: currentTheme().btnbackground, justifyContent: 'center' }}>
              <TextInput
                onChangeText={(e) => setMobile(e)}
                inputMode='numeric'
                keyboardType='number-pad'
                placeholder='Enter Number'
                placeholderTextColor={currentTheme().placeholdercolor}
                style={{ borderLeftWidth: 0.5, borderColor: currentTheme().text, height: 40, color: currentTheme().text, paddingLeft: 20 }} />
            </View>
          </View>
          <CountryPicker 
           
            show={show} 
            pickerButtonOnPress={(item) => {
              setcodedata(item.dial_code)
              setShow(false);
            }}
            style={{ 
              modal: {
                height: screenHeight / 2,
                backgroundColor: currentTheme().primary
              },
              dialCode: {
                color: '#000'
              },
              countryName: {
                color: '#000'
              },
              textInput:{
                color:'black'
              }
            }}
          />
          {/* <Text style={{color:currentTheme().text,marginTop:10}}>Already have an account? <Text style={{fontSize:15,color:currentTheme().btnbackground}}>Login</Text> </Text> */}
          <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', marginVertical: 40 }}>
            <Text style={{ color: currentTheme().text, }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Singup")}><Text style={{ fontSize: 15, color: currentTheme().btnbackground, alignSelf: 'center' }}>Sign Up</Text></TouchableOpacity>

          </View>

          <LargeButton label="Continue" onPress={() => { SubmitLoginData() }}></LargeButton>

        </View>
      </View>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Login;
