import {CategoryType} from "../../commons/types/VideoType";

export const categoryActions = {
    GET_CATEGORY: "GET_CATEGORY",
    SET_CATEGORY_SUCCESS: "SET_CATEGORY_SUCCESS",
    SET_CATEGORY_ERROR: "SET_CATEGORY_ERROR",
    GET_CATEGORIES: "GET_CATEGORIES",
    SET_CATEGORIES_SUCCESS: "SET_CATEGORIES_SUCCESS",
    SET_CATEGORIES_ERROR: "SET_CATEGORIES_ERROR",
}

export interface categoryRequestStateType {
    category?: CategoryType,
    categoryID?: string,
    isLoading: boolean,
    isError: boolean,
}
export interface categoriesRequestStateType {
    categories?: CategoryType[],
    isLoading: boolean,
    isError: boolean,
}

const initialCategoryState:categoryRequestStateType = {
    category:undefined,
    isLoading:false,
    isError:false,
}

const initialCategoriesState:categoriesRequestStateType = {
    categories:undefined,
    isLoading:false,
    isError:false,
}

interface getCategoryActionType {
    type: string,
    payload: {
        category?: CategoryType
        categoryId: string
    }
}

interface getCategoriesActionType {
    type: string,
    payload: {
        categories?: CategoryType[]
    }
}

export const fetchCategory = (categoryId: string) => ({
    type: categoryActions.GET_CATEGORY,
    payload:{
        categoryId: categoryId
    }
})

export const setCategorySuccess = (category: CategoryType) => ({
    type: categoryActions.SET_CATEGORY_SUCCESS,
    payload: {
        category: category
    }
})

export const setCategoryError = () => ({
    type: categoryActions.SET_CATEGORY_ERROR,
})

export const fetchCategories = ():getCategoriesActionType => ({
    type: categoryActions.GET_CATEGORIES,
    payload:{

    }
})

export const setCategoriesSuccess = (categories: CategoryType[]):getCategoriesActionType => ({
    type: categoryActions.SET_CATEGORIES_SUCCESS,
    payload: {
        categories: categories
    }
})

export const setCategoriesError = ():getCategoriesActionType => ({
    type: categoryActions.SET_CATEGORIES_ERROR,
    payload:{

    }
})

const categoryReducer = (state = initialCategoryState, action:getCategoryActionType) => {
    switch (action.type) {
        case categoryActions.GET_CATEGORY:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case categoryActions.SET_CATEGORY_SUCCESS:{
            const {category} = action.payload;
            const newState = {...state,
                category:category,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case categoryActions.SET_CATEGORY_ERROR:{
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

const categoriesReducer = (state = initialCategoriesState, action:getCategoriesActionType) => {
    switch (action.type) {
        case categoryActions.GET_CATEGORIES:{
            const newState = {
                ...state,
                isLoading: true,
                isError:false
            }
            return newState;
        }

        case categoryActions.SET_CATEGORIES_SUCCESS:{
            const categories = action.payload.categories;

            const newState = {
                ...state,
                categories:categories,
                isLoading: false,
                isError:false
            }
            return newState;
        }

        case categoryActions.SET_CATEGORIES_ERROR:{
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

export {
    categoriesReducer,
    categoryReducer
}
