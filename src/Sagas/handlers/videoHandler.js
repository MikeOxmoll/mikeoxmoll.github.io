import {call, put} from 'redux-saga/effects';
import {requestGetVideo, requestGetVideos, requestPostVideo} from "../requests/videoRequests";
import {setGetVideosSuccess, setGetVideoSuccess, } from "../../redux/ducks/VideoDuck";

export function* handlePostVideo(action) {
    const videoUpload = action.payload.videoUpload;
    console.log("Handling Video Post Request")
    console.log(action)
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
        console.log("got video")
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