import React from 'react';
import {CategoryType} from "../../commons/types/VideoType";
export interface CategorieTagType {
    category: CategoryType
}
const CategorieTag:React.FC<CategorieTagType> = ({category}) => {
        return (
            <div className={"rounded-3xl border border-secWhite/10 bg-secWhite px-3 py-1"}>
                <span className={"text-primary/80"}
                >{category.name}</span>
            </div>
        );

}

export default CategorieTag;
