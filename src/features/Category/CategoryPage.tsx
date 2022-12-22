import React, {Component, useContext, useState} from 'react';
import {CatalogContext} from "../Catalog/CatalogProvider";
import {CategoryType} from "../../commons/types/VideoType";
import PageLayout from "../../commons/PageLayout";
import {buildMediaImageUrl} from "../../routes/Routes";
import {useNavigate} from "react-router-dom";
import {EditImageModal} from "../Profile/ProfilePage";
const categoryTypes = ["Actions","Attributes","Ethnicite","Partners","Scenario"]

const CategoryPreview:React.FC<{category:CategoryType,onClick:()=>void }> = ({category}) => {
    const navigate = useNavigate();
    const navigateToCategory = () => {
        navigate("/catalog?categoryId="+category.id)
    }
    return (
        <button className={"mr-7 mb-7 relative"}>
            <img
                src={`${buildMediaImageUrl(category.idThumbnailImage)}`}
                alt="new"
                className={"w-48 object-fill bg-primGrey w-full aspect-video cursor-pointer "}
                onClick={navigateToCategory}
            />
            <div className={"absolute bottom-4 left-2"}>
                <span className={"text-primary font-bold"}>
                {category.name}
            </span>
            </div>

        </button>
    )
}
const EditableCategoryPreview:React.FC<{category:CategoryType, onClick:()=>void }> = ({category, onClick}) => {
    const navigate = useNavigate();
    const navigateToCategory = () => {
        navigate("/catalog?categoryId="+category.id)
    }
    return (
        // <div className={"bg-white w-full px-4 py-4"} style={{ backgroundImage: `url("${buildMediaImageUrl(category.IdThumbnailImage)}")` }}>
        <button>
            <div className={"relative group "}>
                <img
                    src={`${buildMediaImageUrl(category.idThumbnailImage)}`}
                    className={"w-48 border border-black border-2 object-cover h-48"}
                />
                <button
                    onClick={onClick}
                    className={"invisible flex justify-center items-center opacity-80 group-hover:visible top-0 absolute w-full bg-primGrey h-full"}>
                    <span className={"text-primary"}>Edit {category.name} Picture</span>
                </button>
            </div>
        </button>

    )
}

const CategoryPage =()=> {
    const {
        categories,
        ressourceType,
        onToggleCategory,
        onSelectRessourceType,
    } = useContext(CatalogContext)
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [currentCategory,setCurrentCategory] = useState<CategoryType>()
    const onCategoryClick = (category:CategoryType) => {
        setCurrentCategory(category);
        setIsModalOpen(true)
    }
    if(!categories) return <>ERROR</>
    return (
        <PageLayout>
            <EditImageModal isOpen={isModalOpen} closeModal={()=> setIsModalOpen(false)}
                            dropUrl={`http://localhost:8080/media-images/update-category-pic/${currentCategory && currentCategory.id}`}
            />
            <div className={""}>
                <span className={"text-secWhite"}>Porn Categories</span>

                <div>
                    {categoryTypes.map(type => {
                        const typeCategories = categories?.filter(cat => cat.type===type.toLocaleLowerCase())
                        return (
                            <div>
                                <span className={"text-secWhite"}>{type}</span>
                                <div className={"flex flex-wrap"}>
                                    {typeCategories.map(typeCategory => {
                                        return (
                                            <CategoryPreview category={typeCategory} onClick={()=>onCategoryClick(typeCategory)}/>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>



        </PageLayout>
    );
}

export default CategoryPage;