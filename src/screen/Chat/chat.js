import React, { useEffect, useState, useCallback } from 'react';

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
  TouchableOpacity
} from 'react-native';
import { Checkbox, Card, useTheme, ActivityIndicator } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import { CountryPicker } from "react-native-country-codes-picker";
import { currentTheme } from '../../constants/ThemeProvider';
const Chat = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const { colors } = useTheme();
  const theme = useColorScheme();

  console.log(theme)

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme().background }}>
      <StatusBar hidden />
     
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

export default Chat;
