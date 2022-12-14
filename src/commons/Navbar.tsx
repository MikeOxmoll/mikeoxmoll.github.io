import * as React from 'react';
import  {ReactComponent as Logo}  from '../assets/logo_aos.svg';
import  {ReactComponent as CameraLogo}  from '../assets/video-camera.svg';
import  {ReactComponent as StarLogo}  from '../assets/star.svg';
import SearchBar from "./SearchBar";
import {routes, RouteType} from "../routes/Routes";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import {useContext} from "react";
import {AuthContext} from "../routes/AuthProvider";

const NavbarButton:React.FC<{Icon:React.FC, title:string}> = ({Icon, title}) => {
    return (
        <div className={"flex space-x-3"}>
            <Icon/>
            <span>
                {title}
            </span>
        </div>
    )
}
const NavbarElement:React.FC<{ element: RouteType }> = ({element}) => {
    const navigate = useNavigate();
    const {token} = useContext(AuthContext)
    const handleClick = () => {
        navigate(""+element.path);
    }
    return (
        <div className={"border-b-2 border-b-primGrey hover:border-b-primary cursor-pointer w-56 flex justify-center py-3"}
        onClick={() => handleClick()}
        >
            <span className={"text-secWhite uppercase text-xs"}>
                {element.name}</span>
        </div>
    )

}
const Navbar:React.FC = (props) => {
    const { onLogin, onLogout, token, isUserAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div className={"bg-primGrey "}>
            <div className={"flex px-16 py-2  space-x-5 items-center border-b border-b-secWhite/10"}>
                <Logo className={"h-12 w-56"} />
                <SearchBar/>
                <div className={"flex space-x-3 bg-secWhite/10 rounded-md items-center py-0.5 px-2 text-secWhite cursor-pointer"}
                onClick={()=> navigate("/dashboard")}
                >
                    <CameraLogo className={"fill-white w-4"}/>
                    <span className={""}> Dashboard </span>
                </div>
                {/*<div className={"flex space-x-3 bg-primary rounded-md items-center py-0.5 px-2 cursor-pointer"}*/}
                {/*     onClick={()=> navigate("/premium")}*/}
                {/*>*/}
                {/*    <StarLogo className={"w-3"}/>*/}
                {/*    <span> Upgrade </span>*/}
                {/*</div>*/}
                {isUserAuthenticated ?
                    <>
                        <div className={"flex space-x-3 bg-primary rounded-md items-center py-0.5 px-2 cursor-pointer whitespace-nowrap"}
                             onClick={()=> onLogout && onLogout()}
                        >
                            <StarLogo className={"w-3"}/>
                            <span> Log out </span>
                        </div>
                    </>
                    :
                    <>
                        <div className={"flex space-x-3 bg-primary rounded-md items-center py-0.5 px-2 cursor-pointer whitespace-nowrap"}
                             onClick={()=> navigate("/login")}
                        >
                            <StarLogo className={"w-3"}/>
                            <span> Log in </span>
                        </div>
                        <div className={"flex space-x-3 bg-primary rounded-md items-center py-0.5 px-2 cursor-pointer whitespace-nowrap"}
                             onClick={()=> navigate("/signup")}
                        >
                            <StarLogo className={"w-3"}/>
                            <span> Sign Up </span>
                        </div>
                    </>
                }




            </div>

            <div className={"flex space-x-0 w-full px-3"}>

                {routes.map((navElement) => (
                    <NavbarElement element={navElement}/>
                ))}
            </div>
        </div>
    );
}

export default Navbar;