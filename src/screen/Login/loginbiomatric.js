
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
    BackHandler
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';

const LoginBiomatric = ({ navigation }) => {
    const { colors } = useTheme();
    const [tbnShow, setBtnShow] = useState(false)
    const rnBiometrics = new ReactNativeBiometrics()
    // const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

    useEffect(() => {
        finglogin() 
    }, [])

    const finglogin = async () => {
        rnBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then(async (resultObject) => {
                const { success } = resultObject

                if (success) {
                    console.log('successful biometrics provided')
                    navigation.navigate('BottomTab')
                    // navigation.navigate("Createpin")
                    //    let token= await AsyncStorage.getItem("logintokan")
                    //    navigation.navigate('LoginSecurity',{tokann:token})

                } else {
                    setBtnShow(true)
                    console.log('user cancelled biometric prompt')
                }
            })
            .catch(() => {
                console.log('biometrics failed')
            })
    }

    const skip = async () => {
        let token = await AsyncStorage.getItem("logintokan")
        navigation.navigate('LoginSecurity', { tokann: token })
    }
    // useEffect(() => {
    //     BackHandler.addEventListener("hardwareBackPress",()=>{
    //       BackHandler.exitApp();
    //     });
    //   }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
            <StatusBar hidden />
            <View style={{ marginHorizontal: 10, paddingHorizontal: 16, flex:1 }}>
                <Icon onPress={() => navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />

                <View style={{ flex: 1 }}>
                    <View style={{ flex: 0.5, marginTop: 20 }}>
                        <Text style={{ color: currentTheme().text, fontSize: 26, fontWeight: 'bold' }}>Enable  Biometrics</Text>
                        <Text style={{ color: currentTheme().text, marginTop: 10 }}>Login with fingerprint</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./../../assets/Frame.png')} style={{ height: 200, width: 200, alignSelf: 'center' }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <LargeButton label="Enable" onPress={() => { finglogin() }} />
                        {tbnShow &&
                            <TouchableOpacity onPress={() => skip()} style={{ height: 43, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 30, marginHorizontal: 50, borderColor: currentTheme().text }}>
                                <Text style={{ color: currentTheme().text, fontWeight: 'bold', fontSize: 16 }}>Skip</Text>
                            </TouchableOpacity>
                        }
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

export default LoginBiomatric;


