import React, { useEffect, useState, useRef } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, Animated, BackHandler, Alert, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

import { StyleConstants } from '../../constants/Style.constant';
import { fontFamily } from '../../constants/font';
import { BackgroundContainer } from '../../widget/BackgroundContainer';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { CustomButton } from '../../component/CustomButton';
import { currentTheme } from '../../constants/ThemeProvider';
import SwipeButton from 'rn-swipe-button';


function IntroSlider(props) {
    const [chbg, setChbg] = useState("0")
    const translation = useRef(
        new Animated.Value(0)
    ).current;


    const [currentIndex, setCurrentIndex] = useState(0)
    const [slider, setSlider] = useState([
        {
            id: 1, title: "Save money",
            images: require('../../assets/images/slide1.png'),
        },
        {
            id: 2, title: "Manage Your Finances Better",
            images: require('../../assets/images/slide2.png'),
        },
        {
            id: 3, title: "Make informed financial decisions",
            images: require('../../assets/images/slide3.png'),
        },
        {
            id: 4, title: "Join in building the future",
            images: require('../../assets/images/slide4.png'),
        }
    ])


    const onPressIn = () => {
        setChbg("1")
        Animated.spring(translation, {
            toValue: screenWidth - 100,
            useNativeDriver: true,
        }).start();
        console.log(translation)
        let i = 1;
        let intervalId = setInterval(() => {
            if (i == 1) {
                props.navigation.navigate("Login", { backScreen: "Splash" })
            }
            i = 2;
        }, 1000)
        return (() => {
            clearInterval(intervalId)
        })
        // Animated.spring(animation, {
        //   toValue: 1,
        //   useNativeDriver: true,
        // }).start();
    };
    const onPressOut = () => {
        setChbg("0")
        Animated.spring(translation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();

    };


    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to exit app?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        // getsliderData();
        return () => backHandler.remove();
    }, [])

    useEffect(() => {
        // let i = currentIndex;
        // let intervalId = setInterval(() => {
        //     if (slider.length > i) {
        //         scrollSlide(i)
        //         i = i + 1;
        //     } 
        // }, 2000)
        // return (() => {
        //     clearInterval(intervalId)
        // })
    }, [props])
    const _renderItem = ({ item }) => {
        return (
            <View style={{ marginTop: 100, paddingHorizontal: 16, alignItems: 'center' }} >
                <View style={{ alignItems: 'center', }}>
                    <Image
                        source={item.images} resizeMode='contain'
                        style={{ height: 220, alignSelf: 'center', }}
                    />
                </View>
                <View style={{ marginTop: 30, marginBottom: 20, alignItems: 'center', marginHorizontal: 50 }}>
                    <Text style={[s.textwelcome, { textAlign: 'center', color: '#fff' }]}>{item.title}</Text>
                </View>

            </View>
        );
    }
    const scrollSlide = (i) => {
        console.log(i)
        if (slider.length > currentIndex) {
            sliderRef.current.goToSlide(i, true)
            console.log("--++-", currentIndex)
            setCurrentIndex(i);
        } else {
            console.log("---", currentIndex)

        }
    }
    const nextrender = () => {
        return (
            <View style={{ width: screenWidth - 32, alignItems: 'center', marginBottom: 80, }} >
                <TouchableOpacity
                    onPress={() => { scrollSlide(currentIndex + 1) }}
                    style={{ marginBottom: 80, width: screenWidth - 32, alignItems: 'center', justifyContent: 'flex-end', flex: 1 }} >
                    <Image source={require("./../../assets/images/slider_btn.png")}
                        style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: currentTheme().btnbackground }} imageType={"image"} />
                </TouchableOpacity>
                {/* <CustomButton onPress={() => { scrollSlide(currentIndex + 1) }
                } style={{ width: 50, height: 50, borderRadius: 25, backgroundColor:currentTheme().btnbackground }} imageType={"image"} />  */}
            </View>
        )
    };

    const donereder = () => {

        return (

            <SwipeButton
                disabled={false}
                //disable the button by doing true (Optional)
                swipeSuccessThreshold={80}
                height={45}
                //height of the button (Optional)
                width={330}
                //width of the button (Optional)
                title="Swipe to get started"
                //Text inside the button (Optional)
                thumbIconImageSource={require('./../../assets/images/btn_next.png')}
                //You can also set your own icon for the button (Optional)
                onSwipeSuccess={() => {
                    onPressIn()
                }}
                onSwipeStart={()=>{
                    
                }}
                //After the completion of swipe (Optional)
                // railFillBackgroundColor="#FBC410" //(Optional)
                // railFillBorderColor="#FBC410" //(Optional)
                // thumbIconBackgroundColor="#FBC410" //(Optional)
                thumbIconBorderColor="#E82773" //(Optional)
                railBackgroundColor="#BBC2D1" //(Optional)
                railBorderColor="#FBC410" //(Optional)
            />



        )
    };
    // <TouchableOpacity
    //     onPressIn={onPressIn}
    //     onPressOut={onPressOut}
    //     style={{ height: 60, width: screenWidth - 32, flexDirection: 'row', alignItems: 'center', backgroundColor: currentTheme().placeholdercolor, padding: 5, borderRadius: 20 }} >
    {/* <Animated.View
                    style={[{
                        // width: screenWidth - 62,
                        flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 20,
                        transform: [{ translateX: translation }],
                    }]}
                >
                    <TouchableOpacity
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                        onPress={() => { scrollSlide(currentIndex + 1) }}
                        style={{ borderRadius: 50, height: 50, width: 50, backgroundColor: currentTheme().btnbackground, justifyContent: 'center' }}>
                        <Image source={require("./../../assets/next_btn.png")}
                            style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: currentTheme().btnbackground }} imageType={"image"} />
                    </TouchableOpacity>
                    
                    {chbg > 0 ?
                        <></>
                        :
                        <Text style={styles.text} >Swipe to get started</Text>
                    }
                </Animated.View> */}
    const sliderRef = useRef();
    return (
        <View style={{ backgroundColor: currentTheme().btnbackground, flex: 1 }}>
            {/* <BackgroundContainer type="splash" /> */}
            <AppIntroSlider
                dotStyle={{ backgroundColor: currentTheme().placeholdercolor, width: 20, height: 5, bottom: screenHeight / 5 }}
                activeDotStyle={{ width: 20, height: 5, backgroundColor: currentTheme().slideBtn, bottom: screenHeight / 5 }}
                renderItem={_renderItem}
                data={slider}
                style={{ flex: 1, }}
                renderNextButton={nextrender}
                renderDoneButton={donereder}
                showNextButton={true}
                ref={(ref) => (sliderRef.current = ref)}
                onSlideChange={(val) => {
                    setCurrentIndex(val)
                }}

            />

        </View>

    )
}
const s = StyleConstants, styles = StyleSheet.create({

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 16,
        marginTop: 5
    },

    texttitle: {
        color: currentTheme().Theme,
        fontSize: 30,
        fontWeight: 'bold'
    },
    textwelcome: {
        color: currentTheme().textTheme,
        fontSize: 28,
        fontFamily: fontFamily.medium,
        textAlign: 'center'
    },
    text: {
        fontSize: 15,
        color: currentTheme().btnbackground,
        fontFamily: fontFamily.medium,
        marginLeft: 50,
        textAlign: 'center'
    },
})


export default IntroSlider;