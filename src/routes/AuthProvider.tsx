import React, {ReactNode, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {requestGetAuthToken} from "./AuthenticationUtils";
import axios from "axios";
import {buildSignUpUrl, buildTokenUrl, buildVideoUrl} from "./Routes";
import {UserType} from "../commons/types/VideoType";
import {setFlagsFromString} from "v8";
import signUpPage from "../pages/SignUpPage";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos} from "../redux/ducks/VideoDuck";
import {fetchUser, fetchUserByUsername} from "../redux/ducks/UserDuck";

interface DefaultValueType {
    token?:string,
    onLogin?: (usernmame: string, password: string)=>{},
    onLogout?: ()=>void,
    onSignUp?: (usernmame: string, name:string, password: string,id_profile_picture:string, setError:(err:any)=>void)=>{},
    user?:UserType,
    isUserAuthenticated:boolean

};
const defaultValue:DefaultValueType = {
    isUserAuthenticated:false
}

export const AuthContext = React.createContext(defaultValue);

export const AuthProvider:React.FC<{ children: ReactNode }> = ({ children }) => {

    const [cookies, setCookie] = useCookies(['access_token']);
    //const [user, setUser] = useState<UserType>();
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();
    const token = cookies.access_token;

    const {
        user,
        isLoading,
        isError,
    } = useSelector((state: any) => state.userByUsername)
    const dispatch = useDispatch();
    const handleFetchUser = (userId:string) => {
        dispatch(fetchUserByUsername(userId));
    }

    useEffect(() => {
        console.log(token);
        const bool = (token && token !== 'null');
        console.log("Setting token to : " + bool)
        setIsUserAuthenticated(token && token !== 'null');
    }, [])

    const handleSignUp = async (usernmame: string, name:string, password: string,id_profile_picture:string, setError:(err:any)=>void) => {
        const signUpPayload = {
            username: usernmame,
            name:name,
            password: password,
            id_profile_picture:id_profile_picture,
        }
        axios.request({
            method:"post",
            url: buildSignUpUrl(),
            data: {
                ...signUpPayload
            }
        }).then(response => {
            // const token  =  response.data.token;
            // const user:UserType = response.data.user;
            // setUser(user);
            // const expires = (response.data.expires_in || 60 * 60) * 1000
            // const inOneHour = new Date(new Date().getTime() + expires)
            // setCookie("access_token", token, {
            //     expires: inOneHour
            // });
            handleLogout();
            // setIsUserAuthenticated(true);
            // navigate('/')
        })
            .catch(err => {
                setError(err);
                setIsUserAuthenticated(false);
            });
    };

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
            handleFetchUser(usernmame);
            const token  =  response.data.token;
            const user:UserType = response.data.user;
            // setUser(user);
            const expires = (response.data.expires_in || 60 * 60) * 1000
            const inOneHour = new Date(new Date().getTime() + expires)
            setCookie("access_token", token, {
                expires: inOneHour
            });
            setIsUserAuthenticated(true);
            navigate('/')

        })
            .catch(err => {
            setIsUserAuthenticated(false);
            navigate('/login')
        });
    };

    const handleLogout = () => {
        setCookie("access_token", null, );
        setIsUserAuthenticated(false);
        navigate('/')
    };

    const value:DefaultValueType = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onSignUp:handleSignUp,
        user,
        isUserAuthenticated: (isUserAuthenticated || (token && token !== "null")) ,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};