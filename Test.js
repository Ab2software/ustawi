import { StyleSheet, View ,Image,Text,TouchableOpacity, Alert, TextInput } from 'react-native'
import React from 'react' 
import TextInputCommon from './src/component/TextInput/TextInputCommon' 

export default function Test() {
  return (
    <View>
        {/* <Image 
        source= {require('./assets/E-Wallet.png')} 
        style={styles.img}>

        </Image>
     <View style={{padding:20,width:200,backgroundColor:'red',flexDirection:'row',
        justifyContent:'center',alignContent:'center',}}>
          <Image source= {require('./assets/E-Wallet.png')}  
           style={{height:20,width:20}}></Image>
          <Text>Facebook</Text>
        </View>

        <View style={{padding:20,width:200,borderColor:'blue',borderWidth:2,borderStyle:'solid',
        flexDirection:'row',justifyContent:'center',alignContent:'center',}}>
          
          <Text>Facebook </Text>
        </View>  
        <Image
        source={require('./assets/edit.png')} 
        style={{height:50,width:50,alignSelf:'center'}}></Image>
        <TextInput style={{height:50,width:100,backgroundColor:'red',}}></TextInput>
          
        
     <TouchableOpacity 
     style={{height:50,width:200,backgroundColor:'green',borderRadius:20,justifyContent:'center'}}
     onPress={()=>{
       alert("Amar chor h")
     }}
     >
        <Text style={{alignSelf:'center',color:'white'}}>Login</Text>
     </TouchableOpacity> */}
     <Text>jhhsajs</Text>
     <Image style={{height:100,width:100,alignSelf:'center'}} source={require('./assets/image3.png')}>
     </Image>
     <TextInput style={{height:50,width:200,backgroundColor:'green',borderRadius:20,alignSelf:'center'}}>

     </TextInput>
     <TouchableOpacity style={{width:200,height:50,backgroundColor:'blue',alignSelf:'center',marginTop:20,justifyContent:'center'}}
     onPress={()=>{
       alert("anil")
     }} 
     >
      <Text style={{alignSelf:'center',}}>amardevi
        </Text> 
     </TouchableOpacity>

     <View style={{ 
       backgroundColor:'red',
       marginTop:40,
       marginLeft:20,
       padding:20,
       width:100,
       borderRadius:2,

      //  borderColor:'black',
       borderStyle:'solid',

       borderLeftWidth:10,
       borderLeftColor:'green',

       borderTopColor:'cyan',
       borderTopWidth:20,

       borderRightColor:'green',
       borderRightWidth:10,

       borderBottomColor:'cyan',
       borderBottomWidth:20

       }}>
     <Text>Login</Text>
     </View>

    </View>
  )
}

const styles = StyleSheet.create({
    
    img:{
      height:100,
      width:100,
      alignSelf:'center',
      marginTop:20
    }

});