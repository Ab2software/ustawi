import { StyleSheet, } from 'react-native'
 
import { fontFamily } from './font'
import { screenHeight, screenWidth } from './Sizes.constant'
import { currentTheme } from './ThemeProvider'
export const  StyleConstants = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: currentTheme().thame
    },
    textwelcome: {
        fontFamily: fontFamily.medium,
        color: currentTheme().text,
        fontSize: 28,
        // textAlign: 'center'
    },
    textinputsty: {
        borderWidth: 3,
        backgroundColor: currentTheme().lightWhite,
        // flex:1,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderColor: currentTheme().btnColor
    },
    btnoutline: {
        borderWidth: 1,
        width: screenWidth - 32,
        // flex: 1,
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 15,
        borderColor: currentTheme().white,
        // marginTop: 16
        marginBottom: 16
    },
    RowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        height: 20,
        width: 20,
    },
    TouchaView: {
        width: 40, height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'red'
    },
    textsigup: {
        color: currentTheme().background,
        textAlign: 'center',
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: fontFamily.medium,
    },
    bottunth: {
        backgroundColor: currentTheme().btnbackground,
        borderRadius: 10,
        height: 50,
        padding:10,
        justifyContent: 'center',
        width: screenWidth - 50,
        alignItems: 'center' 
    },
    buttonOuterLine:{
        
        borderRadius: 10, 
        padding:10,
        borderColor:currentTheme().btnbackground,
        borderWidth:1,
        borderStyle:'solid',
        justifyContent: 'center',
        width: screenWidth - 50,
    },
    errText: {
        color: currentTheme().errors,
        fontSize: 12,
        fontFamily: fontFamily.regular,
        marginTop: 5,
        // height:25,
        marginLeft: 8,
    },
    TouchableView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: currentTheme().colortheme,
        height: 50
    },
    border: {
        position: 'absolute',
        bottom: 0,
        borderBottomWidth: 2,
        borderColor: currentTheme().textThame,
        alignSelf: 'center',
        width: 50
    },
    imagestyle: {
        width: 20,
        height: 20
    },
    modalManView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    modalLhare: {
        backgroundColor: currentTheme().darkLight,
        opacity: 0.7,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    modalView: {
        backgroundColor: currentTheme().background,
        padding: 10,
        width: screenWidth,
        borderRadius: 10,
        elevation:5
    },
    modallhar: {
        flex: 1,
        backgroundColor: currentTheme().cardColor,
        opacity: 0.7,
        position: 'absolute',
        top: 0, left: 0,
        right: 0, bottom: 0
    },
    textStylemodal: {
        color: currentTheme().black,
        padding: 10,
        fontFamily: fontFamily.medium
    },
    OrderWalletView: {
        backgroundColor: currentTheme().white,
        marginBottom: 20,
        // marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
        shadowColor: currentTheme().dark,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
        margin: 1
    },
    Ordertext: {
        width: 150,
        marginRight: 30,
        fontFamily: fontFamily.medium,
        color: currentTheme().black,
        fontSize: 12
    },
    OrderItemtext: {
        color: currentTheme().gary,
        width: screenWidth - 190,
        marginLeft: 'auto',
        paddingHorizontal: 7,
        fontFamily: fontFamily.regular
    },
    texdropdown: {
        color: currentTheme().text,
        fontFamily: fontFamily.medium,
        fontSize: 12
    },
    cardView: {
        backgroundColor: currentTheme().textThame,
        padding: 5,
         borderRadius: 5,
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        marginTop: 10,
        elevation: 5,
        paddingHorizontal:16
    },
    touchView:{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red'
    }

})