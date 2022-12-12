import React, {Component, useContext, useEffect, useState} from 'react';
import Dropzone, {ILayoutProps} from 'react-dropzone-uploader'
import {ReactComponent as UploadLogo} from "../assets/upload.svg";
import {RessourceValuesType} from "../pages/UploadMediaPage";
import {VideoUploadType} from "../commons/types/UploadTypes";
import {AuthContext} from "../routes/AuthProvider";
import {useDispatch, useSelector} from "react-redux";
import { postVideo} from "../redux/ducks/VideoDuck";



// specify upload params and url for your files



const SubmitButton = (props: { disabled?: any; files?: any; onSubmit?: any; }) => {
    const { files, onSubmit } = props;

    const handleClick = React.useCallback(() => {
        if (typeof onSubmit !== "function") {
            return;
        }

        onSubmit(files.filter((f: { meta: { status: any; }; }) => f.meta.status === 'ready'));
    }, [files, onSubmit]);

    return (
        <button
            type="button"
            tabIndex={0}
            disabled={props.disabled}
            onClick={handleClick}
        >
            Upload
        </button>
    );
};


const DropZoneLayout = (props: ILayoutProps) => {

    const {
        submitButton,
        previews,
        dropzoneProps,
        files,
        extra,
        input
    } = props
    const {
        maxFiles
    } = extra
    console.log(props)
    useEffect(() => {

    }, [files])
    return (
        <div className={"w-full flex flex-col "}>
            <div className={"flex space-x-3"}>
                {/*{previews}*/}
                {previews?.map(value => {
                    return (
                        <div className={"w-72"}>
                            {value}
                        </div>
                    )
                })}
            </div>

            <div {...dropzoneProps} className={"flex space-x-3 flex-col h-48 border border-primary border-dashed"}>
                <UploadLogo className={"fill-primary h-3/4"}/>
                {files.length < maxFiles && input}
            </div>

            <div className={"bg-red-500"}>
                {files.length > 0 && submitButton}
            </div>

        </div>
    )

}
interface DropType {
    url: string,
    onUpload?: (status:string)=>void,
    ressourceValues:RessourceValuesType,
}
const Drop:React.FC<DropType> = ({url,onUpload, ressourceValues}) => {
    const {user} =useContext(AuthContext);
    const {
        videoUpload,
        video,
        isLoading,
        isError,
    } = useSelector((state: any) => state.postVideo)
    const dispatch = useDispatch();
    const handlePostVideo = (videoUpload:VideoUploadType) => {
        dispatch(postVideo(videoUpload));
    }



    const[dropStatus, setDropStatus] = useState();
    if (!user){
        return (
            <div>
                ERROR : NO USER FOUND
            </div>
        )
    }
    const handleUpload = async (files: any[]) => {
        files.forEach((file) => {
            file.restart();

        });
    };

    const getUploadParams = ({  }) => { return { url: url } }
    // called every time a file's `status` changes
    const getFileName = ( fileName:string) => {
        console.log(fileName)
        const str:string[] = fileName.split(".");
        console.log(str)
        str.pop();
        console.log("pop");
        console.log(str)
        const returnStr = str.join()+"-thumb.png";
        console.log(returnStr)
        return returnStr;
    }

// @ts-ignore
    const handleChangeStatus = ({ meta, file }, status) => {
        setDropStatus(status);
        //onUpload(status);
        console.log(meta.duration)
        console.log(meta.uploadedDate)
        console.log(meta.name)
        if(status === 'done' && meta.duration && meta.uploadedDate && meta.name){
            const videoUpload:VideoUploadType= {
                id:"",
                authorId:user.id,
                authorName:user.username,
                title:ressourceValues.title,
                description:ressourceValues.description,
                categoryIds:ressourceValues.categoryIds,
                isPrivate:false,
                fileName:meta.name,
                nbViews:1000,//TODO-
                idThumbnailImage:getFileName(meta.name),
                duration:meta.duration,
                uploadDate:Date.now(),
            }
            console.log("Posting video");
            handlePostVideo(videoUpload);
        }

        console.log(status, meta, file)
    }


    return (
        <div className={"bg-red-50"}>
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                //onSubmit={handleSubmit}
                accept="image/*,audio/*,video/*"
                LayoutComponent={DropZoneLayout}
                maxSizeBytes={1073741824}
                maxFiles={1}
                canCancel={true}
                autoUpload={false}
                SubmitButtonComponent={SubmitButton}
                onSubmit={handleUpload}
                // submitButtonDisabled={true}
                // submitButtonContent={SubmitButton}

            />
        </div>
    );

}

export default Drop;