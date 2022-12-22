import * as React from 'react';
import PageLayout from "../commons/PageLayout";
import CategorieTag, {CategorieTagType} from "../features/Homepage/CategorieTag";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideo, fetchVideos, GetVideoRequestStateType, GetVideosRequestStateType} from "../redux/ducks/VideoDuck";
import {Fragment, useEffect, useState} from "react";
import VideoPreview from "../features/Homepage/VideoPreview";
import {CategoryType, ImageType, VideoType} from '../commons/types/VideoType';
import {fetchImages} from "../redux/ducks/ImageDuck";
import ImagePreview from "../features/Homepage/ImagePreview";
import imagePreview from "../features/Homepage/ImagePreview";
import {fetchCategories} from "../redux/ducks/CategoryDuck";
import { Dialog, Transition } from '@headlessui/react'
import Drop from "../components/Drop";
import {useCookies} from "react-cookie";
import  {ReactComponent as Logo}  from '../assets/logo.svg';


export function MyModal() {
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            {/*<div className="fixed inset-0 flex items-center justify-center">*/}
            {/*    <button*/}
            {/*        type="button"*/}
            {/*        onClick={openModal}*/}
            {/*        className="bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"*/}
            {/*    >*/}
            {/*        Open dialog*/}
            {/*    </button>*/}
            {/*</div>*/}

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-95" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4  text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="py-10 px-20 border border-secWhite/30 shadow-lg shadow-secWhite/30  bg-black transform shadow-xl transition-all">
                                   <div className={"text-white flex flex-col items-center space-y-4 x"}>
                                       <Logo className={"h-12 w-44"}/>
                                       <span className={"text-5xl text-bold"}>Age Verification</span>
                                       <span className={"text-semibold whitespace-nowrap"}>Bouffonnhub is an adult community that contains age-restricted content.</span>
                                       <span>You must be 18 years old or over to enter.</span>

                                       <button
                                       onClick={()=> setIsOpen(false)}
                                           className={"bg-secGrey py-5 px-2 flex rounded-md"}>I am 18 or older - Enter</button>
                                   </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const BoffonHubModal:React.FC<{}> =()=>{
    const [cookies, setCookie] = useCookies(['is_of_age']);
    const isOfAge = cookies.is_of_age;
    const [isModalOpen, setIsModalOpen] = useState(!isOfAge);

    const handleClose = () => {
        setIsModalOpen(false);
        const expires = (60 * 60) * 300
        const inOneHour = new Date(new Date().getTime() + expires)
        setCookie("is_of_age", true, {
            expires: inOneHour
        });
    }
    return (
        <Dialog
            open={isModalOpen}
            onClose={handleClose}
            className=""
        >
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded bg-primGrey">
                    <div>
                        THIS IS BOUFFON HUB
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
const HomePage: React.FC = (props) => {


    const {
        videos,
        isLoading,
        isError,
    } = useSelector((state: any) => state.videos)

    const {
        categories,
    } = useSelector((state: any) => state.categories);

    const imagesState = useSelector((state: any) => state.images)
    const dispatch = useDispatch();
    const handleFetchVideos = () => {
        dispatch(fetchVideos());
    }
    const handleFetchImages = () => {
        dispatch(fetchImages());
    }
    const handleFetchCategories = () => {
        dispatch(fetchCategories());
    }
    useEffect(() => {
        handleFetchVideos();
        handleFetchImages();
        handleFetchCategories();
    }, [])


    return (
        <PageLayout>
            <MyModal/>
            <div className={"flex-col space-y-6 "}>
                <div className={"flex flex-col space-y-6 items-center"}>
                    <div className={"border border-white/10 text-white w-3/5 py-3 text-center"}>
                        <span className={""}>You are now viewing BouffonHub in English. Passer le TOEIC.</span>
                    </div>
                    <div className={"bg-primGrey text-primary w-2/5 py-3 text-center"}>
                        <span className={""}>Bouffonhub's CREAMY CHRISTMAS COOKIES and MILK are back for a limited time!!</span>
                    </div>
                </div>

                <span className={"text-xl text-primary"}
                >Hot Porn Videos in Malgashi {'>'}</span>
                <div className={"flex space-x-3"}>
                    {categories && categories.sort(() => 0.5 - Math.random()).slice(0, 7).map((category:CategoryType) => {
                        return (
                            <>
                                <CategorieTag category={category}/>
                            </>
                        )
                    })}
                </div>

                <div className={"grid grid-cols-4 gap-4"}>
                    {!isLoading && !isError && videos &&
                            videos.map((video: VideoType) => {
                                return (
                                    <>
                                        <VideoPreview video={video} verticalPreview={false}/>
                                    </>
                                )
                            })
                    }
                </div>
                <span className={"text-xl text-primary"}
                > User Posted Images {'>'}</span>
                <div className={"grid grid-cols-4 gap-4"}>
                    {!imagesState.isLoading && !imagesState.isError && imagesState.images &&
                        imagesState.images.map((image: ImageType) => {
                            return (
                                <>
                                    <ImagePreview image={image} verticalPreview={false}/>
                                </>
                            )
                        })
                    }
                </div>

            </div>

        </PageLayout>

    );
};



export default HomePage;