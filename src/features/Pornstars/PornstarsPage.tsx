import React, {useEffect} from 'react';
import PageLayout from "../../commons/PageLayout";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers, getUsersRequestStateType} from "../../redux/ducks/UserDuck";
import {UserType} from "../../commons/types/VideoType";
import {buildMediaImageUrl} from "../../routes/Routes";
import {ReactComponent as CheckLogo} from "../../assets/check-mark.svg";
import {ReactComponent as ViewsLogo} from "../../assets/eye.svg";
import {useNavigate} from "react-router-dom";

const UserPreview:React.FC<{user:UserType}> = ({user}) => {
    const navigate = useNavigate();
    const navigateToAuthor = () => {
        navigate("/user_profile?username="+user.username);
    }
    return (
        <div className={'flex flex-col max-w-sm w-full space-y-0.5 min-w-full'}>
            <div className={"relative"}>
                <img
                    src={`${buildMediaImageUrl(user.id_profile_picture)}`}
                    alt="new"
                    className={"object-contain bg-primGrey w-full aspect-video cursor-pointer "}
                    onClick={navigateToAuthor}
                />
                {/*<div className={"absolute bottom-2 flex w-full justify-end space-x-3 pr-2"}>*/}
                {/*    <VideoPreviewTag time={video.duration}/>*/}
                {/*</div>*/}
            </div>
            <div className={"flex text-secWhite justify-self-end"}>
                <div className={"flex flex-grow space-x-1 text-sm"}>
                    <CheckLogo className={"w-3"}/>
                    <span className={" cursor-pointer w-min"} onClick={navigateToAuthor}>
                        {user.username}
                    </span>
                </div>

                {/*<div className={"flex space-x-3 text-xs"}>*/}
                {/*    <div className={"flex space-x-1 items-center"}>*/}
                {/*        <ViewsLogo className={"w-4 fill-secWhite/60"}/>*/}
                {/*        <span className={" "}>*/}
                {/*                {getViewFormat(video.nbViews)} Views*/}
                {/*            </span>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
            {/*<span className={"text-secWhite/80 cursor-pointer "} onClick={navigateToVideo}>*/}
            {/*        {video.title}*/}
            {/*    </span>*/}
        </div>

    )
}
const PornstarsPage:React.FC = () => {
    const {
        users,
    } = useSelector((state: any) => state.users);
    const allUsers = users as UserType[] | undefined;
    // const usersRequest = useSelector((state: getUsersRequestStateType) => state.users);
    // const {
    //     users
    // } = usersRequest
    const dispatch = useDispatch();
    const handleFetchUsers = () => {
        dispatch(fetchUsers());
    }
    useEffect(() => {
        handleFetchUsers();
    }, [])

    if(!allUsers) return <>ERROR</>

    return (
        <PageLayout>
            <div>
                <span className={"text-secWhite text-2xl"}>This Month's Most Popular Buffons</span>
                <div>
                    { allUsers.map(user => {
                        return (
                            <UserPreview user={user}/>
                        )
                    })}
                </div>
            </div>

        </PageLayout>
    );
}

export default PornstarsPage;