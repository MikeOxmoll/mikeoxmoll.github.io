import React, {Component, useContext, useState} from 'react';
import {AuthContext} from "../../routes/AuthProvider";
import {useNavigate} from "react-router-dom";
import {buildMediaImageUrl} from "../../routes/Routes";
import PageLayout from "../../commons/PageLayout";
import {VideoCataloger} from "../../pages/ContentCatalogPage";
import {UserType} from "../../commons/types/VideoType";
import { Dialog } from '@headlessui/react'
import Drop from "../../components/Drop";
import {ImageUploadType} from "../../commons/types/UploadTypes";



const achievements:string[] = ["The Virgin", "Real Man", "20 Years Old", "Boufon"]

export const EditImageModal:React.FC<{isOpen:boolean, closeModal:()=>void, dropUrl:string}> = ({isOpen, closeModal, dropUrl}) => {

    const onRessourceUpload = (meta:any, file:any, status:string) =>{
        if(status === 'done' ){

        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => closeModal()}
            className=""
        >
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded bg-primGrey">
                   <div>
                       <Drop url={dropUrl} handleRessourcePost={onRessourceUpload} acceptSchema={"image/*"}/>
                   </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )

    return (
        <Dialog open={isOpen} onClose={() => closeModal()}>
            <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>

                <p>
                    Are you sure you want to deactivate your account? All of your data
                    will be permanently removed. This action cannot be undone.
                </p>

                <button onClick={() => closeModal()}>Deactivate</button>
                <button onClick={() => closeModal()}>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    )
}

const UserDetail:React.FC<{detailName:string, detail:string}> = ({detail, detailName}) => {
    return (
        <div className={"flex space-x-2"}>
            <span className={"text-secWhite/30 font-semibold "}>{detailName} : </span>
            <span className={"text-secWhite/80  "}>{detail}</span>
        </div>
    )
}
const AchievementElement:React.FC<{user: UserType, achievement:string}> = ({achievement, user}) => {
    const imgSrc = require('../../assets/pfp/default-pfp-1.png');
    return (
        <div className={"bg-primGrey flex p-4 space-x-3"}>
            <img
                src={imgSrc}
                className={"w-12 border border-black border-2"}
            />
            <div className={"flex flex-col"}>
                <span className={"text-secWhite text-sm"}>
                    <span className={"text-primary font-semibold"}>{user.username}</span> unlocked a new achievement: "{achievement}"</span>
                <span className={"text-xs text-secWhite/30"}>12 hours ago</span>
            </div>
        </div>
    )
}

const AchievementView:React.FC = () => {
    const {user } = useContext(AuthContext);
    if(!user) return <>ERROR</>
    return (
        <div className={"flex flex-col flex-grow space-y-3"}>
            {achievements.map(achiev => {
                return (
                    <AchievementElement user={user} achievement={achiev}/>
                )
            })}
        </div>
    )
}
const ProfilePage: React.FC = () => {
    const { onLogin, onLogout, token, isUserAuthenticated, user } = useContext(AuthContext);

    const navigate = useNavigate();
    const userPfpUrl = user && user.username==="fuckmeimdumb" ? buildMediaImageUrl(user.id_profile_picture)  : "src/assets/camera.svg";

    const [contentView, setContentView] = useState(<VideoCataloger/>)
    const [contentViewTitle, setContentViewTitle] = useState("content")
    const [isModalOpen,setIsModalOpen] = useState(false)
    const changeContentView = (title: string) => {

    }

    if(!user) return (
        <div>
            ERROR
        </div>
    )
    console.log(user)
    const imgSrc = user.id_profile_picture && user.id_profile_picture !== "" ? buildMediaImageUrl(user.id_profile_picture)  : require('../../assets/pfp/default-pfp-1.png');

    const contentViewIsActive = contentView === <VideoCataloger/>
    console.log(isModalOpen)

    return (
        <PageLayout>
            <EditImageModal isOpen={isModalOpen} closeModal={()=> setIsModalOpen(false)}
                            dropUrl={`http://localhost:8080/media-images/update-user-pic/${user.id_author}`}
            />


            <div className={"bg-white w-full px-4 py-4"} style={{ backgroundImage:  `url("https://di.phncdn.com/static/www-static/images/profile/cover/full/pornhub/(m=eRSa4qFxcWaAb)(mh=MuQpifh_FDfQWhvd)001.jpg")` }}>
                <div className={"flex space-x-4"}>
                    <div className={"relative group "}>
                        <img
                            src={imgSrc}
                            className={"w-48 border border-black border-2 object-cover h-48"}
                        />
                        <button
                        onClick={()=> setIsModalOpen(true)}
                            className={"invisible flex justify-center items-center opacity-80 group-hover:visible top-0 absolute w-full bg-primGrey h-full"}>
                            <span>Edit Profile Picture</span>
                        </button>
                        {/*<div className={"cursor-pointer invisible flex justify-center items-center opacity-80 group-hover:visible top-0 absolute w-full bg-primGrey h-full"}>*/}
                        {/*    <span>Edit profile picture</span>*/}
                        {/*</div>*/}
                    </div>

                    <div className={"flex flex-col justify-end"}>
                        <span className={"font-bold text-2xl"}>{user.username}</span>
                        <span>France</span>
                    </div>

                </div>
            </div>
            <div className={"bg-secGrey flex mb-5"}>
                <div className={`w-32 py-3 border-b border-b-secGrey ${contentViewIsActive && "border-b-primary"}  flex justify-center`}
                onClick={()=> setContentView(<AchievementView/>)}
                >
                    <span className={"text-secWhite"}>Achievements</span>
                </div>

                <div className={`w-32 py-3 border-b border-b-secGrey ${!contentViewIsActive && "border-b-primary"}  flex justify-center`}
                     onClick={()=> setContentView(<VideoCataloger/>)}
                >
                    <span className={"text-secWhite"}>Content</span>
                </div>

            </div>

            <div className={"flex space-x-3"}>
                <div className={"flex flex-grow w-3/4 "}>
                    {contentView}
                </div>
                <div className={"w-1/4"}>
                    about
                    <div className={"space-y-2"}>
                        <UserDetail detailName={"Gender"} detail={"Racist"}/>
                        <UserDetail detailName={"Country"} detail={"France"}/>
                        <UserDetail detailName={"Alignment"} detail={"Extreme Droite"}/>
                        <UserDetail detailName={"Dick Size"} detail={"Massive"}/>
                    </div>
                </div>
            </div>

        </PageLayout>
    );
}

export default ProfilePage;