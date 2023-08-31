
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';
import { currentTheme } from '../../constants/ThemeProvider';
import LargeButton from '../../component/Button/LargeButton';
const Succes = ({ navigation }) => {
  const theme = useColorScheme();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: currentTheme().background }}>
      <StatusBar hidden />
      <View style={{ flex: 0.4, paddingHorizontal: 10 }}>
        <Icon onPress={() => navigation.goBack()} name="ios-arrow-back-outline" style={{ marginTop: 10, width: 50 }} size={30} color={currentTheme().text} />


      </View>
      <View style={{ flex: 0.6, backgroundColor: currentTheme().succesbackground, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
        <Shadow>
          <View style={{ height: '100%', width: Dimensions.get('window').width, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>

            {theme == 'dark' ? <Image source={require('../../assets/Successful.png')} style={{ height: 200, width: 200, marginTop: 20 }} /> :
              <Image source={require('../../assets/Successfullight.png')} style={{ height: 200, width: 200, marginTop: 20 }} />}
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: currentTheme().text, paddingTop: 10 }}>Successful</Text>
            <Text style={{ color: currentTheme().text, marginTop: 10 }}>Your Ustawi account has been successfully
              created</Text>

              <LargeButton label="Continue" onPress={()=>{navigation.navigate('BottomTab')}}></LargeButton>

            {/* <TouchableOpacity onPress={() => navigation.navigate('BottomTab')} style={{ backgroundColor: currentTheme().btnbackground, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 30, width: '100%' }}>
              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Continue</Text>
            </TouchableOpacity> */}
          </View>
        </Shadow>
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

export default Succes;


