import React, {ReactNode, useEffect, useState} from "react";
import {CategoryType, UserType, VideoType} from "../../commons/types/VideoType";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchVideosByParam,
    GetVideoByParamRequestStateType,
    RessourceRequestParamsType
} from "../../redux/ducks/VideoDuck";
import {fetchCategories} from "../../redux/ducks/CategoryDuck";
import {useSearchParams} from "react-router-dom";

interface DefaultValueType {
    videosState?: GetVideoByParamRequestStateType;
    categories?: CategoryType[];
    selectedCategories: CategoryType[];
    ressourceType:string,
    onSelectRessourceType: (type:string) => void,
    onToggleCategory: (category:string) => void,
    setSelectedCategories:(categories: CategoryType[]) => void,
};
// @ts-ignore
export const CatalogContext = React.createContext<DefaultValueType>();

export const CatalogProvider:React.FC<{ children:ReactNode }> = ({ children }) => {
    const [ressourceType, setRessourceType] = useState("video");
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryIdParam = searchParams.get("categoryId");

    const {
        categories,
    } = useSelector((state: any) => state.categories);
    const allCategories = categories as CategoryType[] | undefined;
    const paramCategory = allCategories ? allCategories.filter(cat => cat.id === categoryIdParam) : [];
    const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(paramCategory);
    const videosState = useSelector((state: any) => state.videosByParam)
    const initialVideoRequestParams:RessourceRequestParamsType = categoryIdParam ? {
        ressourceCategoryIds:[categoryIdParam]
    } : {}

    const [videoRequestParams, setVideoRequestParams] = useState<RessourceRequestParamsType>(initialVideoRequestParams);
    // const [videoRequestParams, setVideoRequestParams] = useState<RessourceRequestParamsType>({ressourceCategoryIds:["attr-pdf(petabledefou)", "attr-gay"]});


    const dispatch = useDispatch();
    const handleFetchVideosByParam = (ressourceRequestParams: RessourceRequestParamsType) => {
        dispatch(fetchVideosByParam(ressourceRequestParams));
    }
    const handleFetchCategories = () => {
        dispatch(fetchCategories());
    }
    useEffect(() => {
        handleFetchVideosByParam(videoRequestParams);
        handleFetchCategories();
    }, [])
    useEffect(() => {
        handleFetchVideosByParam(videoRequestParams);
    }, [videoRequestParams])

    const onSelectRessourceType = (type:string) => {
        setRessourceType(type)
    }

    const onToggleCategory = (categoryId:string) => {
        if(selectedCategories.find(cat => cat.id == categoryId)){
            const newCategories = selectedCategories.filter(cat => cat.id !== categoryId);
            setSelectedCategories(newCategories)
            setVideoRequestParams({ressourceCategoryIds:newCategories.map((cat) => {return cat.id})})
        } else if (categories){
            const newCategories = selectedCategories;
            const addedCat = categories.find((cat: { id: string; }) => cat.id === categoryId);
            newCategories.push(addedCat);
            setSelectedCategories(newCategories)
            setVideoRequestParams({ressourceCategoryIds:newCategories.map((cat) => {return cat.id})})
        }
    }

    const defaultValue:DefaultValueType = {
        videosState,
        categories,
        selectedCategories,
        onToggleCategory,
        onSelectRessourceType,
        ressourceType,
        setSelectedCategories,
    }


    if(defaultValue){
        return (
            <CatalogContext.Provider value={defaultValue}>
                {children}
            </CatalogContext.Provider>
        );
    } else {
        return null
    }


}