import React from 'react';
import VideoHeader from "../../components/videoHeader/VideoHeader";
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <section className='heading'>
            <VideoHeader/>
            <h1>La page que vous cherchez n'existe pas</h1>
            <button className='blueBtn'><Link to='/'>Revenir à l'accueil</Link> </button>
        </section>
    );
};

export default Error;