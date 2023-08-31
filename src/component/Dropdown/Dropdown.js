import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import DropDownPicker from "react-native-dropdown-picker";
import { currentTheme } from '../../constants/ThemeProvider';
import { screenWidth } from '../../constants/Sizes.constant';
export default function Dropdown(props) {
  const { list, setList,type, label,open, setOpen, value, setValue, placeholder } = props;
  const onDocumentOpen = useCallback(() => {
    // setGenderOpen(false);
  }, []);
  return (
    <View style={{height:100,zIndex:2,borderRadius:10,}}>
     {type != "small" && <Text style={{ color: currentTheme().text, marginLeft: 10, marginBottom: 5 }}>{label}</Text>}
      <DropDownPicker
        // nestedScrollEnabled={true}
        style={type == "small" ? styles.smalldropdown : styles.dropdown}
        open={open}
        value={value} //documentValue
        items={list}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setList}
        placeholder={label}
        placeholderStyle={{ borderRadius:20,color: currentTheme().placeholdercolor }}
        textStyle={{ color: currentTheme().text }}
        activityIndicatorColor="red"
        searchPlaceholder={placeholder}
        arrowIconStyle={{color:'red'}}
        zIndex={1000}
        zIndexInverse={3000}
        dropDownContainerStyle={{ 
          width:type == "small" ? 120: screenWidth - 20,
           backgroundColor:currentTheme().background,
          // borderColor: currentTheme().btnbackground,borderRadius:20,
          zIndex:999
        }}
   
        dropDownStyle={{  backgroundColor: currentTheme().background,borderRadius:10}} 
      />
    </View>
  )
}


const styles = StyleSheet.create({
  dropdownDocument: {
    // marginHorizontal: 10,
    // marginBottom: 15,
  },
  dropdown: {
    marginHorizontal: 10,
   
    width: screenWidth - 20,
    borderColor: currentTheme().btnbackground,
    justifyContent: 'center',
    backgroundColor: currentTheme().background,
    // marginTop: 10, 

  },
  smalldropdown:{ 
   height:10,
    width: 120,
    borderRadius:20, 
    justifyContent: 'center',
    backgroundColor: currentTheme().background, 
    // color: currentTheme().placeholdercolor,
  }
})