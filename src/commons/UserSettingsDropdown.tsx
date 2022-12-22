import { Menu, Transition } from '@headlessui/react'
import React, {Component, Fragment, useContext, useEffect, useRef, useState} from 'react'
import { ChevronDownIcon, VideoCameraIcon, ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/20/solid'
import {AuthContext} from "../routes/AuthProvider";
import {useNavigate} from "react-router-dom";
import {buildMediaImageUrl} from "../routes/Routes";
import  {ReactComponent as StarLogo}  from '../assets/star.svg';

const SettingElement:React.FC<{title:string, redirectPath:string, icon:React.ReactNode}> = ({redirectPath, title, icon}) => {
    const navigate = useNavigate();

    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    onClick={()=>navigate(redirectPath)}
                    className={`${
                        active ? 'bg-secWhite/10' : 'text-secWhite font-semibold'
                    } group flex w-full items-center px-2 py-2 text-sm flex space-x-2 `}
                >
                    {icon}

                    <span>{title}</span>

                </button>
            )}
        </Menu.Item>
    )
}
const UserSettingsDropdown:React.FC = () => {
    const { onLogin, onLogout, token, isUserAuthenticated, user } = useContext(AuthContext);

    const navigate = useNavigate();
    const userPfpUrl = user && user.username==="fuckmeimdumb" ? buildMediaImageUrl(user.id_profile_picture)  : "src/assets/camera.svg";
    // const imgSrc = require('/src/assets/pfp/default-pfp-1.png')
    if(!user) return (
        <div>
            ERROR
        </div>
    )
    const imgSrc = user.id_profile_picture && user.id_profile_picture !== "" ? buildMediaImageUrl(user.id_profile_picture)  : require('../assets/pfp/default-pfp-1.png');

    return (
        <div className=" ">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <img
                            // src={`${userPfpUrl}`}
                            src={`${imgSrc}`}
                            alt="new"
                            className={"w-7 h-7 border border-black border-2 object-cover"}
                            // onClick={navigateToVideo}
                        />
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >

                    <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-primGrey bg-secGrey shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className={"flex justify-center py-2"}>
                            <span className={"font-semibold text-secWhite"}>Welcome <button><span className={"text-primary"}>{user?.username}</span></button></span>
                        </div>
                        <SettingElement title={"My Profile"}
                                        redirectPath={`/user_profile?username=${user?.username}`}
                                        icon={<UserIcon className={"w-5"}/>}/>
                        <SettingElement title={"My Profile"} redirectPath={""} icon={<VideoCameraIcon className={"w-5"}/>}/>
                        <SettingElement title={"Log Out"} redirectPath={"/logout"} icon={<ArrowRightOnRectangleIcon className={"w-5"}/>}/>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default UserSettingsDropdown;