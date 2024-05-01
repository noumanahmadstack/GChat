import React from "react";
import { View, Text, StyleSheet, Image } from "react-native"
import { Colors } from "../../theme/colors";
import Theme from "../../theme/theme";
import LinearGradient from "react-native-linear-gradient";

const RecieverMessage = ({
    data
}) => {

    const time = new Date(data?.createdAt)
const CustomAvatar = ({data}) => {
    const initials =
      data && data.receiver
        ? data.receiver.name
            .split(' ')
            .slice(0, 2)
            .map(n => n[0])
            .join('')
            .toUpperCase()
        : '?';
    return (
      <LinearGradient
        colors={['#23BD89', '#0F8B75']}
        style={styles.avatarContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={styles.avatarText}>{initials}</Text>
      </LinearGradient>
    );
  };
    return (
        <View style={styles.container}>
            <View style={styles.rest}>
                <View style={styles.messages}>
                        <Text style={styles.pillMsg}>{data?.content}</Text>
                </View>
                <Text style={styles.time}>{time?.toLocaleTimeString()}</Text>
            </View>

{/* <CustomAvatar/> */}

                {/* <Image
                    source={ImgSignup}
                    style={styles.img}
                /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom:14,
        alignSelf:"flex-end"
    },
    imgContainer: {
        width: 43,
        height: 43,
        borderRadius: 43,
        borderWidth: 1,
        borderColor: "white",
        ...Theme.Shadow31
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginTop: 35,
        marginHorizontal:10,
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
        paddingRight: 14
    },
    msgPill: {
        height: 36,
        backgroundColor: "#0D0D0D",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius:20,
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

export default RecieverMessage