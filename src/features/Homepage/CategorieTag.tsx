import React from 'react';
import {CategoryType} from "../../commons/types/VideoType";
export interface CategorieTagType {
    category: CategoryType
}
const CategorieTag:React.FC<CategorieTagType> = ({category}) => {
        return (
            <div className={"rounded-3xl border border-secWhite/10 bg-secGrey px-3 py-1"}>
                <span className={"text-secWhite"}
                >{category.name}</span>
            </div>
        );

}

export default CategorieTag;
