import { forgetPassword, MatchOtp, reset_Password } from "../../../api/authentication/authenticationController";
import { setMessageData} from "../../messages/reducer";
import { store } from "../../store/store";
import { setShowToast ,setEmail} from "../login/reducer";
// import { setShowToast } from "./reducer";


export const forgetAction = async ({navigation,email}) => {

    const formData = new FormData();
       formData.append('users[email]', email);
   
       let response = await forgetPassword({body: formData});
       if (response !== 'Error') {
        store.dispatch(setShowToast(true));
        store.dispatch(setMessageData(response?.data?.meta?.message));
         store.dispatch(setEmail(response?.data?.user?.email))
        navigation.navigate('otp')
               setTimeout(() => {
                store.dispatch(setShowToast(false));
                   }, 2000)
       }
   }


   export const matchAction = async ({navigation,otp,email}) => {
 
    let params = {
        email:email,
        otp:otp.join("")
    }
       let response = await MatchOtp({params});
       if (response !== 'Error') {
        store.dispatch(setShowToast(true));
               setTimeout(() => {
                store.dispatch(setMessageData(response?.data?.meta?.message));
                if(response?.data?.meta?.message !== 'OTP mismatched'){
                    navigation.navigate('resetPassword')
                }
                     
                   }, 500)
                   setTimeout(() => {
                    store.dispatch(setShowToast(false));
                       }, 1000)
       }
   }


   export const resetAction = async ({navigation,password,confirmPassword,email})=>{
    const formData = new FormData();
    formData.append('users[password]', password);
    formData.append('users[confirm_password',confirmPassword);
    formData.append('users[email]',email)
    let response = await reset_Password({body: formData});
       if (response !== 'Error') {
        store.dispatch(setShowToast(true));
        store.dispatch(setMessageData(response?.data?.meta?.message));
        navigation.navigate('login')
               setTimeout(() => {
                store.dispatch(setShowToast(false));
                   }, 2000)
       }
   }



