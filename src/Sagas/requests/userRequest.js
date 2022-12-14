import axios from 'axios'
import {buildUserUrl} from "../../routes/Routes";

export function requestGetUser(userId){
    return axios.request({
        method: "get",
        url: buildUserUrl(userId)
    })
}
