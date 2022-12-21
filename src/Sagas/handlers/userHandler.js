import {call, put} from 'redux-saga/effects';
import {requestGetUser, requestGetUserByUserName, requestGetUsers} from "../requests/userRequest";
import {
    setGetUserByUsernameError,
    setGetUserByUsernameSuccess, setGetUsersError, setGetUsersSuccess,
    setUserError,
    setUserSuccess
} from "../../redux/ducks/UserDuck";

export function* handleGetUser(action) {
    const userId = action.payload.userId;
    try {
        const response = yield call(requestGetUser, userId);
        const {data} = response;
        yield put(setUserSuccess(data, userId))
    } catch (e) {
        setUserError(userId)
    }
}

export function* handleGetUserByUsername(action) {
    const userUsername = action.payload.userUsername;
    try {
        const response = yield call(requestGetUserByUserName, userUsername);
        const {data} = response;
        yield put(setGetUserByUsernameSuccess(data, userUsername))
    } catch (e) {
        setGetUserByUsernameError(userUsername)
    }
}

export function* handleGetUsers(action) {
    try {
        const response = yield call(requestGetUsers);
        const {data} = response;
        yield put(setGetUsersSuccess(data))
    } catch (e) {
        setGetUsersError()
    }
}