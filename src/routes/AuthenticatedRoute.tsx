import React, {Component, ReactChild, ReactComponentElement, ReactElement, ReactNode, useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {UserType} from "../commons/types/VideoType";

const AuthenticatedElement: React.FC<{component: ReactNode}> = (component) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user:UserType = {
        id:"",
        idProfilePicture:"",
        mail:"",
        name:"",
        username:"",
    }
    // useEffect(() => {
    //     authenticate("", "").then(isAuthenticated => {
    //         setIsAuthenticated(isAuthenticated)
    //     })
    // }, [])


   //return isAuthenticated ? component : null;

    return (
        isAuthenticated ? (
            <>
                {component}
            </>

        ) : (
            <></>
        )
    )
}
export const AuthenticatedRoute = (component: ReactComponentElement<any>, path:string) => (
    <Route
        path={path}
        element={ <AuthenticatedElement component={component}/>}
    />
)

