import axios from "axios";


const API_URL = "/api/bookings/"

//Get user bookings
const getUserBookings = async (userId) => {
    const response = await axios.get(API_URL + "userBookings" + userId)
    return response.data
}

//Get booking by id
const getBookingById = async (id) => {
    const response = await axios.get(API_URL + "booking" + id)
    return response.data
}

//Create booking
const setBooking = async (booking) => {
    const response = await axios.post(API_URL + "bookDestination", booking)
    return response.data
}

//Delete booking
const deleteBooking = async (id) => {
    const response = await axios.delete( API_URL + "deleteBooking" + id )
    return response.data
}

const bookingsServices = {
    getUserBookings,
    getBookingById,
    setBooking,
    deleteBooking
}

export default bookingsServices