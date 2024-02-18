import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    deleteDestination,
    getDestinationById,
    resetDestination,
    updateDestination
} from "../../features/destinations/destinationsSlice";
import VideoHeader from "../../components/videoHeader/VideoHeader";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";

const UpdateDestination = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const {destination} = useSelector((state) => state.destinations)

    const id = searchParams.get("id")
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        continent: "",
        description: "",
        attractions: [],
        images: "",
    })

    useEffect(() => {
        dispatch(resetDestination())
        dispatch(getDestinationById(id))
    }, [])

    useEffect(() => {
        if (destination) {
            setFormData({
                name: destination.name,
                country: destination.country,
                continent: destination.continent,
                description: destination.description,
                attractions: destination.attractions,
                images: destination.images,
                id
            })
        }
    }, [destination])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateDestination(formData))
        dispatch(resetDestination())
        dispatch(getDestinationById(id))
        setFormData({
            name: "",
            country: "",
            continent: "",
            description: "",
            attractions: [],
            images: "",
        })
        toast.success("La destionation à été modifié")
        navigate('/admin')
    }

    const handleClick = () => {
        dispatch(deleteDestination(destination._id))
        navigate('/admin')
        toast.success('La destination a bien été supprimé')
    }

    return (
        <section className='heading'>
            <VideoHeader/>
            {destination && (
                <>
                    <h1>Modifier {destination.name}</h1>
                    <div className='form'>

                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                className='form-control'
                                id='name'
                                name='name'
                                key={destination.name}
                                defaultValue={destination.name}
                                onChange={onChange}
                            />
                            <input
                                type="text"
                                className='form-control'
                                id='country'
                                name='country'
                                key={destination.country}
                                defaultValue={destination.country}
                                onChange={onChange}
                            />
                            <input
                                type="text"
                                className='form-control'
                                id='continent'
                                name='continent'
                                key={destination.continent}
                                defaultValue={destination.continent}
                                onChange={onChange}
                            />
                            <textarea
                                className='form-control textArea'
                                id='description'
                                name='description'
                                key={destination.description}
                                defaultValue={destination.description}
                                onChange={onChange}
                            />
                            <button type='submit' className='blueBtn formBtn'>
                                Modifier
                            </button>
                            <button className='blueBtn' onClick={handleClick}><FaTrash/> Supprimer</button>
                        </form>

                    </div>
                </>
            )}
        </section>
    );
};

export default UpdateDestination;