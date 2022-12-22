import {ImageType} from "../../commons/types/VideoType";
import {ImageUploadType} from "../../commons/types/UploadTypes";
import {RessourceRequestParamsType} from "./VideoDuck";

export const imageActions = {
    GET_IMAGE: "GET_IMAGE",
    SET_GET_IMAGE_SUCCESS: "SET_IMAGE_SUCCESS",
    SET_GET_IMAGE_ERROR: "SET_IMAGE_ERROR",
    GET_IMAGES: "GET_IMAGES",
    SET_GET_IMAGES_SUCCESS: "SET_GET_IMAGES_SUCCESS",
    SET_GET_IMAGES_ERROR: "SET_GET_IMAGES_ERROR",
    POST_IMAGE: "POST_IMAGE",
    SET_POST_IMAGE_SUCCESS: "SET_POST_IMAGE_SUCCESS",
    SET_POST_IMAGE_ERROR: "SET_POST_IMAGE_ERROR",
    GET_IMAGES_BY_PARAM: "GET_IMAGES_BY_PARAM",
    SET_GET_IMAGES_BY_PARAM_SUCCESS: "SET_GET_IMAGES_BY_PARAM_SUCCESS",
    SET_GET_IMAGES_BY_PARAM_ERROR: "SET_GET_IMAGES_BY_PARAM_ERROR",
}
/*
Exports relating to a get request of a single image
 */
export interface GetImageRequestStateType {
    image?: ImageType,
    imageID?: string,
    isLoading: boolean,
    isError: boolean,
}

const initialGetImageState:GetImageRequestStateType = {
    image:undefined,
    isLoading:false,
    isError:false,
}

interface getImageActionType {
    type: string,
    payload: {
        image?: ImageType
        imageId: string
    }
}

export const fetchImage = (imageId: string) => ({
    type: imageActions.GET_IMAGE,
    payload:{
        imageId: imageId
    }
})

export const setGetImageSuccess = (image: ImageType, imageId:string) => ({
    type: imageActions.SET_GET_IMAGE_SUCCESS,
    payload: {
        image: image,imageId
    }
})

export const setGetImageError = () => ({
    type: imageActions.SET_GET_IMAGE_ERROR,
})

const getImageReducer = (state = initialGetImageState, action:getImageActionType) => {
    switch (action.type) {
        case imageActions.GET_IMAGE:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case imageActions.SET_GET_IMAGE_SUCCESS:{
            const {image} = action.payload;
            const newState = {...state,
                image:image,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case imageActions.SET_GET_IMAGE_ERROR:{
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
/*
Exports relating to a get request of a multiple images
 */
export interface GetImagesRequestStateType {
    images?: ImageType[],
    isLoading: boolean,
    isError: boolean,
}

const initialGetImagesState:GetImagesRequestStateType = {
    images:undefined,
    isLoading:false,
    isError:false,
}

interface getImagesActionType {
    type: string,
    payload: {
        images?: ImageType[]
    }
}

export const fetchImages = ():getImagesActionType => ({
    type: imageActions.GET_IMAGES,
    payload:{

    }
})

export const setGetImagesSuccess = (images: ImageType[]):getImagesActionType => ({
    type: imageActions.SET_GET_IMAGES_SUCCESS,
    payload: {
        images: images
    }
})

export const setGetImagesError = ():getImagesActionType => ({
    type: imageActions.SET_GET_IMAGES_ERROR,
    payload:{

    }
})

const getImagesReducer = (state = initialGetImagesState, action:getImagesActionType) => {
    switch (action.type) {
        case imageActions.GET_IMAGES:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case imageActions.SET_GET_IMAGES_SUCCESS:{
            const images = action.payload.images;

            const newState = {
                ...state,
                images:images,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case imageActions.SET_GET_IMAGES_ERROR:{
            const newState = {
                ...state,
                isLoading: false,
                isError:true
            }
            return newState;
        }
        default:
            return state

    }
}

/*
Exports relating to a post request of a single image
 */
export interface PostImageRequestStateType {
    imageUpload?: ImageUploadType,
    image?: ImageType,
    isLoading: boolean,
    isError: boolean,
}

const initialPostImagesState:PostImageRequestStateType = {
    imageUpload:undefined,
    image:undefined,
    isLoading:false,
    isError:false,
}

interface PostImageActionType {
    type: string,
    payload: {
        imageUpload?: ImageUploadType, //Information used to create image
        image:ImageType, //Image object returned from server
    }
}

export const postImage = (imageUpload: ImageUploadType) => ({
    type: imageActions.POST_IMAGE,
    payload:{
        imageUpload: imageUpload
    }
})

export const setPostImageSuccess = (image: ImageType) => ({
    type: imageActions.SET_POST_IMAGE_SUCCESS,
    payload: {
        image: image,
    }
})

export const setPostImageError = () => ({
    type: imageActions.SET_POST_IMAGE_ERROR,
})

const postImageReducer = (state = initialPostImagesState, action:PostImageActionType) => {
    switch (action.type) {
        case imageActions.POST_IMAGE:{
            const {imageUpload} = action.payload;
            const newState = {
                ...state,
                imageUpload:imageUpload,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case imageActions.SET_POST_IMAGE_SUCCESS:{
            const {image} = action.payload;
            const newState = {...state,
                image:image,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case imageActions.SET_POST_IMAGE_ERROR:{
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

export interface GetImageByParamRequestStateType {
    images?: ImageType[],
    imageRequestParams?: RessourceRequestParamsType,
    isLoading: boolean,
    isError: boolean,
}

const initialGetImagesByParamState:GetImageByParamRequestStateType = {
    isLoading:false,
    isError:false,
}

interface getImagesByParamActionType {
    type: string,
    payload: {
        images?: ImageType[]
        imageRequestParams: RessourceRequestParamsType,
    }
}

export const fetchImagesByParam = (imageRequestParams: RessourceRequestParamsType) => ({
    type: imageActions.GET_IMAGES_BY_PARAM,
    payload:{
        imageRequestParams: imageRequestParams
    }
})

export const setGetImagesByParamSuccess = (images: ImageType[], imageRequestParams: RessourceRequestParamsType) => ({
    type: imageActions.SET_GET_IMAGES_BY_PARAM_SUCCESS,
    payload: {
        images,imageRequestParams
    }
})

export const setGetImagesByParamError = () => ({
    type: imageActions.SET_GET_IMAGES_BY_PARAM_ERROR,
})

const getImagesByParamReducer = (state = initialGetImagesByParamState, action:getImagesByParamActionType) => {
    switch (action.type) {
        case imageActions.GET_IMAGES_BY_PARAM:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case imageActions.SET_GET_IMAGES_BY_PARAM_SUCCESS:{
            const {images} = action.payload;
            const newState = {...state,
                images,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case imageActions.SET_GET_IMAGES_BY_PARAM_ERROR:{
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
    getImagesReducer,
    getImageReducer,
    postImageReducer
}
