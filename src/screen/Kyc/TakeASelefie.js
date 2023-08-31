
import LargeButton from '../../component/Button/LargeButton'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant'
import { currentTheme } from '../../constants/ThemeProvider'
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, StyleSheet, Text, View, Image, Alert, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';

// import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiImageUpload, postApiCall } from '../../services/appSetting';
import { mainUrl } from '../../constants/Data.constant';
// import ImagePicker from 'react-native-image-picker';
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";
export default function TakeASelefie(props) {
    const [selfie, setSelfie] = useState("")
    const [selfieUri, setSelfieUri] = useState("")
    const [frontImage, setFrontImage] = useState("")


    const pickImage =async (type) => {
        let options = {
            title: 'Select Image',
            quality:0.5,
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },

        };

        launchCamera({ options, includeBase64: true,quality:0.5 }, response => {
            if (response.assets == undefined) return
            // setSelfieUri(response.assets[0].uri)
            // setSelfie(response.assets[0].base64)

            // streIMg(response.assets[0].base64,response.assets[0].uri)
            props.navigation.navigate("RetakeSelefie", {response:response})

        })



    }


    const  streIMg =async(base64,uri)=>{
       await AsyncStorage.setItem("documentImg",base64)
        props.navigation.navigate("RetakeSelefie", { imagheBase64:base64,  uri })

    }

    return (
        <SafeAreaView>
            <View style={{ height: screenHeight, width: screenWidth, backgroundColor: currentTheme().background }}>
                <Icon onPress={() => props.navigation.goBack()}
                    name="ios-arrow-back-outline"
                    style={{ marginTop: 10, width: 50, }}
                    size={30} color={currentTheme().text} />
                <Text style={{ color: currentTheme().text, alignSelf: 'center', marginTop: 20, fontSize: 20, fontWeight: 'bold' }}>
                    KYC VERIFICATION
                </Text>
                <Text style={{ color: currentTheme().text, alignSelf: 'center', marginTop: 15, fontSize: 15 }}>
                    REVIEW SELFIE
                </Text>
                <TouchableOpacity
                    style={{ height: 190, width: 160, borderColor: currentTheme().btnbackground, borderWidth: 1, alignSelf: 'center', borderRadius: 100, marginTop: 30 }}
                    onPress={() => { pickImage() }}>

                    {selfieUri != "" &&
                        <Image
                            style={{ height: 190, width: 160, alignSelf: 'center', borderRadius: 1500, }}
                            source={selfieUri == "" ? require('./../../assets/Maskgroup.png') : { uri: selfieUri }}
                        />
                    }
                </TouchableOpacity>
                <Text style={{ color: currentTheme().text, alignSelf: 'center', marginTop: 20, fontSize: 20 }}>
                    Smile for the Camera</Text>

                <View style={{
                    height: 60, width: screenWidth - 80, borderColor: currentTheme().placeholdercolor
                    , borderWidth: 1, alignSelf: 'center', borderRadius: 10, marginTop: 30, flexDirection: 'row'
                }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Image source={require("./../../assets/images/blob.png")} style={{ height: 40, width: 40, alignSelf: 'center' }} />
                    </View>
                    <View style={{ flex: 8, }}>
                        <Text style={{ color: currentTheme().text, alignSelf: 'center', marginTop: 10, fontSize: 10 }}>
                            Tip: Put your face inside the oval </Text>
                        <Text style={{ color: currentTheme().text, alignSelf: 'center', marginTop: 10, fontSize: 10 }}>
                            frame and wait under it turns blue</Text>
                    </View>


                </View>

                <View style={{ width: screenWidth, alignItems: 'center', marginTop: 30 }}>
                    <LargeButton label="TAKE A SELFIE" onPress={() => { pickImage() }} backgroundColor={currentTheme().btnbackground1} />
                </View>
            </View>
        </SafeAreaView>




    )
}

const styles = StyleSheet.create({})