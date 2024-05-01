import { Logout } from '../../../api/authentication/authenticationController';
import { DrawerActions } from '@react-navigation/native';
import { setMessageData } from '../../messages/reducer';
import { store } from '../../store/store';
import { setShowToast } from '../login/reducer';


export const logoutAction = async ({navigation}) => {
        // let response = await Logout()
        navigation.dispatch(DrawerActions.toggleDrawer());
        // if (response !== "Error") {
        //     store.dispatch(setMessageData(response.data?.meta?.message));
        //     navigation.dispatch(DrawerActions.toggleDrawer());
        //     setTimeout(() => {
        //      store.dispatch(setShowToast(false));
        //     }, 2000)
        // }
}


