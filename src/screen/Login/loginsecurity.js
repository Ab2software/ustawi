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
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LargeButton from '../../component/Button/LargeButton';
import { currentTheme } from '../../constants/ThemeProvider';
import { base, mainUrl } from '../../constants/Data.constant';
import { postApiCall } from '../../services/appSetting';
const LoginSecurity = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [otpdata, setOtpdata] = React.useState()
  const [animating, setAnimating] = useState(false)

  const [tokann, settokan] = React.useState(route.params.tokan)
  const [data, setData] = React.useState({
    phone: '',
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',


  });
  const ref0 = React.useRef();
  const ref = React.useRef();
  const ref1 = React.useRef();
  const ref2 = React.useRef();

  const tokan = route.params.tokann;

  // navigation.navigate('Enablebiomatric')
  //textinput handler for otp to focus next
  console.log(otpdata, tokan)
  const SubmitLoginData = async () => {
    let token = await AsyncStorage.getItem('logintokan');

    // let isError = false, errorMsg = ''
    // if (otpdata == "") {
    //   errorMsg = ' Please enter OTP'
    //   isError = true
    // }
    // let url = "validate_mpin"
    // let body = {
    //   "MPIN": Number(otpdata)
    // }
    // console.log(body)
    // if (!isError) {
    //   try {
    //     setAnimating(true);
    //     let result = await postApiCall(url, body, token)
    //     console.log(result)
    //     if (result.status_code == 200) {
    //       Toast.show({ type: 'success', text1: result.message });
    //       navigation.navigate('BottomTab')
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
    await fetch(mainUrl+'accounts/validate_mpin/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokan
      },
      method: 'POST',

      body: JSON.stringify(
        {
          "MPIN": Number(otpdata)
        }
      )
    })
      .then(res => (res.json()))
      .then(data2 => {

        if (data2.status_code == '200') {
          navigation.navigate('BottomTab')
          setOtpdata("")
        } else {
          alert(data2.message)
        }


      })

  };

  useEffect(() => {
    setOtpdata("")
  }, [navigation])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      <StatusBar hidden />
      <View style={{ marginHorizontal: 10, paddingHorizontal: 16 }}>
        <Icon onPress={() => navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />

        <View style={{ marginTop: 100 }}>
          <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>Enter Security PIN</Text>
          <Text style={{ color: currentTheme().text, marginTop: 10 }}>Input your 4-digit security PIN</Text>

          <View>
            <OTPInputView
              style={{ width: '80%', height: 60, marginTop: 40 }}
              pinCount={4}
              code={otpdata}
              secureTextEntry={true}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => { setOtpdata(code) }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{ color: currentTheme().text, borderWidth: 0.3, backgroundColor: currentTheme().otpback, width: 60, height: 60, textAlign: 'center', paddingVertical: 10, marginHorizontal: 5, borderRadius: 5, borderColor: currentTheme().otpborder }}
              // codeInputFieldStyle={{}}
              onCodeFilled={(code => {
                console.log(`Code is ${code}, you are good to go!`)
              })}
            />
          </View>
          <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row' }}>
          </View>

          <TouchableOpacity onPress={() => { AsyncStorage.clear(), navigation.navigate('Forgot') }} style={{ height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 50 }}>
            <Text style={{ color: currentTheme().btnbackground, fontSize: 16, fontWeight: 'bold' }}>Forgot</Text>
          </TouchableOpacity>

          <LargeButton label="Confirm" onPress={() => SubmitLoginData()} />
          {/* <TouchableOpacity onPress={() => SubmitLoginData()} style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 30 }}>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Confirm</Text>
          </TouchableOpacity> */}
          {/* <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20, marginTop: 40 }}>
            <Text style={{ textAlign: 'center', color: currentTheme().textp }}>
              By pressing Set PIN, you agree to our <Text style={{ color: currentTheme().btnbackground }}>Terms &
                Conditions </Text> and <Text style={{ color: currentTheme().btnbackground }}>Privacy Policy </Text>. Your data will be securely
              encrypted with US
            </Text>
          </View> */}

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

export default LoginSecurity;


