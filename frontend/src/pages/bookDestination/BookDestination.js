import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {getAllDestinations, getDestinationById, resetDestination} from "../../features/destinations/destinationsSlice";
import VideoHeader from "../../components/videoHeader/VideoHeader";
import {toast} from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import {reset, setBooking} from "../../features/bookings/bookingsSlice";
import {FaPlus} from "react-icons/fa";
const BookDestination = () => {

    const [formData, setFormData] = useState({
        book_user: "",
        city_from: "",
        city_to: "",
        nb_passengers: "",
        departure_date: "",
        return_date: "",
    })

    const [stopsList, setStopsList] = useState({
        stop1: '',
        stop2: '',
        stop3: ''
    })
    const {book_user, city_from, nb_passengers, departure_date, return_date} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const {user} = useSelector((state) => state.auth)
    const {destination, destinations} = useSelector((state) => state.destinations)
    const {booking, isLoading} = useSelector((state) => state.bookings)

    const id = searchParams.get("id")

    const [stopIndex, setStopIndex] = useState(0)

    useEffect(() => {
        dispatch(resetDestination())
        dispatch(reset())
        dispatch(getDestinationById(id))
        dispatch(getAllDestinations())
    }, [])

    useEffect(() => {
        if (!user){
            navigate('/')
        }
    }, [user, navigate])

    useEffect(() => {
        setFormData({
            book_user: user._id,
            city_from: user.departure,
            city_to: destination.name,
            nb_passengers: user.nb_passengers,
            departure_date: "",
            return_date: "",
        })
    }, [booking])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onChangeStops = (e) => {
        setStopsList((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onClickStop = () => {
        switch (stopIndex){
            case 0:
                setStopIndex(1)
                break
            case 1:
                setStopIndex(2)
                break
            case 2:
                setStopIndex(3)
                break
            case 3:
                toast.error("Un maximum de 3 escales peuvent être ajoutées")
                break
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const bookingData = {
            book_user,
            city_from,
            city_to: destination.name,
            nb_passengers,
            stops: stopsList,
            departure_date,
            return_date,
        }
        dispatch(setBooking(bookingData))
        toast.success('Merci pour votre réservation')
        navigate('/')
    }

    if (isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className='heading2'>
                <VideoHeader/>
            </section>
            <section className='content bookContent' onSubmit={onSubmit}>
                <h2>Réservation pour {destination.name}, {destination.country}</h2>
                <form className='form2'>
                    <section>
                        <label htmlFor="nb_passengers">Nombre de passagers</label>
                        <input
                            type="number"
                            className='form-control'
                            id='nb_passengers'
                            name='nb_passengers'
                            key={user.nb_passengers}
                            defaultValue={user.nb_passengers}
                            onChange={onChange}
                            min="1"
                        />
                    </section>
                    <section>
                        <label htmlFor="departure_date">Date de départ</label>
                        <input
                            type="date"
                            className="form-control"
                            id='departure_date'
                            name='departure_date'
                            value={departure_date}
                            onChange={onChange}
                        />
                    </section>
                    <section>
                        <label htmlFor="return_date">Date de retour</label>
                        <input
                            type="date"
                            className="form-control"
                            id='return_date'
                            name='return_date'
                            value={return_date}
                            onChange={onChange}
                            min={departure_date}
                        />
                    </section>
                    <h2>Escales</h2>
                    {stopIndex >= 1 && (
                        <input
                            type="text"
                            className='form-control'
                            list='destinations'
                            id='stop1'
                            name='stop1'
                            value={stopsList.stop1}
                            onChange={onChangeStops}
                        />
                    )}
                    {stopIndex >= 2 && (
                        <input
                            type="text"
                            className='form-control'
                            list='destinations'
                            id='stop2'
                            name='stop2'
                            value={stopsList.stop2}
                            onChange={onChangeStops}
                        />
                    )}
                    {stopIndex >= 3 && (
                        <input
                            type="text"
                            className='form-control'
                            list='destinations'
                            id='stop3'
                            name='stop3'
                            value={stopsList.stop3}
                            onChange={onChangeStops}
                        />
                    )}
                    <datalist id='destinations'>
                        {destinations.map((destination) => (
                            <option value={destination.name}/>
                        ))}
                    </datalist>

                    <Link to='#' className='orangeLink' onClick={onClickStop}><FaPlus/> Ajouter une escale </Link>
                    <datalist id='destinations'>
                        {destinations.map((destination) => (
                            <option value={destination.name}/>
                        ))}
                    </datalist>
                    <button type='submit' className='blueBtn formBtn'>
                        Réserver
                    </button>
                </form>
            </section>

        </>

    );
};

export default BookDestination;