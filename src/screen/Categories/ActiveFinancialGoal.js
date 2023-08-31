import { StyleSheet, Text, View, Image, ScrollView, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { screenHeight, screenWidth } from '../../constants/Sizes.constant'
import { currentTheme } from '../../constants/ThemeProvider'
import { StyleConstants } from '../../constants/Style.constant'
import LargeOutLineButton from '../../component/Button/LargeOutLineButton'
import LargeButton from '../../component/Button/LargeButton'
import SmallOutLineButton from '../../component/Button/SmallOutLineButton'
import SmailFillBtn from '../../component/Button/SmailFillBtn'
import OtherButton from '../../component/Button/OtherButton'




export default function ActiveFinancialGoal(props) {
    const {navigation} =props
    const [transcationLoading, setTranscationLoading] = useState(false)
    const [congratulationsModal, setCongratulationsModal] = useState(false)
    const [list, setList] = useState([
        {
            title: "Buy a Car ",
            brand: "KSH230",
            period: "3 Months Period",
            pertange: 34
        },
        {
            title: "Buy a Car ",
            brand: "KSH230",
            period: "3 Months Period",
            pertange: 34
        },
        {
            title: "Buy a Car ",
            brand: "KSH230",
            period: "3 Months Period",
            pertange: 34
        },
        {
            title: "Buy a Car ",
            brand: "KSH230",
            period: "3 Months Period",
            pertange: 34
        },
        {
            title: "Buy a Car ",
            brand: "KSH230",
            period: "3 Months Period",
            pertange: 34
        },
        {
            title: "Buy a Car ",
            brand: "KSH230",
            period: "3 Months Period",
            pertange: 34
        },
        {
            title: "Buy a Car ",
            brand: "KSH230",
            period: "3 Months Period",
            pertange: 34
        }
    ])

    const _render_item = (list) => {
        return list.map((item, index) => {
            return <TouchableOpacity key={index}
                onPress={() => { setTranscationLoading(true) }}
                style={{
                    height: 130,
                    width: screenWidth - 20,
                    backgroundColor: currentTheme().otpback,
                    marginTop: 10,
                    alignSelf: 'center',
                    borderColor: currentTheme().background,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderRadius: 15,
                }}>
                <View style={{ width: screenWidth - 20, flexDirection: 'row' }}>
                    <View style={{ width: screenWidth / 2 - 10 }}>
                        <Text style={{ color: currentTheme().primary, marginTop: 10, marginLeft: 10 }}>{item.title}</Text>
                        <Text style={{ color: currentTheme().text, marginTop: 10, fontSize: 25, marginLeft: 10 }}>{item.brand} /<Text style={{ fontSize: 25, color: currentTheme().placeholdercolor }}>400</Text></Text>
                    </View>
                    <View style={{ width: screenWidth / 2 - 10, justifyContent: 'center' }}>
                        <View style={{
                            padding: 10,
                            backgroundColor: currentTheme().background,
                            alignSelf: 'center',
                            borderRadius: 5,
                        }}>
                            <Text style={{ color: currentTheme().text, alignSelf: 'center', fontSize: 10, }}>{item.period}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: screenWidth - 40 }}>
                    <Text style={{ color: currentTheme().text, marginTop: 20, fontSize: 10, marginLeft: 10, }}>$34 Every month</Text>
                    <Text style={{ color: currentTheme().text, marginTop: 20, fontSize: 10, marginLeft: 10, }}>20%</Text>

                </View>
                <View style={{ height: 10, width: screenWidth - 40, backgroundColor: currentTheme().background, borderRadius: 5, alignSelf: 'center', marginTop: 10, flexDirection: 'row' }}>
                    <View style={{ height: 10, width: item.pertange, backgroundColor: currentTheme().primary, borderRadius: 5, alignSelf: 'center', flexDirection: 'row' }}>
                    </View>
                </View>
            </TouchableOpacity>
        })
    }
    return (
        <View style={{ backgroundColor: currentTheme().background, height: screenHeight - 240 }}>
            <ScrollView>{_render_item(list || [])}</ScrollView>

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
                    <View style={{ width: screenWidth - 20, height: screenWidth - 100, backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Image source={require("./../../assets/images/info_circle.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 25, marginTop: 10, color: currentTheme().text, alignSelf: 'center', alignContent: 'center', textAlign: 'center' }}>Change goal parameters</Text>
                        <Text style={{ fontSize: 15, marginTop: 10, color: currentTheme().text, alignSelf: 'center', textAlign: 'center' }}>By clicking no your goal automatically goes to the inactive category</Text>
                       
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop:20,bottom:20}}>
                            <SmallOutLineButton label="No" onPress={() => { setTranscationLoading(true) }}  backgroundColor={currentTheme().background}/>
                            <SmailFillBtn label="Yes" onPress={() => { setCongratulationsModal(true) }} backgroundColor={currentTheme().btnbackground} />
                        </View>
                    </View> 
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={congratulationsModal}
                onRequestClose={() => {
                    setCongratulationsModal(!congratulationsModal);
                }}
            >
                <View style={{ flex: 1, backgroundColor: '#c6c6c699', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setCongratulationsModal(!congratulationsModal)} style={StyleConstants.modalLhare}></TouchableOpacity>
                    <View style={{ width: screenWidth - 20,  backgroundColor: currentTheme().background, borderRadius: 20, alignSelf: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Image source={require("./../../assets/images/Successfulillustration.png")} style={{ height: 80, width: 80, alignSelf: 'center' }}></Image>
                        <Text style={{ fontSize: 25, marginTop: 10, color: currentTheme().text, alignSelf: 'center', alignContent: 'center', textAlign: 'center' }}>Congratulations on achieving your goal</Text>
                        <Text style={{ fontSize: 15, marginTop: 10, color: currentTheme().text, alignSelf: 'center', textAlign: 'center' }}>If time frame isn’t achievable allow system calculates the nearest achievable time</Text>
                       
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,marginTop :40,bottom:20}}>
                            <OtherButton label="Contiune" onPress={() => { navigation("EditCategory") }} backgroundColor={currentTheme().btnbackground} />
                        </View>
                    </View> 
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({})