import React, {Component, ReactNode} from 'react';

interface UploadStepType {
    stepNumber: number,
    title: string,
    children: ReactNode,
}
const UploadStep:React.FC<UploadStepType> = ({stepNumber, title,children}) => {
    return (
        <div className={"flex flex-col space-y-3 py-3 px-3"}>
            <div className={"uppercase flex space-x-3 font-bold"}>
                <div className={"bg-primary rounded-full w-6 flex justify-center"}>
                    <span>{stepNumber}</span>
                </div>
                <span className={"text-black "}>{title}</span>

            </div>
            {children}
        </div>
    );
}

export default UploadStep;