import React, {Component} from 'react';
import {Player} from "react-tuby";
import "react-tuby/css/main.css";
import {baseURL, buildMediaVideoUrl} from "../routes/Routes";
const VideoPlayer:React.FC<{url?: string}> = ({url}) => {
    const builtUrl = buildMediaVideoUrl(url)
    return (
        <div>
            <Player

                src={[
                    {
                        quality: "Full HD",
                        url: builtUrl,
                    },
                    {
                        quality: 720,
                        url: builtUrl,
                    },
                    {
                        quality: 480,
                        url: builtUrl,
                    },
                ]}
                poster="https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/poster.png"//TODO
            />
        </div>
    );
}

export default VideoPlayer;