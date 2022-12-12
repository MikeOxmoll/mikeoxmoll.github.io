import React, {Component} from 'react';
import {RouteType} from "../routes/Routes";

interface footbarLink {
    title: string,
    path?: string,
}
interface footbarSection {
    title: string,
    elements: footbarLink[]
}
const FootbarSectionComp:React.FC<{ title: string, elements: footbarLink[]  }> = ({title, elements}) => {
    return (
        <div className={"flex flex-col space-y-3"}>
            <span className={"text-secWhite/60 "}
            >{title}</span>
            {elements.map(element => {
                return (
                    <span className={"text-primary/90 text-sm"}
                    >{element.title}</span>
                )
            })}
        </div>
    )
}
const footbarLinks: footbarSection[] = [
    {title:"Information",elements: [
        {title:"Sitemap", path: ""},
        {title:"Terms & conditions", path: ""},
        {title:"Privacy policy", path: ""},
        {title:"DMCA", path: ""},
        ]},
    {title:"Work with us",elements: [
            {title:"Content Partners", path: ""},
            {title:"Adervertise", path: ""},
            {title:"Webmasters", path: ""},
            {title:"Model Program", path: ""},
        ]},
    {title:"Support and help",elements: [
            {title:"Content Removal", path: ""},
            {title:"Content Support", path: ""},
            {title:"FAQ", path: ""},
            {title:"Trust and Safery", path: ""},
            {title:"Parental Controls", path: ""},
        ]},
    {title:"Support and help",elements: [
            {title:"Content Removal", path: ""},
            {title:"Content Support", path: ""},
            {title:"FAQ", path: ""},
            {title:"Trust and Safery", path: ""},
            {title:"Parental Controls", path: ""},
        ]},
]
class Footbar extends Component {
    render() {
        return (
            <div className={"flex bg-primGrey py-5 px-36 justify-between sticky top-[100vh]"}>
                {footbarLinks.map(link => {
                    return (
                        <FootbarSectionComp elements={link.elements} title={link.title}/>
                    )
                })}
            </div>
        );
    }
}

export default Footbar;