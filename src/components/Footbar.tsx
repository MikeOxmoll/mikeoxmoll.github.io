import React, {Component} from 'react';
import {RouteType} from "../routes/Routes";

interface footbarLink {
    title: string,
    path?: string,
}
interface footbarSection {
    title: string,
    elements: footbarLink[],
    type?: string
}
const FootbarSectionComp:React.FC<{ title: string, elements: footbarLink[]  }> = ({title, elements}) => {
    return (
        <div className={"flex flex-col space-y-3"}>
            <span className={"text-secWhite/60 "}
            >{title}</span>
            {elements.map(element => {
                return (
                    <a href={element.path} target="_blank" className={"text-primary/90 text-sm"}>
                        {element.title}
                    </a>
                    // <span className={"text-primary/90 text-sm"}
                    //       onClick={}
                    // >{element.title}</span>
                )
            })}
        </div>
    )
}
const footbarLinks: footbarSection[] = [
    {title:"Information",elements: [
            {title:"Sitemap", path: "https://www.google.com/search?q=mon+petit+poney+generique+en+quebecois&rlz=1C1VDKB_frFR985FR985&oq=mon+petit+poney+generique+en+quebe&aqs=chrome.1.69i57j33i10i160j33i22i29i30.9144j0j15&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:bc96ac06,vid:lFpL9sX_shE"},
            {title:"Terms & conditions", path: "https://youtu.be/EGLjMyagsF8"},
            {title:"Privacy policy", path: "https://www.youtube.com/watch?v=ou3zVAO3IYg"},
            {title:"DMCA", path: "https://www.youtube.com/watch?v=pC7TeWFzQ6k"},
        ]},
    {title:"Cum with us",elements: [
            {title:"Content Partners", path: "https://www.youtube.com/watch?v=XxQ1GfcCOCY"},
            {title:"Advertise", path: "https://www.youtube.com/watch?v=ogO7aEdjvn4"},
            {title:"Webmasters", path: "https://www.youtube.com/watch?v=GUsg0IMxo4g "},
            {title:"Model Program", path: "https://www.youtube.com/watch?v=1BE9wVnEink"},
            {title:"Content Support", path: "https://tenor.com/view/sleep-time-gif-25989019"},

        ]},
    {title:"Support and help",elements: [
            {title:"Content Removal", path: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"},
            {title:"Content Support", path: "https://www.youtube.com/watch?v=ou3zVAO3IYg"},
            {title:"FAQ", path: "https://www.youtube.com/watch?v=pRpeEdMmmQ0"},
            {title:"Trust and Safery", path: "https://www.youtube.com/watch?v=cP1BtvOi1bE"},
            {title:"Parental Controls", path: "https://www.youtube.com/watch?v=UddyxbK8X00"},
        ]},
    {title:"Support and help",elements: [
            {title:"Content Removal", path: "https://www.youtube.com/shorts/GgVhlVDA5ZE"},
            {title:"Content Support", path: "------"},
            {title:"Female Creator Support", path: "https://youtu.be/xpNldJaMwWk"},
            {title:"Onlyfans De Cherif", path: "https://www.pornhub.com/view_video.php?viewkey=ph609c0e91b274b"},
            {title:"Small Creators", path: "https://youtu.be/NZ2KvpnMkIc"},
        ]},
]

// const footbarLinks: footbarSection[] = [
//     {title:"Information",elements: [
//             {title:"Sitemap", path: "https://www.google.com/search?q=mon+petit+poney+generique+en+quebecois&rlz=1C1VDKB_frFR985FR985&oq=mon+petit+poney+generique+en+quebe&aqs=chrome.1.69i57j33i10i160j33i22i29i30.9144j0j15&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:bc96ac06,vid:lFpL9sX_shE"},
//             {title:"Terms & conditions", path: "https://youtu.be/EGLjMyagsF8"},
//             {title:"Privacy policy", path: ""},
//             {title:"DMCA", path: ""},
//         ]},
//     {title:"Cum with us",elements: [
//             {title:"Content Partners", path: "https://www.youtube.com/watch?v=XxQ1GfcCOCY"},
//             {title:"Advertise", path: "https://www.youtube.com/watch?v=ogO7aEdjvn4"},
//             {title:"Webmasters", path: "https://www.youtube.com/watch?v=GUsg0IMxo4g "},
//             {title:"Model Program", path: "https://www.youtube.com/watch?v=1BE9wVnEink"},
//         ]},
//     {title:"Support and help",elements: [
//             {title:"Content Removal", path: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"},
//             {title:"Content Support", path: "------"},
//             {title:"FAQ", path: ""},
//             {title:"Trust and Safery", path: "https://www.youtube.com/watch?v=cP1BtvOi1bE"},
//             {title:"Parental Controls", path: ""},
//         ]},
//     {title:"Support and help",elements: [
//             {title:"Content Removal", path: ""},
//             {title:"Content Support", path: "------"},
//             {title:"Female Creator Support", path: "https://youtu.be/xpNldJaMwWk"},
//             {title:"Onlyfans De Cherif", path: "https://www.pornhub.com/view_video.php?viewkey=ph609c0e91b274b"},
//             {title:"Small Creators", path: "https://youtu.be/NZ2KvpnMkIc"},
//         ]},
// ]
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