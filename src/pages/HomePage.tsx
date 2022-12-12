import * as React from 'react';
import PageLayout from "../commons/PageLayout";
import CategorieTag, {CategorieTagType} from "../features/Homepage/CategorieTag";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideo, fetchVideos, GetVideoRequestStateType, GetVideosRequestStateType} from "../redux/ducks/VideoDuck";
import {useEffect} from "react";
import VideoPreview from "../features/Homepage/VideoPreview";
import { VideoType } from '../commons/types/VideoType';

const tags: CategorieTagType[] = [
    {title: "action ou verite"},
    {title: "condom"},
    {title: "action ou verite francais"},
    {title: "adrien laurent"},
    {title: "hina daydream"},
]

interface ActionState {

}

const HomePage: React.FC = (props) => {


    const {
        videos,
        isLoading,
        isError,
    } = useSelector((state: any) => state.videos)
    const dispatch = useDispatch();
    const handleFetchVideos = () => {
        dispatch(fetchVideos());
    }
    useEffect(() => {
        handleFetchVideos();
    }, [])


    return (
        <PageLayout>
            <div className={"flex-col space-y-6 "}>
                <div className={"flex flex-col space-y-6 items-center"}>
                    <div className={"border border-white/10 text-white w-3/5 py-3 text-center"}>
                        <span className={""}>You are now viewing Pornhub in English. Passer à Français.</span>
                    </div>
                    <div className={"bg-primGrey text-primary w-2/5 py-3 text-center"}>
                        <span className={""}>Pornhub's UGLY HOLIDAY SWEATERS and SOCKS are back for a limited time!!</span>
                    </div>
                </div>

                <span className={"text-xl text-secWhite"}
                >Hot Porn Videos in Malgashi {'>'}</span>
                <div className={"flex space-x-3"}>
                    {tags.map(tag => {
                        return (
                            <>
                                <CategorieTag title={tag.title}/>
                            </>
                        )
                    })}
                </div>

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

            </div>

        </PageLayout>

    );
};



export default HomePage;