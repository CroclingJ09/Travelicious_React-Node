import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {register, reset} from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";
import VideoHeader from "../../components/videoHeader/VideoHeader";
import {getAllDestinations} from "../../features/destinations/destinationsSlice";

const Register = () => {

    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        email: '',
        password: '',
        telephone: '',
        nb_passengers: '',
        departure: '',
        confirm_password: '',
    })
    const {last_name, first_name, email, password, telephone, nb_passengers, departure, confirm_password} = formData
    const {user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)
    const {destinations} = useSelector((state) => state.destinations)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        if (isSuccess && user){
            toast.success('Bienvenue, ' + user.last_name )
            navigate('/')
        }
        if(user){
            navigate('/')
        }
        dispatch(reset())
        dispatch(getAllDestinations())
    }, [user, isSuccess, isError, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== confirm_password){
            toast.error('Les mots de passes correspondent pas, connard')
        }else {
            const userData = {
                first_name,
                last_name,
                email,
                password,
                confirm_password,
                telephone,
                departure,
                nb_passengers
            }
            dispatch(register(userData))
        }
    }

    if (isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <VideoHeader/>
                <h1>
                    Inscription
                </h1>
                <div className='form'>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            className='form-control'
                            id='last_name'
                            name='last_name'
                            value={last_name}
                            placeholder='Nom'
                            onChange={onChange}
                        />
                        <input
                            type="text"
                            className='form-control'
                            id='first_name'
                            name='first_name'
                            value={first_name}
                            placeholder='Prénom'
                            onChange={onChange}
                        />
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Adresse mail'
                            onChange={onChange}
                        />
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Mot de passe'
                            onChange={onChange}
                        />
                        <input
                            type="password"
                            className='form-control'
                            id='confirm_password'
                            name='confirm_password'
                            value={confirm_password}
                            placeholder='Confirmer mot de passe'
                            onChange={onChange}
                        />
                        <input
                            type="number"
                            pattern="[0-9]"
                            className='form-control'
                            id='telephone'
                            name='telephone'
                            value={telephone}
                            placeholder='Numéro de téléphone'
                            onChange={onChange}
                        />
                        <input
                            type="number"
                            className='form-control'
                            id='nb_passengers'
                            name='nb_passengers'
                            value={nb_passengers}
                            placeholder='Nombre de passegers'
                            onChange={onChange}
                        />
                        <input
                            type="text"
                            className='form-control'
                            id='departure'
                            list='destinations'
                            name='departure'
                            value={departure}
                            placeholder='Lieu de départ'
                            onChange={onChange}
                        />
                        <datalist id='destinations'>
                            {destinations.map((destination) => (
                                <option value={destination.name}/>
                            ))}
                        </datalist>
                        <button type='submit' className='blueBtn formBtn'>
                            Créer un compte
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Register;