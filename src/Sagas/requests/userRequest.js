import axios from 'axios'
import {buildUserUrl, buildUserByUsernameUrl} from "../../routes/Routes";

export function requestGetUser(userId){
    return axios.request({
        method: "get",
        url: buildUserUrl(userId)
    })
}

export function requestGetUserByUserName(userUsername){
    return axios.request({
        method: "get",
        url: buildUserByUsernameUrl(userUsername)
    })
}

export function requestGetUsers(){
    return axios.request({
        method: "get",
        url: buildUserUrl()
    })
}