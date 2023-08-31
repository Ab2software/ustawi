import { StyleSheet, Image, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, TextBase, TextInput, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
// import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
  } from 'react-native-reanimated';
import SwipeButton from 'rn-swipe-button';
import Slider from 'react-native-custom-slider';
import Toast from 'react-native-toast-message';
 
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_WIDTH = SCREEN_WIDTH - 48;
const BUTTON_HEIGHT = 100;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = 100 - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

export default function Save(props) {


    const sharedValue = 0;

  const [toggled, setToggled] = useState(false);
  const InterpolateXInput = [0, H_SWIPE_RANGE];
    const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  };
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
        ctx.completed = toggled;
      },
    onActive: (e, ctx) => {
        let newValue;
        if (ctx.completed) {
          newValue = H_SWIPE_RANGE + e.translationX;
        } else {
          newValue = e.translationX;
        }
  
        if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
          sharedValue.value = newValue;
        }
    },
    onEnd: () => {
      if (
        sharedValue.value <
        BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2 - 2 * BUTTON_PADDING
      ) {
        sharedValue.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        sharedValue.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    },
  });
  
    // colors is from the version one use interpolatecolors
  const animatedStylesSwipe = useAnimatedStyle(() => ({
    transform: [{translateX: sharedValue.value}],
    backgroundColor: interpolateColor(
        sharedValue.value,
        InterpolateXInput,
        ['#1b9aaa', '#fff'],
      ),
  }));




    const [customCheck, setCustomCheck] = useState(false)
    const [period, setPeriod] = useState("Months")
    const [amount, setAmount] = useState("500")
    const [check, setCheck] = useState(false)
    const [value, setValue] = useState(0);
    // const animatedGestureHandler = useAnimatedGestureHandler({
    //     onActive: (e) => {
    //       const newValue = e.translationX;

    //       if (newValue >= 0 && newValue <= SWIPE_RANGE) {
    //         X.value = newValue;
    //       }
    //     },
    //     onEnd: () => {
    //       if (X.value < SWIPE_RANGE - 20) {
    //         X.value = withSpring(0);
    //       } else {
    //         runOnJS(onSwipe)();
    //       }
    //     },
    //   });




    const translation = useRef(
        new Animated.Value(0)
    ).current;

    const onPressIn = () => {

        Animated.spring(translation, {
            toValue: screenWidth - 100,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {

        Animated.spring(translation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();

    };

    const confirm_btn=()=>{

        if(!check){
            Toast.show({ type: 'error', text1: "Please check mark terms and conditions applied" });
        }else{
            props.navigation.navigate("PaymentMethod", { amount: amount, period: period })
        }
    } 

    return (
        <SafeAreaView style={{ backgroundColor: currentTheme().background }}>
            <ScrollView >
                <View style={{ height: screenHeight, width: screenWidth, backgroundColor: currentTheme().background }}>
                    <Icon onPress={() => props.navigation.goBack()}
                        name="ios-arrow-back-outline"
                        style={{ marginTop: 10, marginLeft: 20, width: 50, }}
                        size={30} color={currentTheme().text} />

                    <View style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth, alignItems: 'center' }}>
                        <Text style={{ color: currentTheme().text, fontSize: 20, marginTop: 30, fontWeight: '700' }}>I WOULD LIKE TO SAVE</Text>
                        <View style={{ padding: 20, width: screenWidth - 40, backgroundColor: currentTheme().primary, borderRadius: 10, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ color: currentTheme().background, fontSize: 20, }}> Deposit Amount</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: currentTheme().background, fontSize: 40, fontWeight: 'bold', marginTop: 10 }}> KSH </Text>
                                {customCheck ?
                                    <TextInput
                                        keyboardType='number-pad'
                                        value={amount}
                                        maxLength={9}
                                        onChangeText={(e) => { setAmount(e) }}
                                        style={{ color: currentTheme().background, fontSize: 40, fontWeight: 'bold' }}
                                    />

                                    :

                                    <Text style={{ color: currentTheme().background, fontSize: 40, fontWeight: 'bold', marginTop: 10 }}>{amount}</Text>
                                }
                            </View>

                        </View>

                        {/* <View style={styles.swipeButtonContainer}>
                            <PanGestureHandler enabled={!isLoading} onGestureEvent={animatedGestureHandler}>
                                <Animated.View style={[styles.swipeButton, AnimatedStyles.swipeButton]}>
                                    {isLoading ? <ActivityIndicator color={'#fff'} /> : <Image style={styles.chevron} source={Chevron} />}
                                </Animated.View>
                            </PanGestureHandler>
                            <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
                                Swipe me for some action
                            </Animated.Text>
                        </View> */}
                       <View style={styles.containerStyle}>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View
          style={[styles.swipeableCircle, animatedStylesSwipe]}></Animated.View>
      </PanGestureHandler>
    </View>
                        {/* <TouchableOpacity
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            style={{ height: 60, width: screenWidth - 40, marginTop: 30, flexDirection: 'row', alignItems: 'center', borderRadius: 20 }} >
                            <ImageBackground
                                source={require('./../../assets/images/base.png')}
                                style={{ width: screenWidth - 40 }}
                                resizeMode={'stretch'}

                            >
                                <Animated.View
                                    style={[{
                                        flexDirection: 'row', alignItems: 'center', padding: 5, borderRadius: 20,
                                        transform: [{ translateX: translation }],
                                    }]}
                                >
                                    <TouchableOpacity
                                        onPressIn={onPressIn}
                                        onPressOut={onPressOut}
                                        onPress={() => { }}
                                        style={{ borderRadius: 50, height: 50, width: 50, backgroundColor: currentTheme().btnbackground, justifyContent: 'center' }}>
                                        <Image source={require("./../../assets/next_btn.png")}
                                            style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: currentTheme().btnbackground }} imageType={"image"} />
                                    </TouchableOpacity>
                                    <Text style={{ color: '#fff', marginLeft: 50, fontWeight: 'bold', fontSize: 18 }} >Swipe to Increase</Text>

                                </Animated.View>
                            </ImageBackground>
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={() => {
                            setCustomCheck(!customCheck)
                        }} style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                            {customCheck ?
                                <Image
                                    source={require('../../assets/images/nextmore.png')}
                                    style={{ height: 20, width: 20, alignSelf: 'center', tintColor: currentTheme().primary }}
                                />
                                :

                                <Image
                                    source={require('../../assets/images/uncheckVector.png')}
                                    style={{ height: 20, width: 20, alignSelf: 'center', tintColor: currentTheme().primary }}
                                />
                            }
                            <Text style={{ color: currentTheme().primary, marginLeft: 10, fontSize: 20 }}>Custom</Text>
                        </TouchableOpacity>

                        <Text style={{ color: currentTheme().primary, marginLeft: 10, fontSize: 20, marginTop: 20 }}>How atom would you like to pay?</Text>


                        <TouchableOpacity onPress={() => { setPeriod("Weekly") }}
                            style={{ borderColor: currentTheme().placeholdercolor, borderRadius: 10, borderStyle: 'solid', borderWidth: 2, flexDirection: 'row', marginTop: 30, width: screenWidth - 40, justifyContent: 'center', padding: 10 }}
                        >
                            <Image
                                source={period == "Weekly" ? require('../../assets/images/check.png') : require('../../assets/images/uncheck.png')}
                                style={{ height: 20, width: 20, alignSelf: 'center', tintColor: currentTheme().primary }}
                            />
                            <Text style={{ color: currentTheme().primary, marginLeft: 10, fontSize: 20, alignSelf: 'center' }}>Weekly</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { setPeriod("Months") }}
                            style={{ borderColor: currentTheme().placeholdercolor, borderRadius: 10, borderStyle: 'solid', borderWidth: 2, flexDirection: 'row', marginTop: 30, width: screenWidth - 40, justifyContent: 'center', padding: 10 }}
                        >
                            <Image
                                source={period == "Months" ? require('../../assets/images/check.png') : require('../../assets/images/uncheck.png')}

                                style={{ height: 20, width: 20, alignSelf: 'center', tintColor: currentTheme().primary }}
                            />
                            <Text style={{ color: currentTheme().primary, marginLeft: 10, fontSize: 20, alignSelf: 'center' }}>Monthly</Text>
                        </TouchableOpacity>





                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => { setCheck(!check) }}>
                            {check ?

                                <Image
                                    source={require('../../assets/images/check.png')}
                                    style={{ height: 20, width: 20, tintColor: currentTheme().primary }}
                                />
                                :
                                <Image
                                    source={require('../../assets/images/uncheckVector.png')}
                                    style={{ height: 20, width: 20, tintColor: currentTheme().primary }}
                                />
                            }
                        </TouchableOpacity>
                        <Text style={{ color: currentTheme().text, marginLeft: 10, fontSize: 16 }}>I agree to the<Text style={{ color: currentTheme().primary, marginLeft: 10, fontSize: 16 }}> Terms and Conditions applied. </Text></Text>
                    </View>

                    <View style={{ width: screenWidth, alignItems: 'center', marginTop: 20 }}>
                        <LargeButton
                            label={"Confirm"}
                            backgroundColor={currentTheme().primary}
                            onPress={() => { confirm_btn() }}
                        />
                    </View>
                </View>


            </ScrollView>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },
      swipeableCircle: {
        height: SWIPEABLE_DIMENSIONS,
        width: SWIPEABLE_DIMENSIONS,
        backgroundColor: 'red',
        borderRadius: 100,
        position: 'absolute',
        zIndex: 3,
        left: BUTTON_PADDING,
      },
})