
import React, { useEffect, useState, useCallback } from 'react';

import {
  SafeAreaView, StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Pressable
} from 'react-native';
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import { CountryPicker } from "react-native-country-codes-picker";
import { currentTheme } from '../../constants/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import { getApiCall } from '../../services/appSetting';

const Home = (props,{ navigation }) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [transcationData, setTranscationData] = useState([])
  const [userDetail, setUserDetail] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [animating, setAnimating] = useState(true)
  const [balance, setbalance] = useState([{
    id: 1,
    status: 'Available Balance ',
    balance: '7,450.41',
    img: require('../../../assets/Group.png')
  },
  {
    id: 2,
    status: 'Savings Balance ',
    balance: '2,450.41',
    img: require('../../../assets/Group11.png')

  }])
  const { colors } = useTheme();
  const theme = useColorScheme();

  console.log(theme)


  useEffect(() => {
    get_profile()
}, [props.navigation.navigate])


const get_profile = async () => {
    setAnimating(true)
    let UserId = await AsyncStorage.getItem('UserId');
    let token = await AsyncStorage.getItem('logintokan');
    // alert(UserId)
    let url = `user_detail`;

    try {
        let result = await getApiCall(url, token);
        console.log('----result---', result)
        setUserDetail(result.data)
        setAnimating(false)

        // setName(result.first_name)
      //  setMobile(result.data.mobile)
    } catch (error) {

        Toast.show({ type: 'error', text1: error.message });
        setAnimating(false);
    }
}


  const renderitm = ({ item }) => {
    return (
      <ImageBackground source={item.img} imageStyle={{ borderRadius: 10 }} style={{ height: 110, borderRadius: 50, width: Dimensions.get('window').width - 60, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: "#000" }}>{item.status}</Text>

        <Text style={{ color: "#000", fontSize: 20, fontWeight: '900' }}>KSH<Text style={{ color: '#000', fontSize: 40, fontWeight: 'bold' }}>{item.balance}</Text> </Text>
      </ImageBackground>
    )
  }
  const _render_item = ({ item }) => {
    return (
      <View style={{height:100,width:400,backgroundColor:currentTheme().placeholdercolor}}>
        <Text>Hello</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: currentTheme().background }}>
        {/* <StatusBar hidden /> */}
        <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10 }}>
          <View style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 22, color: currentTheme().text }}>Hello {userDetail.first_name == null ? '' : userDetail.first_name}</Text>
            <Image source={require('../../assets/Wave.png')} style={{ height: 40, width: 40 }} />

          </View>
          <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Icon name='notifications' size={25} color={currentTheme().text} />
            <Image source={userDetail.profile_image == null || userDetail.profile_image == "" ? require('../../assets/Maskgroup.png') : { uri: userDetail.profile_image }} style={{ height: 45, width: 45, marginLeft: 10,borderRadius:50 }} />

          </View>
        </View>

        <View style={{ flex: 0.9 }}>
          <View style={{ paddingHorizontal: 10, marginTop: 25 }}>
            <FlatList
              data={balance}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderitm} />
          </View>

          <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Pressable onPress={() => navigation.navigate('Scan')} style={{ flex: 0.49, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: currentTheme().homebutton, height: 50, flexDirection: 'row' }}>
              <Text style={{ color: currentTheme().text }}>Scan Code</Text>
              <Image source={theme == 'dark' ? require('../../assets/scan.png') : require('../../assets/scanL.png')} style={{ height: 20, width: 20, marginLeft: 10,tintColor:currentTheme().text }} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Saving')} style={{ flex: 0.49, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: currentTheme().homebutton, height: 50, flexDirection: 'row' }}>
              <Text style={{ color: currentTheme().text }}>Top-up Account</Text>
              <Image source={theme == 'dark' ? require('../../assets/money-recive.png') : require('../../assets/moneyL.png')} style={{ height: 20, width: 20, marginLeft: 10 ,tintColor:currentTheme().text}} />
            </Pressable>
          </View>
          
         
            {transcationData.length > 0 ?
           <FlatList
           data={transcationData}
           renderItem={_render_item}
           />
          
          :
          <View>
            <Image
              source={require('../../assets/E-Wallet.png')}
              resizeMode='contain'
              style={{ height: 280, borderRadius: 50, width: '100%', margin: 10, justifyContent: 'center', alignItems: 'center', marginTop: 50 }} />
            <Text style={{ color: '#818181', alignSelf: 'center' }}>No Recent Transactions</Text>
          </View>
}
        </View>
        <View>
        </View>
        <View style={{ bottom: 20, left: "83%", position: 'absolute', backgroundColor: 'transparent', zIndex: 10 }}>
          <Image 
          source={theme == 'dark' ? require('../../assets/homechatd.png') : require('../../assets/homechat.png')} 
          style={{ height: 40, width: 40,  }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
