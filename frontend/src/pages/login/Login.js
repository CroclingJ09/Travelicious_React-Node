import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {login, reset} from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";
import VideoHeader from "../../components/videoHeader/VideoHeader";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if (isSuccess && user){
            toast.success(`Bienvenue `)
            navigate('/')
        }
        if (isError){
            toast.error('Une erreur est survenue, assurez-vous d\'avoir bien entré vos informations')
        }
        if (user){
            navigate('/')
        }
        dispatch(reset())
    }, [user, isSuccess, isError, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if (isLoading){
        return <Spinner/>
    }

    return (
        <>
            <section className='heading'>
                <VideoHeader/>
                <h1>
                    Connexion
                </h1>
                <div className='form'>
                    <form onSubmit={onSubmit}>
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
                        <button type='submit' className='blueBtn formBtn'>
                           Se connecter
                        </button>
                        <p className='formText'>Pas de compte? <Link className='orangeLink' to='/register'>Crée-en un!</Link></p>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Login;