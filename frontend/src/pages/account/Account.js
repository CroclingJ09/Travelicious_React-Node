import React, {useEffect, useState} from 'react';
import {FaPen, FaSignOutAlt, FaUserAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {getUser, logout, reset} from "../../features/auth/authSlice";
import bannerImg from "../../assets/bannerImg.jpg"
import {getUserBookings} from "../../features/bookings/bookingsSlice";
import BookingCard from "../../components/bookingCard/BookingCard";

const Account = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {bookings} = useSelector((state) => state.bookings)

    useEffect(() => {
        dispatch(getUser(user.id))
        dispatch(getUserBookings(user._id))
    }, [])

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const [infoActive, setInfoActive] = useState(true)

    const tabSwitch1 = () => {
        setInfoActive(true)
    }

    const tabSwitch2 = () => {
        setInfoActive(false)
    }

    return (
        <>
            <section className='accountBloc'>
                <div className='accountTop'>
                    <img src={bannerImg} alt="accountBanner"/>
                    <div className='accountInfo'>
                        <FaUserAlt className='accountPP'/>
                        <div className='accountText'>
                            <h2>{user.last_name}</h2>
                            <p>{user.first_name}</p>
                        </div>
                        {user.admin === true ? (
                            <Link to='/admin' className='adminLink orangeLink'>Admin</Link>
                        ):(
                            <>
                            </>
                        )}
                        <button className='accountLogOut blueBtn' onClick={onLogout}>
                            <FaSignOutAlt/>
                        </button>
                    </div>
                    <section className='accountTabs'>
                        {infoActive===true ? (
                            <>
                                <button className='accountActive' onClick={tabSwitch1}><h2>Informations</h2></button>
                                <button onClick={tabSwitch2}><h2>Réservations</h2></button>
                            </>

                        ):(
                            <>
                                <button onClick={tabSwitch1}><h2>Informations</h2></button>
                                <button className='accountActive' onClick={tabSwitch2}><h2>Réservations</h2></button>
                            </>

                        )}

                    </section>

                </div>
                {infoActive===true ? (
                    <section className='accountFullInfo'>
                        <p>{user.first_name} {user.last_name}</p>
                        <p>{user.email}</p>
                        <p>{user.telephone}</p>
                        <p>{user.nb_passengers} passagers</p>
                        <p>Départ à partir de {user.departure}</p>
                        <button className='blueBtn'><Link to={user ? '/updateUser' + `?id=${user._id}` : '/'}><FaPen/> Modifier</Link></button>
                    </section>
                ):(
                    <section className='accountBookings'>
                        {bookings.length > 0 ? (
                            bookings.map((booking) =>
                                <BookingCard key={booking._id} booking={booking}/>
                                // <section>
                                //     <h2>Réservation #{booking._id}</h2>
                                //     <p>A destination de {booking.city_to}</p>
                                //     <p>Départ le {booking.departure_date}</p>
                                // </section>
                            )
                        ):(
                            <>

                            </>
                        )}
                    </section>
                )}

            </section>
        </>
    );
};

export default Account;