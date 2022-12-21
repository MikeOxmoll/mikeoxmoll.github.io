import {call, put} from 'redux-saga/effects';
import {requestGetVideo, requestGetVideos, requestGetVideosByParams, requestPostVideo} from "../requests/videoRequests";
import {setGetVideosByParamSuccess, setGetVideosSuccess, setGetVideoSuccess,} from "../../redux/ducks/VideoDuck";

export function* handlePostVideo(action) {
    const videoUpload = action.payload.videoUpload;

    try {
        const response = yield call(requestPostVideo, videoUpload);
        const {data} = response;
        console.log(data)
        yield put(setGetVideoSuccess(data, videoUpload))

    } catch (e) {
        console.log(e)
    }
}

export function* handleGetVideo(action) {
    const videoId = action.payload.videoId;
    try {
        const response = yield call(requestGetVideo, videoId);
        const {data} = response;
        console.log(data)

        yield put(setGetVideoSuccess(data, videoId))

    } catch (e) {
        console.log(e)
    }
}

export function* handleGetVideos(action) {
    try {
        const response = yield call(requestGetVideos);
        const {data} = response;
        yield put(setGetVideosSuccess(data))
    } catch (e) {
        console.log(e)
    }
}

export function* handleGetVideosByParam(action) {
    const videoRequestParams = action.payload.videoRequestParams;
    console.log("Handling Video Post Request")
    console.log(action)
    console.log(videoRequestParams)
    try {
        const response = yield call(requestGetVideosByParams, videoRequestParams);
        const {data} = response;
        console.log("got videos with request params : " + videoRequestParams.ressourceCategoryIds)
        console.log(data)
        yield put(setGetVideosByParamSuccess(data, videoRequestParams))

    } catch (e) {
        console.log(e)
    }
}