import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';
import TextInputCommon from '../../component/TextInput/TextInputCommon';
import LargeButton from '../../component/Button/LargeButton';
import OtherButton from '../../component/Button/OtherButton';
import { screenWidth } from '../../constants/Sizes.constant';

export default function CategorySuccess(props) {
    return (
        <SafeAreaView>
            <View style={{ width: '100%', flexDirection: 'column', height: '100%', backgroundColor: currentTheme().cardColor }}>
                <View style={{ flex: 2, }}>
                    <View style={{ paddingHorizontal: 20, flex: 7 }}>
                        <Icon onPress={() => props.navigation.goBack()}
                            name="ios-arrow-back-outline"
                            style={{ marginTop: 10, width: 50, }}
                            size={30} color={currentTheme().text} />
                    </View>
                    <View style={{ flex: 3, margin: 20 }}>

                    </View>
                </View>

                <View style={{ flex: 1, backgroundColor: currentTheme().background, padding: 20, marginTop: 30, borderRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
                    <Image source={require("./../../assets/images/Successfulillustration.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', width: screenWidth / 1.6, textAlign: 'center' }}>Category Successfully
                        Created</Text>
                    <OtherButton label="Create Category"  onPress={()=>{props.navigation.navigate("FoodandGroceries")}}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})