import React, {Component, useEffect, useState} from 'react';
import PageLayout from "../commons/PageLayout";
import Drop from "../components/Drop";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ReactComponent as VideoUploadLogo} from "../assets/video-camera.svg";
import {ReactComponent as ImageUploadLogo} from "../assets/camera.svg";
import { useFormik,Field, FormikProvider  } from 'formik';
import CustomSelect from "../features/upload/CustomSelect";
import UploadStep from "../features/upload/UploadStep";
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos, GetVideosRequestStateType} from "../redux/ducks/VideoDuck";
import {fetchCategories} from "../redux/ducks/CategoryDuck";
import {CategoryType, VideoType} from "../commons/types/VideoType";
import {baseURL, buildMediaImageUrl, buildMediaVideoUrl} from "../routes/Routes";

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
        <div className={"flex flex-col bg-secGrey w-96 rounded-md cursor-pointer"}
             onClick={() => handleClick()}
        >
            <div className={"px-4"}>
                {Icon}
            </div>

            <div className={"bg-primary flex justify-center font-bold rounded-md h-8"}>
                {title}
            </div>
        </div>
    )
}
export interface RessourceValuesType {
    description: string,
    title: string,
    categoryIds: string[],
}
const UploadMediaPage:React.FC = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const uploadType = searchParams.get("uploadType");
    const [ressourceValues, setRessourceValues] =useState<RessourceValuesType>();
    const {
        categories,
        isLoading,
        isError,
    } = useSelector((state: any) => state.categories)
    const dispatch = useDispatch();
    const handleFetchCategories = () => {
        dispatch(fetchCategories());
    }
    useEffect(() => {
        handleFetchCategories();
    }, [])

    function getCategoryOptions(categories: any) {
        return categories.map((category: CategoryType) => {
                return ({label:category.name, value:category.id})
        })
    }

    const onUpload= (status:string) => {

    }
    const categoryOptions = categories ? getCategoryOptions(categories) : [];
    const formik = useFormik({
        initialValues: {
            description: '',
            title: '',
            categoryIds: [''],
        },
        onSubmit: values => {
            setRessourceValues(values)
        },
    });

    console.log(formik)
    if(!uploadType){
        return(
            <PageLayout>
                <div className={"flex   space-x-20 justify-center "}>
                    <UploadMediaButton
                        Icon={<VideoUploadLogo className={"fill-black"}/>}
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
        )
    }
    if(uploadType !== "video" && uploadType !== "image" ){
        return (
            <div>
                ERROR
            </div>
        )
    }
    const uploadUrl = uploadType==="video"? buildMediaVideoUrl() : buildMediaImageUrl()

    return (
        <PageLayout>
            <div className={"flex flex-col space-y-5  flex justify-center"}>
                <div>
                    <FormikProvider  value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                            <div className={"flex flex-col space-y-5 bg-primGrey"}>
                                <UploadStep stepNumber={1} title={"Select Title"} children={
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                    />
                                } />
                                <UploadStep stepNumber={1} title={"Select Description"} children={
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                    />
                                } />

                                <UploadStep stepNumber={2} title={"Select Categories"} children={
                                    <Field
                                        id="categoryIds"
                                        className="categoryIds"
                                        name="categoryIds"
                                        options={categoryOptions}
                                        component={CustomSelect}
                                        placeholder="Select Categories"
                                        isMulti={true}

                                    />
                                }/>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </FormikProvider>

                </div>
                {ressourceValues && <Drop url={uploadUrl} ressourceValues={ressourceValues}/>}
            </div>
        </PageLayout>

    );
}

export default UploadMediaPage;