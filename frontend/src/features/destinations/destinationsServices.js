import axios from "axios";

const API_URL = "/api/destinations/"

//Get all destinations
const getAllDestinations = async () => {
    const response = await axios(API_URL + 'all')
    return response.data
}

//Get destination by id
const getDestinationById = async (id) => {
    const response = await axios(API_URL + "destination" + id)
    return response.data
}

//Create destinations
const setDestination = async (destination) => {
    const response = await axios.post(API_URL + "addDestination", destination)
    return response.data
}

//Update destination
const updateDestination = async (destinationData) => {
    const response = await axios.put(API_URL + "updateDestination" + destinationData.id, destinationData)
    return response.data
}

//Delete destination
const deleteDestination = async (id) => {
    const response = await axios.delete( API_URL + "deleteDestination" + id )
    return response.data
}

const destinationsServices = {
    getAllDestinations,
    getDestinationById,
    setDestination,
    updateDestination,
    deleteDestination
}

export default destinationsServices