import {call, put} from 'redux-saga/effects';
import {requestGetImage, requestGetImages, requestPostImage} from "../requests/imageRequests";
import {setGetImagesSuccess, setGetImageSuccess, } from "../../redux/ducks/ImageDuck";

export function* handlePostImage(action) {
    const imageUpload = action.payload.imageUpload;
    try {
        const response = yield call(requestPostImage, imageUpload);
        const {data} = response;
        console.log(data)
        yield put(setGetImageSuccess(data, imageUpload))

    } catch (e) {
        console.log(e)
    }
}

export function* handleGetImage(action) {
    const imageId = action.payload.imageId;
    try {
        const response = yield call(requestGetImage, imageId);
        const {data} = response;
        console.log("got image")
        console.log(data)
        yield put(setGetImageSuccess(data, imageId))

    } catch (e) {
        console.log(e)
    }
}

export function* handleGetImages(action) {
    try {
        const response = yield call(requestGetImages);
        const {data} = response;
        yield put(setGetImagesSuccess(data))
    } catch (e) {
        console.log(e)
    }
}