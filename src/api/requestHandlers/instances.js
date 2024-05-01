import axios from "axios";
import { store } from "../../redux/store/store";
import { baseURL } from "./baseURLs"

export const instance = () => {
  const userData = store.getState().userReducer.userData
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + userData?.token,
    } 
  });
}
export const instanceWithoutBearer = () => {
  const userData = store.getState().userReducer.userData
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: userData?.token,
    } 
  });
}
export const instanceWithoutHeader = () => axios.create({
  baseURL: baseURL,
});
export const instanceFormData = () => {
  const userData = store.getState().userReducer.userData
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: "Bearer " + userData?.token,
      "Content-type": 'multipart/form-data'
    },
    transformRequest: (data) => { return data }
  });
}