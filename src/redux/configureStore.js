import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {getVideoReducer, getVideosReducer, postVideoReducer} from "./ducks/VideoDuck";
import {userReducer} from "./ducks/UserDuck";
import {categoriesReducer, categoryReducer} from "./ducks/CategoryDuck";
import CreateSagaMiddleware from 'redux-saga'
import {watchSaga} from "../Sagas/rootSaga";

const sagaMiddleWare = CreateSagaMiddleware();
const middleware = [sagaMiddleWare];

const reducers = combineReducers({
    video:getVideoReducer,
    videos:getVideosReducer,
    user:userReducer,
    category:categoryReducer,
    categories:categoriesReducer,
    postVideo:postVideoReducer,
});

const store = configureStore({
    reducer:reducers,
    middleware,
})

sagaMiddleWare.run(watchSaga);
export default store;