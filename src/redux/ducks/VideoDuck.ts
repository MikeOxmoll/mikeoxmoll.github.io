import {RessourceType, VideoType} from "../../commons/types/VideoType";
import {VideoUploadType} from "../../commons/types/UploadTypes";

export const videoActions = {
    GET_VIDEO: "GET_VIDEO",
    SET_GET_VIDEO_SUCCESS: "SET_VIDEO_SUCCESS",
    SET_GET_VIDEO_ERROR: "SET_VIDEO_ERROR",
    GET_VIDEOS: "GET_VIDEOS",
    SET_GET_VIDEOS_SUCCESS: "SET_GET_VIDEOS_SUCCESS",
    SET_GET_VIDEOS_ERROR: "SET_GET_VIDEOS_ERROR",
    POST_VIDEO: "POST_VIDEO",
    SET_POST_VIDEO_SUCCESS: "SET_POST_VIDEO_SUCCESS",
    SET_POST_VIDEO_ERROR: "SET_POST_VIDEO_ERROR",
    GET_VIDEOS_BY_PARAM: "GET_VIDEOS_BY_PARAM",
    SET_GET_VIDEOS_BY_PARAM_SUCCESS: "SET_GET_VIDEOS_BY_PARAM_SUCCESS",
    SET_GET_VIDEOS_BY_PARAM_ERROR: "SET_GET_VIDEOS_BY_PARAM_ERROR",
}
/*
Exports relating to a get request of a single video
 */
export interface GetVideoRequestStateType {
    video?: VideoType,
    videoID?: string,
    isLoading: boolean,
    isError: boolean,
}

const initialGetVideoState:GetVideoRequestStateType = {
    video:undefined,
    isLoading:false,
    isError:false,
}

interface getVideoActionType {
    type: string,
    payload: {
        video?: VideoType
        videoId: string
    }
}
//TODO Fix
interface getVideoActionType {
    type: string,
    payload: {
        video?: VideoType
        videoId: string
    }
}

export const fetchVideo = (videoId: string) => ({
    type: videoActions.GET_VIDEO,
    payload:{
        videoId: videoId
    }
})

export const setGetVideoSuccess = (video: VideoType, videoId:string) => ({
    type: videoActions.SET_GET_VIDEO_SUCCESS,
    payload: {
        video: video,videoId
    }
})

export const setGetVideoError = () => ({
    type: videoActions.SET_GET_VIDEO_ERROR,
})

