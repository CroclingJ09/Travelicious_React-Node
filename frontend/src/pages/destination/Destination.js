import React, {useEffect} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDestinationById, resetDestination} from "../../features/destinations/destinationsSlice";
import bannerImg from "../../assets/placeholder.jpg"
import Footer from "../../components/footer/Footer";
import 'react-slideshow-image/dist/styles.css'
import {Slide} from "react-slideshow-image";
import {toast} from "react-toastify";


const Destination = () => {

    const dispatch = useDispatch()

    const [searchParams] = useSearchParams()

    const {destination} = useSelector((state) => state.destinations)

    const {user} = useSelector((state) => state.auth)

    const id = searchParams.get("id")

    useEffect(() => {
        dispatch(resetDestination())
        dispatch(getDestinationById(id))
    }, [])

    /////SLIDER/////
    const slideImages = [
        {
            url: bannerImg
        },
        {
            url: bannerImg
        },
        {
            url: bannerImg
        },
        {
            url: bannerImg
        },
        {
            url:bannerImg
        },

    ]

    const noAccount = () => {
        toast.error('Veuillez vous connecter afin d\'accéder aux offres ')
    }

    return (
        <>
            <section className='destination'>
                <img src={bannerImg} alt="" className='destinationBanner'/>

                <div className='destinationInfo'>
                    <h1 className='destinationTitle'>{destination.name}</h1>
                    <p>{destination.description}</p>
                    {user ? (
                        <button className='blueBtn'><Link to={destination ? '/bookDestination' + `?id=${destination._id}` : '/'}>Voir les offres</Link></button>
                    ):(
                        <button onClick={noAccount} className='greyBtn'><Link to='#'>Voir les offres</Link></button>
                    )}
                    <h2>Galerie d'images</h2>
                    <div className='destinationImages'>
                        <Slide>
                            {slideImages.map((image, index) => (
                                <div key={index}>
                                    <div style={{backgroundImage:`url(${image.url})`}} className='destinationImages'></div>
                                </div>
                            ))}
                        </Slide>
                    </div>
                    <h2>A visiter</h2>
                    <section className='attractions'>
                        {destination.attractions && destination.attractions.map(attraction => <p className='attraction'>{attraction}</p>)}
                    </section>
                    <Footer/>
                </div>
            </section>
        </>
    );


};

export default Destination;