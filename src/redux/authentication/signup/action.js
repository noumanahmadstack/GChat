import Toast from 'react-native-simple-toast';
import { Signup } from '../../../api/authentication/authenticationController';
import { store } from "../../../redux/store/store";
import { setUserData } from "../../../redux/user/reducer";
import { signupValidation } from '../../../screens/authenticationScreens/login/components/formValidation';
import { setLoading, setErrorText } from "../../authentication/signup/reducer";
import { setMessageData } from '../../messages/reducer';
import { setShowToast } from '../login/reducer';

export const signupAction = async ({ navigation, first_name, last_name, email, phone_number, password }) => {
    let validate = signupValidation({ first_name, last_name, email, phone_number, password })
    store.dispatch(setErrorText(validate.errors))
    if (validate.valid) {
        store.dispatch(setLoading(true))
        let body = {

                firstName: first_name,
                lastName: last_name,
                email,
                phoneNo:phone_number,
                password,
                userType: "Customer"
                //  terms_of_service: true
            
        }
        let response = await Signup({ body })
        if (response.data.isError == false) {
            Toast.show('SignUp Successfully!', Toast.SHORT);
            // store.dispatch(setShowToast(true));
            // store.dispatch(setMessageData(response.data?.meta?.message));
            // setTimeout(() => {
            //     store.dispatch(setShowToast(false));
            // }, 500)
            store.dispatch(setUserData(response?.data.data))
            navigation.replace('login')
        }
        store.dispatch(setLoading(false))
    }
}