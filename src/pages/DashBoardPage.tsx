import React, {Component} from 'react';
import PageLayout from "../commons/PageLayout";
import {useNavigate} from "react-router-dom";
import {ReactComponent as VideoUploadLogo} from "../assets/video-play.svg";
import {ReactComponent as ImageUploadLogo} from "../assets/image-upload.svg";

interface UploadMediaButtonType {
    Icon: React.ReactNode,
    title: string,
    redirectUrl: string,
}

const UploadMediaButton:React.FC<UploadMediaButtonType> = ({Icon, title, redirectUrl}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(""+redirectUrl);
    }
    return(
        <div className={"flex flex-col  hover:border hover:border-primary w-2/6 rounded-md cursor-pointer"}
             onClick={() => handleClick()}
        >
            <div className={"px-4 flex-grow fill-primary"}>
                {Icon}
            </div>

            <div className={"text-primary flex justify-center font-bold rounded-md h-8"}>
                {title}
            </div>
        </div>
    )
}


class DashBoardPage extends Component {
    render() {
        return (
            <PageLayout>
                <div className={"flex space-x-20 justify-center "}>
                    <UploadMediaButton
                        Icon={<VideoUploadLogo className={" w-full h-full"}/>}
                        title={"Upload a video"}
                        redirectUrl={"/upload?uploadType=video"}
                    />
                    <UploadMediaButton
                        Icon={<ImageUploadLogo className={"w-full h-full"}/>}
                        title={"Upload an image"}
                        redirectUrl={"/upload?uploadType=image"}
                    />
                </div>
            </PageLayout>
        );
    }
}

export default DashBoardPage;