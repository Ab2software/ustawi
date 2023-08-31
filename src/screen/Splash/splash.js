
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Image, ImageBackground, PermissionsAndroid, View } from 'react-native';
import { screenWidth } from '../../constants/Sizes.constant';
import { currentTheme } from '../../constants/ThemeProvider';
import CreateYourGoal from '../Categories/CreateYourGoal';

const Splash = (props) => {
  useEffect(() => {
    // AsyncStorage.clear();
    setTimeout(async () => {
      let token = await AsyncStorage.getItem('logintokan')

      if (token != null) {
        let fingerPrint = await AsyncStorage.getItem("fingerprint")
        let faceid = await AsyncStorage.getItem("Faceid")
        console.log("fingur print", fingerPrint)
        if (faceid == "true") {
          props.navigation.navigate('Loginfaceid', { error: 'n' })
        }
        else if (fingerPrint == "true") {
          props.navigation.navigate('LoginBiomatric')
        }
        else {
          let token = await AsyncStorage.getItem("logintokan")
          props.navigation.navigate('LoginSecurity', { tokann: token })
        } 
      } else {
        props.navigation.navigate('Onboarding')
      }
    }, 1500);

  }, [props]);


  return (
    <View style={{ backgroundColor: currentTheme().primary, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./../../assets/images/logo.png')} style={{ height: 150, width: screenWidth - 30, resizeMode: 'stretch' }} />
    </View>
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

export default Splash;
