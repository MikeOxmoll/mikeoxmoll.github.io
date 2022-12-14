import React, {Component, useEffect} from 'react';


import VideoPlayer from "../components/VideoPlayer";
import PageLayout from "../commons/PageLayout";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideo, GetVideoRequestStateType} from "../redux/ducks/VideoDuck";
import {useSearchParams} from "react-router-dom";
import {buildMediaImageUrl} from "../routes/Routes";


const ViewVideoPage:React.FC = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const videoIdParam = searchParams.get("videoId");

    const {
        video,
        isLoading,
        isError,
    } = useSelector((state: any) => state.video)
    const dispatch = useDispatch();
    const handleFetchVideo = (videoId:string) => {
        dispatch(fetchVideo(videoId));
    }
    useEffect(() => {
        videoIdParam && handleFetchVideo(videoIdParam);
    }, [])

    if(video===undefined) return (<></>)
    return (
        <div>
            <PageLayout>

                <div className={"flex w-full space-x-5 px-20"}>
                    <div className={"w-4/6"}>
                        <VideoPlayer url={video.fileName}/>
                    </div>

                    <div className={"flex flex-col w-56 h-56 space-y-3.5"}>
                        <img
                            src={buildMediaImageUrl("IMG_6740.jpg")}
                            alt="new"
                            className={"object-fill h-48 w-96"}
                        />
                        <img
                            src={buildMediaImageUrl("cumshot.jpg")}
                            alt="new"
                            className={"object-fill h-48 w-96"}
                        />
                    </div>

                </div>
            </PageLayout>
        </div>
    );
}

export default ViewVideoPage;