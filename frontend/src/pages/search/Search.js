import React, {useEffect, useState} from 'react';
import VideoHeader from "../../components/videoHeader/VideoHeader";
import {useDispatch, useSelector} from "react-redux";
import {getAllDestinations} from "../../features/destinations/destinationsSlice";
import DestinationCard2 from "../../components/destinationCard2/DestinationCard2";
import Spinner from "../../components/spinner/Spinner";
import {useSearchParams} from "react-router-dom";

const Search = () => {

    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const {destinations, isLoading} = useSelector((state) => state.destinations)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getAllDestinations())

        const searchTerm = searchParams.get("search")

        if (searchTerm !== null){
            setSearch(searchTerm)
            setSearchDest(destinations.filter(
                destination => destination.name.toLowerCase().includes(search.toLowerCase()) ||
                    destination.country.toLowerCase().includes(search.toLowerCase()) ||
                    destination.continent.toLowerCase().includes(search.toLowerCase())
            ))
        }
    }, [])

    const [search, setSearch] = useState('')
    const [searchDest, setSearchDest] = useState([])

    const handleSearch = e => {
        setSearch(e.target.value)

        setSearchDest(destinations.filter(
            destination => destination.name.toLowerCase().includes(search.toLowerCase()) ||
            destination.country.toLowerCase().includes(search.toLowerCase()) ||
            destination.continent.toLowerCase().includes(search.toLowerCase())
        ))
    }


    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className='heading2'>
                <VideoHeader/>
                <div className='form'>
                    <form>
                        <input
                            type="text"
                            id='search'
                            name='search'
                            value={search}
                            placeholder='Recherchez une destination'
                            onChange={handleSearch}
                        />
                    </form>
                </div>
            </section>
            <section className='content'>
            {search !== '' ? (
                <section className='searchResultsCards'>
                    {searchDest.map((dest) => (
                    <DestinationCard2 key={dest.id} destination={dest} user={user} />
                    ))}
                </section>

            ):(
                <section className='searchResultsCards'>
                    {destinations.map((destination) => (
                        <DestinationCard2 key={destination.id} destination={destination} user={user}/>
                    ))}
                </section>
            )}
            </section>

        </>
    );
};

export default Search;