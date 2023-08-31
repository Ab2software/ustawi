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
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Toast from 'react-native-toast-message';
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import AnimatingLoader from '../../component/AnimatingLoader';
import { apiImageUpload, postApiCall } from '../../services/appSetting';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
import { mainUrl } from '../../constants/Data.constant';
import { screenWidth } from '../../constants/Sizes.constant';


const OtpVerification = (props) => {
  const [animating, setAnimating] = useState(false);
  const { mobilenum, route, countryCode } = props.route.params
  const { colors } = useTheme();
  const [otpdata, setOtpdata] = React.useState('')
  const checkscreen = route == 'L' ? 'L' : 'S'
  const [time, setTime] = useState(90)
  const [visiable, setVisiable] = useState(false)
  var timeLeft = 90;
  var timerId;
  useEffect(() => {
    setOtpdata('')
    timerId = setInterval(countdown, 1000);

  }, [props])


  function countdown() {
    if (timeLeft == -1) {
      clearTimeout(timerId);
      // doSomething();
      setVisiable(true)
    } else {
      setTime(timeLeft.toString())
      // elem.innerHTML = timeLeft + ' seconds remaining';
      timeLeft--;
      setVisiable(false)
    }
  }

  function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
  }

  const SubmitLoginData = async () => {
    // let isError = false, errorMsg = ''
    // if (otpdata == "") {
    //   errorMsg = ' Please enter OTP'
    //   isError = true
    // }
    // let url = "validate_otp/" 
    // let body = {
    //   "mobile": mobilenum,
    //   "code": otpdata
    // }
    // console.log(body)
    // if (!isError) {
    //   try {
    //     setAnimating(true);
    //     let result = await postApiCall(url, body, false)
    //     console.log("-----otp------",result)
    //     // setAnimating(false);

    //     if (result.status_code == 200) {
    //       Toast.show({ type: 'success', text1: result.message });
    //       setOtpdata("")
    //       await AsyncStorage.setItem('logintokan', result.data.access_token);
    //       await AsyncStorage.setItem('UserId', result.data.user_id);

    //       // checkscreen == 'L' ?  
    //       if (props.route.params.type == "login") {
    //         let fingerPrint = await AsyncStorage.getItem("fingerprint")
    //         let faceid = await AsyncStorage.getItem("Faceid")
    //         console.log("fingur print", fingerPrint)

    //         if (faceid) {
    //           props.navigation.navigate('Faceid', { error: 'n' })
    //         }
    //         else if (fingerPrint == "true") {
    //           props.navigation.navigate('LoginBiomatric')
    //         }
    //         else {

    //           let token = await AsyncStorage.getItem("logintokan")
    //           props.navigation.navigate('LoginSecurity', { tokann: token })
    //         }

    //       } else {
    //         props.navigation.navigate('Faceid', { error: 'n' })

    //       }
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
    await fetch(mainUrl + 'accounts/validate_otp/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',

      body: JSON.stringify(
        {
          "mobile": mobilenum,
          "code": otpdata
        }
      )
    })
      .then(res => (res.json()))
      .then(data2 => {
        console.log('---adad--', data2)
        if (data2.status_code == 200) {
          navigationto(data2)
        } else {
          Toast.show({ type: 'error', text1: data2.message });
        }
        // data2.code || data2.message == 'Enter Valid mobile and OTP' ? alert('Enter Valid mobile and OTP') : (navigationto(data2))
      })

  };
  const navigationto = async (result) => {
    console.log("------otp verify------", result)
    await AsyncStorage.setItem('logintokan', result.data.access_token);
    await AsyncStorage.setItem('UserId', result.data.user_id);
    // await AsyncStorage.setItem('UserData', result.data);
    

    if (props.route.params.type == "login") {
      let fingerPrint = await AsyncStorage.getItem("fingerprint")
      let faceid = await AsyncStorage.getItem("Faceid")
      console.log("fingur print", fingerPrint)

      if (faceid) {
        props.navigation.navigate('Loginfaceid', { error: 'n' })
      }
      else if (fingerPrint == "true") {
        props.navigation.navigate('LoginBiomatric')
      }
      else {

        let token = await AsyncStorage.getItem("logintokan")
        props.navigation.navigate('LoginSecurity', { tokann: token })
      }

    } else {
      // console.log("Sss")
      props.navigation.navigate('Faceid', { error: 'n' })
    }
    setAnimating(false);
  }
  const _resendcode = async () => {
    clearTimeout(timerId)
    timeLeft=90
    timerId = setInterval(countdown, 1000);

    setOtpdata("")

    let url = props.route.params == "regi" ? "register_user/" : "login/"
    let body = {
      "country_code": countryCode,
      "mobile": mobilenum
    }
    console.log(body)
    try {
      setAnimating(true);
      let result = await postApiCall(url, body, false)
      console.log(result)
      if (result.status_code == 200) {
        Toast.show({ type: 'success', text1: result.message });

        setAnimating(false);
      } else {
        Toast.show({ type: 'error', text1: result.message });
        setAnimating(false);
      }
    } catch (error) {
 
        Toast.show({ type: 'error', text1: error.message });
      setAnimating(false);
    }

  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      {/* <StatusBar hidden /> */}
      {animating && <AnimatingLoader />}
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />

        <View style={{ marginTop: 80 }}>
          <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>6 -Digit verification Code</Text>
          <Text style={{ color: currentTheme().text, marginTop: 10 }}>Please enter the code we’ve sent to {mobilenum} </Text>

          <View>
            <OTPInputView
              style={{ width: '80%', height: 40, marginTop: 40, color: currentTheme().text }}
              pinCount={6}
              size={30}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => { setOtpdata(code) }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{ color: currentTheme().text, borderWidth: 0.3, backgroundColor: currentTheme().otpback, width: 40, height: 40, textAlign: 'center', paddingVertical: 10, marginHorizontal: 5, borderRadius: 5, borderColor: currentTheme().otpborder }}
              code={otpdata}
              onCodeFilled={(code => {
                console.log(`Code is ${code}, you are good to go!`)
              })}
            />

          </View>
          <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', marginVertical: 40 ,width:screenWidth-40,background:'red'}}>
             
               
              <TouchableOpacity onPress={() => _resendcode()} disabled={!visiable}>
                <Text style={{ fontSize: 15, color: visiable ? currentTheme().btnbackground : currentTheme().placeholdercolor, alignSelf: 'center' }}>Resend code</Text>
              </TouchableOpacity>
              {!visiable && 
              <Text style={{ color: currentTheme().text,alignSelf:'center',marginLeft:10 }}>({fancyTimeFormat(time)})</Text> 
              }
          </View>
          {/* <TouchableOpacity onPress={() => SubmitLoginData()} style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 50 }}>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Verify</Text>
          </TouchableOpacity> */}
          <LargeButton label="Verify" onPress={() => { SubmitLoginData() }}></LargeButton>

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
  }, borderStyleBase: {
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
    borderWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
export default OtpVerification;