const getVideoReducer = (state = initialGetVideoState, action:getVideoActionType) => {
    switch (action.type) {
        case videoActions.GET_VIDEO:{
            const {videoId} = action.payload;
            const newState = {
                ...state,
                videoId,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case videoActions.SET_GET_VIDEO_SUCCESS:{
            const {video} = action.payload;
            const newState = {...state,
                video:video,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case videoActions.SET_GET_VIDEO_ERROR:{
            const newState = {...state,
                isLoading: false,
                isError:true
            }
            return newState;
        }

        default: {
            return state;
        }
    }
}

/*
Exports relating to a get request of a multiple videos
 */
export interface GetVideosRequestStateType {
    videos?: VideoType[],
    isLoading: boolean,
    isError: boolean,
}

const initialGetVideosState:GetVideosRequestStateType = {
    videos:undefined,
    isLoading:false,
    isError:false,
}

interface getVideosActionType {
    type: string,
    payload: {
        videos?: VideoType[]
    }
}

export const fetchVideos = ():getVideosActionType => ({
    type: videoActions.GET_VIDEOS,
    payload:{

    }
})

export const setGetVideosSuccess = (videos: VideoType[]):getVideosActionType => ({
    type: videoActions.SET_GET_VIDEOS_SUCCESS,
    payload: {
        videos: videos
    }
})

export const setGetVideosError = ():getVideosActionType => ({
    type: videoActions.SET_GET_VIDEOS_ERROR,
    payload:{

    }
})

const getVideosReducer = (state = initialGetVideosState, action:getVideosActionType) => {
    switch (action.type) {
        case videoActions.GET_VIDEOS:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case videoActions.SET_GET_VIDEOS_SUCCESS:{
            const videos = action.payload.videos;

            const newState = {
                ...state,
                videos:videos,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case videoActions.SET_GET_VIDEOS_ERROR:{
            const newState = {
                ...state,
                isLoading: false,
                isError:true
            }
            return newState;
        }
        default:
            return state

    }
}

/*
Exports relating to a post request of a single video
 */
export interface PostVideoRequestStateType {
    videoUpload?: VideoUploadType,
    video?: VideoType,
    isLoading: boolean,
    isError: boolean,
}

const initialPostVideosState:PostVideoRequestStateType = {
    videoUpload:undefined,
    video:undefined,
    isLoading:false,
    isError:false,
}

interface PostVideoActionType {
    type: string,
    payload: {
        videoUpload?: VideoUploadType, //Information used to create video
        video:VideoType, //Video object returned from server
    }
}

export const postVideo = (videoUpload: VideoUploadType) => ({
    type: videoActions.POST_VIDEO,
    payload:{
        videoUpload: videoUpload
    }
})

export const setPostVideoSuccess = (video: VideoType) => ({
    type: videoActions.SET_POST_VIDEO_SUCCESS,
    payload: {
        video: video,
    }
})

export const setPostVideoError = () => ({
    type: videoActions.SET_POST_VIDEO_ERROR,
})

const postVideoReducer = (state = initialPostVideosState, action:PostVideoActionType) => {
    switch (action.type) {
        case videoActions.POST_VIDEO:{
            const {videoUpload} = action.payload;
            const newState = {
                ...state,
                videoUpload:videoUpload,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case videoActions.SET_POST_VIDEO_SUCCESS:{
            const {video} = action.payload;
            const newState = {...state,
                video:video,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case videoActions.SET_POST_VIDEO_ERROR:{
            const newState = {...state,
                isLoading: false,
                isError:true
            }
            return newState;
        }

        default: {
            return state;
        }
    }
}

/*
Exports relating to a get request of a list of video with parameters
 */
export interface RessourceRequestParamsType {
    ressourceId?:string,
    ressourceCategoryIds?:string[],
    ressourceCategoryNames?:string[],
    ressourceAuthorId?:string[],
}

export interface GetVideoByParamRequestStateType {
    videos?: VideoType[],
    videoRequestParams?: RessourceRequestParamsType,
    isLoading: boolean,
    isError: boolean,
}

const initialGetVideosByParamState:GetVideoByParamRequestStateType = {
    isLoading:false,
    isError:false,
}

interface getVideosByParamActionType {
    type: string,
    payload: {
        videos?: VideoType[]
        videoRequestParams: RessourceRequestParamsType,
    }
}

export const fetchVideosByParam = (videoRequestParams: RessourceRequestParamsType) => ({
    type: videoActions.GET_VIDEOS_BY_PARAM,
    payload:{
        videoRequestParams: videoRequestParams
    }
})

export const setGetVideosByParamSuccess = (videos: VideoType[], videoRequestParams: RessourceRequestParamsType) => ({
    type: videoActions.SET_GET_VIDEOS_BY_PARAM_SUCCESS,
    payload: {
        videos,videoRequestParams
    }
})

export const setGetVideosByParamError = () => ({
    type: videoActions.SET_GET_VIDEOS_BY_PARAM_ERROR,
})

const getVideosByParamReducer = (state = initialGetVideosByParamState, action:getVideosByParamActionType) => {
    switch (action.type) {
        case videoActions.GET_VIDEOS_BY_PARAM:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case videoActions.SET_GET_VIDEOS_BY_PARAM_SUCCESS:{
            const {videos} = action.payload;
            const newState = {...state,
                videos,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case videoActions.SET_GET_VIDEOS_BY_PARAM_ERROR:{
            const newState = {...state,
                isLoading: false,
                isError:true
            }
            return newState;
        }

        default: {
            return state;
        }
    }
}


export {
    getVideosReducer,
    getVideoReducer,
    postVideoReducer,
    getVideosByParamReducer
}
