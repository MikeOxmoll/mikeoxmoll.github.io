import React from "react";


interface RouteType {
    name: String,
    path: String,
    component?: React.FC
}
const routes: RouteType[] = [
    {name: "Home", path:"/"},
    {name: "Categories", path:"/categories"},
    {name: "Live Authors", path:"/live-cams"},
    {name: "Authors", path:"/pornstars"},
    // {name: "Veux Baiser", path:"/"},
    {name: "Community", path:"/"},
]

const baseURL = "http://localhost:8080";
// const baseURL = "http://boufon.ddns.net";
const buildMediaVideoUrl = (params?:string):string => {
    const url = baseURL + "/media-videos";
    if(params) return url + "/" + params;
    console.log(url)
    return url;
}
// const mediaImageUrl = baseURL + "/media-images";
// const videoUrl = baseURL + "/videos";
// const imageUrl = baseURL + "/images";
// const categoryUrl = baseURL + "/categories";
// const userUrl = baseURL + "/users";
// const tokenUrl = baseURL + "/token";

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
    buildUserUrl,
    buildCategoryUrl,
    buildVideoUrl,
    buildImageUrl,
    buildTokenUrl,
    buildSignUpUrl
};
export type { RouteType };
