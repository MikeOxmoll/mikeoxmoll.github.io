import React from 'react';
export interface CategorieTagType {
    title: string
}
const CategorieTag:React.FC<CategorieTagType> = ({title}) => {
        return (
            <div className={"rounded-3xl border border-secWhite/10 bg-secGrey px-3 py-1"}>
                <span className={"text-secWhite/80"}
                >{title}</span>
            </div>
        );

}

export default CategorieTag;
