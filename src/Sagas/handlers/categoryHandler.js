import {call, put} from 'redux-saga/effects';
import {requestGetCategory, requestGetCategories} from "../requests/categoryRequests";
import {setCategoriesSuccess, setCategorySuccess, } from "../../redux/ducks/CategoryDuck";

export function* handleGetCategory(action) {
    try {
        const response = yield call(requestGetCategory);
        const {data} = response;
        yield put(setCategorySuccess(data))

    } catch (e) {
        console.log(e)
    }
}

export function* handleGetCategories(action) {
    try {
        const response = yield call(requestGetCategories);
        const {data} = response;
        yield put(setCategoriesSuccess(data))
    } catch (e) {
        console.log(e)
    }
}