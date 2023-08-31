// import React from 'react'
// import { StyleSheet, ActivityIndicator, TouchableOpacity, View, Image, GestureResponderEvent } from 'react-native'
// import { Appbar } from 'react-native-paper';
// import { ColorsConstant } from '../constants/Colors.constant';
// import Images from '../constants/image';
// import { screenWidth } from '../constants/Sizes.constant';
// import { StyleConstants } from '../constants/Style.constant';
// import { fontFamily } from '../constants/font';

// interface HeaderProps {
//     animating?: boolean;
//     renderBackButton?: boolean;
//     renderAppLogo?: boolean;
//     renderBellIcon?: boolean;
//     renderTitle?: boolean;
//     headerCenter?: boolean;
//     navonPress?: ((event: GestureResponderEvent) => void) | undefined;
//     title?: React.ReactNode & string;
//     onPress?: ((event: GestureResponderEvent) => void) | undefined;
// }

// const Header = ({
//     animating,
//     renderBackButton,
//     renderAppLogo,
//     renderBellIcon,
//     renderTitle,
//     headerCenter,
//     navonPress,
//     title = '',
//     onPress,
// }: HeaderProps) => {

//     return (
//         <Appbar.Header style={{ backgroundColor: 'transparent', alignItems: 'center', position: 'relative', height: 50 }}>
//             {
//                 renderBackButton &&
//                 <Appbar.Action
//                     animated={false}
//                     style={{
//                         width: 40,
//                         height: 40,
//                         alignItems: 'center'
//                     }}
//                     icon={() =>
//                         <TouchableOpacity style={ls.leftButton}  onPress={onPress} >
//                             <Image source={Images['left']} style={ls.leftButtonIcon} />
//                         </TouchableOpacity>
//                     }
//                 />
//             }
//             {renderAppLogo && <Appbar.Action
//                 animated={false}
//                 style={{
//                     flex: 1,
//                     alignItems: 'flex-start'
//                 }}
//                 icon={() =>
//                     <Image style={{ width: 100, height: 40 }} resizeMode='contain' source={Images['app_logo']} />
//                 }
//             />}

//             {renderTitle &&
//                 <Appbar.Content
//                     style={headerCenter ? { width: screenWidth-32, alignItems: 'center', } : { alignItems:'center' }}
//                     titleStyle={{ fontSize: 16, marginLeft: 0,color:'#2ba8ff',fontFamily:fontFamily.medium }}
//                     title={title}
//                 />
//             }
//             {renderBellIcon &&
//                 <TouchableOpacity style={s.TouchaView} onPress={navonPress}>
//                     <Image source={require('../assets/Image/Genealog.png')} style={{ height: 20, width: 20, tintColor: c.white }} />
//                 </TouchableOpacity>
//             }

//             {animating &&
//                 <View style={ls.activityIndicator}>
//                     <ActivityIndicator
//                         animating={animating}
//                         color={ColorsConstant.btnColor}
//                         size="small"
//                         style={{ backgroundColor: ColorsConstant.white, width: 40, height: 40, borderRadius: 8 }}
//                     />
//                 </View>
//             }
//         </Appbar.Header>
//     )
// }

// const s = StyleConstants, c = ColorsConstant, ls = StyleSheet.create({
//     activityIndicator: {
//         backgroundColor: ColorsConstant.lightBlack,
//         alignItems: 'center',
//         justifyContent: "center",
//         position: 'absolute',
//         zIndex: 9999,
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
//     leftButton: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 40,
//         height: 40
//     },
//     leftButtonIcon: {
//         width: 20,
//         height: 20,
//         tintColor:c.white
//     }
// })

// export default Header;



import React, { useEffect } from 'react'
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity, View, BackHandler, Alert, Image, StatusBar } from 'react-native'
import { Appbar } from 'react-native-paper';
import { ColorsConstant } from '../constants/Colors.constant';
import { screenWidth } from '../constants/Sizes.constant';
import Images from '../constants/image';
import { fontFamily } from '../constants/font';

export default function Header(props) {
    const { refresh, animating,marginLeft,setAnimating } = props
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", _goBack);
        return (() => {
            BackHandler.removeEventListener("hardwareBackPress", _goBack)
        })
    }, [refresh])

    const _goBack = () => {
        if (typeof props.leftButtonAction === "undefined") {
            Alert.alert("Hold on!", "Are you sure you want to exit the app?",
                [{
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
                ])
            return true
        } else {
            props.leftButtonAction()
            return true
        }
    }
    return (<>
        <Appbar.Header style={{ backgroundColor: 'transparent', position: 'relative', zIndex: 1, height: 40 }}>
            {
                props.leftButttonType !== 'noIcon' ?
                <Appbar.Action animated={false} style={{ width: typeof props.leftButtonType == 'undefined' ? 250 : 60, height: typeof props.leftButtonType == 'undefined' ? 60 : 40, borderRadius: 4, backgroundColor: props.buttonBackColor, alignItems: 'center' }} icon={() =>
                        props.leftButtonType === 'back' ?
                            <TouchableOpacity style={[ls.leftButton, { flexDirection: 'row', alignItems: 'center', }]} onPress={_goBack}>
                                <Image source={Images['left']} style={ls.leftButtonIcon} />
                            </TouchableOpacity>
                            :
                            props.leftButtonTemplate}
                    /> : <Text></Text>
            }
            <Appbar.Content style={props.headerCenter ? { width: screenWidth, } : { alignItems: 'center', marginLeft: marginLeft }}
                titleStyle={{ fontSize: 18, marginLeft: 0, color: '#2ba8ff', fontFamily: fontFamily.medium, }}
                title={props.title} />
            {
                props.rightButttonType === 'refresh' && props.rightButtonAction !== 'undefined' ?
                    <View >
                        {props.rightButtonAction}

                    </View> : <Text></Text>
            }
        </Appbar.Header>
        {animating &&
            <View style={[ls.activityIndicator]}>
                <View style={ls.rowViews}>
                    <ActivityIndicator
                        animating={true}
                        color="red"
                        size='small'
                    />

                </View>
            </View>
        }
    </>)
}
const c = ColorsConstant, ls = StyleSheet.create({
    activityIndicator: {
        backgroundColor: ColorsConstant.darkLight,
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        zIndex: 9999,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    leftButton: {
        width: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'red'
    },
    leftButtonIcon: {
        width: 25,
        height: 25,
    },
    rowViews: {
        backgroundColor: ColorsConstant.white,
        padding: 10,
        borderRadius: 5
    },


})