import { Alert, BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { CustomButton } from '../../component/CustomButton';
import { currentTheme } from '../../constants/ThemeProvider';
import { screenWidth } from '../../constants/Sizes.constant';

export default function Onboarding(props) {

 

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
        <View style={{ backgroundColor: currentTheme().background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: screenWidth - 32,flex:5,justifyContent: 'center', alignItems: 'center'}} >
            <Image source={ currentTheme().themeMode == "light"? require('./../../assets/images/lightlogo.png') : require('./../../assets/images/logo.png')} style={{ height: 130, width: screenWidth - 30, resizeMode: 'stretch' }} />
            </View>
            <TouchableOpacity 
            onPress={() => {   props.navigation.navigate('IntroSlider') }}
             style={{marginBottom:50,width: screenWidth - 32, alignItems: 'center' ,justifyContent:'flex-end',flex:1}} >
                <Image source={require("./../../assets/next_btn.png")} 
                 style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: currentTheme().btnbackground}} imageType={"image"} />
            </TouchableOpacity>
        </View>
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

