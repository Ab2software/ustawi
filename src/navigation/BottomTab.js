import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { ColorsConstant } from "../constants/Colors.constant";
import Home from "../screen/Home/home";
 
import { currentTheme } from "../constants/ThemeProvider";
import Chat from "../screen/Chat/chat";
import Setting from "../screen/Setting/setting";
import Categories from "../screen/Categories/Categories";
import Save from "../screen/Payment/Save";

function BottomTab() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false,
            tabBarStyle: { height: 70, backgroundColor: currentTheme().homebutton },
            tabBarActiveTintColor: currentTheme().btnbackground,
            tabBarInactiveTintColor:currentTheme().placeholdercolor
        }}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image source={require('../../assets/home.png')} style={focused ? styles.activeImages :styles.images} />
                        );
                    },
                }}
            />
            <Tab.Screen name="Budget" component={Categories}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image source={require('../../assets/money.png')} style={focused ? styles.activeImages :styles.images}  />
                        );
                    },
                }}
            />
             
            <Tab.Screen name="Setting" component={Setting}
                options={{
                    tabBarIcon: ({ size, focused, color }) => {
                        return (
                            <Image source={require('../../assets/setting.png')} style={focused ? styles.activeImages :styles.images}  />
                        );
                    },
                }} />


        </Tab.Navigator>
    )
}
const  styles = StyleSheet.create({
    images: {
        height: 25,
        width: 25,
        tintColor:currentTheme().placeholdercolor
    },
    activeImages: {
        height: 25,
        width: 25,
        tintColor:currentTheme().btnbackground
    }
})
export default BottomTab;