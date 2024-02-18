import React from 'react';
import headerVideo from "../../assets/headerVideo.mp4";

const VideoHeader = () => {
    return (
        <video className='headingVideo' autoPlay muted loop>
            <source src={headerVideo}/>
        </video>
    );
};

export default VideoHeader;