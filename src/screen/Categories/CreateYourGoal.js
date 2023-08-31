import { StyleSheet, Text, View, SafeAreaView, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import { currentTheme } from '../../constants/ThemeProvider'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { ScrollView } from 'react-native-gesture-handler';
import LargeButton from '../../component/Button/LargeButton';
import LargeOutLineButton from '../../component/Button/LargeOutLineButton';
import { StyleConstants } from '../../constants/Style.constant';
import Divider from '../../widget/Divider';

export default function CreateYourGoal(props) {
    const [modelVisiable, setModelVisiable] = useState(false)
    const [selectGoal, setSelectGoal] = useState(0)


    const select_val=(val)=>{
        setSelectGoal(val)
    }
    return (
        <SafeAreaView style={styles.mainArea}>
            <ScrollView style={styles.mainArea} scrollIndicatorInsets={false}>
                <View style={styles.container}>
                    <View style={{ padding: 10, }}>
                        <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50, }} size={30} color={currentTheme().text} />
                        <Text style={{color:currentTheme().text,fontSize:20,}}>Goals</Text>
                    </View>
                    <View style={styles.imagesContainer}>
                        <Image style={{ height: screenWidth / 2, width: screenWidth / 2, alignSelf: 'center', marginTop: 70, }} source={require('./../../assets/goal.png')}></Image>
                    </View>
                    <View style={{ paddingVertical: 40, height: screenHeight / 2 - 100, justifyContent: 'center', alignItems: 'center', backgroundColor: currentTheme().background,borderTopLeftRadius:20 ,borderTopRightRadius:20 }}>
                        <LargeButton label="CREATE YOUR GOALS" ></LargeButton>
                        <View style={{marginTop:20}}>
                        <LargeOutLineButton label="SELECT A GOALS" onPress={() => { setModelVisiable(true) }}></LargeOutLineButton>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <Modal
                visible={modelVisiable}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    setModelVisiable(!modelVisiable);
                }}
            >
                <View
                    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                >
                    <TouchableOpacity
                        onPress={() => setModelVisiable(!modelVisiable)}
                        style={StyleConstants.modallhar}
                    >

                    </TouchableOpacity>
                    <View
                        style={[
                            StyleConstants.modalView,
                            {
                                height: screenHeight / 2.5,
                                marginTop: screenHeight / 2,
                                borderWidth: 2,
                                backgroundColor:currentTheme().background

                            },
                        ]}
                    >
                        <View style={styles.heder}>
                            <Text style={styles.text}>
                                Select a specific goal
                            </Text>
                            <Icon onPress={() => setModelVisiable(false)} name="ios-close-outline" style={{ width: 50, }} size={30} color={currentTheme().text} />
                        </View>
                        <Divider />
                        <ScrollView>
                        <TouchableOpacity onPress={() => { select_val(0)}}
                            style={[styles.selectBox,{marginTop:10}]}
                        >
                          <Image style={styles.img} source={selectGoal == 0 ? require('./../../assets/fill.png'): require('./../../assets/unfill.png')} />
                          <Text style={{color:currentTheme().text,marginLeft:20,fontSize:20}}>Buying a car</Text>
                       
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {select_val(1) }}
                            style={[styles.selectBox,{marginTop:10}]}
                        >
                          <Image style={styles.img} source={selectGoal == 1 ? require('./../../assets/fill.png'): require('./../../assets/unfill.png')} />
                          <Text style={{color:currentTheme().text,marginLeft:20,fontSize:20}}>Travel</Text>
                       
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { select_val(2)}}
                            style={[styles.selectBox,{marginTop:10}]}
                        >
                          <Image style={styles.img} source={selectGoal == 2 ? require('./../../assets/fill.png'): require('./../../assets/unfill.png')} />
                          <Text style={{color:currentTheme().text,marginLeft:20,fontSize:20}}>Move out of home</Text>
                       
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {select_val(3) }}
                            style={[styles.selectBox,{marginTop:10}]}
                        >
                          <Image style={styles.img} source={selectGoal == 3 ? require('./../../assets/fill.png'): require('./../../assets/unfill.png')} />
                          <Text style={{color:currentTheme().text,marginLeft:20,fontSize:20}}>Start a business</Text>
                       
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { select_val(4) }}
                            style={[styles.selectBox,{marginTop:10}]}
                        >
                          <Image style={styles.img} source={selectGoal == 4 ? require('./../../assets/fill.png'): require('./../../assets/unfill.png')} />
                          <Text style={{color:currentTheme().text,marginLeft:20,fontSize:20}}>Starting a family</Text>
                       
                        </TouchableOpacity>


                        <View style={{ marginTop: 10,alignItems:'center' }}>
                            <LargeButton label="Select" 
                            onPress={()=>{
                                setModelVisiable(false)
                                props.navigation.navigate("Buying")
                                }}
                                ></LargeButton>
                        </View>
                        </ScrollView>
                    </View>
                </View>

            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainArea: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: currentTheme().homebutton,
        justifyContent: 'center',
        alignContent: 'center'

    },
    imagesContainer: {
        height: screenHeight / 2,
        width: screenWidth,
        justifyContent:'center'
    },
    heder: {
        height: 50,
        width: screenWidth,
        // backgroundColor: 'black',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    text:
    {
        color: currentTheme().text,
        fontSize: 20,
    },
    selectBox: {
        padding:15,
        width: screenWidth - 30,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: currentTheme().cardColor,
        borderRadius: 10,
        marginTop: 10,
        flexDirection:'row'

    },
    img:{
        height:20,width:20,tintColor:currentTheme().primary
    }
}) 

