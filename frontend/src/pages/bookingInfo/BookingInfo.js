import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {deleteBooking, getBookingById, resetBooking} from "../../features/bookings/bookingsSlice";
import {toast} from "react-toastify";

const BookingInfo = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const {booking} = useSelector((state) => state.bookings)

    const id = searchParams.get("id")

    useEffect(() => {
        dispatch(resetBooking())
        dispatch(getBookingById(id))
    }, [])

    const cutDDate = booking.departure_date?.substring(0,10)
    const cutRDate = booking.return_date?.substring(0.10)

    const handleClick = () => {
        dispatch(deleteBooking(booking._id))
        navigate('/account')
        toast.success('Votre réservation a bien été annulé')

    }

    return (
        <section className='contentTop bookingBloc'>
            <section>
                <h1>{booking.city_from} - {booking.city_to}</h1>
                <p className='bookingId'>#{booking._id}</p>
            </section>
            <p>Jour de départ: <strong>{cutDDate}</strong> </p>
            <p>Jour de retour: <strong>{cutRDate}</strong> </p>
            <p>Nombre de passagers: <strong>{booking.nb_passengers} passagers</strong> </p>
            <h2>Escales</h2>
            {booking.stops !== null ? (
                booking.stops && booking.stops.map(stop => <p>{stop}</p>)

            ):(
                <p>Cette réservation n'a aucune escale</p>
            )}
            <button className='blueBtn' onClick={handleClick}><Link to=''>Annuler la réservation</Link> </button>
        </section>
    );
};

export default BookingInfo;