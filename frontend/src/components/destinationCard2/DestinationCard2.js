import React from 'react';
import {Link} from "react-router-dom";
import placeholder from '../../assets/placeholder.jpg'
import {toast} from "react-toastify";

const DestinationCard2 = ({destination, user}) => {

    const noAccount = () => {
        toast.error('Veuillez vous connecter afin d\'accéder aux offres ')
    }

    return (
        <section className='destinationCard2'>
            <img src={placeholder} alt="Image destination" className='destinationCardImg2'/>
            <div className='destinationCardText2'>
                <h3 className='cardTitle'>{destination && destination.name}</h3>
                <Link to={destination ? '/destinations/' + destination.country : '/destinations'} className='orangeLink'>{destination && destination.country}</Link>
            </div>
            <div className='destinationCardCTA2'>
                <Link to={destination ? '/destinations' + `?id=${destination._id}` : '/destinations'} className='orangeLink'>Plus d'infos</Link>
                {user ? (
                    <button className='blueBtn'><Link to={destination ? '/bookDestination' + `?id=${destination._id}` : '/'}>Voir les offres</Link></button>
                ):(
                    <button onClick={noAccount} className='greyBtn'><Link to='#'>Voir les offres</Link></button>
                )}
            </div>
        </section>
    );
};

export default DestinationCard2;