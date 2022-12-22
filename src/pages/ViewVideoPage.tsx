import React, {Component, useContext, useEffect} from 'react';


import VideoPlayer from "../components/VideoPlayer";
import PageLayout from "../commons/PageLayout";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideo, GetVideoRequestStateType} from "../redux/ducks/VideoDuck";
import {useSearchParams} from "react-router-dom";
import {buildMediaImageUrl} from "../routes/Routes";
import {CatalogContext} from "../features/Catalog/CatalogProvider";
import {VideoType} from "../commons/types/VideoType";
import VideoPreview from "../features/Homepage/VideoPreview";


const ViewVideoPage:React.FC = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const videoIdParam = searchParams.get("videoId");
    const {
        video,
        isLoading,
        isError,
    }  = useSelector((state: any) => state.video) as GetVideoRequestStateType
    const {
        videosState,
        categories,
        ressourceType,
        onToggleCategory,
        selectedCategories,
    } = useContext(CatalogContext)

    const dispatch = useDispatch();
    const handleFetchVideo = (videoId:string) => {
        dispatch(fetchVideo(videoId));
    }
    useEffect(() => {
        videoIdParam && handleFetchVideo(videoIdParam);
    }, [])

    if(video===undefined) return (<></>)
    const videoCatIds = video.categoryIds ? video.categoryIds : [];
    const videoCategories = categories && video.categoryIds ? categories.filter(cat => videoCatIds.includes(cat.id)) : [];
    const allVideos = videosState?.videos ? videosState.videos : [];
    const relatedVideos = allVideos?.filter(vid => {
        return vid.categoryIds && vid.categoryIds.filter(vidCat => videoCatIds.includes(vidCat)).length > 0 && vid.id !== video.id
    })
    return (
        <div>
            <PageLayout>
                <div className={"flex w-full space-x-5 px-20"}>
                    <div className={"w-5/6 space-y-5"}>
                        <VideoPlayer url={video.fileName}/>
                        <div className={"flex flex-col space-y-3"}>
                            <span className={"text-secWhite text-2xl"}>{video.title}</span>
                            <span className={"text-secWhite/80 text-xl"}>{video.description}</span>
                        </div>
                    </div>

                    <div className={"flex flex-col w-56 space-y-3.5"}>
                        <div className={"grid grid-cols-1 gap-4"}>
                            {relatedVideos.slice(0,5).map((video: VideoType) => {
                                    return (
                                        <>
                                            <VideoPreview video={video} verticalPreview={false}/>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </PageLayout>
        </div>
    );
}

export default ViewVideoPage;