import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getUser, resetUser, updateUser} from "../../features/auth/authSlice";
import VideoHeader from "../../components/videoHeader/VideoHeader";
import {getAllDestinations} from "../../features/destinations/destinationsSlice";

const UpdateUser = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const {user, userAdmin} = useSelector((state) => state.auth)

    const {destinations} = useSelector((state) => state.destinations)

    const id = searchParams.get("id")

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        telephone: '',
        departure: '',
        nb_passengers: '',
        admin: null,
    })

    useEffect(() => {
        dispatch(resetUser())
        dispatch(getUser(id))
        dispatch(getAllDestinations())
    }, [])

    useEffect(() => {
        if (userAdmin) {
            setFormData({
                first_name: userAdmin.first_name,
                last_name: userAdmin.last_name,
                email: userAdmin.email,
                telephone: userAdmin.telephone,
                departure: userAdmin.departure,
                nb_passengers: userAdmin.nb_passengers,
                admin: userAdmin.admin,
                id
            })
        }
    }, [userAdmin])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onChangeAdmin = (e) => {
        if (e.target.checked) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name] : true
            }))
        } else{
            setFormData((prevState) => ({
                ...prevState,
                [e.target.name] : false
            }))
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser(formData))
        dispatch(resetUser())
        if(userAdmin._id === user._id){
            navigate('/account')
        } else if (user.admin === true){
            navigate('/admin')
        }

    }

    return (
        <section className='heading'>
            <VideoHeader/>
            {userAdmin && (
                <>
                    <h1>Modifier {userAdmin.first_name} {userAdmin.last_name}</h1>
                    <div className='form' onSubmit={onSubmit}>

                        <form>
                            <input
                                type="text"
                                className='form-control'
                                id='first_name'
                                name='first_name'
                                key={userAdmin.first_name}
                                defaultValue={userAdmin.first_name}
                                onChange={onChange}
                            />
                            <input
                                type="text"
                                className='form-control'
                                id='last_name'
                                name='last_name'
                                key={userAdmin.last_name}
                                defaultValue={userAdmin.last_name}
                                onChange={onChange}
                            />
                            <input
                                type="email"
                                className='form-control'
                                id='email'
                                name='email'
                                key={userAdmin.email}
                                defaultValue={userAdmin.email}
                                onChange={onChange}
                            />
                            <input
                                type="number"
                                className='form-control'
                                id='telephone'
                                name='telephone'
                                pattern='[0-9]'
                                key={userAdmin.telephone}
                                defaultValue={userAdmin.telephone}
                                onChange={onChange}
                            />
                            <input
                                type="text"
                                className='form-control'
                                id='departure'
                                name='departure'
                                list='destinations'
                                key={userAdmin.departure}
                                defaultValue={userAdmin.departure}
                                onChange={onChange}
                            />
                            <datalist id='destinations'>
                                {destinations.map((destination) => (
                                    <option value={destination.name}/>
                                ))}
                            </datalist>
                            <input
                                type="number"
                                className='form-control'
                                id='nb_passengers'
                                name='nb_passengers'
                                key={userAdmin.nb_passengers}
                                defaultValue={userAdmin.nb_passengers}
                                onChange={onChange}
                            />
                            {user.admin === true && (
                                userAdmin.admin === true ? (
                                        <input
                                            checked={true}
                                            type="checkbox"
                                            className='form-control'
                                            id='admin'
                                            name='admin'
                                            key={userAdmin.admin}
                                            defaultValue={userAdmin.admin}
                                            onChange={onChangeAdmin}
                                        />
                                    ):(
                                        <input
                                            type="checkbox"
                                            className='form-control'
                                            id='admin'
                                            name='admin'
                                            key={userAdmin.admin}
                                            defaultValue={userAdmin.admin}
                                            onChange={onChangeAdmin}
                                        />
                                    )
                            )}
                            {user.admin === true && (
                                <label htmlFor="admin">Admin</label>
                            )}
                            <button type='submit' className='blueBtn formBtn'>
                                Modifier
                            </button>
                        </form>

                    </div>
                </>
            )}
        </section>
    );
};

export default UpdateUser;