import React, {Component, ReactNode, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchVideos, fetchVideosByParam, RessourceRequestParamsType} from "../redux/ducks/VideoDuck";
import {fetchImages} from "../redux/ducks/ImageDuck";
import  {ReactComponent as CameraLogo}  from '../assets/video-camera.svg';
import {fetchCategories} from "../redux/ducks/CategoryDuck";
import PageLayout from "../commons/PageLayout";
import {CategoryType, VideoType} from "../commons/types/VideoType";
import VideoPreview from "../features/Homepage/VideoPreview";
import {CatalogContext, CatalogProvider} from "../features/Catalog/CatalogProvider";

export interface VideoCatalogerType {
    videos:VideoType[]
    videosIsLoading:boolean,
    videosIsError:boolean,
}
export interface CatalogSectionButtonType {
    title: string,
    Icon:ReactNode,
    isActive:boolean,
    onClick:()=>void,
}
export interface CatalogSideBarType {
    categories: CategoryType[];
    contentType:string,
    onSelectRessourceType: (type:string) => void,
    toggleCategory: (category:string) => void,
}
export interface CatalogSideBarStepType {
    title: string,
    children: ReactNode,
}
export interface CatalogCategotyTagType {
    title: string,
    isActive:boolean,
    toggleCategory:(category:string)=>void,
    id:string,
}
export const VideoCataloger = ({}) => {
    const {
        videosState,
    } = useContext(CatalogContext)
    if(!videosState){
        return (
            <>LOADING</>
        )
    } else{
        return(
            <div className={"grid grid-cols-4 gap-4"}>
                {!videosState.isLoading && !videosState.isLoading && videosState.videos &&
                    videosState.videos.map((video: VideoType) => {
                        return (
                            <>
                                <VideoPreview video={video} verticalPreview={false}/>
                            </>
                        )
                    })
                }
            </div>
        )
    }


}
const CatalogSideBarStep:React.FC<CatalogSideBarStepType> = ({title, children}) => {
    return(
        < >
            <div className={"bg-secGrey pl-3 text-secWhite font-bold text-xl py-2 "}>{title}</div>
            {children}
        </>
    )
}

const CatalogCategotyTag:React.FC<CatalogCategotyTagType> = ({id,title, toggleCategory}) => {
    const {
        categories,
        ressourceType,
        onToggleCategory,
        selectedCategories,
    } = useContext(CatalogContext)
    const category = selectedCategories.find(cat => cat.id === id);
    // const isActive = ( !== null)
    if(category){
        return(
            <div className={"pl-3 text-primary"}>
                <button onClick={()=>toggleCategory(id)}>
                    <span>- {title}</span>
                </button>

            </div>
        )
    }
    return(
        <div className={"pl-3 text-secWhite/60"}>
            <button onClick={()=>toggleCategory(id)}>
                <span>+ {title}</span>
            </button>

        </div>
    )
}
const CatalogSectionButton:React.FC<CatalogSectionButtonType> = ({title,onClick,isActive ,Icon}) => {
    return(
        <button className={`flex pl-3 text-bold space-x-3 text-sm ${isActive && "bg-primary"} w-full py-2`}
                onClick={onClick}
        >
            <CameraLogo className={`${!isActive && "fill-white"} w-6` }/>
            <span className={`${!isActive && "text-white"} font-semibold`}>{title}</span>
        </button>
    )
}

const CatalogSideBar = () => {

    const {
        categories,
        ressourceType,
        onToggleCategory,
        onSelectRessourceType,
    } = useContext(CatalogContext)

    return(

      <div className={"flex-col w-[350px] bg-primGrey"}>
          <CatalogSectionButton title={"Videos"} isActive={ressourceType === "video"} Icon={<CameraLogo className={"w-6"}/>} onClick={()=>onSelectRessourceType("video")}/>
          <CatalogSectionButton title={"Images"} isActive={ressourceType === "image"} Icon={<CameraLogo className={"w-6"}/>} onClick={()=>onSelectRessourceType("image")}/>
          <CatalogSideBarStep title={"Categories"}>
              <div>
                  {categories && categories.map(category => {
                      return (
                          <CatalogCategotyTag title={category.name} id={category.id} isActive={false} toggleCategory={onToggleCategory}/>
                      )
                  })}
              </div>
          </CatalogSideBarStep>
      </div>
  )
}

const ContentCatalogPage: React.FC = (props) => {
    const {
        ressourceType,
    } = useContext(CatalogContext)
    const ressourceCataloger = ressourceType==="video" ? <VideoCataloger /> : <VideoCataloger />;
    return (
        <PageLayout>
            <div className={"flex space-x-3  h-full w-full "}>
                <CatalogSideBar/>
                <div className={" flex flex-col flex-grow space-y-3"}>
                    <span>Most Recent User Content</span>
                    {ressourceCataloger}
                </div>
            </div>
        </PageLayout>
    );
}

export default ContentCatalogPage;