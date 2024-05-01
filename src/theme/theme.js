import { StyleSheet } from "react-native";
import { Colors } from "./colors";

const Theme = StyleSheet.create({
    row: {
        flexDirection: "row"
    },
    Shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.13,
        shadowRadius: 2,
    },
    ShadowDisable: {
        shadowOpacity: 0,
        shadowRadius: 0,
        shadowColor: 'white',
    },
    SafeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    flexEnd: {
        flex: 1,
        justifyContent: "flex-end"
    },
    flexCenter: {
        flex: 1,
        justifyContent: "center"
    },
    flex1: {
        flex: 1
    },
    lineCyan: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.cyanPrimary,
    },
    lineCyanBottom: {
        height: 2,
        backgroundColor: Colors.cyanPrimary,
        position: "absolute",
        top: "96%",
        width: '100%'
    },
    Shadow31: {
        shadowColor: 'rgba(185, 200, 220, 0.2)',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 31,
        elevation: 2
    },
    carEachStyle: {
        marginTop: 20,
        marginBottom: 25,
        borderWidth: 2,
        borderColor: "#EBEEF7"
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowCenter: {
        flexDirection: "row",
        alignItems: "center"
    },
    rowCenterBoth: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    rowBetweenCenter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    GoldText: {
        color: Colors.goldColor
    },
    BookingCard: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.4)",
        borderRadius: 10,
        backgroundColor: "white",
        paddingHorizontal: 23
    },
    StoreTopEmpty: {
        height: 32,
        backgroundColor: Colors.goldColor
    },
    flexGrow0: {
        flexGrow: 0
    },
    ImageDefault:{
        flex:1,
        height:null,
        width:null
    },
    bgGold:{
        backgroundColor:Colors.goldColor
    },
    colorBlack:{
        color:"black"
    },
    colorBlack6:{
        color:"rgba(0, 0, 0, 0.6)"
    },
    colorBlack6:{
        color:"rgba(0, 0, 0, 0.8)"
    },
    colorGold:{
        color:Colors.goldColor
    },
    whiteContainer:{
        flex:1,
        backgroundColor:"white"
    }

});



export default Theme;