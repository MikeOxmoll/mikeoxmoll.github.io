import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from 'react-router-dom';
import React, {ReactNode, useContext} from "react";
import {AuthContext} from "./AuthProvider";

export const ProtectedRoute:React.FC<{ children: ReactNode, accessRoles:string[] }> = ({ children, accessRoles }) => {
    const { onLogin, onLogout,token,user,isUserAuthenticated } = useContext(AuthContext);


    isUserAuthenticated && console.log("is auth")
    !isUserAuthenticated && console.log("is not auth")
    if(!isUserAuthenticated){
        return (
            <>
                <Navigate to="/login" replace />;
            </>
        )
    }
    const hasRequiredRole = user && accessRoles.includes(user.role)
    console.log(user)
    if(!hasRequiredRole){
        return (
            <>
                <Navigate to="/dashboard" replace />;
            </>
        )
    }
    return (
        <>
            {children}
        </>
    )

};