// import { StyleSheet, Text, View, SafeAreaView, Image, Modal, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import Icon from 'react-native-vector-icons/Ionicons';

// import { currentTheme } from '../../constants/ThemeProvider'
// import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
// import { ScrollView } from 'react-native-gesture-handler';
// import LargeButton from '../../component/Button/LargeButton';
// import LargeOutLineButton from '../../component/Button/LargeOutLineButton';
// import { StyleConstants } from '../../constants/Style.constant';

// export default function CreateYourGoal() {
//     const [modelVisiable, setModelVisiable] = useState(false)
//     return (
//         <SafeAreaView style={styles.mainArea}>
//             <ScrollView style={styles.mainArea}>
//                 <View style={styles.container}>
//                     <View style={{ padding: 10, }}>
//                         <Icon onPress={() => props.navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50, }} size={30} color={currentTheme().text} />
//                     </View>
//                     <View style={styles.imagesContainer}>
//                         <Image style={{ height: screenWidth / 2, width: screenWidth / 2, alignSelf: 'center', marginTop: 70, }} source={require('./../../assets/goal.png')}></Image>
//                     </View>
//                     <View style={{ paddingVertical: 40, height: screenHeight / 2 - 100, justifyContent: 'center', alignItems: 'center', backgroundColor: currentTheme().background }}>
//                         <LargeButton label="create your goals" ></LargeButton>
//                         <LargeOutLineButton label="Select a Goal" onPress={() => { setModelVisiable(true) }}></LargeOutLineButton>
//                     </View>
//                 </View>

//             </ScrollView>
//             <Modal
//                 visible={modelVisiable}
//                 animationType="slide"
//                 transparent={true}
//                 onRequestClose={() => {
//                     setModelVisiable(!modelVisiable);
//                 }}
//             >
//                 <View
//                     style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//                 >
//                     <TouchableOpacity
//                         onPress={() => setModelVisiable(!modelVisiable)}
//                         style={StyleConstants.modallhar}
//                     >

//                     </TouchableOpacity>
//                     <View
//                         style={[
//                             StyleConstants.modalView,
//                             {
//                                 height: screenHeight/2,
//                                 marginTop:screenHeight/2,
//                                 borderWidth: 2,

//                             },
//                         ]}
//                     >
// <View style={styles.heder}>
//     <Text
//         style={styles.text}>Select a specific goal
//     </Text>
//     {/* <Icon name="ios-arrow-back-outlion"  */}
     

// </View>
// <LargeButton label="Select a specific goal"></LargeButton>

//                     </View>
//                 </View>

//             </Modal>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     mainArea: {
//         flex: 1
//     },
//     container: {
//         flex: 1,
//         backgroundColor: currentTheme().background,
//         justifyContent: 'center',
//         alignContent: 'center'

//     },
//     imagesContainer: {
//         height: screenHeight / 2, 
//          width: screenWidth,
//         justifyContent:'center'
//     },
//     heder:{
//         height:50,
//         width:screenWidth,
//         backgroundColor:'black',
//         justifyContent:'center'
//     },
//      text:
//      {color:'white',  
//      fontSize:20,}
// }) 