import React from 'react';
import {CategoryType} from "../../commons/types/VideoType";
import {useNavigate} from "react-router-dom";
export interface CategorieTagType {
    category: CategoryType
}
const CategorieTag:React.FC<CategorieTagType> = ({category}) => {
    const navigate = useNavigate()
        return (
            <button
            onClick={()=> navigate("/catalog?categoryId="+category.id)}
                className={"rounded-3xl border border-secWhite/10 bg-secGrey px-3 py-1"}>
                <span className={"text-secWhite"}
                >{category.name}</span>
            </button>
        );

}

export default CategorieTag;
