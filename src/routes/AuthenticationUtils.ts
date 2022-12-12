//import Cookies from 'js-cookie'
import axios from "axios";
import {buildTokenUrl} from "./Routes";
/*
export const getAccessToken = () => Cookies.get('access_token')
export const getRefreshToken = () => Cookies.get('refresh_token')
export const isAuthenticated = () => !!getAccessToken()
import {  } from 'react-router-dom',

const redirectToLogin = () => {
   history.push('/login');
}*/
export function requestGetAuthToken(username: string, password: string){
    return axios.request({
        method: "post",
        url: buildTokenUrl(),
        params:{username: username, password: password}
    })
}
/*
export const authenticate = async (usernmame: string, password: string) => {
    try {
        const response = await requestGetAuthToken(usernmame, password) // call an API, returns tokens
        const {data} = response;
        return  data
    } catch (error) {
        return undefined
    }
}

export const authenticate2 = async (usernmame: string, password: string) => {
    if (!isAuthenticated()) {
        try {
            const response = await requestGetAuthToken(usernmame, password) // call an API, returns tokens
            const {data} = response;

            const expires = (data.expires_in || 60 * 60) * 1000
            const inOneHour = new Date(new Date().getTime() + expires)

            // you will have the exact same setters in your Login page/app too
            Cookies.set('access_token', data.access_token, { expires: inOneHour })
            Cookies.set('refresh_token', data.refresh_token)

            return true
        } catch (error) {
            redirectToLogin()
            return false
        }
    } else {
        return true;
    }

    //redirectToLogin()
    //return false
}*/