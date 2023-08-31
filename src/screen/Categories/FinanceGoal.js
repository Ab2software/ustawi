import { StyleSheet, Text, View, Image, ImageBackground ,SafeAreaView,FlatList} from 'react-native'
import React, { useState } from 'react'
 
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';
 
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { CustomButton } from '../../component/CustomButton';
import LargeButton from '../../component/Button/LargeButton';

export default function FinanceGoal(props) {
    const [category, setCategory] = useState([
        {
            "icon": require('./../../assets/foodandgrocires.png'),
            "name": "Food & Groceries",
            "status": ""
        },
        {
            "icon": require('./../../assets/transportation.png'),
            "name": "Transportation",
            "status": ""
        }, {
            "icon": require('./../../assets/utilities.png'),
            "name": "Utilities",
            "status": "new"
        }, {
            "icon": require('./../../assets/rent.png'),
            "name": "Rent",
            "status": ""
        }, {
            "icon": require('./../../assets/sherehe.png'),
            "name": "Sherehe",
            "status": ""
        }, {
            "icon": require('./../../assets/heart.png'),
            "name": "Health & Fitness",
            "status": "new"
        }, {
            "icon": require('./../../assets/education.png'),
            "name": "Education",
            "status": ""
        },
        {
            "icon": require('./../../assets/saving.png'),
            "name": "Savings",
            "status": ""
        }, {
            "icon": require('./../../assets/more.png'),
            "name": "Other",
            "status": ""
        }
    ])
    const _render_item = ({ item, index }) => {
        console.log(item)
        return (
            <View style={{ marginLeft: 5, marginTop: 20, width: screenWidth / 5, height: screenWidth / 4, alignContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 10, marginLeft: 5, marginTop: -5, width: screenWidth / 5.6, backgroundColor: currentTheme().homebutton, borderRadius: 5 }}>
                    {item.status == 'new' &&
                        <ImageBackground source={require('./../../assets/images/base.png')} style={{ marginTop: -5, backgroundColor: currentTheme().btnbackground, padding: 1, width: screenWidth / 10, alignSelf: 'flex-end' }}>
                            <Text style={{ color: currentTheme().background, fontSize: 10, alignSelf: 'center' }}>New</Text>
                        </ImageBackground>
                    }
                    <Image source={item.icon} style={{ height: 20, width: 20, alignSelf: 'center', margin: 20, tintColor: currentTheme().primary }} />
                </View>

                <Text style={{ color: currentTheme().text, fontSize: 12 }}>{item.name}</Text>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ backgroundColor: currentTheme().homebutton, flex: 1 }}>
            <View style={{ padding: 10, flex: 4 }}>
                <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50, }} size={30} color={currentTheme().text} />
                <Text style={[styles.textstyle, { color: currentTheme().text, fontWeight: 'bold', marginTop: 10, fontSize: 20 }]}>Setup Financial Goal</Text>
            </View>
            <View style={{ paddingBottom: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: currentTheme().background, height: screenHeight / 2 - 20, flex: 6, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={category}
                    renderItem={_render_item}
                    numColumns={4} 
                >
                </FlatList>
                <LargeButton label="Confirm" onPress={() => { props.navigation.navigate("FinanceGoalTerm") }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})