
import React, { useEffect, useState } from 'react';

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
  TouchableOpacity,
  Button, TouchableHighlight, Alert, LogBox, NativeEventEmitter, BackHandler
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, MatchFacesImage, MatchFacesSimilarityThresholdSplit, RNFaceApi } from '@regulaforensics/react-native-face-api'
 
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
LogBox.ignoreLogs(['new NativeEventEmitter']);

const Faceid = ({ navigation }) => { 
  var image1 = new MatchFacesImage()
  var image2 = new MatchFacesImage()
  const [img1, setImg1] = useState("")
  const [img2, setImg2] = useState("")
  const [similarity, setSimilarity] = useState("")
  const [liveness, setLiveness] = useState("")


  const [faceerror, setFaceerror] = useState(false)
 
  const eventManager = new NativeEventEmitter(RNFaceApi)
  useEffect(() => {

    eventManager.addListener('videoEncoderCompletionEvent', json => {
      response = JSON.parse(json)
      transactionId = response["transactionId"];
      success = response["success"];

      console.log("video_encoder_completion:");
      console.log("    success: " + success);
      console.log("    transactionId: " + transactionId);

    })

    FaceSDK.init(json => {
      response = JSON.parse(json)
      if (!response["success"]) {
        console.log("Init failed: ");
        console.log(json);
      }
    }, e => { })



    // FaceSDK.presentFaceCaptureActivity(result => {
    //   console.log(result)
    //   setImage(first, FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap, Enum.ImageType.LIVE)
    // }, e => { })



  }, [faceerror])





  const setImage = async (base64, type) => {

    if (base64 == null) return
    setSimilarity("nil")
    image1.bitmap = base64
    image1.imageType = type
   
    setImg1({ uri: "data:image/png;base64," + base64 })
    if (base64 != "") {
      await AsyncStorage.setItem("faceBase", base64)
      await AsyncStorage.setItem("Faceid", "true")
      console.log("Sss", base64)
      navigation.navigate('Enablebiomatric')
    }

    // setFaceerror(true)
    // navigation.navigate('Loginfaceid', { error: 'n' })
  }




  const livenessfun = async () => {
    FaceSDK.startLiveness(result => {
      result = LivenessResponse.fromJson(JSON.parse(result))

      setImage(result.bitmap, Enum.ImageType.LIVE)
      if (result.bitmap != null)
        setLiveness(result["liveness"] == Enum.LivenessStatus.PASSED ? "passed" : "unknown")
    }, e => { })
  }

  const skip = async () => {
    let token= await AsyncStorage.getItem("logintokan")
    navigation.navigate('Enablebiomatric',{tokann:token})
}


  const finglogin = async () => {

    navigation.navigate('LoginBiomatric')
    // rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
    //   .then((resultObject) => {
    //     const { success } = resultObject

    //     if (success) {
    //       console.log('successful biometrics provided'),
    //         navigation.navigate('Succes')

    //     } else {
    //       console.log('user cancelled biometric prompt')
    //     }
    //   })
    //   .catch(() => {
    //     console.log('biometrics failed')
    //   })
  }
  const backAction = () => {
    if (navigation.isFocused()) {
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
}, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar hidden />
      {/* {faceerror ? 
      (<View style={{ width: '100%', alignItems: 'center' }}>
        <Image source={require('../assets/Faceerror.png')} style={{ height: 200, width: 200, marginTop: 20 }} />
        <View style={{ marginTop: 30, alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ color: currentTheme().textp, }}>Face not recognized.</Text>
          <TouchableOpacity onPress={() => livenessfun()}><Text style={{ fontSize: 15, color: currentTheme().btnbackground, alignSelf: 'center' }}>Try Again</Text></TouchableOpacity>

        </View>
        <TouchableOpacity onPress={() => finglogin()} style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 100, width: '90%' }}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Use Pin</Text>
        </TouchableOpacity>
      </View>) 
      : */}
      <TouchableOpacity onPress={() => livenessfun()} style={{marginBottom:40}}>
        <Image source={require('../../assets/FaceID.png')} style={{ height: 200, width: 200, marginTop: 20 }} />
      </TouchableOpacity>

      <LargeButton label="Enable" onPress={()=>{livenessfun()}}></LargeButton>


      {/* <TouchableOpacity onPress={() => livenessfun()} style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 100, width: '90%' }}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>Enable</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => skip()} style={{ height: 43, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 30, marginHorizontal: 50, borderColor: currentTheme().text }}>
                        <Text style={{ color: currentTheme().text, fontWeight: 'bold', fontSize: 16 }}>Skip</Text>
                    </TouchableOpacity>
      {/* }  */}
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

export default Faceid;


