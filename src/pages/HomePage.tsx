import * as React from 'react';
import PageLayout from "../commons/PageLayout";
import CategorieTag, {CategorieTagType} from "../features/Homepage/CategorieTag";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideo, fetchVideos, GetVideoRequestStateType, GetVideosRequestStateType} from "../redux/ducks/VideoDuck";
import {useEffect} from "react";
import VideoPreview from "../features/Homepage/VideoPreview";
import {CategoryType, ImageType, VideoType} from '../commons/types/VideoType';
import {fetchImages} from "../redux/ducks/ImageDuck";
import ImagePreview from "../features/Homepage/ImagePreview";
import imagePreview from "../features/Homepage/ImagePreview";
import {fetchCategories} from "../redux/ducks/CategoryDuck";

// const tags: CategorieTagType[] = [
//     {title: "action ou verite"},
//     {title: "condom"},
//     {title: "action ou verite francais"},
//     {title: "adrien laurent"},
//     {title: "hina daydream"},
// ]

interface ActionState {

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
            <div className={"flex-col space-y-6 "}>
                {/*<div className={"flex flex-col space-y-6 items-center"}>*/}
                {/*    <div className={"border border-white/10 text-white w-3/5 py-3 text-center"}>*/}
                {/*        <span className={""}>You are now viewing Pornhub in English. Passer à Français.</span>*/}
                {/*    </div>*/}
                {/*    <div className={"bg-primGrey text-primary w-2/5 py-3 text-center"}>*/}
                {/*        <span className={""}>Pornhub's UGLY HOLIDAY SWEATERS and SOCKS are back for a limited time!!</span>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div className={"flex space-x-3"}>
                    {categories && categories.sort(() => 0.5 - Math.random()).slice(0, 7).map((category:CategoryType) => {
                        return (
                            <>
                                <CategorieTag category={category}/>
                            </>
                        )
                    })}
                </div>

                <span className={"text-xl text-primary"}
                >User Posted Videos {'>'}</span>

                <div className={"grid grid-cols-5 gap-4"}>
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