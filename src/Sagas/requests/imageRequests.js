import axios from 'axios'
import {baseURL, buildImageUrl} from "../../routes/Routes";


export function requestPostImage(imageUpload) {
    return axios.request({
        method: "post",
        url: buildImageUrl(),
        data:{
            ...imageUpload
        }
    })
}
export function requestGetImage(imageId, token){
    return axios.request({
        method: "get",
        url: buildImageUrl(imageId)
    })
}

export function requestGetImages(){
    return axios.request({
        method: "get",
        url: buildImageUrl()
    })
}