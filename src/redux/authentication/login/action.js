
import { Login, Signup } from "../../../api/authentication/authenticationController";
import Toast from 'react-native-simple-toast';
// import { loginValidation } from "../../../screens/authenticationScreens/login/components/formValidation";
import { store } from "../../../redux/store/store";
import { setUserData } from "../../../redux/user/reducer";
import { setLoading, setErrorText, setMessage, setShowToast } from "../../authentication/login/reducer";
import { setMessageData } from "../../messages/reducer";
// import { addProductIntoCart } from '../../cartProduct/action';

export const loginAction = async ({ navigation, email, password }) => {
    // let validate = loginValidation({ email, password })
    
        store.dispatch(setLoading(true))
        let body = {
                email,
                password
        }
        let response = await Login(body)
        if (response?.status !== 'fail') {
            // Toast.show('Login Successfully!', Toast.SHORT);
            store.dispatch(setUserData(response?.data))
            navigation.navigate('MessagesScreen')
            Toast.show('Login successfully', Toast.SHORT)
        }else{
            // Toast.show('Your mail or password is incorrect', Toast.SHORT);
        }
            // store.dispatch(setShowToast(true));
            // setTimeout(() => {
            //  store.dispatch(setShowToast(false));
            // }, 2000)
        
        store.dispatch(setLoading(false))
    
}


