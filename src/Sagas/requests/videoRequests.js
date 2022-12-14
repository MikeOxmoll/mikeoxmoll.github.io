import axios from 'axios'
import {baseURL, buildVideoUrl} from "../../routes/Routes";


export function requestPostVideo(videoUpload) {
    return axios.request({
        method: "post",
        url: buildVideoUrl(),
        data:{
            ...videoUpload
        }
    })
}
export function requestGetVideo(videoId, token){
    return axios.request({
        method: "get",
        url: buildVideoUrl(videoId)
    })
}

export function requestGetVideos(){
    return axios.request({
        method: "get",
        url: buildVideoUrl()
    })
}