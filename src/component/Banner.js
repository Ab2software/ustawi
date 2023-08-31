import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { screenWidth } from '../constants/Sizes.constant';
import { ColorsConstant } from '../constants/Colors.constant';
import { StyleConstants } from '../constants/Style.constant';
import { fontFamily } from '../constants/font';
import { CustomButton } from './CustomButton';

const SPACING = 3;
const ITEM_LENGTH = screenWidth * 1;
const CURRENT_ITEM_TRANSLATE_Y = 3;

const Banner = (props,{ data, autoPlay, timer }) => {

  const [countdown, setCountdown] = useState(0)
  const countdownRef = useRef();
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [manualScrolling, setManualScrolling] = useState(false);

  const changeIndex = (index) => setCountdown(index);

  useEffect(() => {
    countdownRef.current = setInterval(() => changeIndex(countdown < (data?.length - 1) ? countdown + 1 : 0), timer);
    if (autoPlay && !manualScrolling) {
      !!data?.length && flatListRef?.current?.scrollToIndex({ animated: true, index: countdown })
    }
    return () => clearInterval(countdownRef.current);
  }, [countdown, !!data?.length])

  const _renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_LENGTH,
      (index) * ITEM_LENGTH,
      (index + 1) * ITEM_LENGTH,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [
        CURRENT_ITEM_TRANSLATE_Y * 2,
        0,
        CURRENT_ITEM_TRANSLATE_Y * 2
      ],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View key={index} style={{
        borderRadius: 7, width: ITEM_LENGTH,
        overflow: 'hidden', transform: [{ translateY }]
      }}>
        <View style={{ marginTop: 100, paddingHorizontal: 16, alignItems: 'center' }} >
          <View style={{ alignItems: 'center', }}>
            <Image
              source={item.images} resizeMode='contain'
              style={{ height: 250, alignSelf: 'center', }}
            />
          </View>
          <View style={{ marginTop: 60, marginBottom: 20, alignItems: 'center' }}>
            <Text style={[s.textwelcome, { textAlign: 'center' }]}>{item.title}</Text>
          </View>

        </View>
        {
          index != "3" ?
            <View style={{ alignItems: 'center' }} >
              <CustomButton style={{ width: 50, height: 50, borderRadius: 25 }} imageType={"image"} />
            </View> :
            <TouchableOpacity onPress={() => props.navigation.navigate("Login", { backScreen: "Splash" })}  style={{ width: screenWidth - 32, flexDirection: 'row', alignItems: 'center', backgroundColor: c.unactive, padding: 5, borderRadius: 20 }} >
              <CustomButton 
                style={{ width: 40, height: 40, borderRadius: 25 }} imageType={"image"} />
              <Text style={styles.text} >Swipe to get started</Text>
            </TouchableOpacity>

        }
      </Animated.View>
    )
  }

  const _onScrollBeginDrag = () => {
    setManualScrolling(true);
    setTimeout(() => {
      setManualScrolling(false);
    }, timer);
  }
  const getItemLayout = (_data, index) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * index,
    index,
  });

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={data}
      horizontal
      pagingEnabled
      snapToAlignment='center'
      contentContainerStyle={{ paddingHorizontal: SPACING * 3 }}
      showsHorizontalScrollIndicator={false}
      decelerationRate={'fast'}
      getItemLayout={getItemLayout}

      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      onScrollBeginDrag={_onScrollBeginDrag}
      renderItem={_renderItem}
      keyExtractor={(_, index) => index.toString()}

    />
  );
}
const c = ColorsConstant, s = StyleConstants, styles = StyleSheet.create({

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    marginTop: 5
  },

  texttitle: {
    color: ColorsConstant.Theme,
    fontSize: 30,
    fontWeight: 'bold'
  },
  textwelcome: {
    color: ColorsConstant.textTheme,
    fontSize: 28,
    fontFamily: fontFamily.medium,
    textAlign: 'center'
  },
  text: {
    fontSize: 13,
    color: ColorsConstant.white,
    fontFamily: fontFamily.medium,
    marginLeft: 50,
    textAlign: 'center'
  },
})

export default Banner;