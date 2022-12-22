import React, {Component} from 'react';
import PageLayout from "../commons/PageLayout";

const CommunityPage:React.FC<{}> = () => {
    return (
        <PageLayout>
            <div className={"flex flex-col items-center space-y-5 px-36"}>
                    <span className={"text-white text-2xl"}>Tu peux remercier l'équipe Cours De Poterie Pour Ce Travail ainsi que tous les acteurs/actrices pornos qui ont fourni du contenu.</span>
                <span className={"text-5xl text-primary"}>JOYEUX ANNIVERSAIRE</span>
                <img
                src={require("../assets/andy2.jpg")}
                className={"h-80"}
                />
                {/*<span className={"font-bold"}>C2P</span>*/}
                {/*<span className={"font-bold"}>SARAH</span>*/}
            </div>
        </PageLayout>
    );
}

export default CommunityPage;