import {takeLatest, takeEvery} from 'redux-saga/effects'
import {videoActions} from "../redux/ducks/VideoDuck";
import {categoryActions} from "../redux/ducks/CategoryDuck";
import {getUsersActions, userActions} from "../redux/ducks/UserDuck";
import {imageActions} from "../redux/ducks/ImageDuck";
import {handleGetVideo, handleGetVideos, handleGetVideosByParam, handlePostVideo} from "./handlers/videoHandler";
import {handleGetCategories, handleGetCategory} from "./handlers/categoryHandler";
import {handleGetUser, handleGetUserByUsername, handleGetUsers} from "./handlers/userHandler";
import {handleGetImage, handleGetImages, handlePostImage} from "./handlers/imageHandler";


export function* watchSaga() {
    yield takeLatest(videoActions.GET_VIDEO, handleGetVideo);
    yield takeLatest(videoActions.GET_VIDEOS, handleGetVideos);
    yield takeLatest(videoActions.POST_VIDEO, handlePostVideo);
    yield takeLatest(videoActions.GET_VIDEOS_BY_PARAM, handleGetVideosByParam);
    yield takeLatest(categoryActions.GET_CATEGORIES, handleGetCategories);
    yield takeLatest(categoryActions.GET_CATEGORY, handleGetCategory);
    yield takeLatest(userActions.GET_USER, handleGetUser);
    yield takeLatest(getUsersActions.GET_USERS, handleGetUsers);
    yield takeLatest(userActions.GET_USER_BY_USERNAME, handleGetUserByUsername);
    yield takeLatest(imageActions.GET_IMAGE, handleGetImage);
    yield takeLatest(imageActions.GET_IMAGES, handleGetImages);
    yield takeLatest(imageActions.POST_IMAGE, handlePostImage);
}