import { StyleSheet, Text, SafeAreaView, Image, View, TextInput } from 'react-native'

import React, { useCallback, useEffect, useState } from 'react'
import LargeButton from '../../component/Button/LargeButton'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant'
import { currentTheme } from '../../constants/ThemeProvider'
import Icon from 'react-native-vector-icons/Ionicons';
import Dropdown from '../../component/Dropdown/Dropdown';
import TextInputCommon from '../../component/TextInput/TextInputCommon';
import { ScrollView } from 'react-native-gesture-handler'
import { base, mainUrl } from '../../constants/Data.constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropDownPicker from 'react-native-dropdown-picker'
import Toast from "react-native-toast-message";
import { getApiCall } from '../../services/appSetting'


export default function Continue(props) {
    const { response} = props.route.params

    const [documentOpen, setDocumentOpen] = useState(false);
    const [documentValue, setDocumentValue] = useState(null);
    const [number, setNumber] = useState("")

    const [document, setDocument] = useState([]);

    const [animating, setAnimating] = useState(false)

    useEffect(()=>{
       const getDocumentList=async()=>{
           let token = await AsyncStorage.getItem("token")
          let result = await getApiCall("kyc_document_list/",token);
          console.log(result,"111111111111111111111111111111111")
          if(result.status_code == "200"){
              let arr=[]
                result.data.map((item,index)=>{
                    arr.push({ label: item, value: item })
                })
                setDocument(arr)
          }else{

          }
       }
       getDocumentList()
    },[])
    const onDocumentOpen = useCallback(() => {
        // setGenderOpen(false);
    }, []);
    //   const { handleSubmit, control } = useForm();
    const onSubmit = (data) => {
        console.log(data, "data");
    };

    const submit_kyc = async () => {
        if (documentValue == null) {
            alert("Please select document")
        } else if (number == "") {
            alert("Please enter number")
        } else {
            setAnimating(true)
            let token = await AsyncStorage.getItem("logintokan")
            console.log(token)
            // let img = await AsyncStorage.getItem("documentImg")
            let body1 = JSON.stringify({
                "selfie_image": 'data:image/png;base64,'+response.assets[0].base64,
                "document_type": documentValue,
                "id_number": number,

            })
            // console.log(body1)
            await fetch(mainUrl + 'accounts/user_ekyc/', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                method: 'POST',
                body: body1
            })
                .then(res => (res.json()))
                .then(result => {
                    console.log("-----------", JSON.stringify(result) + "0000000000000")

                    try {
                        

                        if (result.status_code == 200) {
                            setAnimating(false)
                            props.navigation.navigate('Profile')
                            Toast.show({ type: "success", text1: result.message });
                        } else {
                            Toast.show({ type: "error", text1: result.message });
                            setAnimating(false)

                        }
                        // 

                    }
                    catch (e) {
                        setAnimating(false) 
                        props.navigation.navigate('Profile')

                        //  Toast.show({ type: "error", text1: e.message });

                    }

                })
            // let result = await postApiCall(url, body, token)
            // console.log(result)
            // alert(result.is_status)
            // setAnimating(false)
        }
    }
    return (
        <SafeAreaView>
            <View showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={{ height: screenHeight, width: screenWidth, backgroundColor: currentTheme().background }}>
                    <Icon onPress={() => props.navigation.goBack()}
                        name="ios-arrow-back-outline"
                        style={{ marginTop: 10, width: 50, }}
                        size={30} color={currentTheme().cardcolor} />
                    <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20, color: currentTheme().text, fontWeight: 'bold' }}>
                        KYC VERIFICATION
                    </Text>

                    <View style={{ height: 130, width: 170, alignSelf: 'center', borderRadius: 20, marginTop: 30, }}>
                        <Image source={
                            require("./../../assets/images/card.png")
                            // {uri:response.assets[0].base64}
                            } style={{ height: 130, width: 170, }} />

                    </View>

                    <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 20, color: currentTheme().text, }}>DOCUMENT TYPE:</Text>
                    {/* <Dropdown //drop 
                        nestedScrollEnabled={true}
                        label={"Select Document"}
                        placeholder="Enter value"
                        list={source}
                        setList={setSource}
                        setOpen={setOpenSource}
                        open={openSource}
                        value={documentValue}
                        setValue={setDocumentValue}

                    /> */}
                    <DropDownPicker
                        // nestedScrollEnabled={true}
                        style={styles.dropdown}
                        open={documentOpen}
                        value={documentValue} //documentValue
                        items={document}
                        setOpen={setDocumentOpen}
                        setValue={setDocumentValue}
                        setItems={setDocument}
                        placeholder="Select Document"
                        placeholderStyle={{ color: currentTheme().placeholdercolor }}
                        textStyle={{ color: currentTheme().text }}
                        activityIndicatorColor="red"
                        searchPlaceholder="Search your document here..."
                        onOpen={onDocumentOpen}
                        zIndex={1000}
                        zIndexInverse={3000}
                        dropDownContainerStyle={{
                            marginHorizontal: 10,
                            width: screenWidth - 20,
                            backgroundColor: currentTheme().background,
                            borderColor: currentTheme().btnbackground
                        }}
                    />
                    <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 20, color: currentTheme().text, }}>DOCUMENT NAME:</Text>
                    <TextInput
                        style={{ width: screenWidth - 20, height: 50, alignSelf: 'center', marginTop: 10, borderRadius: 10, borderWidth: 1, color: currentTheme().text, }}
                        placeholder="123453212"
                        defaultValue={number.toString()}
                        onChangeText={(e) => {
                            setNumber(e)
                        }}

                    >
                    </TextInput>
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <LargeButton loader={animating} label="Continue" onPress={() => { submit_kyc() }} backgroundColor={currentTheme().btnbackground1} />
                    </View>
                </View>
            </View>
        </SafeAreaView>



    )
}

const styles = StyleSheet.create({
    dropdownDocument: {
        // marginHorizontal: 10,
        // marginBottom: 15,
    },
    dropdown: {
        marginHorizontal: 10,
        height: 50,
        width: screenWidth - 20,
        borderColor: currentTheme().btnbackground,
        justifyContent: 'center',
        backgroundColor: currentTheme().background,
        marginTop: 10,
        color: currentTheme().placeholdercolor
    }
})