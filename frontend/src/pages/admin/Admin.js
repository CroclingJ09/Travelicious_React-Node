import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllDestinations} from "../../features/destinations/destinationsSlice";
import {getAllUsers} from "../../features/auth/authSlice";
import DestinationAdmin from "../../components/destinationAdmin/DestinationAdmin";
import {FaPlus} from "react-icons/fa";
import UserAdmin from "../../components/userAdmin/UserAdmin";

const Admin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {users, user} = useSelector((state) => state.auth)
    const {destinations} = useSelector((state) => state.destinations)


    useEffect(() => {
        if (user && !user.admin){
            navigate('/')
        }
    }, [user] )

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllDestinations())
    }, [destinations.length])


    return (
        <>
            <section className='contentTop admin'>
                <h1>Admin</h1>
                <h2 className='adminTitle'>Destinations</h2>
                <section className='adminBlocs'>
                    <button className='blueBtn addBtn'><Link to='/addDestination'><FaPlus/>Ajouter une destination</Link> </button>
                    {destinations.length > 0 ? (
                        destinations.map((destination) => (
                            <DestinationAdmin key={destination.id} destination={destination} user={user}/>
                        ))
                    ):(
                        <div className='AdminBloc'>
                            <h2>Aucune destination n'existe.</h2>
                        </div>
                    )}
                </section>
                <h2 className='adminTitle'>Utilisateurs</h2>
                <section className='adminBlocs'>
                    {users ? (
                        users.map((user) => (
                            <UserAdmin key={user._id} user={user} />
                            // <div className='AdminBloc' key={user.id}>
                            //     <h2>{user.first_name}</h2>
                            //     <p>{user.email}</p>
                            //     {user.admin === true && (
                            //         <>
                            //             <p>Admin</p>
                            //         </>
                            //     )}
                            //     <button className='blueBtn'><FaPencil/><Link to={user ? '/updateUser' + `?id=${user._id}` : '/'}>Modifer</Link> </button>
                            // </div>
                        ))
                    ):(
                        <div className='AdminBloc'>
                            <h2>Aucun utilisateur n'existe.</h2>
                        </div>
                    )}
                </section>


            </section>

        </>
    );
};

export default Admin;