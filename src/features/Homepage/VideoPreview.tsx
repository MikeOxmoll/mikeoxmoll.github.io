import React, {Component, useEffect} from 'react';
import {VideoType} from "../../commons/types/VideoType";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, userRequestStateType} from "../../redux/ducks/UserDuck";
import {useNavigate} from "react-router-dom";
import  {ReactComponent as CheckLogo}  from '../../assets/check-mark.svg';
import  {ReactComponent as ViewsLogo}  from '../../assets/eye.svg';
import  {ReactComponent as LikesLogo}  from '../../assets/thumbs-up.svg';
import {baseURL, buildMediaImageUrl} from "../../routes/Routes";
import {formatSeconds} from "../../commons/video/VideoUtils";
interface VideoPreviewType {
    video: VideoType,
    verticalPreview: boolean,
}
interface VideoPreviewTagType {
    time:number
}

const VideoPreviewTag:React.FC<VideoPreviewTagType> = ({time}) => {
    return (
        <div className={"bg-black/70 flex justify-center text-secWhite font-medium  text-sm px-0.5"}>
            {formatSeconds(time)}
        </div>
    )
}

const getViewFormat = (nbViews: number):string => {
    if(nbViews >= 1000000){

        const value = (Math.round(nbViews / 1000000).toFixed(1));
        return value+"M";
    }
    if(nbViews >= 1000){
        const value = (Math.round(nbViews / 1000).toFixed(0));;
        return value+"K";
    }
    return nbViews+"";
}

const VideoPreview:React.FC<VideoPreviewType> = ({video}) => {
    const navigate = useNavigate();
    const state = useSelector((state: userRequestStateType) => state)
    const dispatch = useDispatch();
    const handleFetchUser = () => {
        dispatch(fetchUser(video.id_author));
    }
    useEffect(() => {
        handleFetchUser();
    }, [])
    const navigateToVideo = () => {
        navigate("/view_video?videoId="+video.id);
    }
    const navigateToAuthor = () => {
        navigate("/user_profile?username="+video.authorName);
    }
    return (

            <div className={'flex flex-col max-w-sm w-full space-y-0.5 min-w-full'}>
                <div className={"relative"}>
                    <img
                        src={`${buildMediaImageUrl(video.idThumbnailImage)}`}
                        alt="new"
                        className={"object-contain bg-primGrey w-full aspect-video cursor-pointer "}
                        onClick={navigateToVideo}
                    />
                    <div className={"absolute bottom-2 flex w-full justify-end space-x-3 pr-2"}>
                        <VideoPreviewTag time={video.duration}/>
                    </div>
                </div>
                <div className={"flex text-secWhite justify-self-end"}>
                    <div className={"flex flex-grow space-x-1 text-sm"}>
                        <CheckLogo className={"w-3"}/>
                        <span className={" cursor-pointer w-min"} onClick={navigateToAuthor}>
                        {video.authorName}
                        </span>
                    </div>

                    <div className={"flex space-x-3 text-xs"}>
                        <div className={"flex space-x-1 items-center"}>
                            <ViewsLogo className={"w-4 fill-secWhite/60"}/>
                            <span className={" "}>
                                {getViewFormat(video.nbViews)} Views
                            </span>
                        </div>

                    </div>
                </div>
                <span className={"text-secWhite/80 cursor-pointer "} onClick={navigateToVideo}>
                    {video.title}
                </span>
            </div>


    );
}

export default VideoPreview;