import React, {ReactNode, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {requestGetAuthToken} from "./AuthenticationUtils";
import axios from "axios";
import {buildTokenUrl, buildVideoUrl} from "./Routes";
import {UserType} from "../commons/types/VideoType";
import {setFlagsFromString} from "v8";

interface DefaultValueType {
    token?:string,
    onLogin?: (usernmame: string, password: string)=>{},
    onLogout?: ()=>void,
    user?:UserType,

};
const defaultValue:DefaultValueType = {

}

export const AuthContext = React.createContext(defaultValue);

export const AuthProvider:React.FC<{ children: ReactNode }> = ({ children }) => {

    const [cookies, setCookie] = useCookies(['access_token']);
    const [user, setUser] = useState<UserType>();
    const navigate = useNavigate();
    const token = cookies.access_token;


    const handleLogin = async (usernmame: string, password: string) => {
        const loginPayload = {
            username: usernmame,
            password: password
        }
        axios.request({
            method:"post",
                url: buildTokenUrl(),
                auth: {
                    ...loginPayload
                }
        }).then(response => {
            const token  =  response.data.token;
            const user:UserType = response.data.user;
            setUser(user);
            const expires = (response.data.expires_in || 60 * 60) * 1000
            const inOneHour = new Date(new Date().getTime() + expires)
            setCookie("access_token", token, {
                expires: inOneHour
            });
            navigate('/')

        })
            .catch(err => navigate('/login'));
    };

    const handleLogout = () => {
        setCookie("access_token", null, );
        navigate('/')
    };

    const value:DefaultValueType = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};