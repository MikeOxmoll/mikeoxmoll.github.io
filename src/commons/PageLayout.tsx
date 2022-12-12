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
                <div className={"px-48"}>
                    {children}
                </div>

                <Footbar/>
            </div>
        );
}

export default PageLayout;