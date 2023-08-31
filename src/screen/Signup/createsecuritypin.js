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
// import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
import { mainUrl } from '../../constants/Data.constant';
import Toast from 'react-native-toast-message';
import { postApiCall } from '../../services/appSetting';

const Createpin = ({ navigation, route }) => {
  const [otpdata, setOtpdata] = React.useState('')
  const [tokann, settokan] = React.useState("")
  const [animating, setAnimating] = useState(false);


  useEffect(() => {
    const getToken = async () => {
      let token = await AsyncStorage.getItem("logintokan")
      console.log(token)
      settokan(token)

      let fingerPrint = await AsyncStorage.getItem("fingerprint")
      let faceid = await AsyncStorage.getItem("faceid")
      console.log("fingur prin-------t", fingerPrint)
    }
    getToken()
  })
  //  const tokan = route.params.tokan;
  //textinput handler for otp to focus next

  const SubmitLoginData = async () => {
    // let isError = false, errorMsg = ''
    // if (otpdata == "") {
    //   errorMsg = ' Please enter valid pin'
    //   isError = true
    // } 
    // if (!isError) {
    //   try {
    //     let url = "set_mpin/"
    //     let body = JSON.stringify({
    //       "MPIN": otpdata
    //     })
    //     // setAnimating(true);
    //       let token =await AsyncStorage.getItem(logintokan)
    //       let result = await postApiCall(url, body,token)
    //       console.log(result)
    //       if (result.status_code == "200") {
    //         Toast.show({ type: 'success', text1: result.message });
    //         navigation.navigate('Confirmpin',{tokann:tokann})
    //         // props.navigation.navigate('OtpVerification', { mobilenum: mobile, countryCode: country, type: "regi" })
    //         // AsyncStorage.setItem('token', result.auth_token);
    //         // props.navigation.navigate("BottomTab", { screen: 'Dashboard' })
    //         setAnimating(false);
    //       } else {
    //         Toast.show({ type: 'error', text1: result.message });
    //         setAnimating(false);
    //       }
         
    //   } catch (error) {
    //     setAnimating(false);
    //   Toast.show({ type: 'error', text1: "error" });

    //   }
    // }
    // else {
    //   Toast.show({ type: 'error', text1: errorMsg });
    // }
    await fetch(mainUrl+'accounts/set_mpin/',{
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
       'Authorization':'Bearer '+tokann
     },
        method: 'POST',

        body: JSON.stringify(
          {
            "MPIN":otpdata
          }
        )
      })
      .then(res => ( res.json()))
      .then(data2 =>( 
        console.log(data2),
        data2.status_code == 200 ? navigation.navigate('Confirmpin',{tokann:tokann}):alert('Your Pin Is Not Valid')
        ))

  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      <StatusBar hidden />
      <View style={{ marginHorizontal: 10, paddingHorizontal: 16 }}>
        <Icon onPress={() => navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />

        <View style={{ marginTop: 100 }}>
          <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>Create Security PIN</Text>
          <Text style={{ color: currentTheme().text, marginTop: 10 }}>Create a PIN that you would use for signin-in and
            confirming transactions on your account </Text>

          <View>
            <OTPInputView
              secureTextEntry={true}
              style={{ width: '80%', height: 40, marginTop: 40 }}
              pinCount={4}
              autoFocusOnLoad={false}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => { setOtpdata(code) }}

              codeInputFieldStyle={{ color: currentTheme().text, borderWidth: 0.3, backgroundColor: currentTheme().otpback, width: 40, height: 40, textAlign: 'center', paddingVertical: 10, marginHorizontal: 5, borderRadius: 5, borderColor: currentTheme().otpborder }}

              onCodeFilled={(code => {
                console.log(`Code is ${code}, you are good to go!`)
              })}
            />
            {/* <View style={{
              flexDirection: "row",

              paddingVertical: 10, marginTop: 40
            }}>
              <TextInput value={data.otp1} keyboardType='numeric' onChangeText={(val1) => textInputChange(val1)} ref={ref0} onKeyPress={onOtpKeyPress(1)}
                maxLength={1} style={{ color: currentTheme().text, borderWidth: 0.3, backgroundColor: currentTheme().otpback, width: 50, textAlign: 'center', paddingVertical: 10, marginHorizontal: 10, borderRadius: 5, borderColor: currentTheme().otpborder }} />
              <TextInput value={data.otp2} keyboardType='numeric' onChangeText={(val2) => textInputChange1(val2)} ref={ref} onKeyPress={onOtpKeyPress(2)}
                maxLength={1} style={{ color: currentTheme().text, borderWidth: 0.3, backgroundColor: currentTheme().otpback, width: 50, textAlign: 'center', paddingVertical: 10, marginHorizontal: 16, borderRadius: 5, borderColor: currentTheme().otpborder }} />
              <TextInput value={data.otp3} keyboardType='numeric' onChangeText={(val3) => textInputChange2(val3)} ref={ref1} onKeyPress={onOtpKeyPress(3)}
                maxLength={1} style={{ color: currentTheme().text, borderWidth: 0.3, backgroundColor: currentTheme().otpback, width: 50, textAlign: 'center', paddingVertical: 10, marginHorizontal: 16, borderRadius: 5, borderColor: currentTheme().otpborder }} />
              <TextInput value={data.otp4} keyboardType='numeric' onChangeText={(val4) => textInputChange3(val4)} ref={ref2} onKeyPress={onOtpKeyPress(4)}
                maxLength={1} style={{ color: currentTheme().text, borderWidth: 0.3, backgroundColor: currentTheme().otpback, width: 50, textAlign: 'center', paddingVertical: 10, marginHorizontal: 16, borderRadius: 5, borderColor: currentTheme().otpborder }} />

            </View> */}
          </View>
          {/* <Text style={{color:currentTheme().text,marginTop:10}}>Already have an account? <Text style={{fontSize:15,color:'#C2FF1C'}}>Login</Text> </Text> */}
          <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', marginVertical: 40 }}>
            {/* <Text style={{color:currentTheme().text,}}>Don't have an account? </Text> */}

          </View>
          {/* <TouchableOpacity onPress={() => SubmitLoginData()} style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 50 }}>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Set Pin</Text>
          </TouchableOpacity> */}

          <LargeButton label="Set Pin" onPress={() => { SubmitLoginData() }}></LargeButton>



          <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20, marginTop: 40 }}>
            <Text style={{ textAlign: 'center', color: currentTheme().text }}>
              By pressing Set PIN, you agree to our <Text style={{ color: currentTheme().btnbackground }}>Terms &
                Conditions </Text> and <Text style={{ color: currentTheme().btnbackground }}>Privacy Policy </Text>. Your data will be securely
              encrypted with US
            </Text>
          </View>

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
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});

export default Createpin;
