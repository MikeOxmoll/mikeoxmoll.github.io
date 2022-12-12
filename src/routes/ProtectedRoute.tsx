import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from 'react-router-dom';
import React, {ReactNode, useContext} from "react";
import {AuthContext} from "./AuthProvider";

export const ProtectedRoute:React.FC<{ children: ReactNode }> = ({ children }) => {
    const { onLogin, onLogout,token,user } = useContext(AuthContext);

    // if (!value.token) {
    //     return <Navigate to="/login" replace />;
    // }
    //
    // return children;

    return (
        !user ? (
            <>
                <Navigate to="/login" replace />;
            </>

        ) : (
            <>
                {children}
            </>
        )
    )

};

