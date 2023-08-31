import { SafeAreaView, StyleSheet, Text, View, Image, Alert, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import LargeButton from '../../component/Button/LargeButton';

// import { Image } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiImageUpload, postApiCall } from '../../services/appSetting';
import { mainUrl } from '../../constants/Data.constant';
// import ImagePicker from 'react-native-image-picker';
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";
export default function UserEKyc(props) {

    const [selfie, setSelfie] = useState("")
    const [selfieUri, setSelfieUri] = useState("")
    const [frontImage, setFrontImage] = useState("")
    const [frontImageUri, setFrontImageUri] = useState("")
    const [backImage, setBackImage] = useState("")
    const [backImageUri, setBackImageUri] = useState("")
    const [animating, setAnimating] = useState(false)
    const [number, setNumber] = useState("")
    const [documentType, setDocumentTYpe] = useState("")

    const [documentOpen, setDocumentOpen] = useState(false);
    const [documentValue, setDocumentValue] = useState(null);

    const [document, setComapny] = useState([
        { label: "DRIVERS_LICENSE", value: "DRIVERS_LICENSE" },
        { label: "PASSPORT", value: "PASSPORT" },
        { label: "SSNIT", value: "SSNIT" },
        { label: "VOTER_ID", value: "VOTER_ID" },
        { label: "NEW_VOTER_ID", value: "NEW_VOTER_ID" },
        { label: "ALIEN_CARD", value: "ALIEN_CARD" },
        { label: "KRA_PIN", value: "KRA_PIN" },
        { label: "NATIONAL_ID", value: "NATIONAL_ID" },
        { label: "NATIONAL_ID_NO_PHOTO", value: "NATIONAL_ID_NO_PHOTO" },
        { label: "BVN", value: "BVN" },
        { label: "NIN_V2", value: "NIN_V2" },
        { label: "NIN_SLIP", value: "NIN_SLIP" },
        { label: "PHONE_NUMBER", value: "PHONE_NUMBER" },
    ]);

    const onDocumentOpen = useCallback(() => {
        // setGenderOpen(false);
    }, []);
    //   const { handleSubmit, control } = useForm();
    const onSubmit = (data) => {
        console.log(data, "data");
    };


    const pickImage = (type) => {
        let options = {
            title: 'Select Image',
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
        if (type == "selfie") {
            launchCamera({ options, includeBase64: true }, response => {
                if (response.assets == undefined) return
                setSelfieUri(response.assets[0].uri)
                setSelfie(response.assets[0].base64)

            })

        } else {
            Alert.alert("Select option", "", [
                {
                    text: "Use gallery",
                    onPress: () => launchImageLibrary({ options, includeBase64: true }, response => {
                        // console.log(response)
                        if (response.assets == undefined) return
                        //   this.setImage(first, response.assets[0].base64, Enum.ImageType.PRINTED)
                        if (type == "front") {
                            setFrontImageUri(response.assets[0].uri)
                            setFrontImage(response.assets[0].base64)
                        } else if (type == "back") {
                            setBackImageUri(response.assets[0].uri)
                            setBackImage(response.assets[0].base64)
                        }
                    })
                },

                {
                    text: "Use camera",
                    onPress: () => launchCamera({ options, includeBase64: true }, response => {
                        if (response.assets == undefined) return
                        //   this.setImage(first, response.assets[0].base64, Enum.ImageType.PRINTED)
                        if (type == "front") {
                            setFrontImageUri(response.assets[0].uri)
                            setFrontImage(response.assets[0].base64)
                        } else if (type == "back") {
                            setBackImageUri(response.assets[0].uri)
                            setBackImage(response.assets[0].base64)
                        }
                    })
                }


            ], { cancelable: true })
        }
    }

    const submit_kyc = async () => {
        if (selfieUri == "") {
            alert('Please attach selfie image')
        } else if (documentValue == null) {
            alert("Please select document")
        } else if (number == "") {
            alert("Please enter number")
        } else {
            setAnimating(true)
            let token = await AsyncStorage.getItem("logintokan")
            let url = "user_ekyc"
            let selfiebase64Data = "data:image/png;base64, " + selfie;
            let frontbase64Data = "data:image/png;base64, " + frontImage;
            let backbase64Data = "data:image/png;base64, " + backImage;


            let body = {
                "selfie_image": selfiebase64Data,
                "document_type": documentValue,
                "id_number": number
            }
            console.log(body)
            await fetch(mainUrl + 'accounts/user_ekyc/', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                method: 'POST',
                body: body
            })
                .then(res => (res.json()))
                .then(result => {
                    console.log("-----------", result)

                    if (result.status_code == 200) {
                        setAnimating(false)

                        navigation.navigate('BottomTab')
                        Toast.show({ type: "success", text1: result.message });
                    } else {
                        Toast.show({ type: "error", text1: result.message });
                        setAnimating(false)

                    }
                    // props.navigation.navigate('Profile')

                }
                )

            // let result = await postApiCall(url, body, token)
            // console.log(result)
            // alert(result.is_status)
            // setAnimating(false)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} >
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }} >
                        <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline"
                            style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />
                        <Text style={[{ color: currentTheme().text, fontWeight: 'bold', textAlign: 'center', fontSize: 16 }]}>E-KYC</Text>
                    </View>

                    <View style={{  height: screenHeight / 4 - 100, width: screenWidth - 40, margin: 20, flexDirection:'row',justifyContent:'space-between' }}>
                    <Text style={[{ color: currentTheme().text, fontWeight: 'bold', fontSize: 16,  marginTop:30 }]}>Selfie Image</Text>
                        
                        <TouchableOpacity onPress={() => { pickImage("selfie") }}>
                            <Image source={selfieUri == "" ? require('./../../assets/Maskgroup.png') : { uri: selfieUri }} style={{ alignSelf: 'center', height: 100, width: 100, borderRadius: 100 }} />
                        </TouchableOpacity>
                        {/* <Text style={{ alignSelf: 'center', color: currentTheme().text, fontSize: 20 }}>Click Selfie Image</Text> */}
                    </View>

                    {/* <View style={{ height: screenHeight / 3 - 100, width: screenWidth - 40, margin: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <View style={{ backgroundColor: currentTheme().placeholdercolor, margin: 10, padding: 10 }}>
                            <TouchableOpacity onPress={() => { pickImage("front") }}>
                                <Image source={frontImageUri == "" ? require('./../../assets/attachement.png') : { uri: frontImageUri }} style={{ alignSelf: 'center', height: 100, width: 100 }} />
                                <Text style={{ alignSelf: 'center', color: currentTheme().text, fontSize: 15, marginTop: 10 }}>Front Image</Text>

                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: currentTheme().placeholdercolor, margin: 10, marginLeft: 10, padding: 10 }}>
                            <TouchableOpacity onPress={() => { pickImage("back") }}>
                                <Image source={backImageUri == "" ? require('./../../assets/attachement.png') : { uri: backImageUri }} style={{ alignSelf: 'center', height: 100, width: 100 }} />
                                <Text style={{ alignSelf: 'center', color: currentTheme().text, fontSize: 15, marginTop: 10 }}>Back Image</Text>

                            </TouchableOpacity>
                        </View>
                    </View>    */}
                    <Text style={[{ color: currentTheme().text, fontWeight: 'bold', fontSize: 16, marginLeft: 20 }]}>Document Type</Text>

                    {/* <View style={{ marginHorizontal: 20, borderColor: currentTheme().btnbackground, marginTop: 10, flexDirection: 'row' }}>  */}
                            <DropDownPicker 
                                // nestedScrollEnabled={true}
                                style={styles.dropdown}
                                open={documentOpen}
                                value={documentValue} //documentValue
                                items={document}
                                setOpen={setDocumentOpen}
                                setValue={setDocumentValue}
                                setItems={setComapny}
                                placeholder="Select Document"
                                placeholderStyle={{ color: currentTheme().placeholdercolor }}
                                textStyle={{ color: currentTheme().placeholdercolor }}
                                activityIndicatorColor="red"
                                searchPlaceholder="Search your document here..."
                                onOpen={onDocumentOpen}
                                zIndex={1000}
                                zIndexInverse={3000}
                                dropDownContainerStyle={{
                                    marginHorizontal: 20, 
                                    width:screenWidth-40,
                                    // height:400,
                                    backgroundColor: currentTheme().background,
                                    borderColor: currentTheme().btnbackground
                                }} 
                            /> 
                    {/* </View> */}
                    <Text style={[{ color: currentTheme().text, fontWeight: 'bold', fontSize: 16, marginLeft: 20, marginTop: documentOpen ? document.length * 20 : 10 }]}>Document Number</Text>

                    <View style={{ marginHorizontal: 20, borderColor: currentTheme().btnbackground, borderWidth: 0.5, height: 45, borderRadius: 5, marginTop: 10, flexDirection: 'row' }}>
                        <View style={{ flex: 0.8, borderColor: currentTheme().text, justifyContent: 'center' }}>
                            <TextInput
                                onChangeText={(e) => setNumber(e)}
                                placeholder='Enter Number'
                                placeholderTextColor={currentTheme().placeholdercolor}
                                style={{ borderColor: currentTheme().text, height: 40, color: currentTheme().text, paddingLeft: 20 }}
                            />
                        </View>
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: 40 }}>
                        {
                            animating ?
                                <ActivityIndicator ></ActivityIndicator> :
                                <LargeButton label="Send Request" onPress={() => { submit_kyc() }} />
                        }
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdownDocument: {
        // marginHorizontal: 10,
       // marginBottom: 15,
    },
    dropdown: {
        marginHorizontal: 20, 
        height: 50, 
        width: screenWidth - 40,
        borderColor: currentTheme().btnbackground,
        justifyContent: 'center',
        backgroundColor: currentTheme().background, 
        marginTop:10,
        color: currentTheme().placeholdercolor
    }
})