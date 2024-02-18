import React from 'react';
import {Link} from "react-router-dom";
import {FaPencil} from "react-icons/fa6";

const DestinationAdmin = ({destination, key}) => {

    return (
        <div className='adminBloc' key={key}>
            <section className='adminText'>
                <h2>{destination.name}</h2>
                <p>{destination.country}</p>
                <p>{destination.attraction1}</p>
            </section>
            <section className='adminBtn'>
                <button className='blueBtn'><Link to={destination ? '/updateDestination' + `?id=${destination._id}` : '/'}><FaPencil/> Modifer</Link> </button>
            </section>
        </div>
    );
};

export default DestinationAdmin;