import { Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('screen').width)
const screenHeight = Math.round(Dimensions.get('screen').height)

const windowWidth = Math.round(Dimensions.get('window').width)
const windowHeight = Math.round(Dimensions.get('window').height)

export {
    screenWidth,
    screenHeight,
    windowHeight,
    windowWidth
}