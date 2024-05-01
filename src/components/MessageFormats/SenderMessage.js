import React from "react";
import { View, Text, StyleSheet, Image } from "react-native"
import { useSelector } from "react-redux";
import Theme from "../../theme/theme";

const SenderMessage = ({
    data
}) => {

    const {userData} = useSelector((state) => state.userReducer)
    const time = new Date(data?.createdAt)

    return (
        <View style={styles.container}>
            {/* <View style={styles.imgContainer}>
                <Image
                    source={{uri:baseURL + user?.profile_image}}
                    style={styles.img}
                />
            </View> */}
             <View style={styles.rest}>
                <View style={styles.messages}>
                        <Text style={styles.pillMsg}>{data?.content}</Text>
                </View>
                <Text style={styles.time}>{time?.toLocaleTimeString()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom:14
    },
    imgContainer: {
        width: 43,
        height: 43,
        borderRadius: 43,
        borderWidth: 1,
        borderColor: "white",
        ...Theme.Shadow31
    },
    img: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 43
    },
    rest: {
        marginTop: 10,
        marginLeft: 11,
        flexGrow: 0,
    },
    title: {
        // ...FontStyle.SantoshiBlack14,
        marginBottom: 2
    },
    messages: {
        marginLeft: 21,
        paddingRight: 25
    },
    msgPill: {
        height: 36,
        backgroundColor: "#F2F7FB",
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: "center",
        paddingHorizontal: 12,
        marginTop: 10,
    },
    time: {
        alignSelf: "flex-end",
        marginRight: 20,
        marginTop:8,

    },
    pillMsg: {
    }
})

export default SenderMessage