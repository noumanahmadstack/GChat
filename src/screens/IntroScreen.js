import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');
export default function IntroScreen({navigation}) {
  return (
    <View style={styles.container}>
    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#0F8B75" translucent = {true}/>  
  
    <ImageBackground
        source={require('../assets/images/IntroBack-min.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.blackFooterContainer}>
        <Text style={styles.title}>GCHAT</Text>
        <Text style={styles.subtitle}>Live Chat APP</Text>

        <Text style={styles.description}>
          Využite funkciu Live Chatu v spojení s{'\n'}umelou inteligenciou pre
          lepší support{'\n'}vašim zákazníkom
        </Text>

        <TouchableOpacity
        onPress={()=>navigation.navigate('LoginScreen')}
        activeOpacity={0.7}>
          <LinearGradient
            colors={['#23BD89', '#0F8B75']} // Gradient colors
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <Text style={styles.text}>Otvoriť aplikáciu</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23BD89',
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  blackFooterContainer: {
    width: width,
    height: height / 1.78,
    backgroundColor: '#000',
    borderTopEndRadius: 32,
    borderTopLeftRadius: 32,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 45,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 51,
  },
  subtitle: {
    fontSize: 35,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#797979',
    textAlign: 'center',
    marginTop: 13,
  },
  glowWrapper: {},
  button: {
    width: width / 2,
    height: 49,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#23BD89',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 100,
    elevation: 10,
    marginTop: 39,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
