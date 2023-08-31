
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useCallback } from 'react';

import { StatusBar, StyleSheet, Text, useColorScheme, View, Image, TouchableOpacity, Alert, ScrollView, PermissionsAndroid } from 'react-native';
import { Checkbox, Card, ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '../../constants/image';
import { apiImageUpload, deleteData, getApiCall, postApiCall } from '../../services/appSetting';
import { currentTheme, useTheme } from '../../constants/ThemeProvider';
import Divider from '../../widget/Divider';
import { postDataContent } from '../../services/Ops';
import Toast from "react-native-toast-message";
import { base, mainUrl } from '../../constants/Data.constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { StyleConstants } from '../../constants/Style.constant';

const Setting = (props) => {
  const [show, setShow] = useState(false);
  // const { colors } = useTheme();
  const { theme, updateTheme } = useTheme();

  const [payWithPin, setPyWithPin] = useState(false)
  const [faceLock, setFaceLock] = useState(false)
  const [themeCheck, setThemeCheck] = useState(false)
  // console.log(theme)
  const [animating, setAnimating] = useState(false)
  const [userDetail, setUserDetail] = useState({})
  //////////////////////////////////////////////// get user delte///////////////////


  // useFocusEffect(() => {
  //   requestCameraPermission()
  //   get_profile()
  //   setThemeCheck(currentTheme().themeMode == 'light' ? true : false)
  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      requestCameraPermission();

      get_profile()
      setThemeCheck(currentTheme().themeMode == 'light' ? true : false)
      const getFaceLock = async () => {
        let fingerLock = await AsyncStorage.getItem("fingerprint")
        let faceLock = await AsyncStorage.getItem("Faceid")
        if (faceLock == "true" || fingerLock == "true") {
          setFaceLock(true)
        } else {
          setFaceLock(false)
        }
      }
      getFaceLock()

    }, [props])
  );

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Ustawi App Camera Permission',
          message:
            'Ustawi App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const get_profile = async () => {
    setAnimating(true)
    let token = await AsyncStorage.getItem('logintokan');
    console.log("", token)
    // alert(UserId)
    let url = `user_detail`;

    try {
      let result = await getApiCall(url, token);
      console.log('----result--profile-', result)
      setUserDetail(result.data)
      setAnimating(false)
      if (result.data.pay_with_mpin) {
        setPyWithPin(true)
      } else {
        setPyWithPin(false)

      }
    } catch (error) {
      Toast.show({ type: 'error', text1: error.message });

      setAnimating(false);
    }
  }
  const update_pay_with_mpin = async (val) => {
    // let UserId = await AsyncStorage.getItem('UserId');
    let token = await AsyncStorage.getItem('logintokan');
    let url = "update_mpin_setting/"
    let body = {
      "pay_with_mpin": val
    }
    console.log(body)

    try {
      setAnimating(true);
      let result = await postApiCall(url, body, token)
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

    // await fetch(mainUrl + 'accounts/update_mpin_setting/', {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token
    //   },
    //   method: 'POST',
    //   body: 
    //     {
    //       pay_with_mpin: 0
    //     }


    // })
    //   .then(res => (res.json()))
    //   .then(result => {
    //     console.log(result)
    //     if (result.status_code == 200 ) {
    //     Toast.show({ type: "success", text1: result.message });
    //     } else {
    //         Toast.show({ type: "error", text1: result.message });
    //     }
    //   }
    //   )

  };
  const update_face_lock = async (val) => {
    console.log(val)
    if (val) {
      AsyncStorage.setItem("fingerprint", "true");
      let faceBase64 = AsyncStorage.getItem("faceBase");
      if (faceBase64 != null) {
        AsyncStorage.setItem("Faceid", "true");
      }
    } else {
      AsyncStorage.setItem("fingerprint", "false");
      AsyncStorage.setItem("Faceid", "false");
    }
    // setAnimating(true) 
    // let token = await AsyncStorage.getItem('logintokan'); 
    // let body={
    //   is_pay_with_mpin:val
    //   }
    // let url = `update_mpin_setting`; 

    //     try {
    //         let result = await postApiCall(url,body,token);
    //         console.log('----result-sss--', result.data)
    //         if (result.status == "success") {
    //           Toast.show({ type: 'success', text1: result.message });

    //           setAnimating(false);
    //         } else {
    //           Toast.show({ type: 'error', text1: result.message });
    //           setAnimating(false);
    //         }
    //     } catch (error) {
    //         // setAnimating(false);
    //     } 
  }
  ////////////////////////// my account /////////////////////////////////
  const _myaccountdelete = async () => {
    let UserId = await AsyncStorage.getItem('UserId');
    let token = await AsyncStorage.getItem('logintokan');
    let url = 'accounts/account-info/';
    // let result= await deleteData(url,token)
    console.log(url)
    await fetch(mainUrl + url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      body: {}

    })
      .then(res => (res.json()))
      .then(result => {
        console.log(result)
        // if (result) {
        Toast.show({ type: "success", text1: result.message });
        AsyncStorage.clear()
        props.navigation.navigate("Login")
        // } else {
        //     Toast.show({ type: "error", text1: result.message });
        // }
      }
      )

  };
  // const _myaccountdelete = async () => {
  //   let UserId = await AsyncStorage.getItem('UserId');
  //   let token = await AsyncStorage.getItem('logintokan');

  //   let url = `account-info/?id=${UserId}`;
  //   setAnimating(true)
  //   let result = await deleteData(url, token);

  //   console.log('---deleteData---', result.data)
  //   // setUserDetail(result)
  // };

  /////////////////////////////////////////////////// log out ///////////////////////
  const clear_session = async () => {
    Alert.alert("USTAWI", "Are you sure want you logout ?", [
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.setItem("logintokan", "")
          props.navigation.navigate('Login')
        }
      },
      {
        text: "No",
        onPress: () => {

        }
      }], { cancelable: true })

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      <StatusBar hidden={false} backgroundColor={currentTheme().btnbackground} />
      <ScrollView showsVerticalScrollIndicator={false} >

        <View style={{ flex: 0.9, }}>
          <View style={{ backgroundColor: currentTheme().btnbackground, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10, height: 50 }}>
            {/* <Text style={[styles.textstyle, { color: currentTheme().text, fontWeight: 'bold' }]}>Setting</Text> */}
            <Text style={{fontSize:20,color:currentTheme().background}}>Setting</Text>

          </View>

          <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20, height: 90 }}>
            {/* <View style={{ flex: 0.4, height: '100%' }}>
            </View> */}
            <View style={{  borderRadius: 50 }}>
              <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} >
                <Image source={userDetail.profile_image == null || userDetail.profile_image == "" ? require('../../assets/Maskgroup.png') : { uri: userDetail.profile_image }} style={{ height: 100, width: 100, borderRadius: 90 }} />
              </TouchableOpacity>
            </View>
            {/* <View style={{ flex: 0.4, height: '100%' }}>
              <Image source={require('../../assets/edit.png')} style={{ height: 20, width: 20, marginLeft: -20, marginTop: 60 }} />
            </View> */}
          </View>
          <Text style={[{ color: currentTheme().text, fontWeight: 'bold', textAlign: 'center', fontSize: 16, marginTop: 20 }]}>{userDetail.first_name == null ? 'User Detail' : userDetail.first_name}</Text>
         
          {/* <TouchableOpacity onPress={()=>{props.navigation.navigate("Categories")}}  style={[styles.cardView, { marginTop: 40 }]}>
            <Text style={[styles.textstyle, { color: currentTheme().text }]}>Budget</Text>
            <Icon name='chevron-forward' size={20} color={currentTheme().text} />
          </TouchableOpacity>
          <Divider /> */}

          
          <View style={[styles.cardView, ]}>
            <Text style={[styles.textstyle, { color: currentTheme().text }]}>Ustawi PIN</Text>
            <Icon name='chevron-forward' size={20} color={currentTheme().text} />
          </View>
          <Divider />
          <TouchableOpacity onPress={() => {
            userDetail.user_kyc_verified ? (

              props.navigation.navigate("Profile"),
              alert("User Already Verified")
            ) :
            userDetail.first_name == null ? (
               alert("Please Fill your profile details"),
               props.navigation.navigate('Profile')
            )
            :
              props.navigation.navigate("TakeASelefie")
          }

          } style={[styles.cardView,]}>
            <Text style={[styles.textstyle, { color: currentTheme().text }]}>KYC</Text>
            {userDetail.user_kyc_verified ?
              <Text style={[styles.textstyle, { color: currentTheme().succes, alignSelf: 'flex-end' }]}>(Verified)</Text>
              :
              <Text style={[styles.textstyle, { color: currentTheme().error, alignSelf: 'flex-end' }]}>(Pending)</Text>
            }
            <Icon name='chevron-forward' size={20} color={currentTheme().text} />
          </TouchableOpacity>
          <Divider />
          <View style={styles.cardView}>
            <Text style={[styles.textstyle, { color: currentTheme().text }]}>Pay with PIN</Text>
            {/* <Icon name='chevron-forward' size={20}/> */}
            {payWithPin ?
              <TouchableOpacity onPress={() => { setPyWithPin(false), update_pay_with_mpin(0) }}>
                <Image source={Images['on']} style={{ height: 20, width: 30 }}></Image>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { setPyWithPin(true), update_pay_with_mpin(1) }}>
                <Image source={Images['off']} style={{ height: 20, width: 35 }}></Image>
              </TouchableOpacity>
            }
          </View>
          <Divider />



          <View style={styles.cardView}>
            <Text style={[styles.textstyle, { color: currentTheme().text }]}>Face/Fingerprint Unlock</Text>
            {/* <Icon name='chevron-forward' size={20} />
           */}
            {faceLock ?
              <TouchableOpacity onPress={() => { setFaceLock(false), update_face_lock(false) }}>
                <Image source={Images['on']} style={{ height: 20, width: 30 }}></Image>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { setFaceLock(true), update_face_lock(true) }}>
                <Image source={Images['off']} style={{ height: 20, width: 35 }}></Image>
              </TouchableOpacity>
            }
          </View>

          <Divider />

          <View style={styles.cardView}>
            <Text style={[styles.textstyle, { color: currentTheme().text }]}>Light Mode</Text>
            {/* <Icon name='chevron-forward' size={20} /> */}
            {themeCheck ?
              <TouchableOpacity onPress={() => { setThemeCheck(false), updateTheme('dark') }}>
                <Image source={Images['on']} style={{ height: 20, width: 30 }}></Image>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { setThemeCheck(true), updateTheme('light') }}>
                <Image source={Images['off']} style={{ height: 20, width: 35 }}></Image>
              </TouchableOpacity>
            }
          </View>
          <Divider />

          <View style={styles.cardView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Image source={Images['call']} style={{ height: 30, width: 30 }}></Image>
              <View style={{ marginLeft: 10 }} >
                <Text style={[styles.textstyle, { color: currentTheme().text }]}>Customer Service</Text>
                <Text style={{ color: currentTheme().text }}>Contact our customer care service for help</Text>
              </View>
            </View>
            <Icon name='chevron-forward' size={20} color={currentTheme().text} />
          </View>
          <Divider />

          <View style={styles.cardView}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Image source={Images['offical']} style={{ height: 30, width: 30 }}></Image>
              <View style={{ marginLeft: 10 }} >
                <Text style={[styles.textstyle, { color: currentTheme().text }]}>Ustawi Officials</Text>
                <Text style={{ color: currentTheme().text }}>Follow us on social media</Text>
              </View>
            </View>
            <Icon name='chevron-forward' size={20} color={currentTheme().text} />
          </View>
          <Divider />

          <TouchableOpacity onPress={() => { _myaccountdelete() }}
            style={styles.cardView}>
            <Text style={[styles.textstyle, { color: currentTheme().text }]}>Delete My Account</Text>
            <Icon name='chevron-forward' size={20} color={currentTheme().text} />
          </TouchableOpacity>
        </View>
        <Divider />

        <View style={{ flex: 0.1, paddingHorizontal: 10 }}>
          <TouchableOpacity onPress={() => { clear_session() }}
            style={[styles.logoutstyel, { borderColor: currentTheme().btnbackground, }]}>
            <Text style={{ color: currentTheme().btnbackground, fontSize: 16, fontWeight: 'bold' }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  cardView: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    // borderBottomWidth: 0.5,
    // borderColor: ColorsConstant.gray,
    paddingBottom: 10
  },
  textstyle: {
    fontSize: 17,
    // color: currentTheme().text
  },
  logoutstyel: {
    // borderColor: currentTheme().btnbackground,
    borderWidth: 0.8, height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    marginVertical: 10
  }
});

export default Setting;
