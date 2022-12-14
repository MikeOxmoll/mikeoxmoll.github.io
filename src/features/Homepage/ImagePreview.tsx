import React, {Component, useEffect} from 'react';
import {ImageType} from "../../commons/types/VideoType";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, userRequestStateType} from "../../redux/ducks/UserDuck";
import {useNavigate} from "react-router-dom";
import  {ReactComponent as CheckLogo}  from '../../assets/check-mark.svg';
import  {ReactComponent as ViewsLogo}  from '../../assets/eye.svg';
import  {ReactComponent as LikesLogo}  from '../../assets/thumbs-up.svg';
import {baseURL, buildMediaImageUrl} from "../../routes/Routes";
interface ImagePreviewType {
    image: ImageType,
    verticalPreview: boolean,
}
interface ImagePreviewTagType {
    time:number
}

const ImagePreviewTag:React.FC<ImagePreviewTagType> = ({time}) => {
    return (
        <div className={"bg-black/70 flex justify-center text-secWhite/80 text-sm px-0.5"}>
            {time}
        </div>
    )
}

const ImagePreview:React.FC<ImagePreviewType> = ({image}) => {
    const navigate = useNavigate();
    const {
        user,
        isLoading,
        isError,
    } = useSelector((state: any) => state.user)

    const state = useSelector((state: userRequestStateType) => state)

    const dispatch = useDispatch();
    const handleFetchUser = () => {
        dispatch(fetchUser(image.id_author));
    }
    useEffect(() => {
        handleFetchUser();
    }, [])
    const navigateToImage = () => {
        navigate("view_image?imageId="+image.id);
    }
    const navigateToAuthor = () => {
        navigate("users?userId="+user.username);
    }
    return (

        <div className={'bg-black flex flex-col max-w-sm w-full space-y-0.5 '}>
            <div className={"relative"}>
                <img
                    src={`${buildMediaImageUrl(image.fileName)}`}
                    alt="new"
                    className={"object-fill w-full aspect-image cursor-pointer"}
                    onClick={navigateToImage}
                />
                {/*<div className={"absolute bottom-2 flex w-full justify-end space-x-3 pr-2"}>*/}
                {/*    <ImagePreviewTag time={image.duration}/>*/}
                {/*    /!*<ImagePreviewTag/>*!/*/}
                {/*</div>*/}
            </div>



            <div className={"flex text-secWhite/80"}>
                <div className={"flex-grow"}>
                    {user && user.username &&
                        <span className={" cursor-pointer w-min"} onClick={navigateToAuthor}>
                        {user.username}
                        </span>
                    }
                </div>

                <div className={"flex space-x-3 text-xs"}>

                    <div className={"flex space-x-1 items-center"}>
                        <ViewsLogo className={"w-4 fill-secWhite/60"}/>
                        {/*<span className={" "}>*/}
                        {/*        {image.nbViews} Views*/}
                        {/*    </span>*/}
                    </div>

                    <div className={"flex space-x-1 items-center"}>
                        <LikesLogo className={"w-4 fill-secWhite/60"}/>
                        <span className={"flex"}>
                                90%
                            </span>
                    </div>


                </div>
            </div>


            <span className={"text-secWhite/80 cursor-pointer "} onClick={navigateToImage}>
                    {image.title}
                </span>
        </div>


    );
}

export default ImagePreview;