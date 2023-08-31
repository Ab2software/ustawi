
import React from 'react';

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
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import ReactNativeBiometrics from 'react-native-biometrics';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';

const Enablebiomatric = ({ navigation }) => {
 
  // const rnBiometrics = new ReactNativeBiometrics()
  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

 

  const finglogin = () => {
    rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then((resultObject) => {
        const { success } = resultObject

        if (success) {
          console.log('successful biometrics provided',success)
            AsyncStorage.setItem("fingerprint","true");
            navigation.navigate("Createpin")

        } else {
          console.log('user cancelled biometric prompt')
        }
      })
      .catch(() => {
        console.log('biometrics failed')
      })
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      <StatusBar hidden />
      <View style={{ marginHorizontal: 10 ,paddingHorizontal:16}}>
        <Icon onPress={() => navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />

        <View style={{ marginVertical: 30 }}>
          <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>Enable  Biometrics</Text>
          <Text style={{ color: currentTheme().text, marginTop: 10 }}>Login with fingerprint</Text>

          <View style={{ justifyContent: 'center', alignItems: 'center' ,marginVertical:40}}>

            <Image source={require('../../assets/Frame.png')} style={{ height: 200, width: 200, marginTop: 40 }} />

          </View>

          <LargeButton label="Enable" onPress={()=>{finglogin()}}></LargeButton>
          {/* <TouchableOpacity onPress={() => finglogin()} style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 100 }}>
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Enable</Text>
          </TouchableOpacity> */}
          {/* <Text style={{color:currentTheme().text,alignSelf:'center',fontSize:16,marginTop:10}}>or</Text> */}
          <TouchableOpacity onPress={() => navigation.navigate('Createpin')} style={{ height: 43, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 30, marginHorizontal: 50, borderColor: currentTheme().text }}>
            <Text style={{ color: currentTheme().text, fontWeight: 'bold', fontSize: 16 }}>Skip</Text>
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
});

export default Enablebiomatric;


