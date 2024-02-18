import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllDestinations} from "../../features/destinations/destinationsSlice";
import Spinner from "../../components/spinner/Spinner";
import DestinationCard from "../../components/destinationCard/DestinationCard";
import Footer from "../../components/footer/Footer";
import VideoHeader from "../../components/videoHeader/VideoHeader";

const Home = () => {

    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {destinations, isLoading} = useSelector((state) => state.destinations)

    useEffect(() => {
        dispatch(getAllDestinations())
    }, [])

    const lastDestinations = destinations.slice(Math.max(destinations.length - 3, 1))
    const firstDestinations = destinations.slice(0, 3)
    lastDestinations.reverse()

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className='heading'>
                <VideoHeader/>
                <h1>
                    Profitez du grand luxe dans le monde entier
                </h1>
                <button className='blueBtn headingBtn'><Link to='/search'>Rechercher</Link></button>
            </section>

            <section className='homeContent'>
                <div className='homeNewDestinations'>
                    <h2 className='sectionTitle'>Nouvelles destinations</h2>
                    <div className='homeNewDestinationsCards'>
                        {lastDestinations.map((lastDestination) => (
                            <DestinationCard key={lastDestination._id} destination={lastDestination} user={user}/>
                        ))}
                    </div>
                </div>
                <div className='homePopularDestinations'>
                    <h2 className='sectionTitle'>Destinations populaires</h2>
                    <div className='homePopularDestinationsCards'>
                        {firstDestinations.map((firstDestination) => (
                            <DestinationCard key={firstDestination._id} destination={firstDestination} user={user}/>
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Home;