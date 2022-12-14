import {call, put} from 'redux-saga/effects';
import {requestGetUser} from "../requests/userRequest";
import {setUserError, setUserSuccess} from "../../redux/ducks/UserDuck";

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

