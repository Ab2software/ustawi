import { StyleSheet, View, FlatList, Image, Text, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import React, { useState } from 'react'
import Dropdown from '../../component/Dropdown/Dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { currentTheme } from '../../constants/ThemeProvider';

import TextInputCommon from '../../component/TextInput/TextInputCommon';
import LargeButton from '../../component/Button/LargeButton';
import { screenHeight, screenWidth } from '../../constants/Sizes.constant';
import { StyleConstants } from '../../constants/Style.constant';


export default function Others(props) {
    const [check, setCheck] = useState(true)
    const [deleteModel,setDeleteModel]=useState(false)
    const [list, setList] = useState([

        {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,00",

        },
        {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        },
        {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        }, {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",

            // pertange: 60

        },
        {
            title: "Ajibola godwin",
            brand: "sent",
            period: "KSH10,000",
            // pertange: 60

        }
    ])

    const [timeArr, setTimeArr] = useState([
        {
            "label": "day",
            "value": "day"
        },
        {
            "label": "week",
            "value": "week"
        },
        {
            "label": "month",
            "value": "month"
        },
        {
            "label": "year",
            "value": "year"
        }
    ])
    const [open, setOpen] = useState(false)
    const [visable, setVisable] = useState(false)
    const [transcationLoading, setTranscationLoading] = useState(false)

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

        return (
            <TouchableOpacity
                onPress={() => { setTranscationLoading(true) }}
                style={{ marginLeft: 5, marginTop: 20, width: screenWidth / 5, height: screenWidth / 4, alignContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 10, marginLeft: 5, marginTop: -5, width: screenWidth / 5.6, backgroundColor: currentTheme().homebutton, borderRadius: 5 }}>
                    {item.status == 'new' &&
                        <ImageBackground source={require('./../../assets/images/base.png')} style={{ marginTop: -5, backgroundColor: currentTheme().btnbackground, padding: 1, width: screenWidth / 10, alignSelf: 'flex-end' }}>
                            <Text style={{ color: currentTheme().background, fontSize: 10, alignSelf: 'center' }}>New</Text>
                        </ImageBackground>
                    }
                    <Image source={item.icon} style={{ height: 20, width: 20, alignSelf: 'center', margin: 20, tintColor: currentTheme().primary }} />
                </View>

                <Text style={{ color: currentTheme().text, fontSize: 12 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }


    return (

        <SafeAreaView>

            <View style={{ width: '100%', flexDirection: 'column', height: '100%', backgroundColor: currentTheme().cardcolor }}>

                <View style={{ width: 400, backgroundColor: currentTheme().background, padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Icon onPress={() => props.navigation.goBack()}
                            name="ios-arrow-back-outline"
                            style={{ marginTop: 10, width: 50, }}
                            size={30} color={currentTheme().text} />
                        <Image source={require("./../../assets/images/edit.png")} style={{ height: 20, width: 20, marginRight: 60 }} />

                    </View>

                    <Text style={{
                        color: currentTheme().text,
                        fontSize: 30,
                        marginTop: 10
                    }}>
                        Food And Groceries
                    </Text>
                    <Text style={{
                        color: currentTheme().text,
                        FontSize: 30,
                        marginTop: 10
                    }}>
                        Your expenses made on food and groceries so far
                    </Text>

                </View>
                <View style={{ height: 50, zIndex: 2, alignSelf: 'flex-end', marginRight: 10, backgroundColor: currentTheme().background1 }}>
                    <Dropdown //drop 
                        label={"Select"}
                        // placeholder="Enter value"
                        list={timeArr}
                        setList={setTimeArr}
                        setOpen={setOpen}
                        open={open}
                        type={"small"}
                    />
                </View>
                <View style={{ height: screenHeight, width: screenWidth, flexDirection: 'row', backgroundColor: currentTheme().cardcolor, marginTop: 10 }}>



                    <View style={{ height: screenHeight, width: screenWidth, flexDirection: 'row', backgroundColor: currentTheme().cardcolor, marginTop: 10 }}>
                        <FlatList
                            data={list}
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity
                                    onPress={() => { setVisable(!visable) }} style={{

                                        width: screenWidth - 20,
                                        backgroundColor: currentTheme().background,

                                        alignSelf: 'center',
                                        borderColor: currentTheme().otpback,
                                        borderWidth: 2,
                                        borderStyle: 'solid',

                                    }}>

                                    <View style={{ width: screenWidth - 20, flexDirection: 'row', padding: 10 }}>
                                        <View style={{ backgroundColor: currentTheme().background1, borderRadius: 45, justifyContent: 'center', width: 45, height: 45 }}>
                                            <Image source={require("./../../assets/images/send.png")} style={{ height: 20, width: 20, alignSelf: 'center' }} />
                                        </View>
                                        <View style={{ width: screenWidth / 2 - 10 }}>

                                            <Text style={{ color: currentTheme().text1, marginTop: 10, marginLeft: 10 }}>{item.title}</Text>
                                            <Text style={{ color: currentTheme().text1, marginTop: 10, fontSize: 10, marginLeft: 10 }}>{item.brand}</Text>
                                        </View>

                                        <View style={{ width: screenWidth / 3 - 10, justifyContent: 'center' }}>
                                            <View style={{
                                                padding: 10,
                                                backgroundColor: currentTheme().background,
                                                alignSelf: 'center',
                                                borderRadius: 5,
                                                flexDirection: 'row',
                                                // justifyContent:'space-between'
                                            }}>
                                                <Text style={{ color: currentTheme().text, alignSelf: 'center', fontSize: 14, }}>{item.period}</Text>
                                                <Image source={require("./../../assets/images/directsend.png")} style={{ height: 20, width: 20, marginLeft: 20 }} />

                                            </View>
                                        </View>
                                    </View>


                                </TouchableOpacity>
                            }}
                        />


                    </View>


                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visable}
                onRequestClose={() => {
                    setVisable(!visable);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#c6c6c699', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setVisable(!visable)} style={StyleConstants.modalLhare}></TouchableOpacity>
                    <View style={{ paddingBottom: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: currentTheme().background1, marginTop: screenHeight / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList
                            data={category}
                            renderItem={_render_item}
                            numColumns={4}
                        >
                        </FlatList>
                    </View>
                </View>
            </Modal>


            <Modal
                animationType="fade"
                transparent={true}
                visible={transcationLoading}
                onRequestClose={() => {
                    setTranscationLoading(!transcationLoading);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#c6c6c699', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setTranscationLoading(!transcationLoading)} style={StyleConstants.modalLhare}></TouchableOpacity>
                    <View style={{ width: screenWidth - 20, height: screenWidth - 40, backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', }}>
                        <Image source={require("./../../assets/images/movetrans.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 30, color: currentTheme().text, alignSelf: 'center' }}>Are you sure you want
                            to Move this transaction? </Text>
                        <View style={{ flexDirection: 'row', width: screenWidth - 60, padding: 10 }}>
                            {check ?
                                <TouchableOpacity onPress={() => { setCheck(false) }}>
                                    <Image source={require("./../../assets/images/checkmark.png")} style={{ height: 30, width: 30, alignSelf: 'center' }}></Image>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => { setCheck(true) }}>
                                    <Image source={require("./../../assets/images/uncheckmark.png")} style={{ height: 30, width: 30, alignSelf: 'center', borderColor: currentTheme().btnbackground, borderWidth: 1, borderRadius: 4 }}></Image>
                                </TouchableOpacity>
                            }
                            <Text style={{ marginLeft: 10, fontSize: 16, color: currentTheme().text, alignSelf: 'center' }}>Move subsequent transactions of this nature to
                                this category</Text>
                        </View>
                        <View style={{ padding: 20, height: 100 }}>
                            <LargeButton label="Yes" onPress={()=>{setDeleteModel(true)}} />
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModel}
                onRequestClose={() => {
                    setDeleteModel(!deleteModel);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#c6c6c699', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setDeleteModel(!deleteModel)} style={StyleConstants.modalLhare}></TouchableOpacity>
                    <View style={{ width: screenWidth - 20, height: screenWidth - 40, backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', }}>
                        <Image source={require("./../../assets/images/delete.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 30, color: currentTheme().text, alignSelf: 'center' }}>Are you sure you want
                            to delete this category? </Text>
                        <View style={{ flexDirection: 'row', width: screenWidth - 60, padding: 10 }}>

                            <Text style={{ marginLeft: 10, fontSize: 16, color: currentTheme().text, alignSelf: 'center' }}>On deleting this category all transactions would be move to the others category.</Text>
                        </View>
                        <View style={{ padding: 20, height: 100 }}>
                            <LargeButton label="Yes" />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})