import axios from 'axios'
import {buildCategoryUrl} from "../../routes/Routes";

export function requestGetCategory(){
    return axios.request({
        method: "get",
        url: buildCategoryUrl(),
    })
}

export function requestGetCategories(){
    return axios.request({
        method: "get",
        url: buildCategoryUrl()
    })
}