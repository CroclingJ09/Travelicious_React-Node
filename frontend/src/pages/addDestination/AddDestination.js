import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import VideoHeader from "../../components/videoHeader/VideoHeader";
import {reset, setDestination} from "../../features/destinations/destinationsSlice";
import {toast} from "react-toastify";
import Spinner from "../../components/spinner/Spinner";

const AddDestination = () => {

    const [formData, setFormData] = useState({
        name: '',
        country: '',
        continent: '',
        description: '',
        images: '',
    })
    const [listAttractions, setListAttractions] = useState({
        attraction1: "",
        attraction2: "",
        attraction3: "",
        attraction4: "",
        attraction5: "",
    })
    const {name, country, continent, description, images} = formData
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const {destination, isLoading, isSuccess, isError, message} = useSelector((state)=> state.destinations)

    useEffect(() => {
        if (user.admin === false){
            navigate('/')
        }
    }, [user, navigate] )

    useEffect(() => {
        if (isError){
            toast.error(message)
        }
        dispatch(reset())
    }, [destination, isSuccess, isError, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onChangeAttractions = (e) => {
        setListAttractions((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const destinationData = {
            name,
            country,
            continent,
            description,
            attractions: listAttractions,
            images
        }
        dispatch(setDestination(destinationData))
        toast.success('La destination à été rajouté')
        navigate('/admin')
    }

    if (isLoading){
        return <Spinner />
    }

    return (

        <section className='heading'>
            <VideoHeader/>
            <h1>Ajouter une destination</h1>
            <div className='form' onSubmit={onSubmit}>
                <form>
                    <input
                        type="text"
                        className='form-control'
                        id='name'
                        name='name'
                        value={name}
                        placeholder='Nom'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        className='form-control'
                        id='country'
                        name='country'
                        value={country}
                        placeholder='Pays'
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        className='form-control'
                        id='continent'
                        name='continent'
                        value={continent}
                        placeholder='Continent'
                        onChange={onChange}
                    />
                    <textarea
                        className='form-control textArea'
                        id='description'
                        name='description'
                        value={description}
                        placeholder='Description'
                        onChange={onChange}
                    />
                    <h2>Points d'intérêts</h2>
                    <section className='attractionsBloc'>
                        <input
                            type="text"
                            className='form-control'
                            id='attraction1'
                            name='attraction1'
                            value={listAttractions.attraction1}
                            onChange={onChangeAttractions}
                        />
                        <input
                            type="text"
                            className='form-control'
                            id='attraction2'
                            name='attraction2'
                            value={listAttractions.attraction2}
                            onChange={onChangeAttractions}
                        />
                        <input
                            type="text"
                            className='form-control'
                            id='attraction2'
                            name='attraction3'
                            value={listAttractions.attraction3}
                            onChange={onChangeAttractions}
                        />
                        <input
                            type="text"
                            className='form-control'
                            id='attraction4'
                            name='attraction4'
                            value={listAttractions.attraction4}
                            onChange={onChangeAttractions}
                        />
                        <input
                            type="text"
                            className='form-control'
                            id='attraction5'
                            name='attraction5'
                            value={listAttractions.attraction5}
                            onChange={onChangeAttractions}
                        />
                    </section>
                    <button type='submit' className='blueBtn formBtn'>
                        Ajouter
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddDestination;