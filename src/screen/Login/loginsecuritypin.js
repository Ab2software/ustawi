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
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { mainUrl } from '../../constants/Data.constant';
const Loginpin = ({ navigation, route }) => {
  const { colors } = useTheme();
  const rnBiometrics = new ReactNativeBiometrics()
  const [otpdata, setOtpdata] = React.useState('')
  const [tokan, settokan] = React.useState('')
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

  console.log("**************", route.params.error)

  useEffect(() => {

    getValue();


  }, [])

  // useEffect(()=>{

  // },[editNavigation])

  const getValue = async () => {

    let recenttokan = "";
    recenttokan = await AsyncStorage.getItem('logintokan')

    settokan(recenttokan)

  }
  console.log("itemmmmmm==================================>", 'Bearer ' + tokan)
  const login = () => {
    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then((resultObject) => {
        const { success } = resultObject

        if (success) {
          console.log('successful biometrics provided'),
            alert('Done')

        } else {
          console.log('user cancelled biometric prompt')
        }
      })
      .catch(() => {
        console.log('biometrics failed')
        navigation.navigate('Succes')
        alert('Not Supported')
      })
  }

  const SubmitLoginData = async () => {


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
      .then(data2 => (console.log(data2),
        data2.message == 'MPIN is valid' ? navigation.navigate('Succes') : alert(data2.message)
      ))

  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar hidden />
      <View style={{ marginHorizontal: 10 }}>
        <Icon onPress={() => navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={colors.text} />

        <View style={{ marginTop: 10 }}>
          <Text style={{ color: colors.text, fontSize: 26, fontWeight: 'bold' }}>Enter Security PIN</Text>
          <Text style={{ color: colors.text, marginTop: 10 }}>Confirm your 4-digit security PIN</Text>

          <View>
            <OTPInputView
            secureTextEntry={true}
            // secureTextEntry={sec}
              style={{ width: '80%', height: 40, marginTop: 40 }}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => { setOtpdata(code) }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{ color: colors.text, borderWidth: 0.3, backgroundColor: colors.otpback, width: 40, height: 40, textAlign: 'center', paddingVertical: 10, marginHorizontal: 5, borderRadius: 5, borderColor: colors.otpborder }}

              onCodeFilled={(code => {
                console.log(`Code is ${code}, you are good to go!`)
              })}
            />
            {/* <View style={{
              flexDirection: "row",

              paddingVertical: 10, marginTop: 40
            }}>
              <TextInput value={data.otp1} keyboardType='numeric' onChangeText={(val1) => textInputChange(val1)} ref={ref0} onKeyPress={onOtpKeyPress(1)}
                maxLength={1} style={{ color: colors.text, borderWidth: 0.3, backgroundColor: colors.otpback, width: 50, textAlign: 'center', paddingVertical: 10, marginHorizontal: 10, borderRadius: 5, borderColor: colors.otpborder }} />
              <TextInput value={data.otp2} keyboardType='numeric' onChangeText={(val2) => textInputChange1(val2)} ref={ref} onKeyPress={onOtpKeyPress(2)}
                maxLength={1} style={{ color: colors.text, borderWidth: 0.3, backgroundColor: colors.otpback, width: 50, textAlign: 'center', paddingVertical: 10, marginHorizontal: 16, borderRadius: 5, borderColor: colors.otpborder }} />
              <TextInput value={data.otp3} keyboardType='numeric' onChangeText={(val3) => textInputChange2(val3)} ref={ref1} onKeyPress={onOtpKeyPress(3)}
                maxLength={1} style={{ color: colors.text, borderWidth: 0.3, backgroundColor: colors.otpback, width: 50, textAlign: 'center', paddingVertical: 10, marginHorizontal: 16, borderRadius: 5, borderColor: colors.otpborder }} />
              <TextInput value={data.otp4} keyboardType='numeric' onChangeText={(val4) => textInputChange3(val4)} ref={ref2} onKeyPress={onOtpKeyPress(4)}
                maxLength={1} style={{ color: colors.text, borderWidth: 0.3, backgroundColor: colors.otpback, width: 50, textAlign: 'center', paddingVertical: 10, marginHorizontal: 16, borderRadius: 5, borderColor: colors.otpborder }} />

            </View> */}
          </View>
          {/* <Text style={{color:colors.text,marginTop:10}}>Already have an account? <Text style={{fontSize:15,color:'#C2FF1C'}}>Login</Text> </Text> */}
          <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row' }}>

            <TouchableOpacity onPress={() => navigation.navigate('Loginfaceid')}><Text style={{ color: colors.text, }}>Use Face ID Instead</Text></TouchableOpacity>

          </View>

          <View style={{ marginTop: 50 }}>
            <Text style={{ color: colors.btnbackground, alignSelf: 'center' }}>Forgot PIN</Text>
          </View>
          <TouchableOpacity onPress={() => SubmitLoginData()} style={{ backgroundColor: colors.btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 10 }}>
            <Text style={{ color: '#000', fontSize: 17 }}>Confirm</Text>
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

export default Loginpin;
