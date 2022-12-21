import {UserType} from "../../commons/types/VideoType";
import exp from "constants";

export const userActions = {
    GET_USER: "GET_USER",
    SET_USER_SUCCESS: "SET_USER_SUCCESS",
    SET_USER_ERROR: "SET_USER_ERROR",
    GET_USER_BY_USERNAME: "GET_USER_BY_USERNAME",
    SET_USER_BY_USERNAME_SUCCESS: "SET_USER_BY_USERNAME_SUCCESS",
    SET_USER_BY_USERNAME_ERROR: "SET_USER_BY_USERNAME_ERROR",
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

/*GET USER BY USERNAME*/
export const getUserByUsernameActions = {
    GET_USER: "GET_USER",
    SET_USER_SUCCESS: "SET_USER_SUCCESS",
    SET_USER_ERROR: "SET_USER_ERROR",
    USER_BY_USERNAME: "USER_BY_USERNAME",
    SET_USER_BY_USERNAME_SUCCESS: "SET_USER_BY_USERNAME_SUCCESS",
    SET_USER_BY_USERNAME_ERROR: "SET_USER_BY_USERNAME_ERROR",
}

export interface getUserByUsernameRequestStateType {
    user?: UserType,
    userID?: string,
    isLoading: boolean,
    isError: boolean,
}
const initialGetUserByUsernameState:getUserByUsernameRequestStateType = {
    user:undefined,
    isLoading:false,
    isError:false,
}

interface getUserByUsernameActionType {
    type: string,
    payload: {
        user?: UserType
        userUsername: string
    }
}

export const fetchUserByUsername = (userUsername:string):getUserByUsernameActionType => ({
    type: userActions.GET_USER_BY_USERNAME,
    payload:{
        userUsername
    }
})

export const setGetUserByUsernameSuccess = (user: UserType, userUsername:string):getUserByUsernameActionType => ({
    type: userActions.SET_USER_BY_USERNAME_SUCCESS,
    payload: {
        user, userUsername
    }
})

export const setGetUserByUsernameError = (userUsername:string):getUserByUsernameActionType => ({
    type: userActions.SET_USER_BY_USERNAME_ERROR,
    payload:{
        userUsername
    }
})

const getUserByUsernameReducer = (state = initialGetUserByUsernameState, action:getUserByUsernameActionType) => {
    switch (action.type) {
        case userActions.GET_USER_BY_USERNAME:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case userActions.SET_USER_BY_USERNAME_SUCCESS:{
            const {user} = action.payload;
            const newState = {...state,
                user:user,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case userActions.SET_USER_BY_USERNAME_ERROR:{
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

/*GET ALL USERs*/
export const getUsersActions = {
    GET_USERS: "GET_USER",
    SET_GET_USERS_SUCCESS: "SET_GET_USERS_SUCCESS",
    SET_GET_USERS_ERROR: "SET_GET_USERS_SUCCESS",
}

export interface getUsersRequestStateType {
    users?: UserType[],
    isLoading: boolean,
    isError: boolean,
}
const initialGetUsersState:getUsersRequestStateType = {
    users:undefined,
    isLoading:false,
    isError:false,
}

interface getUsersActionType {
    type: string,
    payload: {
        users?: UserType[]
    }
}

export const fetchUsers = ():getUsersActionType => ({
    type: getUsersActions.GET_USERS,
    payload:{

    }
})

export const setGetUsersSuccess = (users: UserType[]):getUsersActionType => ({
    type: getUsersActions.SET_GET_USERS_SUCCESS,
    payload: {
        users
    }
})

export const setGetUsersError = ():getUsersActionType => ({
    type: getUsersActions.SET_GET_USERS_ERROR,
    payload:{

    }
})

const getUsersReducer = (state = initialGetUsersState, action:getUsersActionType) => {
    switch (action.type) {
        case getUsersActions.GET_USERS:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case getUsersActions.SET_GET_USERS_SUCCESS:{
            const {users} = action.payload;
            const newState = {...state,
                users:users,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case getUsersActions.SET_GET_USERS_ERROR:{
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
    userReducer,
    getUserByUsernameReducer,
    getUsersReducer
}