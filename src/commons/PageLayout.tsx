import  React, {ReactNode} from 'react';
import Navbar from "./Navbar";
import Footbar from "../components/Footbar";
interface PageLayoutProps {
    children: ReactNode,
}

const PageLayout:React.FC<PageLayoutProps> = ({ children }) => {
        return (
            <div className={"bg-black space-y-4 flex flex-col overflow-scroll"}>
                <Navbar/>
                <div className={"flex flex-grow justify-center"}>
                    <div className={"max-w-max-content flex-grow"}>
                        {children}
                    </div>
                </div>


                <div className={"h-1/5"}>
                    <Footbar/>
                </div>

            </div>
        );
}

export default PageLayout;