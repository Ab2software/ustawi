import { StyleSheet, Text, SafeAreaView, Image, View, Touchable, Alert } from 'react-native'
import React from 'react'
import LargeButton from '../../component/Button/LargeButton'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant'
import { currentTheme } from '../../constants/ThemeProvider'
import Icon from 'react-native-vector-icons/Ionicons';
import TextInputCommon from '../../component/TextInput/TextInputCommon';
import { TouchableOpacity } from 'react-native-gesture-handler'
export default function RetakeSelefie(props) {
    const {response} =props.route.params
    return (
        <SafeAreaView>
            <View style={{ height: screenHeight, width: screenWidth, backgroundColor: currentTheme().background }}>
                <Icon onPress={() => props.navigation.goBack()}
                    name="ios-arrow-back-outline"
                    style={{ marginTop: 10, width: 50, }}
                    size={30} color={currentTheme().text} />
                <Text style={{color: currentTheme().text, alignSelf: 'center', marginTop: 20, fontSize: 20 }}>
                    KYC VERIFICATION
                </Text>
                <Text style={{color: currentTheme().text, alignSelf: 'center', marginTop: 15, fontSize: 15 }}>
                    REVIEW SELFIE
                </Text>
                <View
                    style={{ height: 190, width: 160, borderColor: currentTheme().btnbackground, borderWidth: 1, alignSelf: 'center', borderRadius: 100, marginTop: 30 }}
                    onPress={() => { pickImage() }}>

                   
                        <Image
                            style={{ height: 190, width: 160, alignSelf: 'center', borderRadius: 1500, }}
                            source={{ uri: response.assets[0].uri }}
                       />
                  
                </View>
                <Text style={{color: currentTheme().text, alignSelf: 'center', marginTop: 20, fontSize: 20 }}>
                    is this clear enough?</Text>




                <Text style={{ alignSelf: 'center', marginTop: 30, fontSize: 10 ,color: currentTheme().text,}}>make sure your face is clear enough
                </Text>
                <Text style={{ alignSelf: 'center', marginTop: 10, fontSize: 10 ,color: currentTheme().text,}}>& the photo is not blurry.</Text> 
                <View style={{ width: screenWidth, alignItems: 'center', marginTop: 30 }}>
                    <LargeButton 
                    onPress={()=>{
                        props.navigation.navigate("Continue",{response:response})

                    }}
                    label="YES,LETS USE THIS" backgroundColor={currentTheme().btnbackground1}/></View>

                <View style={{ width: screenWidth, alignItems: 'center', marginTop: 30 }}>
                    <LargeButton 
                 onPress={()=>props.navigation.goBack()}  
                    
                    label="RETAKE SELFIE" />
                </View>

            </View>
        </SafeAreaView>




    )
}


const styles = StyleSheet.create({})