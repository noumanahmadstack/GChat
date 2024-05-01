import { get_request, post_request, post_withoutHeader, put_request, put_requestFormData } from "../requestHandlers/requests";
import { forget, login,logout,otp,resetPassword,signup } from "./targets";

export const Login = async (body) => {
    const data = await post_withoutHeader({ target: login, body });
    return data;
}

export const Signup = async ({ body }) => {
    const data = await post_request({ target: signup, body });
    return data;
}

export const Logout = async () => {
    const data = await put_request({ target: logout});
    return data;
}

export const forgetPassword = async ({body}) => {
    const data = await put_requestFormData({ target: forget,body});
    return data;
}

export const MatchOtp = async ({params}) => {
    const data = await get_request({ target: otp,params});
    return data;
}

export const reset_Password = async ({body}) => {
    const data = await put_request({ target: resetPassword,body});
    return data;
}