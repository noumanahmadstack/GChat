import {
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Login } from '../api/authentication/authenticationController';
import { loginAction } from '../redux/authentication/login/action';
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('window');
export default function LoginScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { loading } = useSelector((state) => state.loginReducer);

  return (
    <View style={styles.container}>
    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#0F8B75" translucent = {true}/>  
  
    <ImageBackground
        source={require('../assets/images/IntroBack-min.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.blackFooterContainer}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}>
          <Text style={styles.title}>Prihlásiť sa</Text>

          <Text style={styles.description}>
            Do našej aplikácie sa dá prihlásiť,{'\n'}
            len ak ste používateľom GCHATu.
          </Text>

          <View style={styles.inputsContainer}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              style={styles.input}
            />
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              placeholder="Heslo"
              style={styles.input}
            />
          </View>
          <TouchableOpacity 
          onPress={()=>loginAction({email,password,navigation})}
          activeOpacity={loading ? 1 : 0.3} // Disables opacity when loading
  disabled={loading}
>
            <LinearGradient
              colors={['#23BD89', '#0F8B75']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.button}>
                {
              loading ?
              <ActivityIndicator size="small"/>
              :
              <Text style={styles.text}>Prihlásiť sa</Text>
            }
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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
    fontSize: 35,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
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
    width: width / 2.8,
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
  input: {
    width: width - 76,
    height: 56,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  inputsContainer: {
    marginTop: 28,
  },
});
