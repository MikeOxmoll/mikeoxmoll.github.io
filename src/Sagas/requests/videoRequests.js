import axios from 'axios'
import {baseURL, buildVideoUrl, buildVideoUrlWithParams} from "../../routes/Routes";


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
    console.log("Request video by id :")
    console.log(videoId)
    console.log("At URL :")
    console.log(buildVideoUrl(videoId))
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

export function requestGetVideosByParams(videoRequestParams){

    return axios.request({
        method: "get",
        url: buildVideoUrlWithParams(videoRequestParams)
    })
}