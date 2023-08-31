
import React, { useEffect, useState, useCallback } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import { CountryPicker } from "react-native-country-codes-picker";
import AnimatingLoader from '../../component/AnimatingLoader';
import Toast from 'react-native-toast-message';
import { apiImageUpload, postApiCall } from '../../services/appSetting';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
import { mainUrl } from '../../constants/Data.constant';
import { screenHeight } from '../../constants/Sizes.constant';
const Signup = (props) => {
  const [animating, setAnimating] = useState(false);
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('+254')


  useEffect(() => {
    // setAnimating(false)

  }, [])
  const setcodedata = (dataa) => {
    setCountry(dataa)

  }
  const SubmitLoginData = async () => {
    // let isError = false, errorMsg = ''
    // if (mobile == "" || mobile.length > 10) {
    //   errorMsg = ' Please enter valid mobile number'
    //   isError = true
    // }
    // let url = "register_user/" 
    // let body={
    //   "country_code":country,
    //   "mobile":mobile
    // }
    // console.log(body)
    // if (!isError) {
    //   try {
    //     setAnimating(true);
    //     let result = await postApiCall(url, body, false)
    //     console.log(result)
    //     if (result.status_code == 200) {
    //       Toast.show({ type: 'success', text1: result.message });
    //       props.navigation.navigate('OtpVerification', { mobilenum: mobile, countryCode: country, type: "regi" })
    //       setAnimating(false);
    //     } else {
    //       Toast.show({ type: 'error', text1: result.message });
    //       setAnimating(false);
    //     }
    //   } catch (error) {
    //     setAnimating(false);
    //   }
    // }
    // else {
    //   Toast.show({ type: 'error', text1: errorMsg });
    // }
    setAnimating(true);

    let isError = false, errorMsg = ''
    if (mobile == "" || mobile.length > 10) {
      errorMsg = ' Please enter valid mobile number'
      isError = true
    }
    if (!isError) {
      await fetch(mainUrl + "accounts/register_user/", {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + tokan
        },
        method: 'POST',

        body: JSON.stringify(
          {
            "country_code": country,
            "mobile": mobile
          }
        )
      })
        .then(res => (res.json()))
        .then(data2 => {
          console.log("data2-----", data2)
          if (data2.status_code == '200') {
            setAnimating(false)
            send_otp()
          } else {
            setAnimating(false)

            alert(data2.message)
          }

        })
    }

  }

  const send_otp = async () => {
    let body =
    {
      "country_code": country,
      "mobile": mobile
    }
    let url = "login/"
    setAnimating(true);
    let result = await postApiCall(url, body, false)
    console.log(result)
    if (result.status_code == "200") {
      Toast.show({ type: 'success', text1: result.message });
      props.navigation.navigate('OtpVerification', { mobilenum: mobile, countryCode: country, type: "regi" })
      // AsyncStorage.setItem('token', result.auth_token);
      // props.navigation.navigate("BottomTab", { screen: 'Dashboard' })
      setAnimating(false);
    } else {
      Toast.show({ type: 'error', text1: result.message });
      setAnimating(false);
    }

  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      {animating && <AnimatingLoader />}
      <StatusBar hidden />
      <View style={{ marginHorizontal: 10, paddingHorizontal: 10 }}>

        <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />
        <View style={{ marginTop: 100 }}>
          <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>Sign Up</Text>
          <Text style={{ color: currentTheme().text, marginTop: 10 }}>We’ll send a verification code to this Number </Text>

          <View style={{ borderColor: currentTheme().btnbackground, borderWidth: 0.5, height: 45, borderRadius: 5, marginTop: 50, flexDirection: 'row' }}>
            <View style={{ flex: 0.2, borderColor: currentTheme().text, justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => setShow(true)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: currentTheme().text, fontSize: 17 }}>{country}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.8, borderColor: currentTheme().text, justifyContent: 'center' }}>
              {/* <View style={{justifyContent:'center',alignItems:'center'}}>

</View> */}
              {/* <TextInput onChangeText={(e) => setMobile(e)} inputMode='numeric' keyboardType='number-pad' placeholder='Enter Number' style={{ borderLeftWidth: 0.5, borderColor: currentTheme().text, height: 40, color: currentTheme().text }} /> */}
              <View style={{ flex: 0.8, borderColor: currentTheme().text, justifyContent: 'center' }}>
                <TextInput
                  onChangeText={(e) => setMobile(e)}
                  inputMode='numeric'
                  keyboardType='number-pad'
                  placeholder='Enter Number'
                  placeholderTextColor={currentTheme().placeholdercolor}
                  style={{ borderLeftWidth: 0.5, borderColor: currentTheme().text, height: 40, color: currentTheme().text, paddingLeft: 20 }} />
              </View>

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
              textInput: {
                color: 'black'
              }
            }}
          />
          <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', marginVertical: 40 }}>
            <Text style={{ color: currentTheme().text, }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Login")}><Text style={{ fontSize: 15, color: currentTheme().btnbackground, alignSelf: 'center' }}>Login</Text></TouchableOpacity>

          </View>
          <LargeButton label="Send Code" onPress={() => { SubmitLoginData() }}></LargeButton>


          {/* <TouchableOpacity onPress={() => SubmitLoginData()
          } style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 50 }}>
            <Text style={{ color: '#000', fontSize: 17, fontWeight: 'bold' }}>Send Code</Text>
          </TouchableOpacity> */}
          <Text style={{ color: currentTheme().text, alignSelf: 'center', fontSize: 16, marginTop: 10 }}>or</Text>
          <TouchableOpacity style={{ borderWidth: 0.5, height: 43, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 30, marginHorizontal: 50, borderColor: currentTheme().text }}>
            <Text style={[{ color: currentTheme().text }]}>Sign up with KCB Bank</Text>
          </TouchableOpacity>
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
    color: currentTheme().error
  },
});

export default Signup;
