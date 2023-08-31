import AsyncStorage from "@react-native-async-storage/async-storage"


const mainUrl = 'http://13.200.101.186:4001/'
// static/upload/
const base ={
    api: mainUrl +'accounts/',
    apiPayment:mainUrl+'payment/',
    imageBaseUrl: mainUrl+'static/upload/',
    token:  AsyncStorage.getItem('token'),
}
// const baseImages = {
//     logo: require('../assets/Image/logo.png'),
// }

export {
    mainUrl,
    base ,
    // baseImages
}  
