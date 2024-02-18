import React from 'react';
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa";

const BookingCard = ({booking}) => {

    return (
        <section className='destinationCard3'>
            <div className='destinationCardText3'>
                <h3 className='cardTitle'>Réservation pour {booking.city_to}</h3>
                <p>A partir de {booking.city_from}</p>
                <p>Départ le {booking.departure_date}</p>
            </div>
            <div className='destinationCardCTA3'>
                <button className='blueBtn'><Link to={booking ? '/bookingInfo' + `?id=${booking._id}` : 'admin'}><FaPlus/> Voir plus</Link></button>
            </div>
        </section>
    );
};

export default BookingCard;