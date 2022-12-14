import {UserType} from "../../commons/types/VideoType";
import exp from "constants";

export const userActions = {
    GET_USER: "GET_USER",
    SET_USER_SUCCESS: "SET_USER_SUCCESS",
    SET_USER_ERROR: "SET_USER_ERROR",
}

export interface userRequestStateType {
    user?: UserType,
    userID?: string,
    isLoading: boolean,
    isError: boolean,
}
const initialUserState:userRequestStateType = {
    user:undefined,
    isLoading:false,
    isError:false,
}

interface getUserActionType {
    type: string,
    payload: {
        user?: UserType
        userId: string
    }
}

export const fetchUser = (userId:string):getUserActionType => ({
    type: userActions.GET_USER,
    payload:{
        userId
    }
})

export const setUserSuccess = (user: UserType, userId:string):getUserActionType => ({
    type: userActions.SET_USER_SUCCESS,
    payload: {
        user, userId
    }
})

export const setUserError = (userId:string):getUserActionType => ({
    type: userActions.SET_USER_ERROR,
    payload:{
        userId
    }
})

const userReducer = (state = initialUserState, action:getUserActionType) => {
    switch (action.type) {
        case userActions.GET_USER:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case userActions.SET_USER_SUCCESS:{
            const {user} = action.payload;
            const newState = {...state,
                user:user,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case userActions.SET_USER_ERROR:{
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
    userReducer
}