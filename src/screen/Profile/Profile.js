import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, SafeAreaView, BackHandler } from "react-native";

import Icon from 'react-native-vector-icons/Ionicons';
import LargeButton from "../../component/Button/LargeButton";
import TextInputCommon from "../../component/TextInput/TextInputCommon";

import Toast from "react-native-toast-message";

// import Toast  from "react-native-toast-message";
import { apiImageUpload, getApiCall, postApiCall } from "../../services/appSetting";
// import ModalCamera from "../src/component/ModalComan/ModalCamera";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, MatchFacesImage, MatchFacesSimilarityThresholdSplit, RNFaceApi } from '@regulaforensics/react-native-face-api'
import { currentTheme } from "../../constants/ThemeProvider";
import { screenWidth } from "../../constants/Sizes.constant";
import { mainUrl } from "../../constants/Data.constant";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";


export default function Profile(props) {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [images, setImages] = useState('');
    const [userDetail, setUserDetail] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    const [animating, setAnimating] = useState(true)


    useEffect(() => {
        get_profile()
    }, [props])


    const get_profile = async () => {
        setAnimating(true)
        let UserId = await AsyncStorage.getItem('UserId');
        let token = await AsyncStorage.getItem('logintokan');
        // alert(UserId)
        let url = `user_detail`;

        try {
            let result = await getApiCall(url, token);
            console.log('----result---', result)
            setUserDetail(result.data)
            setAnimating(false)

            // setName(result.first_name)
            setMobile(result.data.mobile)
        } catch (error) {

            Toast.show({ type: 'error', text1: error.message });
            setAnimating(false);
        }
    }

    const updateprofile = async () => {
        let UserId = await AsyncStorage.getItem('UserId');
        let token = await AsyncStorage.getItem('logintokan');
        console.log(token)
        let url = 'account-info/'
        let body = {
            "first_name": name,
            "mobile": mobile
        }
        console.log(body)

        try {
            setAnimating(true);
            let result = await postApiCall(url, body, token)
            console.log(result)
            if (result.status_code == 200) {
                Toast.show({ type: 'success', text1: result.message });
                setAnimating(false);
                get_profile()
            } else {
                Toast.show({ type: 'error', text1: result.message });
                setAnimating(false);
            }
        } catch (error) {
            Toast.show({ type: 'error', text1: error.message });

            setAnimating(false);
        }

    };


    const pickImage = () => {
        Alert.alert("Select option", "", [
            {
                text: "Use gallery",
                onPress: () => launchImageLibrary({ includeBase64: true }, response => {
                    if (response.assets == undefined) return
                    imageupload(response.assets[0].base64)

                })
            },
            {
                text: "Use camera",
                onPress: () => launchCamera({ includeBase64: true }, response => {
                    if (response.assets == undefined) return
                    imageupload(response.assets[0].base64)

                })
            }], { cancelable: true })
    }
    const imageupload = async (base64) => {
        try {
            setAnimating(true)
            let token = await AsyncStorage.getItem('logintokan');
            let base64Data = "data:image/png;base64," + base64;

            console.log(JSON.stringify(base64Data.substring(100)))

            await fetch(mainUrl + 'accounts/upload_profile_image/', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                method: 'POST',
                body: JSON.stringify({
                    "image_base64": base64Data
                })
            })
                .then(res => (res.json()))
                .then(result => {
                    console.log("**********", result)
                    setAnimating(false)
                    // Toast.show({ type: "success", text1: result.message });
                    get_profile()
                }
                )
        } catch (e) {
            console.log(e)
            setAnimating(false)
            Toast.show({ type: "error", text1: e.message });
        }
    };
    // const imageupload = async (base64) => {

    //     let url = "upload_profile_image/"
    //     let token = await AsyncStorage.getItem('logintokan');
    //     let base64Data = "data:image/png;base64, " + base64;
    //     let body = JSON.stringify(
    //         {
    //             "image_base64": base64Data
    //         }
    //     )
    //     console.log(body)

    //     try {
    //         let result = await postApiCall(url, body, false);
    //         console.log(result)
    //         if (result.status == 200) {
    //             Toast.show({ type: "success", text1: result.message });
    //         } else {
    //             Toast.show({ type: "error", text1: result.message });
    //         }
    //     } catch (error) {
    //         console.log('error', error)
    //     }


    // }
    const backAction = () => {
        if (props.navigation.isFocused()) {
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
    }, [props]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,marginTop: 10,  }} >
                        <Icon onPress={() => props.navigation.navigate("BottomTab")} name="ios-arrow-back-outline"
                            style={{ width: 50 }} size={30} color={currentTheme().text} />
                        <Text style={[{ color: currentTheme().text, fontWeight: 'bold', textAlign: 'center', fontSize: 16 }]}>My Profile</Text>
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20, height: 90 }}>
                        <View style={{ flex: 0.4, height: '100%' }}>
                        </View>
                        <View style={{ flex: 0.2 }}>
                            <TouchableOpacity onPress={() => pickImage()} >
                                <Image source={userDetail.profile_image == null || userDetail.profile_image == "" ? require('../../assets/Maskgroup.png') : { uri: userDetail.profile_image }} style={{ height: 90, width: 90, marginLeft: -10, borderRadius: 50 }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => pickImage()} style={{ flex: 0.4, height: '100%' }}>
                            <Image source={require('../../assets/edit.png')} style={{ height: 30, width: 30, marginLeft: -25, marginTop: 60 }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: currentTheme().succes, alignSelf: 'center', marginTop: 10 }}>{userDetail.user_kyc_verified ? "(Account Verified)" : ""}</Text>

                    <Text style={[{ color: currentTheme().text, fontWeight: 'bold', textAlign: 'center', fontSize: 16, marginTop: 10 }]}>{userDetail.first_name == null ? 'User Detail' : userDetail.first_name}</Text>
                </View>
                {animating ? <ActivityIndicator />
                    :
                    <View style={{ alignContent: 'center', width: screenWidth, alignItems: 'center' }}  >
                        <TextInputCommon
                            label={'Full Name'}
                            placeholder={'Enter Full Name'}

                            value={userDetail.first_name}
                            onChangeText={(e) => setName(e)}
                        />
                        <TextInputCommon
                            label={'Mobile Number'}
                            placeholder={'Enter Mobile Number'}
                            value={userDetail.mobile}
                            keyboardType={'number-pad'}
                            // onChangeText={(e) => setMobile(e)}
                            editable={false}
                        />
                        {animating ?
                            <ActivityIndicator color={currentTheme().btnbackground} />
                            :
                            <LargeButton onPress={() => updateprofile()}
                                label={'Done'}
                            />
                        }

                    </View>
                }
            </ScrollView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    cardView: {
        backgroundColor: currentTheme().background,
        elevation: 5,
        marginTop: 5,
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 150
    }
})
