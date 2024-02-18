const asyncHandler = require('express-async-handler')
const Bookings = require('../models/bookingModel')
const {json} = require("express")

//@desc Get Bookings from user
//@route GET /api/account
//Access private

const getUserBookings = asyncHandler(async (req, res) => {
    const bookings = await Bookings.find({user: req.params.id})
    if (bookings){
        res.status(200).json(bookings)
    }
})

//@desc Get Booking by Id
//@route GET /api/bookings/id
//Access private

const getBookingById = asyncHandler(async (req, res) => {
    const booking = await Bookings.findById(req.params.id)
    if (booking){
        res.status(200).json(booking)
    } else{
        res.status(401)
        throw new Error("Cette réservation n'existe pas")
    }
})

//@desc Set Booking
//@route POST /api/bookDestination
//Access public
const setBooking = asyncHandler(async (req,res) => {
    if (!req.body.city_from || !req.body.city_to || !req.body.nb_passengers ) {
        res.status(400)
        throw new Error("Tous les champs ne sont pas remplis")
    }

    let listStops = []
    let stops = req.body.stops
    if (stops) {
        Object.values(stops).forEach(stop => listStops.push(stop))
    } else {
        listStops = []
    }

    const booking = await Bookings.create({
        user: req.body.book_user,
        city_from: req.body.city_from,
        city_to: req.body.city_to,
        nb_passengers: req.body.nb_passengers,
        stops: listStops,
        departure_date: req.body.departure_date,
        return_date: req.body.return_date,

    })

    if (booking){
        res.status(200).json(booking)
    } else {
        res.status(400)
        throw new Error("La réservation n'a pas pu être terminée")
    }
})

//@desc Delete Destination
//@route DELETE /api/destination/deleteDestination:id
//Access private
const deleteBooking = asyncHandler(async (req,res) => {

    const booking = await Bookings.findById(req.params.id)
    if (!booking) {
        res.status(400)
        throw new Error ("Cette réservation n'existe pas")
    }

    await Bookings.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getUserBookings,
    getBookingById,
    setBooking,
    deleteBooking
}