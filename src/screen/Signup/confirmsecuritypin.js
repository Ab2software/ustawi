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
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
import { mainUrl } from '../../constants/Data.constant';
const Confirmpin = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [otpdata, setOtpdata] = React.useState()
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
      .then(data2 => (console.log(data2.message),
        data2.status_code == 200 ? navigation.navigate('Succes') : alert(data2.message)
      ))

  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      <StatusBar hidden />
      <View style={{ marginHorizontal: 10 ,paddingHorizontal:16}}>
        <Icon onPress={() => navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />

        <View style={{ marginTop: 100 }}>
          <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>Confirm Security PIN</Text>
          <Text style={{ color: currentTheme().text, marginTop: 10 }}>Input initial PIN</Text>

          <View>
            <OTPInputView
              style={{ width: '80%', height: 40, marginTop: 40 }}
              pinCount={4}
          secureTextEntry={true}

              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => { setOtpdata(code) }}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{ color: currentTheme().text, borderWidth: 0.3, backgroundColor: currentTheme().otpback, width: 40, height: 40, textAlign: 'center', paddingVertical: 10, marginHorizontal: 5, borderRadius: 5, borderColor: currentTheme().otpborder }}

              onCodeFilled={(code => {
                console.log(`Code is ${code}, you are good to go!`)
              })}
            />
          </View>
          <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', marginVertical:40 }}>
          </View>
          <LargeButton label="Set Pin" onPress={()=>{SubmitLoginData()}}></LargeButton>

          {/* <TouchableOpacity onPress={() => SubmitLoginData()} style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 50 }}>
            <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Set Pin</Text>
          </TouchableOpacity> */}

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

export default Confirmpin;


