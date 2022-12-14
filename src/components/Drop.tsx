import React, {Component, useContext, useEffect, useState} from 'react';
import Dropzone, {ILayoutProps} from 'react-dropzone-uploader'
import {ReactComponent as UploadLogo} from "../assets/upload.svg";
import {AuthContext} from "../routes/AuthProvider";

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
        <div className={"w-full flex flex-col space-y-3"}>
            <div className={"flex space-x-3"}>
                {previews?.map(value => {
                    return (
                        <div className={"w-72"}>
                            {value}
                        </div>
                    )
                })}
            </div>

            <div {...dropzoneProps} className={"flex space-x-3  flex-col h-48 border border-primary border-dashed"}>
                <UploadLogo className={"fill-primary h-3/4"}/>
                {files.length < maxFiles && input}
            </div>

            <div className={"bg-primary text-white h-10 flex justify-center rounded-md "}>
                {files.length > 0 && submitButton}
            </div>

        </div>
    )

}
interface DropType {
    url: string,
    handleRessourcePost: (meta:any, file:any, status:string)=>void,
    acceptSchema:string,
}
const Drop:React.FC<DropType> = ({url,handleRessourcePost, acceptSchema}) => {
    const {user} =useContext(AuthContext);

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

    const getFileName = ( fileName:string) => {
        const str:string[] = fileName.split(".");
        str.pop();
        const returnStr = str.join()+"-thumb.png";
        return returnStr;
    }

    // called every time a file's `status` changes
    // @ts-ignore
    const handleChangeStatus = ({ meta, file }, status) => {
        setDropStatus(status);
        console.log("Handling ressource post")
        handleRessourcePost(meta, file, status);
    }

    return (
        <div className={"bg-secWhite rounded-md py-3 px-3"}>
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                accept={acceptSchema}
                LayoutComponent={DropZoneLayout}
                maxSizeBytes={1073741824}
                maxFiles={1}
                canCancel={true}
                autoUpload={false}
                SubmitButtonComponent={SubmitButton}
                onSubmit={handleUpload}
            />
        </div>
    );

}

export default Drop;