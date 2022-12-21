import React from "react";
import {RessourceRequestParamsType} from "../redux/ducks/VideoDuck";


interface RouteType {
    name: String,
    path: String,
    component?: React.FC
}
const routes: RouteType[] = [
    {name: "Home", path:"/"},
    {name: "Porn Videos", path:"/catalog"},
    {name: "Categories", path:"/categories"},
    {name: "Pornstars", path:"/pornstars"},
    {name: "Veux Baiser", path:"/julien_baiser"},
    {name: "Community", path:"/community"},
]

const headerLinks: RouteType[] = [
    {name: "SpiceVids", path:"/"},
    {name: "CIRST", path:"/categories"},
    {name: "RacisteHub", path:"/julien_baiser"},
    {name: "JJC", path:"/"},
    {name: "IleDeMerde", path:"/"},
    {name: "Julien", path:"/"},
    {name: "Anne Math", path:"/"},
    {name: "Zorbal", path:"/"},
    {name: "Cherif", path:"/"},
    {name: "Trust & Safety", path:"/"},
    {name: "En", path:"/"},
]
const baseURL = "http://localhost:8080";

const buildMediaVideoUrl = (params?:string):string => {
    const url = baseURL + "/media-videos";
    if(params) return url + "/" + params;
    console.log(url)
    return url;
}


const buildMediaImageUrl = (params?:string):string => {
    const url = baseURL + "/media-images";
    if(params) return url + "/" + params;
    return url;
}
const buildVideoUrl = (params?:string):string => {
    const url = baseURL + "/videos";
    if(params) return url + "/" + params;
    return url;
}
const buildVideoUrlWithParams = (videoRequestParams: RessourceRequestParamsType):string => {
    const url = baseURL + "/videos";
    if(videoRequestParams.ressourceAuthorId) return baseURL + "/videos-autho/" + videoRequestParams.ressourceAuthorId;
    if(videoRequestParams.ressourceCategoryIds) {
        console.log("Getting videos by Cat Ids")
        console.log(videoRequestParams.ressourceCategoryIds)
        let url = baseURL + "/videos-cats/" + videoRequestParams.ressourceCategoryIds;
        // videoRequestParams.ressourceCategoryIds.map(catName=>{ catName })

        return url;
    }
    return url;
}
const buildImageUrl = (params?:string):string => {
    const url = baseURL + "/images";
    if(params) return url + "/" + params;
    return url;
}
const buildCategoryUrl = (params?:string):string => {
    const url = baseURL + "/categories";
    if(params) return url + "/" + params;
    return url;
}
const buildUserUrl = (params?:string):string => {
    const url = baseURL + "/users";
    if(params) return url + "/" + params;
    return url;
}
const buildUserByUsernameUrl = (params?:string):string => {
    const url = baseURL + "/users-username";
    if(params) return url + "/" + params;
    return url;
}
const buildTokenUrl = (params?:string):string => {
    const url = baseURL + "/token";
    if(params) return url + "/" + params;
    return url;
}
const buildSignUpUrl = (params?:string):string => {
    const url = baseURL + "/signup";
    if(params) return url + "/" + params;
    return url;
}
export {
    baseURL,
    buildMediaVideoUrl,
    buildMediaImageUrl,
    routes,
    headerLinks,
    buildUserUrl,
    buildCategoryUrl,
    buildVideoUrl,
    buildImageUrl,
    buildTokenUrl,
    buildSignUpUrl,
    buildUserByUsernameUrl,
    buildVideoUrlWithParams,
};
export type { RouteType };
