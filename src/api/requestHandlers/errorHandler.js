import Toast from 'react-native-simple-toast';
// import * as RootNavigation from "../../routes/rootNavigation/RootNavigation";

export const errorHandler = async (error) => {
    console.log(error,"fffff");
    // const navigation = RootNavigation
    try {
        if (error?.response?.status == 403) {
            Toast.show(error?.response?.data?.message.toString(), Toast.SHORT);
            // setTimeout(() => {
            //     store.dispatch(setMessageData(error?.response?.data?.error.toString()));
            // }, 3000)
        } else if (error?.response?.status == 440) {
            Toast.show(error?.response?.data?.message ?error?.response?.data?.message: "Something Went wrong", Toast.SHORT);
            // setTimeout(() => {
            // store.dispatch(setMessageData(error?.response?.data?.error ?error?.response?.data?.error: "Something Went wrong"));
            // }, 3000)
        }
        else if (error?.response?.status == 400) {
            Toast.show(error?.response?.data?.message ?error?.response?.data?.message: "Something Went wrong", Toast.SHORT);

            // setTimeout(() => {
            // store.dispatch(setMessageData(error?.response?.data?.error ? error?.response?.data?.error  : "Something Went wrong"));
            // }, 3000)
        }
        else if (error?.response?.status == 422) {
            Toast.show(error?.response?.data?.message ?error?.response?.data?.message: "Something Went wrong", Toast.SHORT);

            // setTimeout(() => {
            //     // store.dispatch(setMessageData(error?.response?.data?.detail[0]))
            //     store.dispatch(setShowToast(true))
            //     store.dispatch(setShowMessage(true))
            //      store.dispatch(setMessageData(error?.response?.data?.error ? error?.response?.data?.error  : "Something Went wrong"));
            //     setTimeout(() => {
            //         store.dispatch(setShowToast(false))
            //     }, 2000)
            // }, 3000)
        }
        else {
            Toast.show(error?.response?.data?.message ?error?.response?.data?.message: "Something Went wrong", Toast.SHORT);

            // store.dispatch(setMessageData(error?.response?.data?.error ? error?.response?.data?.error : "Something Went wrong"))
            // setTimeout(() => {
            //     store.dispatch(setShowToast(false))
            // }, 2000)
        }

    } catch (error) {
        console.log(error);
    }

}
