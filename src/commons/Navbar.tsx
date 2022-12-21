import * as React from 'react';
import  {ReactComponent as CameraLogo}  from '../assets/video-camera.svg';
import  {ReactComponent as StarLogo}  from '../assets/star.svg';
import SearchBar from "./SearchBar";
import {headerLinks, routes, RouteType} from "../routes/Routes";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import {Fragment, useContext} from "react";
import {AuthContext} from "../routes/AuthProvider";
import  {ReactComponent as Logo}  from '../assets/logo.svg';
import { Menu } from '@headlessui/react'
import UserSettingsDropdown from "./UserSettingsDropdown";
const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
]
const NavbarUserProfil:React.FC = () => {
    return (
        <Menu>
            <Menu.Button>Options</Menu.Button>
            <Menu.Items>
                {links.map((link) => (
                    /* Use the `active` state to conditionally style the active item. */
                    <Menu.Item key={link.href} as={Fragment}>
                        {({ active }) => (
                            <a
                                href={link.href}
                                className={`${
                                    active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                }`}
                            >
                                {link.label}
                            </a>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
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
    const { onLogin, onLogout, token, isUserAuthenticated, user } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div className={"bg-primGrey "}>
            <div className={" flex  justify-center bg-black border-b border-b-secWhite/30"}>
                <div className={"max-w-max-content flex space-x-10"}>
                    {headerLinks.map((navElement) => (
                        <div className={"hover:bg-secGrey"}>
                            <span className={"text-secWhite/80 text-xs"}>{navElement.name.toLocaleUpperCase()}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={"flex  justify-center "}>
                <div className={"flex px-3 py-2  space-x-5 items-center max-w-max-content flex-grow"}>
                    <Logo className={"h-12 w-44"} />
                    <SearchBar/>
                    <div className={"flex space-x-3 bg-secWhite/10 rounded-md items-center py-0.5 px-2 text-secWhite cursor-pointer"}
                         onClick={()=> navigate("/dashboard")}
                    >
                        <CameraLogo className={"fill-white w-4"}/>
                        <span className={""}> Dashboard </span>
                    </div>
                    {isUserAuthenticated ?
                        <>
                            <UserSettingsDropdown/>
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
            </div>
            <div className={"border-t border-t-secWhite/10 flex flex-grow justify-center"}>
                <div className={"flex space-x-0 w-full px-3 max-w-max-content"}>
                    <div className={"flex"}>
                        {routes.map((navElement) => (
                            <NavbarElement element={navElement}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Navbar;