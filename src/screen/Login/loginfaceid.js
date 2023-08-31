
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
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
// import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, MatchFacesImage, MatchFacesSimilarityThresholdSplit, RNFaceApi } from '@regulaforensics/react-native-face-api'
import AnimatingLoader from '../../component/AnimatingLoader';
import { currentTheme } from '../../constants/ThemeProvider';
import { CustomButton } from '../../component/CustomButton';
import LargeButton from '../../component/Button/LargeButton';
import Toast from 'react-native-toast-message';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

const Loginfaceid = ({ navigation }) => {
  const [faceerror, setFaceerror] = useState(false)
  const rnBiometrics = new ReactNativeBiometrics()
  const { colors } = useTheme();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // faceDetect()


    setTimeout(() => {
     // setFaceerror(true)
     faceDetect()
    }, 2000);
  }, [faceerror])

  const faceDetect=()=>{
    rnBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject
          console.log(JSON.stringify(biometryType))
        if (available && biometryType === BiometryTypes.TouchID) {
          console.log('TouchID is supporteda')
        } else if (available && biometryType === BiometryTypes.FaceID) {
          console.log('FaceID is supported')
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          console.log('Biometrics is supporteds')
        } else {
          console.log('Biometrics not supported')
        }
      })

  //   rnBiometrics.createKeys()
  //     .then((resultObject) => {
  //       const { publicKey } = resultObject
  //       console.log(publicKey)
  //     })

  //   rnBiometrics.biometricKeysExist()
  //     .then((resultObject) => {
  //       const { keysExist } = resultObject

  //       if (keysExist) {
  //         console.log('Keys exist',keysExist)
  //         setFaceerror(true)
  //       } else {
  //         console.log('Keys do not exist or were deleted')
  //       }
  //     })

  }

  var image1 = new MatchFacesImage()
  var image2 = new MatchFacesImage()
  const [img1, setImg1] = useState("")
  const [img2, setImg2] = useState("")
  const [similarity, setSimilarity] = useState("")
  const [liveness, setLiveness] = useState("")


  const eventManager = new NativeEventEmitter(RNFaceApi)
  useEffect(() => {

    eventManager.addListener('videoEncoderCompletionEvent', json => {
      let response = JSON.parse(json)
      transactionId = response["transactionId"];
      success = response["success"];
      // console.log("video_encoder_completion:");
      // console.log("    success: " + success);
      // console.log("    transactionId: " + transactionId);
    })
    FaceSDK.init(json => {
      let response = JSON.parse(json)
      if (!response["success"]) {
        FaceSDK.presentFaceCaptureActivity(result => { 
          setImage(FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap, Enum.ImageType.LIVE)
        }, e => { })
      }
    }, e => { })
    
  }, [])

  const select_image = () => { 
        FaceSDK.presentFaceCaptureActivity(result => { 
          setImage(FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap, Enum.ImageType.LIVE)
        }, e => { }) 
  }

  const setImage = async (base64, type) => {
    setAnimating(true);
    let imageBase = await AsyncStorage.getItem("faceBase");

    if (image1 == null) return
    image1.bitmap = imageBase
    image1.imageType = type
    let oldImg = { uri: "data:image/png;base64," + imageBase }
    setImg1(oldImg)


    if (base64 == null) return
    image2.bitmap = base64
    image2.imageType = type
    let newImg = { uri: "data:image/png;base64," + base64 }
    setImg2(newImg)
    matchFaces(oldImg, newImg)
  }


  const matchFaces = () => {
    if (image1 == null || image1.bitmap == null || image1.bitmap == "" || image2 == null || image2.bitmap == null || image2.bitmap == "")
      return
    setSimilarity("Processing...")
    let request = new MatchFacesRequest()
    request.images = [image1, image2]
    FaceSDK.matchFaces(JSON.stringify(request), response => {
      response = MatchFacesResponse.fromJson(JSON.parse(response))
      FaceSDK.matchFacesSimilarityThresholdSplit(JSON.stringify(response.results), 0.75, str => {
        var split = MatchFacesSimilarityThresholdSplit.fromJson(JSON.parse(str)) 
        let val = split.matchedFaces.length > 0 ? ((split.matchedFaces[0].similarity * 100).toFixed(2)) : 0
        if (val > 70) {
          setAnimating(false);
          navigation.navigate('BottomTab')
        }else{
          Toast.show({ type: 'error', text1: "Face is unknown" });
          setAnimating(false);
        } 
      }, e => {
        setSimilarity(e)
        alert("errr")
      })
    }, e => {
      setSimilarity(e)
      alert("errr")
    })
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
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      <StatusBar hidden />
      {animating && <AnimatingLoader />}

      <View style={{ marginHorizontal: 10, paddingHorizontal: 16,flex:1 }}>
        <Icon onPress={() => backAction()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />

        <View style={{  flex: 1 }}>
          <View style={{ flex: 0.5,marginTop:20 }}>
            <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>Enable  Face Id</Text>
            <Text style={{ color: currentTheme().text, marginTop: 10 }}>Login with face ID</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Image source={require('./../../assets/FaceID.png')} style={{ height: 200, width: 200, alignSelf: 'center' }} />
          </View>
          <View style={{ flex: 1 }}>
            <LargeButton label="Enable" onPress={() => { select_image() }} />
            <TouchableOpacity onPress={() => navigation.navigate('LoginBiomatric')} style={{ height: 43, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 30, marginHorizontal: 50, borderColor: currentTheme().text }}>
              <Text style={{ color: currentTheme().text, fontWeight: 'bold', fontSize: 16 }}>Skip</Text>
            </TouchableOpacity>
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
});

export default Loginfaceid;


