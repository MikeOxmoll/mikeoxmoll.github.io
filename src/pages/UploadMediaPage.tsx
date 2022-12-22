import React, {Component, useContext, useEffect, useState} from 'react';
import PageLayout from "../commons/PageLayout";
import Drop from "../components/Drop";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ReactComponent as VideoUploadLogo} from "../assets/video-play.svg";
import {ReactComponent as ImageUploadLogo} from "../assets/image-upload.svg";
import { useFormik,Field, FormikProvider  } from 'formik';
import * as Yup from 'yup';
import CustomSelect from "../features/upload/CustomSelect";
import UploadStep from "../features/upload/UploadStep";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos, GetVideosRequestStateType, postVideo} from "../redux/ducks/VideoDuck";
import {fetchCategories} from "../redux/ducks/CategoryDuck";
import {CategoryType, VideoType} from "../commons/types/VideoType";
import {baseURL, buildMediaImageUrl, buildMediaVideoUrl} from "../routes/Routes";
import {AuthContext} from "../routes/AuthProvider";
import {ImageUploadType, VideoUploadType} from "../commons/types/UploadTypes";
import {postImage} from "../redux/ducks/ImageDuck";



const uploadSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(2, 'Too Short!')
        .max(255, 'Too Long!')
        .required('Required'),
    categoryIds: new Yup.ArraySchema(),
});


export interface RessourceValuesType {
    description: string,
    title: string,
    categoryIds: string[],
}
const UploadMediaPage:React.FC = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const uploadType = searchParams.get("uploadType");
    const [ressourceValues, setRessourceValues] =useState<RessourceValuesType>();
    const {user} =useContext(AuthContext);
    const {
        categories,
        isLoading,
        isError,
    } = useSelector((state: any) => state.categories);
    const dispatch = useDispatch();
    const handleFetchCategories = () => {
        dispatch(fetchCategories());
    }
    useEffect(() => {
        handleFetchCategories();
    }, [])
    const handlePostVideo = (videoUpload:VideoUploadType) => {
        dispatch(postVideo(videoUpload));
    }
    const handlePostImage= (imageUpload:ImageUploadType) => {
        dispatch(postImage(imageUpload));
    }
    function getCategoryOptions(categories: any) {
        return categories.map((category: CategoryType) => {
                return ({label:category.name, value:category.id})
        })
    }

    const categoryOptions = categories ? getCategoryOptions(categories) : [];

    const formik = useFormik({
        initialValues: {
            description: '',
            title: '',
            categoryIds: [''],
        },
        validationSchema:uploadSchema,
        onSubmit: values => {
            setRessourceValues(values);
        },

    });

    if(!uploadType || (uploadType !== "video" && uploadType !== "image") || !user ){
        return (
            <div>
                ERROR
            </div>
        )
    }
    const getFileExtension = ( fileName:string) => {
        const str:string[] = fileName.split(".");
        return str.pop();
    }

    const getFileName = ( fileName:string) => {
        const str:string[] = fileName.split(".");
        str.pop();
        const returnStr = str.join().replace(/[^a-z0-9 -]/gi, '').replace(/\s/g, "");
        return returnStr;
    }

    const getThumbFileName = ( fileName:string) => {
        return getFileName(fileName) + "-thumb.png";
    }

    function randomNumberInRange(min: number, max: number ) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const uploadUrl = uploadType==="video" ? buildMediaVideoUrl() : buildMediaImageUrl()
    const onVideoUpload = (meta:any, file:any, status:string) =>{
        if(status === 'done' && meta.duration && meta.uploadedDate && meta.name && ressourceValues){
            const videoUpload:VideoUploadType= {
                id:"",
                id_author:user.id_author,
                authorName:user.username,
                title:ressourceValues.title,
                description:ressourceValues.description,
                categoryIds:ressourceValues.categoryIds,
                isPrivate:false,
                fileName:getFileName(meta.name)+"."+getFileExtension(meta.name),
                nbViews:randomNumberInRange(1000, 9000000),
                idThumbnailImage:getThumbFileName(meta.name),
                duration:meta.duration,
                uploadDate:Date.now(),
            }
            console.log(videoUpload);
            handlePostVideo(videoUpload);
        }

    }
    const onImageUpload = (meta:any, file:any, status:string) =>{
        if(status === 'done' && meta.uploadedDate && meta.name && ressourceValues){
            const imageUpload:ImageUploadType= {
                id:"",
                id_author:user.id_author,
                authorName:user.username,
                title:ressourceValues.title,
                description:ressourceValues.description,
                categoryIds:ressourceValues.categoryIds,
                isPrivate:false,
                fileName:getFileName(meta.name)+"."+getFileExtension(meta.name),
                uploadDate:Date.now(),
            }
            handlePostImage(imageUpload);
        }

    }
    const onRessourceUpload = uploadType==="video" ? onVideoUpload : onImageUpload;
    const acceptSchema = uploadType==="video" ? "video/*" : "image/*";
    return (
        <PageLayout>
            <div className={"w-full flex flex-col items-center w-full h-full justify-center"}>
                <div className={"flex flex-col space-y-5  flex justify-center"}>
                    <div>
                        <FormikProvider  value={formik}>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={"flex flex-col space-y-5  rounded-md"}>
                                    <div className={"bg-secWhite"}>
                                        <UploadStep stepNumber={1} title={"Select Title"} children={
                                            <>
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.title}
                                                    placeholder={"Title"}
                                                    className={"rounded-md h-28 h-10 border border-primary/50 px-3"}
                                                />
                                                {formik.errors.title}
                                            </>
                                        } />
                                        <UploadStep stepNumber={2} title={"Select Description"} children={
                                            <>
                                                <input
                                                    id="description"
                                                    name="description"
                                                    type="text"
                                                    onChange={formik.handleChange}
                                                    value={formik.values.description}
                                                    placeholder={"Description"}
                                                    className={"rounded-md h-28 h-10 border border-primary/50 px-3"}
                                                />
                                                {formik.errors.description}
                                            </>

                                        } />

                                        <UploadStep stepNumber={3} title={"Select Categories"} children={
                                            <>
                                                <Field
                                                    id="categoryIds"
                                                    className="categoryIds"
                                                    name="categoryIds"
                                                    options={categoryOptions}
                                                    component={CustomSelect}
                                                    placeholder="Select Categories"
                                                    isMulti={true}
                                                />
                                                {formik.errors.categoryIds}
                                            </>

                                        }/>
                                    </div>

                                    <button className={"bg-primary text-white rounded-md h-10"} type="submit">Go to next step</button>
                                </div>

                            </form>
                        </FormikProvider>
                    </div>
                    {ressourceValues && !formik.errors.title && !formik.errors.description && !formik.errors.categoryIds && <Drop url={uploadUrl} handleRessourcePost={onRessourceUpload} acceptSchema={acceptSchema}/>}
                </div>
            </div>

        </PageLayout>
    );
}

export default UploadMediaPage;